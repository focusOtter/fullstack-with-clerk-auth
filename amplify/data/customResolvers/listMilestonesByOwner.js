import * as ddb from '@aws-appsync/utils/dynamodb'
import { util } from '@aws-appsync/utils'

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

	const { owner: clerkUser } = ctx.identity.resolverContext
	const allOwner = items.every((item) => item.owner === clerkUser)
	if (!allOwner) util.unauthorized()
	return { items, nextToken }
}
