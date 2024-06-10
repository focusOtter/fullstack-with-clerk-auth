import { defineFunction } from '@aws-amplify/backend'

export const APIAuthorizer = defineFunction({
	name: 'clerk-api-authorizer',
	entry: './main.ts',
	runtime: 20,
})
