/** Update paths here when connecting an API that implements services/contract.ts. */
export const ENDPOINTS = {
  courses: "/courses",
  course: (slug: string) => `/courses/${encodeURIComponent(slug)}`,
  creators: "/creators",
  creator: (slug: string) => `/creators/${encodeURIComponent(slug)}`,
  reviews: (id: string) => `/courses/${encodeURIComponent(id)}/reviews`,
  progress: (id: string) => `/courses/${encodeURIComponent(id)}/progress`,
  follow: (id: string) => `/creators/${encodeURIComponent(id)}/follow`,
  auth: (mode: "login" | "register") => `/auth/${mode}`,
};
