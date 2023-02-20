import { defineConfig } from 'cypress';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import { fetchCoupleBySlugDB } from './src/db/couples';
import fetchItemsDB from './src/db/items';
import { fetchTransactionDB } from './src/db/transactions';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
		defaultCommandTimeout: 20000,
		setupNodeEvents(on, config) {
			// implement node event listeners here
			// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
			require('@cypress/code-coverage/task')(on, config);
			// include any other plugin code...

			// eslint-disable-next-line no-param-reassign
			config.env = { ...config.env, ...dotenv.config() };
			on('task', {
				async fetchItemsDB(coupleSlug: string) {
					// TODO: rename this to clarify we expect a slug
					return fetchCoupleBySlugDB(coupleSlug).then(couple => {
						if (couple) {
							return fetchItemsDB(couple.id);
						}
						throw new Error('Invalid coupleSlug');
					});
				},

				async fetchCoupleBySlugDB(coupleSlug: string) {
					return fetchCoupleBySlugDB(coupleSlug);
				},

				async fetchTransactionDB({
					transactionId,
					coupleId,
				}: {
					transactionId: string;
					coupleId: string;
				}) {
					return fetchTransactionDB(transactionId, coupleId);
				},
			});

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
