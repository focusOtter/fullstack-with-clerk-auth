import { defineFunction, secret } from '@aws-amplify/backend'

export const APIAuthorizer = defineFunction({
	name: 'clerk-api-authorizer',
	entry: './main.ts',
	runtime: 20,
	environment: {
		CLERK_API_KEY: secret('clerk-secret'),
	},
})
