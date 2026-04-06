export function basePath(path: string): string {
  const prefix =
    process.env.NODE_ENV === "production" ? "/portfolio" : "";
  return `${prefix}${path}`;
}
