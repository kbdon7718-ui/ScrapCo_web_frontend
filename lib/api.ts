import type { PickupRequestPayload } from "@/types";

function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }
  return url.replace(/\/$/, "");
}

export async function createPickupRequest(payload: PickupRequestPayload) {
  const baseUrl = getApiBaseUrl();

  const res = await fetch(`${baseUrl}/pickup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Failed to submit pickup request";
    try {
      const data = (await res.json()) as { error?: string; message?: string };
      message = data.message ?? data.error ?? message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return (await res.json()) as { ok: true; id: string };
}
