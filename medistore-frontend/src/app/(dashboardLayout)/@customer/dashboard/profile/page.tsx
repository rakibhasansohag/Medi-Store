import { ProfileContent } from '@/components/modules/profile/ProfileContent';
import { SellerRequestTab } from '@/components/modules/profile/SellerRequestTab';
import { userService } from '@/services/user.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function CustomerProfilePage() {
	const { data } = await userService.getProfile();

	if (!data) {
		return <div>Failed to load profile</div>;
	}

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>My Profile</h1>
				<p className='text-muted-foreground'>
					Manage your account settings and preferences
				</p>
			</div>

			<Tabs defaultValue='profile' className='space-y-6'>
				<TabsList>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					<TabsTrigger value='seller'>Become a Seller</TabsTrigger>
				</TabsList>

				<TabsContent value='profile'>
					<ProfileContent profile={data} />
				</TabsContent>

				<TabsContent value='seller'>
					<SellerRequestTab profile={data} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
