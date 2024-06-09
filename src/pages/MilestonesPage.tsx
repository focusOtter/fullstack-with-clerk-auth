import { Protect } from '@clerk/clerk-react'

const MilestonesPage = () => {
	return (
		<div className="flex justify-center">
			<Protect>
				<div className="flex-1">Milestones page</div>
			</Protect>
		</div>
	)
}

export default MilestonesPage
