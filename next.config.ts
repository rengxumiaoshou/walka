import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';


const nextConfig: NextConfig = {
    output: "export",
    basePath: isProd ? "/walka/out" : "",
    assetPrefix: isProd ? "/walka/out": "",
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: isProd ? '/walka/out' : '',
    }
};

export default nextConfig;
