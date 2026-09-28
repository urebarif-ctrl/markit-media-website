import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Markit Media",
    short_name: "Markit",
    description: "Full-stack digital marketing agency",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      { src: "/favicon.svg?v=6", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
