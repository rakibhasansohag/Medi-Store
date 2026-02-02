import { AboutHero } from '@/components/modules/about/AboutHero';
import { OurStory } from '@/components/modules/about/OurStory';
import { MissionVision } from '@/components/modules/about/MissionVision';
import { CoreValues } from '@/components/modules/about/CoreValues';
import { Achievements } from '@/components/modules/about/Achievements';
import { OurTeam } from '@/components/modules/about/OurTeam';
import { JoinUs } from '@/components/modules/about/JoinUs';

export const metadata = {
	title: 'About Us - MediStore',
	description: 'Learn about our mission, values, and the team behind MediStore.',
};

export default function AboutPage() {
	return (
		<div className='flex flex-col min-h-screen'>
			<AboutHero />
			<OurStory />
			<Achievements />
			<MissionVision />
			<CoreValues />
			<OurTeam />
			<JoinUs />
		</div>
	);
}
