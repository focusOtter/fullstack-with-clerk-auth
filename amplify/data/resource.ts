import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { APIAuthorizer } from '../functions/APIAuthorizer/resource'

const schema = a.schema({
	Milestone: a
		.model({
			title: a.string().required(),
			description: a.string().required(),
			imageId: a.string(),
		})
		.authorization((allow) => [allow.publicApiKey()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
	name: 'fullstack-with-clerk',
	schema,
	authorizationModes: {
		defaultAuthorizationMode: 'lambda',
		lambdaAuthorizationMode: {
			function: APIAuthorizer,
		},
		apiKeyAuthorizationMode: {
			description: 'just used in development',
			expiresInDays: 7,
		},
	},
})
