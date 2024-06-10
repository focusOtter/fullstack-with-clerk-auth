import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
	const { id, title, description } = ctx.args
	const { owner } = ctx.identity.resolverContext
	const now = util.time.nowISO8601()

	const updateObj = {
		title: ddb.operations.replace(title),
		description: ddb.operations.replace(description),
		updatedAt: ddb.operations.replace(now),
	}

	// update it if owner.
	return ddb.update({
		key: { id },
		update: updateObj,
		condition: { owner: { eq: owner } },
	})
}

export function response(ctx) {
	return ctx.result
}
