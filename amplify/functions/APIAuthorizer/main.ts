import { Handler } from 'aws-lambda'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as crypto from 'crypto'
import { env } from '$amplify/env/clerk-api-authorizer'

const jwkToPem = (jwk: string) => {
	const keyObject = crypto.createPublicKey({
		key: jwk,
		format: 'jwk',
	})

	const pem = keyObject.export({
		type: 'spki',
		format: 'pem',
	})

	return pem
}
//make sure lambda runtime supports `fetch` (v >= 20)
export const handler: Handler = async (event: {
	authorizationToken: string
}) => {
	const token = event.authorizationToken
	const secret = env.CLERK_API_KEY
	const validDomains = ['http://localhost:5173']

	const res = await fetch('https://api.clerk.com/v1/jwks', {
		headers: {
			Authorization: `Bearer ${secret}`,
		},
	})

	const data = await res.json()
	const pem = jwkToPem(data.keys[0])

	let decoded: JwtPayload | null = null
	try {
		decoded = jwt.verify(token, pem) as JwtPayload
	} catch (e) {
		console.log('the error', e)
		return 'Invalid token'
	}

	if (!decoded || !validDomains.includes(decoded.azp))
		return { isAuthorized: false }

	return {
		isAuthorized: decoded.sub ? true : false,
		resolverContext: { owner: decoded.sub },
	}
}
