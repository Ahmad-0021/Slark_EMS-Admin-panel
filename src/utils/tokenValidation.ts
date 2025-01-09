export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true; // Token doesn't exist

  try {
    // Split the token and decode the payload
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return true; // Token is malformed

    const payload = JSON.parse(atob(payloadBase64)); // Decode the JWT payload
    const expiration = payload.exp * 1000; // Convert expiration time to milliseconds
    return Date.now() >= expiration; // Check if the current time is past the expiration time
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat invalid tokens as expired
  }
};
