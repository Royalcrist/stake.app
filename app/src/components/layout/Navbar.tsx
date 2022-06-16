import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { HiMenu, HiUserCircle } from 'react-icons/hi';

interface NavbarProps {
	accountId: string;
	onLogout?: () => void;
}

const Navbar = ({ accountId, onLogout }: NavbarProps) => {
	const formattedAccountId =
		accountId.slice(0, 5) + '...' + accountId.slice(-4);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Flex
				padding={4}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Flex direction="row" alignItems="center" gap={2}>
					<Icon boxSize={8} color="font.900" as={HiUserCircle} />
					<Text>{formattedAccountId}</Text>
				</Flex>

				<IconButton
					variant="ghost"
					color="font.900"
					aria-label="Menu"
					size="lg"
					icon={<Icon boxSize={6} as={HiMenu} />}
					onClick={onOpen}
				/>
			</Flex>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton onClick={onClose} size="lg" margin={8} />
					<DrawerBody>
						<Flex
							width="100%"
							height="100%"
							alignItems="center"
							justifyContent="center"
						>
							<Button variant="danger" onClick={onLogout}>
								Logout
							</Button>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Navbar;
