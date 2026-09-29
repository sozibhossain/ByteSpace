import { httpCatalog } from "./http/catalog";
import { mockCatalog } from "./mock/catalog";

/** Single switch point. Components and query hooks are independent of the source. */
export const catalog = process.env.NEXT_PUBLIC_DATA_SOURCE === "api" ? httpCatalog : mockCatalog;
