import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
		setupNodeEvents(on, config) {
			// implement node event listeners here
			// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
			require('@cypress/code-coverage/task')(on, config);
			// include any other plugin code...

			// It's IMPORTANT to return the config object
			// with any changed environment variables
			return config;
		},
	},
	component: {
		specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
		devServer: {
			framework: 'create-react-app',
			bundler: 'webpack',
		},
	},
});
