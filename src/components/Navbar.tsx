import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className="navbar bg-primary text-primary-content">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost text-xl">
					Fullstack with Clerk
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link className="hover:bg-secondary" to="/milestones">
							My Milestones
						</Link>
					</li>
					<li>
						<SignedIn>
							<UserButton afterSignOutUrl="/sign-in" />
						</SignedIn>
					</li>
					<li>
						<SignedOut>
							<Link to="/sign-in">Sign In</Link>
						</SignedOut>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar
