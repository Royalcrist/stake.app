import { extendTheme, ComponentStyleConfig } from '@chakra-ui/react';

const styles = {
	global: {
		'html, body': {
			color: 'font.500',
			backgroundColor: 'backgrounds.primary.900',
		},
	},
};

const fonts = {
	body: '"Poppins", sans-serif',
	heading: '"Poppins", sans-serif',
};

const colors = {
	primary: {
		50: '#ecedff',
		100: '#d8dcff',
		200: '#c5caff',
		300: '#b1b8ff',
		400: '#9ea7ff',
		500: '#8a95fe',
		600: '#7783fe',
		700: '#6371fe',
		800: '#5060fe',
		900: '#3c4efe',
	},

	secondary: {
		50: '#f9efff',
		100: '#f3dfff',
		200: '#edcfff',
		300: '#e7bfff',
		400: '#e2afff',
		500: '#dc9efe',
		600: '#d68efe',
		700: '#d07efe',
		800: '#ca6efe',
		900: '#c45efe',
	},

	font: {
		50: 'rgba(251, 251, 251, 0.1)',
		100: 'rgba(251, 251, 251, 0.2)',
		200: 'rgba(251, 251, 251, 0.3)',
		300: 'rgba(251, 251, 251, 0.4)',
		400: 'rgba(251, 251, 251, 0.5)',
		500: 'rgba(251, 251, 251, 0.6)',
		600: 'rgba(251, 251, 251, 0.7)',
		700: 'rgba(251, 251, 251, 0.8)',
		800: 'rgba(251, 251, 251, 0.9)',
		900: 'rgba(251, 251, 251, 1)',
	},

	backgrounds: {
		primary: {
			50: '#e8e8e9',
			100: '#d1d1d2',
			200: '#babbbc',
			300: '#a3a4a5',
			400: '#8c8d8f',
			500: '#757678',
			600: '#5e5f62',
			700: '#47494b',
			800: '#303235',
			900: '#191b1e',
		},

		secondary: {
			50: '#e9eaeb',
			100: '#d3d4d6',
			200: '#bebfc2',
			300: '#a8aaae',
			400: '#92959a',
			500: '#7c7f85',
			600: '#666a71',
			700: '#51555d',
			800: '#3b3f48',
			900: '#252a34',
		},
	},

	danger: {
		50: '#ffecec',
		100: '#ffd8d8',
		200: '#ffc5c5',
		300: '#ffb1b1',
		400: '#ff9e9e',
		500: '#fe8a8a',
		600: '#fe7777',
		700: '#fe6363',
		800: '#fe5050',
		900: '#fe3c3c',
	},
};

const Heading: ComponentStyleConfig = {
	baseStyle: {
		color: 'font.900',
	},
};

// Variants and sizes override global values, this is a limitiation of Chakra buttons :|
// I preffer use this instead of !important for global styling
const buttonSizes = ['sm', 'md', 'lg'].reduce(
	(sizes: { [key: string]: any }, size) => {
		sizes[size] = {
			padding: '2em 3em',
		};
		return sizes;
	},
	{},
);

const Button: ComponentStyleConfig = {
	baseStyle: {
		fontWeight: 'medium',
		color: 'font.900',
		borderRadius: '2xl',
	},
	sizes: {
		...buttonSizes,
		xs: {
			padding: '2em 2.5em',
		},
	},
	variants: {
		solid: {
			bg: 'primary.900',
			_hover: {
				bg: 'primary.800',
			},
			_active: {
				bg: 'primary.800',
			},
		},
		outline: {
			borderColor: 'font.50',
			color: 'font.900',
			_hover: {
				bg: 'font.50',
			},
			_active: {
				bg: 'font.50',
			},
		},
		ghost: {
			_hover: {
				bg: 'font.50',
			},
			_active: {
				bg: 'font.50',
			},
		},
		danger: {
			color: 'danger.900',
			_hover: {
				bg: 'font.50',
			},
			_active: {
				bg: 'font.50',
			},
		},
	},
	defaultProps: {
		variant: 'solid',
		size: 'sm',
	},
};

const Modal: ComponentStyleConfig = {
	baseStyle: {
		overlay: {
			bg: 'rgba(0, 0, 0, 0.4)',
		},
		dialog: {
			bg: 'backgrounds.primary.900',
		},
		header: {
			color: 'font.900',
		},
	},
};

const Drawer: ComponentStyleConfig = {
	parts: ['dialog', 'body', 'panels'],
	baseStyle: {
		dialog: {
			bg: 'backgrounds.primary.900',
		},
	},
};
const Spinner: ComponentStyleConfig = {
	baseStyle: {
		color: 'font.900',
	},
};

const theme = extendTheme({
	styles,
	fonts,
	colors,
	components: { Button, Drawer, Heading, Modal, Spinner },
});

export default theme;
