export const convertToMilliseconds = (time: string): number => {
  const unit = time.slice(-1); // Get the last character (e.g., 'm', 'd')
  const value = parseInt(time.slice(0, -1), 10); // Get the numeric part

  switch (unit) {
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      throw new Error("Invalid time unit in JWT expiration time");
  }
};
