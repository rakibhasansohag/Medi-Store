'use client';

import { IMedicineWithSeller } from '@/types';
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
import { Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AdminMedicineTableProps {
	medicines: IMedicineWithSeller[];
}

export function AdminMedicineTable({ medicines }: AdminMedicineTableProps) {
	if (medicines.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No medicines found</p>
			</div>
		);
	}

	return (
		<div className='border rounded-lg'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Medicine</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Manufacturer</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Stock</TableHead>
						<TableHead>Seller ID</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{medicines.map((medicine) => (
						<TableRow key={medicine.id}>
							<TableCell>
								<div className='flex items-center gap-3'>
									<div className='relative w-12 h-12 rounded-md overflow-hidden bg-muted'>
										{medicine.imageUrl ? (
											<Image
												src={medicine.imageUrl}
												alt={medicine.name}
												fill
												className='object-cover'
											/>
										) : (
											<div className='w-full h-full flex items-center justify-center text-2xl'>
												💊
											</div>
										)}
									</div>
									<div>
										<p className='font-medium line-clamp-1'>{medicine.name}</p>
										<p className='text-xs text-muted-foreground'>
											ID: {medicine.id.slice(0, 8)}...
										</p>
									</div>
								</div>
							</TableCell>
							<TableCell>
								<Badge variant='secondary'>{medicine.category?.name}</Badge>
							</TableCell>
							<TableCell className='text-sm'>{medicine.manufacturer}</TableCell>
							<TableCell className='font-semibold'>
								${medicine.price.toFixed(2)}
							</TableCell>
							<TableCell>
								<Badge
									variant={medicine.stock > 10 ? 'default' : 'destructive'}
								>
									{medicine.stock} units
								</Badge>
							</TableCell>
							<TableCell className='font-mono text-xs'>
								{medicine.sellerId.slice(0, 8)}...
							</TableCell>
							<TableCell className='text-right'>
								<Button variant='ghost' size='icon' asChild>
									<Link href={`/shop/${medicine.id}`}>
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
