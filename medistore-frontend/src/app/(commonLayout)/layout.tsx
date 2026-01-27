import React from 'react';

function CommonLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<h1>This Is Common Layout</h1>
			{children}
		</div>
	);
}

export default CommonLayout;
