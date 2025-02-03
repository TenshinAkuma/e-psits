// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: false },

	// global css file for global styling
	css: ["~/assets/css/main.css"],
	app: {
		head: {
			link: [
				{
					// bootstrap stylesheet cdn
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
					integrity:
						"sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
					crossorigin: "anonymous",
				},
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css",
				},
				{
					// google fonts configuration
					rel: "preconnect",
					href: "https://fonts.googleapis.com",
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "anonymous",
				},
				{
					href: "https://fonts.googleapis.com/css2?family=Nunito:ital@0;1&display=swap",
					rel: "stylesheet",
				},
			],
			script: [
				{
					// bootstrap script cdn
					src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
					integrity:
						"sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",
					crossorigin: "anonymous",
				},
			],
		},
	},

	modules: ["@nuxt/icon", "@nuxtjs/supabase"],

	// disable supabase feature that automatically redirects to /login
	supabase: {
		url: process.env.NUXT_PUBLIC_SUPABASE_URL,
		key: process.env.NUXT_SUPABASE_KEY,
		redirect: false,
	},

	runtimeConfig: {
		public: {
			supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
		},
		supabaseKey: process.env.NUXT_SUPABASE_KEY,
	},

	imports: {
		dirs: ["./types", "composables/**"],
	},
});
