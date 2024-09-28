import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portafogli",
    short_name: "Portafogli",
    description: "The App to track all your expenses",
    display: "standalone",
    background_color: "#f6f6f6",
    theme_color: "#f6f6f6",
    scope: "https://portafogli.berz.it/",
    id: "https://portafogli.berz.it/?source=pwa",
    start_url: "https://portafogli.berz.it/?source=pwa",
    icons: [
      {
        src: "/icon-192-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
