export function formatDate(dateStr: Date) {
  if (!dateStr || isNaN(new Date(dateStr).getTime())) {
    console.error("Invalid date string:", dateStr);
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

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
