import { ReactNode } from 'react';

export interface TokensListProps {
	children: ReactNode[];
	onMint?: () => void;
	isMinting?: boolean;
}
