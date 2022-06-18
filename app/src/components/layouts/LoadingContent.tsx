import { Flex, Spinner } from '@chakra-ui/react';

const LoadingContent = ({}) => {
	return (
		<Flex
			direction="column"
			alignItems="center"
			justifyContent="center"
			height="100%"
		>
			<Spinner size="xl" />
		</Flex>
	);
};

export default LoadingContent;
