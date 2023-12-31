import {styled} from '@mui/system';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';

const Yellow = styled(({className, ...props}: TooltipProps) => (
	<Tooltip
		{...props}
		classes={{popper: className}}
	/>
))(({theme}) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.secondary.main,
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.secondary.main,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
		fontWeight: 'bold',
	},
}));

const Blue = styled(({className, ...props}: TooltipProps) => (
	<Tooltip
		{...props}
		// arrow
		classes={{popper: className}}
	/>
))(({theme}) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.primary.main,
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.primary.main,
		fontWeight: 'bold',
	},
}));

const White = styled(({className, ...props}: TooltipProps) => (
	<Tooltip
		{...props}
		// arrow
		classes={{popper: className}}
	/>
))(({theme}) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.white.main,
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.white.main,
		color: theme.palette.gray[900],
		fontWeight: 'bold',
	},
}));

const Black = styled(({className, ...props}: TooltipProps) => (
	<Tooltip
		{...props}
		// arrow
		classes={{popper: className}}
	/>
))(({theme}) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.gray[900],
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.gray[900],
		color: theme.palette.secondary.main,
		fontWeight: 'bold',
	},
}));

export const YellowTooltip = ({children, ...props}: any) => {
	return (
		<Yellow
			enterDelay={1000}
			{...props}>
			{children}
		</Yellow>
	);
};
export const BlueTooltip = ({children, ...props}: any) => {
	return (
		<Blue
			enterDelay={1000}
			{...props}>
			{children}
		</Blue>
	);
};

export const WhiteTooltip = ({children, ...props}: any) => {
	return (
		<White
			enterDelay={1000}
			{...props}>
			{children}
		</White>
	);
};

export const BlackTooltip = ({children, ...props}: any) => {
	return (
		<Black
			enterDelay={1000}
			{...props}>
			{children}
		</Black>
	);
};
