import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

interface ImageSectionProps {
	title: string;
	description: string;
	image: string;
	buttonText?: string;
	imageAlt?: string;
	footer?: React.ReactNode;
	onClick?: () => void;
}

const ImageSection = ({
	description,
	image,
	title,
	buttonText,
	footer,
	imageAlt,
	onClick,
}: ImageSectionProps) => {
	return (
		<Flex direction="column" alignItems="center" gap={4} padding={4}>
			<Image
				src={image}
				alt={imageAlt}
				maxH={{
					base: '12em',
				}}
			/>
			<Flex direction="column" alignItems="center" paddingBottom={4}>
				<Heading size="lg">{title}</Heading>
				<Text>{description}</Text>
			</Flex>
			{footer ? (
				footer
			) : (
				<Button size="sm" onClick={onClick}>
					{buttonText}
				</Button>
			)}
		</Flex>
	);
};

export default ImageSection;
