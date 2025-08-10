// React-compatible API function for Sentry error testing
class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

// A faulty API function to test Sentry's error monitoring
export function getSentryExampleAPI() {
  throw new SentryExampleAPIError("This error is raised on the backend called by the example page.");
  return { data: "Testing Sentry Error..." };
}

// Alternative function that doesn't throw for testing
export function getSentryExampleAPISafe() {
  return { data: "Testing Sentry Error..." };
}
