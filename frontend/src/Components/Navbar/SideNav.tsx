// @ts-ignore
import React from 'react';
import {Avatar, Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {CSSObject, Menu, MenuItem, MenuItemStylesParams, Sidebar, menuClasses} from 'react-pro-sidebar';
// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import {Link, useLocation} from 'react-router-dom';
import {NavbarStore} from '../../utils/zustand.store';

interface MenuItemStyles {
	root?: ElementStyles;
	button?: ElementStyles;
	label?: ElementStyles;
	prefix?: ElementStyles;
	suffix?: ElementStyles;
	icon?: ElementStyles;
	subMenuContent?: ElementStyles;
	SubMenuExpandIcon?: ElementStyles;
}

type ElementStyles = CSSObject | ((params: MenuItemStylesParams) => CSSObject | undefined);

export const SideNav = () => {
	const {collapsed, toggled, breakpoint, isToggled, reachedBreakpoint} = NavbarStore();

	const theme = useTheme();
	const location = useLocation();
	// check screen width to allow nav toggle
	// when opened on small devices
	const matches = useMediaQuery('(max-width:767px)');

	return (
		<Sidebar
			style={{
				height: '100%',
				top: 'auto',
			}}
			breakPoint="md"
			onBreakPoint={() => reachedBreakpoint(matches ? false : !breakpoint)}
			collapsed={collapsed}
			toggled={toggled}
			onBackdropClick={() => isToggled(false)}
			backgroundColor={theme.palette.white.main}>
			<Box sx={styles.avatarContainer}>
				<Avatar
					sx={styles.avatar}
					alt="profile image"
					src="src/assets/bob_minion.png"></Avatar>
				{!collapsed && (
					<Box textAlign={'center'}>
						<Typography
							variant="body2"
							sx={styles.department}>
							Department
						</Typography>
						<Typography variant="overline">Bob</Typography>
					</Box>
				)}
			</Box>
			<Menu
				className="menu"
				menuItemStyles={
					{
						button: ({active}) => {
							return {
								backgroundColor: active && 'transparent',
							};
						},
						icon: ({active}) => {
							return {
								scale: active && '1.2',
								backgroundColor: active && theme.palette.secondary.main,
							};
						},
						label: ({active}) => {
							return {
								paddingBottom: '5px',
								borderBottom: active && '1px solid',
								borderColor: active && theme.palette.gray[900],
							};
						},
					} as MenuItemStyles
				}
				rootStyles={{
					['.' + menuClasses.button]: {
						color: theme.palette.gray[900],
						scale: '1',
						'&:hover': {
							[`.${menuClasses.icon}`]: {
								transition: 'scale 0.3s linear',
								backgroundColor: theme.palette.secondary.main,
								scale: '1.2',
							},
							backgroundColor: 'transparent',
							// color: 'white',
						},
					},
				}}>
				<MenuItem
					className="menu-item"
					active={location.pathname === '/'}
					component={<Link to="/" />}
					icon={<DashboardOutlinedIcon name="dash-board" />}>
					<Typography variant="body2">Home</Typography>
				</MenuItem>
				<MenuItem
					suffix="🔥"
					className="menu-item"
					active={location.pathname === '/dashboard'}
					component={<Link to="/dashboard" />}
					icon={<DashboardOutlinedIcon name="dash-board" />}>
					<Typography variant="body2">Dashboard</Typography>
				</MenuItem>
				{/* <MenuItem
						suffix="🔥" // TODO: we could add notification info here
						active={location.pathname === '/login'}
						component={<Link to="/login" />}
						icon={<SourceOutlinedIcon name="Login" />}>
						<Typography variant="body2">Login</Typography>
					</MenuItem>
				*/}
					<MenuItem
						active={location.pathname === '/register'}
						component={<Link to="/register" />}
						icon={<SourceOutlinedIcon name="register" />}>
						<Typography variant="body2">register</Typography>
					</MenuItem> */}
				<MenuItem
					active={location.pathname === '/profile'}
					component={<Link to="/profile" />}
					icon={<AutoGraphOutlinedIcon name="profile" />}>
					<Typography variant="body2">Profile</Typography>
				</MenuItem>
				<MenuItem
					active={location.pathname === '/stats'}
					component={<Link to="/stats" />}
					icon={<AutoGraphOutlinedIcon name="stats" />}>
					<Typography variant="body2">stats</Typography>
				</MenuItem>
				<MenuItem
					active={location.pathname === '/staff'}
					component={<Link to="/staff" />}
					icon={<StyleOutlinedIcon name="staff" />}>
					<Typography variant="body2">staff</Typography>
				</MenuItem>
				<MenuItem
					active={location.pathname === '/piechart'}
					component={<Link to="/piechart" />}
					icon={<StyleOutlinedIcon name="piechart" />}>
					<Typography variant="body2">piechart</Typography>
				</MenuItem>
			</Menu>
		</Sidebar>
	);
};

/** @type {import("@mui/material").SxProps} */
const styles = {
	avatarContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		my: 5,
	},
	avatar: {
		width: '40%',
		height: 'auto',
		border: 3,
		borderColor: 'primary.main',
	},
	department: {
		mt: 1,
	},
};
