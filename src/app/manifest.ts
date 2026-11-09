import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// TODO: add PNG app icons (192×192, 512×512) once the logo is ready.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#110e0c",
    theme_color: "#110e0c",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
