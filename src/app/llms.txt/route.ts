import { getTodaysMenu } from "@/lib/sheets";
import { menuMarkdown } from "@/lib/menu-text";

// The shop and today's menu as plain Markdown, for AI assistants and crawlers
// (https://llmstxt.org). Same cached menu as the home page.
export async function GET() {
  const { categories, weekday } = await getTodaysMenu();
  const body = menuMarkdown(categories, weekday);

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
