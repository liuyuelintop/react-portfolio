const SITE_URL = "https://www.liuyuelin.dev/";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}sitemap.xml`,
  };
}
