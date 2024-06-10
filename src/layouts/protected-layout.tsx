import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
	const { userId, isLoaded, getToken } = useAuth()
	const navigate = useNavigate()
	const [userToken, setUserToken] = useState<string | null>()

	console.log('test', userId)

	useEffect(() => {
		if (isLoaded && !userId) {
			navigate('/sign-in')
		}
	}, [isLoaded, navigate, userId])

	useEffect(() => {
		if (isLoaded && userId) {
			getToken().then(setUserToken)
		}
	}, [getToken, userId, isLoaded])

	if (!isLoaded) return 'Loading...'

	return <Outlet context={{ jwtToken: userToken }} />
}
