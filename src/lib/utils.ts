import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSafeNextPath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//")) return false;
  if (path.includes("://")) return false;
  if (path.includes("..")) return false;
  return true;
}

export function isSafeHost(host: string): boolean {
  const allowedHosts = process.env.ALLOWED_REDIRECT_HOSTS?.split(",") ?? [];
  return allowedHosts.includes(host);
}
