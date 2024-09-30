export const convertToMilliseconds = (time: string): number => {
  const unit = time.slice(-1);
  const value = parseInt(time.slice(0, -1), 10);

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
