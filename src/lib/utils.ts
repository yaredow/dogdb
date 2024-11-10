import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: any) {
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

export const copyToClipboard = async (path: string) => {
  try {
    await navigator.clipboard.writeText(path);
    toast({
      description: "Copied to clipboard",
    });
  } catch (error) {
    console.error(error);
  }
};
