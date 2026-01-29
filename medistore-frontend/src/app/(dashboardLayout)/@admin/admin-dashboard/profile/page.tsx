import { ProfileContent } from '@/components/modules/profile/ProfileContent';
import { userService } from '@/services/user.service';

export default async function AdminProfilePage() {
	const { data } = await userService.getProfile();

	if (!data) {
		return <div>Failed to load profile</div>;
	}

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Admin Profile</h1>
				<p className='text-muted-foreground'>
					Manage your administrator account
				</p>
			</div>

			<ProfileContent profile={data} />
		</div>
	);
}
