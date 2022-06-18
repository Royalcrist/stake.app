import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { HiLogout, HiUserCircle } from 'react-icons/hi';

interface NavbarProps {
	accountId: string;
	onLogout?: () => void;
}

const Navbar = ({ accountId, onLogout }: NavbarProps) => {
	const formattedAccountId =
		accountId.slice(0, 5) + '...' + accountId.slice(-4);

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

				<Button variant="outline" onClick={onLogout} rightIcon={<HiLogout />}>
					Logout
				</Button>
			</Flex>
		</>
	);
};

export default Navbar;
