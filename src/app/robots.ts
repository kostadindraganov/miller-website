import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search engines and AI assistants are all welcome: the site is a public menu,
// and being quoted correctly in an AI answer brings customers as surely as a
// search result does. The AI crawlers are named so the intent stays explicit
// even if a crawler starts treating "*" differently.
const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
