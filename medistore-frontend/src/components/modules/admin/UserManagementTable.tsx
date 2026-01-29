'use client';

import { useState } from 'react';
import { IUserProfile } from '@/types';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Eye, Shield, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
import { updateUserStatus } from '@/actions/user.action';
import { toast } from 'sonner';

interface UserManagementTableProps {
	users: IUserProfile[];
}

export function UserManagementTable({ users }: UserManagementTableProps) {
	const [updatingUser, setUpdatingUser] = useState<string | null>(null);

	const handleStatusChange = async (userId: string, newStatus: string) => {
		setUpdatingUser(userId);
		const loadingToast = toast.loading('Updating user status...');

		const result = await updateUserStatus(userId, newStatus);

		if (result.success) {
			toast.success('User status updated', { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setUpdatingUser(null);
	};

	const getRoleIcon = (role: string) => {
		switch (role) {
			case 'ADMIN':
				return <ShieldCheck className='h-4 w-4 text-purple-500' />;
			case 'SELLER':
				return <Shield className='h-4 w-4 text-blue-500' />;
			default:
				return <User className='h-4 w-4 text-gray-500' />;
		}
	};

	const getRoleBadgeColor = (role: string) => {
		switch (role) {
			case 'ADMIN':
				return 'bg-purple-500';
			case 'SELLER':
				return 'bg-blue-500';
			default:
				return 'bg-gray-500';
		}
	};

	if (users.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No users found</p>
			</div>
		);
	}

	return (
		<div className='border rounded-lg'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>User</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Joined</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<div className='flex items-center gap-3'>
									<Avatar>
										<AvatarImage src={user.image} alt={user.name} />
										<AvatarFallback>
											{user.name.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className='font-medium'>{user.name}</p>
										<p className='text-xs text-muted-foreground'>
											ID: {user.id.slice(0, 8)}...
										</p>
									</div>
								</div>
							</TableCell>
							<TableCell>
								<div className='flex items-center gap-2'>
									<span className='text-sm'>{user.email}</span>
									{user.emailVerified && (
										<Badge variant='outline' className='text-xs'>
											✓ Verified
										</Badge>
									)}
								</div>
							</TableCell>
							<TableCell className='text-sm'>{user.phone || 'N/A'}</TableCell>
							<TableCell>
								<Badge className={getRoleBadgeColor(user.role)}>
									<span className='mr-1'>{getRoleIcon(user.role)}</span>
									{user.role}
								</Badge>
							</TableCell>
							<TableCell>
								<Select
									value={user.status}
									onValueChange={(value) => handleStatusChange(user.id, value)}
									disabled={updatingUser === user.id}
								>
									<SelectTrigger className='w-30'>
										<SelectValue>
											<Badge
												variant={
													user.status === 'ACTIVE' ? 'default' : 'destructive'
												}
											>
												{user.status}
											</Badge>
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='ACTIVE'>
											<Badge variant='default'>ACTIVE</Badge>
										</SelectItem>
										<SelectItem value='BANNED'>
											<Badge variant='destructive'>BANNED</Badge>
										</SelectItem>
									</SelectContent>
								</Select>
							</TableCell>
							<TableCell className='text-sm'>
								{new Date(user.createdAt).toLocaleDateString()}
							</TableCell>
							<TableCell className='text-right'>
								<Button variant='ghost' size='icon' asChild>
									<Link href={`/admin-dashboard/users/${user.id}`}>
										<Eye className='h-4 w-4' />
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
