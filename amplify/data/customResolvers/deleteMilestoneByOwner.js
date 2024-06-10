import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
	// delete a todo by its id if it's the owner
	const { owner } = ctx.identity.resolverContext
	return ddb.remove({
		key: { id: ctx.args.id },
		condition: { owner: { eq: owner } },
	})
}

export function response(ctx) {
	return ctx.result
}
