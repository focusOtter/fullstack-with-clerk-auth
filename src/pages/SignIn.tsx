import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
	return (
		<div className="flex justify-center min-h-full items-center">
			<SignIn path="/sign-in" />
		</div>
	)
}
