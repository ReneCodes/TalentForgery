// @ts-ignore
import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import WindowIcon from '@mui/icons-material/Window';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {LoginAndOut, NavbarStore} from '../../utils/zustand.store';
import theme from '../../config/theme';

export const AppHeader = () => {
	const {collapsed, toggled, breakpoint, isCollapsed, isToggled} = NavbarStore();

	const {MinonLogout} = LoginAndOut();
	const {secondary, primary} = theme.palette;

	function handleNavbar() {
		if (breakpoint) {
			isCollapsed(!collapsed);
			toggled && isToggled(false);
		} else {
			collapsed && isCollapsed(false);
			isToggled(!toggled);
		}
		// if (navBreakpoint) {
		// 	setNavCollapsed(!navCollapsed);
		// 	navToggle && setNavToggle(false);
		// } else {
		// 	navCollapsed && setNavCollapsed(false);
		// 	setNavToggle(!navToggle);
		// }
	}

	return (
		<AppBar
			position="sticky"
			sx={styles.appBar}>
			<Toolbar sx={styles.toolbar}>
				<Box sx={styles.infoIcons}>
					<IconButton
						onClick={handleNavbar}
						color="secondary">
						<WindowIcon />
					</IconButton>
					<Box sx={{color: secondary.main}} />
					<Typography variant="overline">Minon Mentor</Typography>
				</Box>
				<Box sx={styles.infoIcons}>
					<IconButton
						title="Settings"
						color="inherit">
						<SettingsIcon />
					</IconButton>
					<IconButton
						title="Logout"
						onClick={MinonLogout}
						color="inherit">
						<LogoutIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

/** @type {import("@mui/material").SxProps} */
const styles = {
	appBar: {
		bgcolor: 'grey.900',
	},
	appLogo: {
		borderRadius: 2,
		width: 30,
		ml: 2,
		cursor: 'pointer',
	},
	infoIcons: {
		display: 'flex',
		gap: 2,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
};
