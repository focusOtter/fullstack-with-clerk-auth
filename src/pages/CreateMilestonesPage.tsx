import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../amplify/data/resource'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const client = generateClient<Schema>()
const CreateMilestonesPage = () => {
	const { jwtToken } = useOutletContext<{ jwtToken: string }>()

	useEffect(() => {
		// client.models.Milestone.create(
		// 	{
		// 		title: 'Test Milestone',
		// 		description: 'Test Description',
		// 	},
		// 	{ authToken: jwtToken }
		// ).then(console.log)
		// client.mutations
		// 	.createMilestoneWithOwner(
		// 		{
		// 			title: 'Test Milestone',
		// 			description: 'Test Description',
		// 		},
		// 		{ authToken: jwtToken }
		// 	)
		// 	.then(console.log)
		// client.queries
		// 	.getMilestoneByOwner(
		// 		{ id: 'd0fa4901-4a58-43ec-a89c-6227233a0dd7' },
		// 		{ authToken: jwtToken }
		// 	)
		// 	.then(console.log)

		// client.models.Milestone.listMilestoneByOwner(
		// 	{
		// 		owner: 'user_2hf1aUJ60TNeaXDmyu6WaH4G6k2',
		// 	},
		// 	{ authToken: jwtToken }
		// ).then(console.log)

		client.queries
			.listMilestonesByOwner({ limit: 1 }, { authToken: jwtToken })
			.then(console.log)
	}, [jwtToken])

	return <div>CreateMilestonesPage</div>
}

export default CreateMilestonesPage
