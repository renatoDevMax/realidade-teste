/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://aframe.io https://raw.githack.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' blob: data: https://raw.githubusercontent.com https://ar-js-org.github.io",
              "media-src 'self' blob:",
              "connect-src 'self' blob: data: https://raw.githubusercontent.com https://ar-js-org.github.io",
              "worker-src blob:",
              "frame-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
