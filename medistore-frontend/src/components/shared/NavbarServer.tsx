import { userService } from '@/services/user.service';
import { Navbar } from '../layout/Navbar';

export async function NavbarServer() {
	const { data } = await userService.getSession();
	const user = data?.user || null;

	return <Navbar user={user} />;
}
