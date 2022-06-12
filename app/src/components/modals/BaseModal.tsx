import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface BaseModalProps {
	title: string;
	onClose: () => void;
	body?: ReactNode;
	description?: string;
	footer?: ReactNode;
	isOpen?: boolean;
	isLoading?: boolean;
}

const BaseModal = ({
	isOpen,
	onClose,
	title,
	description,
	body,
	footer,
	isLoading,
	...props
}: BaseModalProps) => {
	return (
		<Modal isOpen={Boolean(isOpen)} onClose={onClose} isCentered {...props}>
			<ModalOverlay />
			<ModalContent maxW="80%">
				<ModalHeader>{title}</ModalHeader>
				{!isLoading && (
					<>
						{body ? body : description && <ModalBody>{description}</ModalBody>}
						{footer ? (
							footer
						) : (
							<ModalFooter>
								<Button variant="ghost" onClick={onClose}>
									Close
								</Button>
							</ModalFooter>
						)}
					</>
				)}
				{isLoading && (
					<Flex alignItems="center" justifyContent="center" paddingBottom={12}>
						<Spinner size="xl" />
					</Flex>
				)}
			</ModalContent>
		</Modal>
	);
};

export default BaseModal;
