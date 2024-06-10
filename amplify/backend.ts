import { defineBackend } from '@aws-amplify/backend'
import { data } from './data/resource'
import { APIAuthorizer } from './functions/APIAuthorizer/resource'
APIAuthorizer
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
	APIAuthorizer,
	data,
})
