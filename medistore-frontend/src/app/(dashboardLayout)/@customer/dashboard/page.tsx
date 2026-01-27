export default function CustomerDashboardPage() {
	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>My Dashboard</h1>
				<p className='text-muted-foreground'>
					Welcome to your customer dashboard
				</p>
			</div>

			<div className='grid gap-4 md:grid-cols-3'>
				<div className='border rounded-lg p-6'>
					<h3 className='font-semibold mb-2'>My Orders</h3>
					<p className='text-2xl font-bold'>0</p>
					<p className='text-sm text-muted-foreground'>Total orders</p>
				</div>
				<div className='border rounded-lg p-6'>
					<h3 className='font-semibold mb-2'>Cart Items</h3>
					<p className='text-2xl font-bold'>0</p>
					<p className='text-sm text-muted-foreground'>Items in cart</p>
				</div>
				<div className='border rounded-lg p-6'>
					<h3 className='font-semibold mb-2'>Total Spent</h3>
					<p className='text-2xl font-bold'>$0.00</p>
					<p className='text-sm text-muted-foreground'>All time</p>
				</div>
			</div>
		</div>
	);
}
