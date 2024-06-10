import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
	const { owner } = ctx.identity.resolverContext
	const id = util.autoId()
	const now = util.time.nowISO8601()
	const item = {
		...ctx.args,
		id,
		owner,
		createdAt: now,
		updatedAt: now,
		__typename: 'Milestone',
	}
	const key = { id: util.autoId() }
	return ddb.put({ key, item })
}

export function response(ctx) {
	return ctx.result
}
