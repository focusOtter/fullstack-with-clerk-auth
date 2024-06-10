import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { APIAuthorizer } from '../functions/APIAuthorizer/resource'

const schema = a.schema({
	ItemsResponse: a.customType({
		id: a.id(),
		title: a.string(),
		description: a.string(),
		owner: a.string(),
		createdAt: a.datetime(),
		updatedAt: a.datetime(),
	}),
	PaginatedMilestonesResponse: a.customType({
		items: a.ref('ItemsResponse').array(),
		nextToken: a.string(),
	}),
	Milestone: a
		.model({
			title: a.string().required(),
			description: a.string().required(),
			owner: a.string(),
		})
		.authorization((allow) => [allow.publicApiKey(), allow.custom('function')])
		.secondaryIndexes((index) => [index('owner')]),
	createMilestoneWithOwner: a
		.mutation()
		.arguments({
			title: a.string().required(),
			description: a.string().required(),
		})
		.returns(a.ref('Milestone'))
		.handler([
			a.handler.custom({
				dataSource: a.ref('Milestone'),
				entry: './createMilestoneByOwner.js',
			}),
		])
		.authorization((allow) => [allow.custom('function')]),
	getMilestoneByOwner: a
		.query()
		.arguments({ id: a.string().required() })
		.returns(a.ref('Milestone'))
		.handler([
			a.handler.custom({
				dataSource: a.ref('Milestone'),
				entry: './getMilestoneByOwner.js',
			}),
		])
		.authorization((allow) => [allow.custom('function')]),
	listMilestonesByOwner: a
		.query()
		.returns(a.ref('PaginatedMilestonesResponse'))
		.handler([
			a.handler.custom({
				dataSource: a.ref('Milestone'),
				entry: './listMilestonesByOwner.js',
			}),
		])
		.authorization((allow) => [allow.custom('function')]),
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
