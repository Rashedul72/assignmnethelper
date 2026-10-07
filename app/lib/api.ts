"use client";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function refreshAdminToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const currentToken = localStorage.getItem("admin_token");
  if (!currentToken) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
      body: JSON.stringify({ token: currentToken }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
        return data.token;
      }
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }

  // Token refresh failed or invalid token
  localStorage.removeItem("admin_token");
  return null;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  let token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  let targetUrl = url;
  if (url.startsWith("http://localhost:5000/api") || url.startsWith("https://localhost:5000/api")) {
    targetUrl = url.replace(/https?:\/\/localhost:5000\/api/, API_BASE_URL);
  } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
    const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const path = url.startsWith("/") ? url : `/${url}`;
    targetUrl = `${base}${path}`;
  }

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(targetUrl, { ...options, headers });

  if (response.status === 401) {
    // Attempt token refresh once
    const newToken = await refreshAdminToken();
    if (newToken) {
      headers.set("Authorization", `Bearer ${newToken}`);
      response = await fetch(targetUrl, { ...options, headers });
    } else {
      if (typeof window !== "undefined" && window.location.pathname !== "/dashboard/login") {
        window.location.href = "/dashboard/login";
      }
    }
  }

  return response;
}
