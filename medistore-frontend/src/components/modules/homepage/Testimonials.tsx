export function Testimonials() {
	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold text-center mb-12'>
					What Our Customers Say
				</h2>
				<div className='grid md:grid-cols-3 gap-6'>
					{[1, 2, 3].map((i) => (
						<div key={i} className='bg-background p-6 rounded-lg'>
							<p className='text-muted-foreground mb-4'>
								&quot;Fast delivery and authentic products. Highly
								recommended!&quot;
							</p>
							<p className='font-semibold'>- Customer {i}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
