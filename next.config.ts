import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';


const nextConfig: NextConfig = {
    basePath: isProd ? "/walka" : "",
    assetPrefix: isProd ? "/walka": "",
    eslint: {
    ignoreDuringBuilds: true,
    }
};

export default nextConfig;
