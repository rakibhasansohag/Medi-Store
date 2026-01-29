import { IUserProfile } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Calendar, Shield } from 'lucide-react';

interface UserDetailViewProps {
	user: IUserProfile;
}

export function UserDetailView({ user }: UserDetailViewProps) {
	return (
		<div className='grid lg:grid-cols-[350px_1fr] gap-6'>
			{/* User Summary Card */}
			<Card>
				<CardContent className='p-6 space-y-6'>
					<div className='flex flex-col items-center text-center space-y-4'>
						<Avatar className='w-32 h-32'>
							<AvatarImage src={user.image} alt={user.name} />
							<AvatarFallback className='text-3xl'>
								{user.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className='font-bold text-2xl'>{user.name}</h3>
							<p className='text-sm text-muted-foreground mt-1'>{user.email}</p>
						</div>

						<div className='flex gap-2'>
							<Badge
								variant={user.status === 'ACTIVE' ? 'default' : 'destructive'}
							>
								{user.status}
							</Badge>
							<Badge variant='outline'>{user.role}</Badge>
							{user.emailVerified && (
								<Badge variant='secondary'>✓ Verified</Badge>
							)}
						</div>
					</div>

					<Separator />

					<div className='space-y-3'>
						<div className='flex items-center gap-3 text-sm'>
							<Mail className='h-4 w-4 text-muted-foreground' />
							<div>
								<p className='text-muted-foreground'>Email</p>
								<p className='font-medium'>{user.email}</p>
							</div>
						</div>

						<div className='flex items-center gap-3 text-sm'>
							<Phone className='h-4 w-4 text-muted-foreground' />
							<div>
								<p className='text-muted-foreground'>Phone</p>
								<p className='font-medium'>{user.phone || 'Not provided'}</p>
							</div>
						</div>

						<div className='flex items-center gap-3 text-sm'>
							<Calendar className='h-4 w-4 text-muted-foreground' />
							<div>
								<p className='text-muted-foreground'>Joined</p>
								<p className='font-medium'>
									{new Date(user.createdAt).toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className='flex items-center gap-3 text-sm'>
							<Shield className='h-4 w-4 text-muted-foreground' />
							<div>
								<p className='text-muted-foreground'>User ID</p>
								<p className='font-medium font-mono text-xs'>{user.id}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Detailed Information */}
			<div className='space-y-6'>
				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<p className='text-sm text-muted-foreground mb-1'>Full Name</p>
							<p className='font-medium'>{user.name}</p>
						</div>
						<Separator />
						<div>
							<p className='text-sm text-muted-foreground mb-1'>
								Email Address
							</p>
							<p className='font-medium'>{user.email}</p>
						</div>
						<Separator />
						<div>
							<p className='text-sm text-muted-foreground mb-1'>Phone Number</p>
							<p className='font-medium'>{user.phone || 'Not provided'}</p>
						</div>
						<Separator />
						<div>
							<p className='text-sm text-muted-foreground mb-1'>Account Role</p>
							<Badge>{user.role}</Badge>
						</div>
						<Separator />
						<div>
							<p className='text-sm text-muted-foreground mb-1'>
								Account Status
							</p>
							<Badge
								variant={user.status === 'ACTIVE' ? 'default' : 'destructive'}
							>
								{user.status}
							</Badge>
						</div>
					</CardContent>
				</Card>

				{user.bio && (
					<Card>
						<CardHeader>
							<CardTitle>Bio</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-sm'>{user.bio}</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
