export const env = {
    // Si no seteás VITE_API_URL, el client usará same-origin y Vite proxy (/api → 8787)
    apiUrl: import.meta.env.VITE_API_URL ?? '',
  }
  