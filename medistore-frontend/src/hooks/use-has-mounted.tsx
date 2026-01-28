import { useSyncExternalStore } from 'react';

// This is a stable subscription that does nothing
const emptySubscribe = () => () => {};

export function useHasMounted(): boolean {
	return useSyncExternalStore<boolean>(
		emptySubscribe,
		() => true, // Snapshot on the client
		() => false, // Snapshot on the server
	);
}
