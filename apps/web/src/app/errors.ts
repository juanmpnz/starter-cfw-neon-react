export class HttpError extends Error {
    status: number
    data?: unknown
    constructor(message: string, status: number, data?: unknown) {
      super(message)
      this.name = 'HttpError'
      this.status = status
      this.data = data
    }
  }
  
  export function getErrorMessage(err: unknown) {
    if (err instanceof HttpError) return `${err.message} (HTTP ${err.status})`
    if (err instanceof Error) return err.message
    try { return JSON.stringify(err) } catch { return String(err) }
  }
  