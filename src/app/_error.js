import React from 'react';

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally, you can log or handle the rejection here
});

// This component can be empty or display a custom error message.
const Error = () => {
  return <div>An error occurred.</div>;
};

export default Error;
