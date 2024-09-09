/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      FROM_EMAIL: process.env.FROM_EMAIL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      MONGODB_URI: process.env.MONGODB_URI,
  },
}

export default nextConfig;
