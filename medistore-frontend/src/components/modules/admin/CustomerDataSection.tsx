import { userService } from '@/services/user.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, Phone, Mail } from 'lucide-react';

interface CustomerSectionProps {
	customerId: string;
	orderShippingAddress: string;
}

export async function CustomerDataSection({
	customerId,
	orderShippingAddress,
}: CustomerSectionProps) {
	const { data: customer } = await userService.getUserById(customerId);

	return (
		<Card className='shadow-sm'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<User className='h-5 w-5 text-primary' />
					Customer Details
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				{!customer ? (
					<div className='p-4 bg-destructive/10 text-destructive rounded-md text-sm'>
						User profile data unavailable. Displaying order-linked details only.
					</div>
				) : (
					<div className='flex items-center gap-4'>
						<Avatar className='h-14 w-14 border-2 border-primary/10'>
							<AvatarImage src={customer.image} alt={customer.name} />
							<AvatarFallback className='bg-primary text-primary-foreground text-lg'>
								{customer.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className='text-lg font-bold leading-none'>{customer.name}</p>
							<div className='flex items-center gap-1 text-sm text-muted-foreground mt-1'>
								<Mail className='h-3 w-3' /> {customer.email}
							</div>
						</div>
					</div>
				)}

				<div className='grid sm:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<p className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1'>
							<Phone className='h-3 w-3' /> Contact Info
						</p>
						<p className='font-medium text-sm'>
							{customer?.phone || 'No phone provided'}
						</p>
						<p className='text-xs text-muted-foreground font-mono'>
							UID: {customerId}
						</p>
					</div>

					<div className='space-y-2'>
						<p className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1'>
							<MapPin className='h-3 w-3' /> Shipping Address
						</p>
						<p className='font-medium text-sm leading-relaxed'>
							{orderShippingAddress}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
