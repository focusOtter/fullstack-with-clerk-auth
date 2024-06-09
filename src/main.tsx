import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layouts/root-layout'
import ProtectedLayout from './layouts/protected-layout'

// Import the components
import IndexPage from './pages/HomePage'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import MilestonesPage from './pages/MilestonesPage'

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{ path: '/', element: <IndexPage /> },
			{ path: '/sign-in/*', element: <SignInPage /> },
			{ path: '/sign-up/*', element: <SignUpPage /> },
			{
				element: <ProtectedLayout />,
				path: 'milestones',
				children: [{ path: '/milestones', element: <MilestonesPage /> }],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
