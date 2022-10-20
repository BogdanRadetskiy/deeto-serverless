export default function catchAllFallback(event) {
  let message;
  try {
    message = JSON.parse(event.Cause)?.errorMessage;
  } catch (e) {
    message = 'Unknown Error';
  }

  return {
    error: true,
    errorMessage: message,
  };
}
