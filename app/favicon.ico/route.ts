const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#030712"/>
  <rect x="7" y="7" width="50" height="50" rx="12" fill="url(#g)"/>
  <path d="M22.5 39.5c-5 0-8.5-3.5-8.5-8.4 0-4.8 3.6-8.6 8.7-8.6 3.3 0 5.6 1.4 7 3.4l-3.4 2.5c-.9-1.2-2-1.9-3.6-1.9-2.5 0-4.1 1.9-4.1 4.5s1.7 4.6 4.1 4.6c1.8 0 2.9-.8 3.8-2.1l3.4 2.4c-1.5 2.3-3.9 3.6-7.4 3.6Zm19 0c-5 0-8.5-3.5-8.5-8.4 0-4.8 3.6-8.6 8.7-8.6 3.3 0 5.6 1.4 7 3.4l-3.4 2.5c-.9-1.2-2-1.9-3.6-1.9-2.5 0-4.1 1.9-4.1 4.5s1.7 4.6 4.1 4.6c1.8 0 2.9-.8 3.8-2.1l3.4 2.4c-1.5 2.3-3.9 3.6-7.4 3.6Z" fill="#020617"/>
  <defs>
    <linearGradient id="g" x1="9" y1="10" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67e8f9"/>
      <stop offset="0.55" stop-color="#60a5fa"/>
      <stop offset="1" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
</svg>`;

export function GET() {
  return new Response(iconSvg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
