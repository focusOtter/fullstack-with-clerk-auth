import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
	return (
		<div className="flex justify-center min-h-full items-center">
			<SignUp path="/sign-up" />
		</div>
	)
}
