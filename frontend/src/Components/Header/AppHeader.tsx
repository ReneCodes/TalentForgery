// @ts-ignore
import React, {useEffect} from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import WindowIcon from '@mui/icons-material/Window';
import LogoutIcon from '@mui/icons-material/Logout';
import {LoginAndOut, NavbarStore, PendingUserStore, TutorialStore, userProfileStore} from '../../utils/zustand.store';
import {YellowTooltip} from '../Tooltips/CustomTooltips';
import {
	getAllTutorials,
	getPendingUsers,
	getSingleUserProfileData,
	getUsersTutorials,
} from '../../services/Api.service';

export const AppHeader = () => {
	const {UpdateProfileInfo, getUserRole} = userProfileStore();
	const {storePendingPeople} = PendingUserStore();
	const {storeUserTutorials, storeAllTutorials} = TutorialStore();
	// console.log('APP HEADER pendingPerson', pendingPerson);
	const {collapsed, toggled, breakpoint, isCollapsed, isToggled} = NavbarStore();

	useEffect(() => {
		initalLoad();
	}, []);

	async function initalLoad() {
		console.log('INITIAL LOAD');
		await getSingleUserProfileData(UpdateProfileInfo);
		await getUsersTutorials(storeUserTutorials);
		const role = await getUserRole();
		// console.log('ROLE:', role);
		if (role === 'admin') {
			await getPendingUsers(storePendingPeople);
			await getAllTutorials(storeAllTutorials);
		}
	}

	const {MinonLogout} = LoginAndOut();

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
						sx={{cursor: 'default'}}>
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
							onClick={MinonLogout}
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
