import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../amplify/data/resource'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const client = generateClient<Schema>()
const CreateMilestonesPage = () => {
	const { jwtToken } = useOutletContext<{ jwtToken: string }>()

	useEffect(() => {
		client.models.Milestone.create(
			{
				title: 'Test Milestone',
				description: 'Test Description',
				imageId: '1',
			},
			{ authToken: jwtToken }
		).then(console.log)
	}, [jwtToken])

	return <div>CreateMilestonesPage</div>
}

export default CreateMilestonesPage
