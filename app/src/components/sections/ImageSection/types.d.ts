import { ReactNode } from 'react';

export interface ImageSectionProps {
	title: string;
	description: string;
	image: string;
	imageAlt?: string;
	footer?: ReactNode;
}
