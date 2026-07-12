import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chase Chen Software Engineering Portfolio",
    short_name: "Chase Portfolio",
    description:
      "Chase Chen 的软件工程项目、算法实验、技术文章与学习成长记录。",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#030712",
    lang: "zh-CN",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
