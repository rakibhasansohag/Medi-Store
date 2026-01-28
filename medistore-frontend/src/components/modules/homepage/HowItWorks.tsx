export function HowItWorks() {
	const steps = [
		{ number: '1', title: 'Browse', description: 'Find your medicine' },
		{ number: '2', title: 'Order', description: 'Add to cart & checkout' },
		{ number: '3', title: 'Receive', description: 'Get it delivered' },
	];

	return (
		<section className='py-16'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold text-center mb-12'>How It Works</h2>
				<div className='grid md:grid-cols-3 gap-8'>
					{steps.map((step) => (
						<div key={step.number} className='text-center'>
							<div className='w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold'>
								{step.number}
							</div>
							<h3 className='font-semibold text-xl mb-2'>{step.title}</h3>
							<p className='text-muted-foreground'>{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
