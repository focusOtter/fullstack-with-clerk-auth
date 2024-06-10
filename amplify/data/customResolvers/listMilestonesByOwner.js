import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
	const { owner } = ctx.identity.resolverContext
	return ddb.query({
		query: { owner: { eq: owner } },
		index: 'milestonesByOwner',
		limit: ctx.args.limit || 25,
		nextToken: ctx.args.nextToken,
	})
}

export function response(ctx) {
	const { items = [], nextToken } = ctx.result

	return { items, nextToken }
}
