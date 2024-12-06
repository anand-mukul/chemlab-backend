export const DB_NAME = "vlab";

// export const COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
//   domain: process.env.COOKIE_DOMAIN || "localhost",
// };

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Enable secure only in production
  sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
};