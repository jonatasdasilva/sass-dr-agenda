import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["avatar.iran.liara.run"],
		remotePatterns: [new URL("https://avatar.iran.liara.run/**")],
	},
};

export default nextConfig;
