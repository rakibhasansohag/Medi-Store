import { ProfileContent } from '@/components/modules/profile/ProfileContent';
import { userService } from '@/services/user.service';

export default async function SellerProfilePage() {
	const { data } = await userService.getProfile();

	if (!data) {
		return <div>Failed to load profile</div>;
	}

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>My Profile</h1>
				<p className='text-muted-foreground'>
					Manage your seller account settings
				</p>
			</div>

			<ProfileContent profile={data} />
		</div>
	);
}
