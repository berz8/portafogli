import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedNumber(input: number): string {
  if (input > 100000) {
    return `${(input / 1000).toFixed(0)}K`;
  }
  return input.toFixed(2).toString();
}
