import { UserManagementTable } from '@/components/modules/admin/UserManagementTable';
import { userService } from '@/services/user.service';

export default async function UsersManagementPage() {
	const { data } = await userService.getAllUsers();

	const users = data || [];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>User Management</h1>
				<p className='text-muted-foreground'>
					Manage all users and their permissions
				</p>
			</div>

			<UserManagementTable users={users} />
		</div>
	);
}
