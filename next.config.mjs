/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚫 Disable X-Powered-By header
  poweredByHeader: false,

  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    const isStaging = process.env.NEXT_PUBLIC_ENV === 'staging';
    const isProdOrStaging = isProd || isStaging;

    return [
      {
        source: '/(.*)',
        headers: [
          // ✅ Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: isProdOrStaging
              ? "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self';"
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ws://localhost:* http://localhost:*; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
          },

          // ✅ X-Frame-Options
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },

          // ✅ X-Content-Type-Options
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          // ✅ Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          // ✅ Strict-Transport-Security (staging & prod only)
          ...(isProdOrStaging
            ? [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains', // no preload yet
                },
              ]
            : []),

          // ✅ X-Robots-Tag (staging only)
          ...(isStaging
            ? [
                {
                  key: 'X-Robots-Tag',
                  value: 'noindex, nofollow',
                },
              ]
            : []),

          // ✅ Permissions Policy
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'img.freepik.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
