import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {

  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({ error: this.state.error })
          : this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Something went wrong.</h1>
          <p className="text-lg mb-6 text-gray-700">{this.state.error?.message || 'An unexpected error occurred.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
