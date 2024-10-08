/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    // other configurations...
  };
  
  export default nextConfig;