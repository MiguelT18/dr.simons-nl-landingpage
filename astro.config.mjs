/** @format */

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { BrowserRouter as Router } from "react-router-dom";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react(), preact(), Router],
	publicDir: "./public",
	pages: [
		{
			path: "/",
			component: "./src/pages/index.astro",
		},
		{
			path: "/thanks",
			component: "./src/pages/thanks.astro",
		},
	],
	trailingSlash: "always",
});
