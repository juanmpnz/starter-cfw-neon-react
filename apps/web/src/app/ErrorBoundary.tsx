import { Component, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { error?: Error }> {
  state = { error: undefined as Error | undefined }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    const { error } = this.state
    if (error) return <div className="p-6 text-red-700 bg-red-50 border border-red-200 rounded">Error: {error.message}</div>
    return this.props.children
  }
}
