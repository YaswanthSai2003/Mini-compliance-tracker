const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function buildApiUrl(path: string, query?: Record<string, string>) {
  const url = new URL(`${API_BASE}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
}