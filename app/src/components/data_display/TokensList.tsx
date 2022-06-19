import { Box, Button, Flex } from '@chakra-ui/react';

interface TokensListProps {
	children: React.ReactNode[];
	onMint?: () => void;
	isMinting?: boolean;
}

const TokensList = ({ children, onMint, isMinting }: TokensListProps) => {
	return (
		<Flex
			direction="column"
			align="center"
			gap={10}
			paddingTop={12}
			paddingX={4}
			paddingBottom={16}
			width="100%"
			minHeight={{ base: '100%', lg: 'auto' }}
			backgroundColor="backgrounds.secondary.900"
			borderRadius={40}
			position="relative"
		>
			<Box
				backgroundColor="backgrounds.secondary.900"
				boxSize={20}
				borderRadius={400}
				position="absolute"
				top={-4}
			/>
			<Box
				backgroundColor="font.100"
				boxSize={2}
				position="absolute"
				borderRadius={400}
				top={-2}
			/>
			<Button
				variant="outline"
				width="100%"
				onClick={onMint}
				isLoading={isMinting}
			>
				Buy NFT
			</Button>
			{children.length > 0 && (
				<>
					<Flex
						direction="row"
						alignItems="center"
						width="100%"
						position="relative"
					>
						<Box
							backgroundColor="font.50"
							width="100%"
							height={0.25}
							borderRadius={10}
						/>
					</Flex>

					<Flex direction="column" gap={4} width="100%">
						{children}
					</Flex>
				</>
			)}
		</Flex>
	);
};

export default TokensList;
