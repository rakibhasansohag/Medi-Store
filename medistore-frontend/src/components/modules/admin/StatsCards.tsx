import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stat {
	title: string;
	value: number | string;
	description: string;
}

interface StatsCardsProps {
	stats: Stat[];
}

export function StatsCards({ stats }: StatsCardsProps) {
	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			{stats.map((stat) => (
				<Card key={stat.title}>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{stat.value}</div>
						<p className='text-xs text-muted-foreground'>{stat.description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
