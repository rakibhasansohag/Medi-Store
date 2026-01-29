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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Check, X, Eye } from 'lucide-react';
import {
	approveSellerRequest,
	rejectSellerRequest,
} from '@/actions/user.action';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';

interface SellerRequestsTableProps {
	requests: IUserProfile[];
}

export function SellerRequestsTable({ requests }: SellerRequestsTableProps) {
	const [processingId, setProcessingId] = useState<string | null>(null);
	const [selectedRequest, setSelectedRequest] = useState<IUserProfile | null>(
		null,
	);
	const [rejectDialog, setRejectDialog] = useState({
		open: false,
		userId: '',
		userName: '',
	});

	const handleApprove = async (userId: string) => {
		setProcessingId(userId);
		const loadingToast = toast.loading('Approving request...');

		const result = await approveSellerRequest(userId);

		if (result.success) {
			toast.success('Seller request approved', { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setProcessingId(null);
	};

	const handleReject = async () => {
		setProcessingId(rejectDialog.userId);
		setRejectDialog({ open: false, userId: '', userName: '' });
		const loadingToast = toast.loading('Rejecting request...');

		const result = await rejectSellerRequest(rejectDialog.userId);

		if (result.success) {
			toast.success('Seller request rejected', { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setProcessingId(null);
	};

	if (requests.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No pending seller requests</p>
			</div>
		);
	}

	return (
		<>
			<div className='border rounded-lg'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Applicant</TableHead>
							<TableHead>Business Name</TableHead>
							<TableHead>Contact</TableHead>
							<TableHead>Applied On</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{requests.map((request) => (
							<TableRow key={request.id}>
								<TableCell>
									<div className='flex items-center gap-3'>
										<Avatar>
											<AvatarImage src={request.image} alt={request.name} />
											<AvatarFallback>
												{request.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className='font-medium'>{request.name}</p>
											<p className='text-xs text-muted-foreground'>
												{request.email}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<p className='font-medium'>{request.businessName}</p>
									<p className='text-xs text-muted-foreground line-clamp-1'>
										{request.businessAddress}
									</p>
								</TableCell>
								<TableCell className='text-sm'>{request.phone}</TableCell>
								<TableCell className='text-sm'>
									{new Date(request.createdAt).toLocaleDateString()}
								</TableCell>
								<TableCell className='text-right'>
									<div className='flex justify-end gap-2'>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant='ghost'
													size='icon'
													onClick={() => setSelectedRequest(request)}
												>
													<Eye className='h-4 w-4' />
												</Button>
											</DialogTrigger>
											<DialogContent className='max-w-2xl'>
												<DialogHeader>
													<DialogTitle>Seller Request Details</DialogTitle>
													<DialogDescription>
														Review application details
													</DialogDescription>
												</DialogHeader>
												{selectedRequest && (
													<div className='space-y-4'>
														<div className='flex items-center gap-4'>
															<Avatar className='w-16 h-16'>
																<AvatarImage
																	src={selectedRequest.image}
																	alt={selectedRequest.name}
																/>
																<AvatarFallback className='text-2xl'>
																	{selectedRequest.name.charAt(0).toUpperCase()}
																</AvatarFallback>
															</Avatar>
															<div>
																<h3 className='font-bold text-lg'>
																	{selectedRequest.name}
																</h3>
																<p className='text-sm text-muted-foreground'>
																	{selectedRequest.email}
																</p>
															</div>
														</div>
														<div className='grid grid-cols-2 gap-4'>
															<div>
																<p className='text-sm text-muted-foreground mb-1'>
																	Business Name
																</p>
																<p className='font-medium'>
																	{selectedRequest.businessName}
																</p>
															</div>
															<div>
																<p className='text-sm text-muted-foreground mb-1'>
																	Phone
																</p>
																<p className='font-medium'>
																	{selectedRequest.phone}
																</p>
															</div>
														</div>
														<div>
															<p className='text-sm text-muted-foreground mb-1'>
																Business Address
															</p>
															<p className='font-medium'>
																{selectedRequest.businessAddress}
															</p>
														</div>
														{selectedRequest.bio && (
															<div>
																<p className='text-sm text-muted-foreground mb-1'>
																	Bio
																</p>
																<p className='text-sm'>{selectedRequest.bio}</p>
															</div>
														)}
													</div>
												)}
											</DialogContent>
										</Dialog>

										<Button
											variant='ghost'
											size='icon'
											onClick={() => handleApprove(request.id)}
											disabled={processingId === request.id}
											className='text-green-600 hover:text-green-700'
										>
											<Check className='h-4 w-4' />
										</Button>

										<Button
											variant='ghost'
											size='icon'
											onClick={() =>
												setRejectDialog({
													open: true,
													userId: request.id,
													userName: request.name,
												})
											}
											disabled={processingId === request.id}
											className='text-red-600 hover:text-red-700'
										>
											<X className='h-4 w-4' />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<DeleteConfirmDialog
				open={rejectDialog.open}
				onOpenChange={(open) =>
					setRejectDialog({ open, userId: '', userName: '' })
				}
				onConfirm={handleReject}
				title='Reject Seller Request?'
				description='Are you sure you want to reject this seller application? This action cannot be undone.'
				itemName={rejectDialog.userName}
			/>
		</>
	);
}
