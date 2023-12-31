// @ts-ignore
import React, { useEffect } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import WindowIcon from '@mui/icons-material/Window';
import LogoutIcon from '@mui/icons-material/Logout';
import { LoginAndOut, NavbarStore, PendingUserStore, TutorialStore, userProfileStore } from '../../utils/zustand.store';
import { YellowTooltip } from '../Tooltips/CustomTooltips';
import { navigateTo } from '../../App';

import {
	getAllTutorials,
	getPendingUsers,
	getSingleUserProfileData,
	getUsersTutorials,
	logoutUser,
} from '../../services/Api.service';

export const AppHeader = () => {
	const { UpdateProfileInfo, getUserRole } = userProfileStore();
	const { storePendingPeople } = PendingUserStore();
	const { storeUserTutorials, storeAllTutorials } = TutorialStore();
	const { collapsed, toggled, breakpoint, isCollapsed, isToggled } = NavbarStore();

	useEffect(() => {
		initalLoad();
	}, []);

	async function initalLoad() {
		await getSingleUserProfileData(UpdateProfileInfo);
		const isPending = await getUserRole();
		if (isPending !== 'pending') {
			await getUsersTutorials(storeUserTutorials);
			const role = await getUserRole();
			if (role === 'admin') {
				await getPendingUsers(storePendingPeople);
				await getAllTutorials(storeAllTutorials);
			}
		} else{
			navigateTo('/pending');
		}
	}

	const { MinonLogout } = LoginAndOut();

	async function handleLogout() {
		logoutUser();
		MinonLogout();
		// const logoutAnwser = await logoutUser();
		// if (logoutAnwser) {
		// 	MinonLogout();
		// }
	}

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
					<YellowTooltip
						title="Toggle Navbar"
						placement="bottom-start"
						describeChild
						arrow>
						<IconButton
							aria-label="Toggle Navbar"
							onClick={handleNavbar}
							color="secondary">
							<WindowIcon />
						</IconButton>
					</YellowTooltip>

					<Box />
					<Typography
						variant="overline"
						sx={{ cursor: 'default' }}>
						Minon Mentor
					</Typography>
				</Box>
				<Box sx={styles.infoIcons}>
					{/* <IconButton
						title="Settings"
						color="inherit">
						<SettingsIcon />
					</IconButton> */}
					<YellowTooltip
						title="Logout"
						placement="left"
						enterDelay={600}
						describeChild
						arrow>
						<IconButton
							aria-label="Logout"
							onClick={handleLogout}
							color="inherit">
							<LogoutIcon />
						</IconButton>
					</YellowTooltip>
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
	infoIcons: {
		display: 'flex',
		gap: 2,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
};
