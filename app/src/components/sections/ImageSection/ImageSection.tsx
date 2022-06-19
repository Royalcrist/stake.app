import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { ImageSectionProps } from './types';

const ImageSection = ({
	description,
	image,
	title,
	footer,
	imageAlt,
}: ImageSectionProps) => {
	return (
		<Flex direction="column" alignItems="center" gap={4} padding={4}>
			<Image
				src={image}
				alt={imageAlt}
				maxH={{
					base: '12em',
					md: '16em',
					lg: '20em',
				}}
			/>
			<Flex direction="column" alignItems="center" paddingBottom={4}>
				<Heading size="lg">{title}</Heading>
				<Text>{description}</Text>
			</Flex>
			{footer}
		</Flex>
	);
};

export default ImageSection;
