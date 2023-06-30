/** @format */

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react(), preact()],
	publicDir: "./public",
	routes: [
		{
			path: "/",
			component: "./src/pages/index.astro",
		},
		{
			path: "/thanks",
			component: "./src/pages/thanks.astro",
		},
	],
});
