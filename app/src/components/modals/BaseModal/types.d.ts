import { ReactNode } from 'react';

export interface BaseModalProps {
	title: string;
	onClose: () => void;
	body?: ReactNode;
	description?: string;
	footer?: ReactNode;
	isOpen?: boolean;
	isLoading?: boolean;
}
