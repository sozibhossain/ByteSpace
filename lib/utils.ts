import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Resolves conditional classes and Tailwind conflicts for component overrides. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Keep presentation formatting out of fixtures and service contracts. */
export function durationLabel(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return (
    [
      hours ? `${hours} ${hours === 1 ? "hour" : "hours"}` : "",
      remainder ? `${remainder} mins` : "",
    ]
      .filter(Boolean)
      .join(" ") || "0 mins"
  );
}
export function priceLabel(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
