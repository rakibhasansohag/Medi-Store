'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function SidebarThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// Prevent hydration mismatch
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const isDark = theme === 'dark';

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				size='lg'
				onClick={() => setTheme(isDark ? 'light' : 'dark')}
				className='w-full justify-start'
			>
				<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground'>
					{isDark ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
				</div>
				<div className='grid flex-1 text-left text-sm leading-tight'>
					<span className='truncate font-semibold'>
						{isDark ? 'Dark Mode' : 'Light Mode'}
					</span>
					<span className='truncate text-xs text-muted-foreground'>
						Switch to {isDark ? 'light' : 'dark'} theme
					</span>
				</div>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
