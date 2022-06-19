import { Connector } from 'wagmi';

export interface LoginModalProps {
	title: string;
	connectors: Connector[];
	onClick: (connector: Connector) => void;
	onClose: () => void;
	isOpen?: boolean;
	isLoading?: boolean;
}
