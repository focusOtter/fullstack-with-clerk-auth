import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Amplify } from 'aws-amplify'
import awsconfig from '../../amplify_outputs.json'
Amplify.configure(awsconfig)

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key')
}

export default function RootLayout() {
	const navigate = useNavigate()

	return (
		<ClerkProvider
			routerPush={(to) => navigate(to)}
			routerReplace={(to) => navigate(to, { replace: true })}
			publishableKey={PUBLISHABLE_KEY}
		>
			<div className="flex justify-center h-screen flex-col">
				<Navbar />
				<main className="flex-1">
					<Outlet />
				</main>
				<Footer />
			</div>
		</ClerkProvider>
	)
}
