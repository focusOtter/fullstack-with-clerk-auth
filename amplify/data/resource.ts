import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { APIAuthorizer } from '../functions/APIAuthorizer/resource'

const schema = a.schema({
	Milestone: a
		.model({
			title: a.string().required(),
			description: a.string(),
			owner: a.string(),
		})
		.authorization((allow) => [allow.publicApiKey(), allow.custom('function')])
		.secondaryIndexes((index) => [index('owner')]),
	ItemsResponse: a.customType({
		id: a.id().required(),
		title: a.string().required(),
		description: a.string(),
		owner: a.string().required(),
		createdAt: a.datetime().required(),
		updatedAt: a.datetime().required(),
	}),
	PaginatedMilestonesResponse: a.customType({
		items: a.ref('ItemsResponse').array(),
		nextToken: a.string(),
	}),
	createMilestoneWithOwner: a
		.mutation()
		.arguments({
			title: a.string().required(),
			description: a.string(),
		})
		.returns(a.ref('Milestone'))
		.handler([
			a.handler.custom({
				// reuse the table create by Amplify.
				// If table created with CDK, a.ref() will contain the logical ID of the construct
				dataSource: a.ref('Milestone'),
				entry: './customResolvers/createMilestoneByOwner.js',
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
				entry: './customResolvers/getMilestoneByOwner.js',
			}),
		])
		.authorization((allow) => [allow.custom('function')]),
	listMilestonesByOwner: a
		.query()
		.arguments({ nextToken: a.string(), limit: a.integer() })
		.returns(a.ref('PaginatedMilestonesResponse'))
		.handler([
			a.handler.custom({
				dataSource: a.ref('Milestone'),
				entry: './customResolvers/listMilestonesByOwner.js',
			}),
		])
		.authorization((allow) => [allow.custom('function')]),
	deleteMilestoneByOwner: a
		.mutation()
		.arguments({ id: a.string().required() })
		.returns(a.ref('Milestone'))
		.handler([
			a.handler.custom({
				dataSource: a.ref('Milestone'),
				entry: './customResolvers/deleteMilestoneByOwner.js',
			}),
		])
		.authorization((allow) => [allow.custom('function')]),
	updateMilestoneByOwner: a
		.mutation()
		.arguments({
			id: a.string().required(),
			title: a.string(),
			description: a.string(),
		})
		.returns(a.ref('Milestone'))
		.handler([
			a.handler.custom({
				dataSource: a.ref('Milestone'),
				entry: './customResolvers/updateMilestoneByOwner.js',
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
