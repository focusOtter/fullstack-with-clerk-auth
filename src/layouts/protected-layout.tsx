import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
	const { userId, isLoaded, getToken } = useAuth()
	const navigate = useNavigate()
	const [userToken, setUserToken] = useState<string | null>()

	useEffect(() => {
		if (isLoaded && !userId) {
			navigate('/sign-in')
		}

		if (isLoaded && userId) {
			getToken().then(setUserToken)
		}
	}, [isLoaded, navigate, userId, getToken])

	if (!isLoaded) return 'Loading...'

	return <Outlet context={{ jwtToken: userToken }} />
}
