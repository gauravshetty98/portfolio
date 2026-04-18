const API_URL = "/api/chat";

export interface ChatResponse {
  query: string;
  response: string;
}

export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify({ message: query }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    let message = errText || `${response.status} ${response.statusText}`;
    try {
      const parsed = JSON.parse(errText) as { error?: string; details?: string };
      if (parsed.error) {
        message = parsed.error;
        if (parsed.details) message = `${message} (${parsed.details})`;
      }
    } catch {
      // keep message as raw errText
    }
    throw new Error(message);
  }

  return response.json() as Promise<ChatResponse>;
}
