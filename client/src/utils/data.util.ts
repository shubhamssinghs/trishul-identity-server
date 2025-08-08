export class DateUtils {
  // Example: "06 Aug 2025"
  static formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // Example: "06 Aug 2025, 03:45 PM"
  static formatDateTime(date: Date | string): string {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Example: "03:45 PM"
  static formatTime(date: Date | string): string {
    return new Date(date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Example: "2025-08-06"
  static formatISODate(date: Date | string): string {
    return new Date(date).toISOString().split("T")[0];
  }

  // Example: "2025-08-06T15:45:00.000Z"
  static formatISOString(date: Date | string): string {
    return new Date(date).toISOString();
  }

  // Example: "2 hours ago" — approximate native version
  static fromNow(date: Date | string): string {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "just now";
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

    return this.formatDate(then);
  }
}
