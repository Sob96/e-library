import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return <h3 className="books__total">Something went wrong. Get back to the main page or call the developers</h3>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;