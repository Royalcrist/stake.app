import { Box, Button } from '@chakra-ui/react';
import { Connector } from 'wagmi';
import BaseModal from './BaseModal';

interface LoginModalProps {
	title: string;
	connectors: Connector[];
	onClick: (connector: Connector) => void;
	onClose: () => void;
	isOpen?: boolean;
	isLoading?: boolean;
}

const LoginModal = ({
	title,
	isOpen,
	onClose,
	connectors,
	onClick,
	isLoading,
	...props
}: LoginModalProps) => {
	const buttons = (
		<Box padding={4}>
			{connectors.map(connector => (
				<Button
					key={'Connector-' + connector.name}
					variant="outline"
					onClick={() => onClick(connector)}
					width="100%"
				>
					{connector.name}
				</Button>
			))}
		</Box>
	);

	return (
		<BaseModal
			title={title}
			isOpen={isOpen}
			onClose={onClose}
			body={buttons}
			isLoading={isLoading}
			{...props}
		/>
	);
};

export default LoginModal;
