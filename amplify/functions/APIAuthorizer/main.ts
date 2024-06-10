import { Handler } from 'aws-lambda'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as crypto from 'crypto'

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
export const handler: Handler = async (event: { authorization: string }) => {
	const token = event.authorization
	// const secret = 'clerk secret. Define me later'
	const validDomains = ['http://localhost:3000']

	//make sure lambda runtime supports `fetch` (v >= 20)

	const res = await fetch('https://api.clerk.com/v1/jwks', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await res.json()
	console.log('hi im the data', data)
	console.log('hi im the data first key', data[0])
	const pem = jwkToPem(data.keys[0])

	let decoded: JwtPayload | null = null
	try {
		decoded = jwt.verify(token, pem) as JwtPayload
	} catch (e) {
		return 'Invalid token'
	}

	if (!decoded || !validDomains.includes(decoded.azp))
		return { isAuthorized: false }

	return {
		isAuthorized: decoded.sub ? true : false,
		resolverContext: { owner: decoded.sub },
	}
}
