// Next.js static export: every route is pre-rendered to out/<route>/index.html (Cloudflare Workers static assets).
// MYTOR_BASE_PATH ("" for a domain root such as workers.dev; only set if ever served from a sub-folder),
// MYTOR_SITE_URL (public origin; enables canonical/og:image/sitemap) and MYTOR_FORM_ENDPOINT are read at build time.
const basePath = (process.env.MYTOR_BASE_PATH || "").replace(/\/+$/, "").replace(/^(?=[^/])/, "/");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    MYTOR_BASE_PATH: basePath,
    MYTOR_SITE_URL: (process.env.MYTOR_SITE_URL || "").replace(/\/+$/, ""),
    MYTOR_FORM_ENDPOINT: process.env.MYTOR_FORM_ENDPOINT || "",
  },
};

export default nextConfig;
