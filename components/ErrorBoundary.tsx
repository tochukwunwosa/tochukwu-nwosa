'use client'

import React, { ReactNode } from 'react';
import { Button } from './ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // The error parameter is prefixed with underscore to indicate it's intentionally unused
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error (you could send this to a service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='w-screen h-screen flex items-center justify-center flex-col'>
          <h2>Sorry, the error is from us!</h2>
          <Button variant={'outline'} onClick={this.handleReset} className='cursor-pointer mt-2'>Try again?</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;