const API_URL = "https://llm-connection.onrender.com";

export interface ChatResponse {
  query: string;
  response: string;
}

export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
