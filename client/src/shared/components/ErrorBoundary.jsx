import React, { Component } from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    console.log(error);
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({ error: true });
  }

  handleClose = () => {
    this.setState({ error: false });
  };

  render() {
    return (
      <>
        {this.state.error && (
          <Alert
            status="error"
            borderRadius="md"
            position="absolute"
            bottom={16}
            maxWidth="60%"
            left="50%"
            transform="translateX(-50%)"
          >
            <AlertIcon />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>Looks like somethin went wrong...</AlertDescription>
            <CloseButton onClick={this.handleClose} position="absolute" right="8px" top="8px" />
          </Alert>
        )}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
