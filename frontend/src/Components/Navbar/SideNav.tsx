// @ts-ignore
import React, {useEffect} from 'react';
import {Avatar, Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {CSSObject, Menu, MenuItem, MenuItemStylesParams, Sidebar, menuClasses} from 'react-pro-sidebar';
// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import {Link, useLocation} from 'react-router-dom';
import {NavbarStore, PendingUserStore, userProfileStore} from '../../utils/zustand.store';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';

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
	// ZUSTAND STORE
	const {avatar_url_path, localProfileInfo} = userProfileStore();
	const {pendingPerson} = PendingUserStore();

	// TODO: show Links depending on User Role
	const {profile_picture, department, first_name} = localProfileInfo;
	const remoteProfileAvatar = `${avatar_url_path}${profile_picture}`;
	const {collapsed, toggled, breakpoint, isToggled, reachedBreakpoint} = NavbarStore();
	console.log(remoteProfileAvatar);
	// useEffect(() => {
	// 	console.log('localProfileInfo', localProfileInfo);
	// }, [localProfileInfo]);

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
					src={profile_picture ? remoteProfileAvatar : '../src/assets/default_user.png'}></Avatar>
				{!collapsed && (
					<Box textAlign={'center'}>
						<Typography
							variant="body2"
							sx={styles.department}>
							Department: {department}
						</Typography>
						<Typography variant="overline">{first_name}</Typography>
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

				{localProfileInfo.role === 'admin' ? (
					<>
						<MenuItem
							suffix={pendingPerson.length > 0 && '👶'}
							// suffix={pendingPerson.length > 0 && '🔥'}
							className="menu-item"
							active={location.pathname === '/dashboard'}
							component={<Link to="/dashboard" />}
							icon={<StyleOutlinedIcon name="pending users" />}>
							<Typography variant="body2">Pending Users</Typography>
						</MenuItem>

						<MenuItem
							active={location.pathname === '/users_stats'}
							component={<Link to="/users_stats" />}
							icon={<AddchartOutlinedIcon name="users_stats" />}>
							<Typography variant="body2">Staff Stats</Typography>
						</MenuItem>

						<MenuItem
							active={location.pathname === '/create'}
							component={<Link to="/create" />}
							icon={<SourceOutlinedIcon name="create" />}>
							<Typography variant="body2">Create</Typography>
						</MenuItem>
					</>
				) : (
					<MenuItem
						active={location.pathname === '/stats'}
						component={<Link to="/stats" />}
						icon={<AutoGraphOutlinedIcon name="stats" />}>
						<Typography variant="body2">stats</Typography>
					</MenuItem>
				)}

				<MenuItem
					active={location.pathname === '/profile'}
					component={<Link to="/profile" />}
					icon={<ContactsOutlinedIcon name="profile" />}>
					<Typography variant="body2">Profile</Typography>
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
		cursor: 'default',
	},
	avatar: {
		width: '45%',
		height: 'auto',
		maxHeight: '112px',
		border: 3,
		borderColor: 'primary.main',
	},
	department: {
		mt: 1,
	},
};
