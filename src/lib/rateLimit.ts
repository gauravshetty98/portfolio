/**
 * In-memory sliding-window rate limiter per IP.
 *
 * Limits (portfolio-scale): 10 requests / minute, 30 / hour per IP.
 * On Vercel each serverless instance has its own map — limits are per-instance,
 * which is acceptable for a small public chatbot; combine with OpenAI spend caps.
 */

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * 60_000;
const MAX_PER_MINUTE = 10;
const MAX_PER_HOUR = 30;

/** IP -> sorted timestamps (ms) within the last hour */
const buckets = new Map<string, number[]>();

function pruneOld(ip: string, now: number): number[] {
  const cutoff = now - HOUR_MS;
  const arr = buckets.get(ip) ?? [];
  const kept = arr.filter((t) => t > cutoff);
  if (kept.length === 0) buckets.delete(ip);
  else buckets.set(ip, kept);
  return kept;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "local";
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

/**
 * Returns ok:false if this IP has exceeded limits. Otherwise records this hit and returns ok:true.
 */
export function checkChatRateLimit(ip: string, now = Date.now()): RateLimitResult {
  const recent = pruneOld(ip, now);

  const minuteCutoff = now - MINUTE_MS;
  const inLastMinute = recent.filter((t) => t > minuteCutoff).length;
  if (inLastMinute >= MAX_PER_MINUTE) {
    return { ok: false, retryAfterSec: 60 };
  }

  if (recent.length >= MAX_PER_HOUR) {
    return { ok: false, retryAfterSec: 3600 };
  }

  const next = [...recent, now].sort((a, b) => a - b);
  buckets.set(ip, next);

  // Best-effort cap on map size (avoid unbounded growth if IPs are spoofed)
  if (buckets.size > 5000) {
    const keys = Array.from(buckets.keys()).slice(0, 2500);
    for (const k of keys) buckets.delete(k);
  }

  return { ok: true };
}
