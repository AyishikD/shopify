import clsx, { type ClassValue } from "clsx"; // ✅ Default import for clsx
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
