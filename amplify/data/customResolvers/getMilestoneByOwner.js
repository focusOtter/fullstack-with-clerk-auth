import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
	// get a todo by its id (API protects this so only auth users can call it)
	return ddb.get({ key: { id: ctx.args.id } })
}

export function response(ctx) {
	//if the owner field isn't the same as the identity, the throw
	const { owner: clerkUser } = ctx.identity.resolverContext
	const ddbOwner = ctx.result.owner
	if (ddbOwner !== clerkUser) {
		util.unauthorized()
	}

	return ctx.result
}
