import { UserDetailView } from '@/components/modules/admin/UserDetailView';
import { userService } from '@/services/user.service';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface UserDetailPageProps {
	params: Promise<{ userId: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
	const { userId } = await params;

	const { data, success } = await userService.getUserById(userId);

	if (!success || !data) {
		notFound();
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-4'>
				<Button variant='ghost' size='icon' asChild>
					<Link href='/admin-dashboard/users'>
						<ArrowLeft className='h-5 w-5' />
					</Link>
				</Button>
				<div>
					<h1 className='text-3xl font-bold'>User Details</h1>
					<p className='text-muted-foreground'>
						View detailed user information
					</p>
				</div>
			</div>

			<UserDetailView user={data} />
		</div>
	);
}
