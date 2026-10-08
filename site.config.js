// Site settings. Both can also be set with environment variables at build time.
export default {
  // Public origin, e.g. "https://mytor.uz". Leave empty until a domain is chosen:
  // canonical URLs and sitemap.xml are only emitted when this is set.
  siteUrl: process.env.MYTOR_SITE_URL || "",

  // Folder the site is served from, e.g. "/mytor" for https://<user>.github.io/mytor/.
  // Empty = served from the domain root (a custom domain such as mytor.uz).
  basePath: process.env.MYTOR_BASE_PATH || "",

  // URL that accepts the demo-request form as a JSON POST and answers 2xx on success.
  // Empty = not connected: the form validates but clearly says nothing was sent.
  formEndpoint: process.env.MYTOR_FORM_ENDPOINT || "",
};
