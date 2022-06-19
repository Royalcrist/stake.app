import { Button, Flex, Heading } from '@chakra-ui/react';

interface TokenItemProps {
	tokenId: number;
	isLoading?: boolean;
	onClick?: () => void;
}

const TokenItem = ({ tokenId, onClick, isLoading }: TokenItemProps) => {
	return (
		<Flex
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			padding={4}
			paddingLeft={8}
			borderRadius="3xl"
			bg="backgrounds.primary.900"
			width="100%"
		>
			<Heading size="sm">Token {tokenId}</Heading>
			<Button
				variant="outline"
				size="xs"
				onClick={onClick}
				isLoading={isLoading}
			>
				Stake
			</Button>
		</Flex>
	);
};

export default TokenItem;
