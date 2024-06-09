import { Link } from 'react-router-dom'

const Hero = () => {
	return (
		<div className="hero min-h-full bg-base-200">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Hello there</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
					<Link to="/milestones" className="btn btn-accent">
						Get Started
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Hero
