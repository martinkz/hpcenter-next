// const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		// includePaths: [path.join(__dirname, "styles")],
		sourceMap: true,
	},
	// productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
