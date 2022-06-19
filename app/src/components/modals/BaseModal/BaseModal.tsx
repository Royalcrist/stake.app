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
import { BaseModalProps } from './types';

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
			<ModalContent
				maxW={{
					base: '80%',
					sm: '40rem',
				}}
			>
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
