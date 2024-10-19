
/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {hostname : "lh3.googleusercontent.com"},
            { hostname: "avatars.githubusercontent.com"}
        ]
    },
    eslint : {
        ignoreDuringBuilds : true
      }
};

export default nextConfig;
