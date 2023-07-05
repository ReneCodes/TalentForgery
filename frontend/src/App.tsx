// @ts-ignore
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { SideNav } from './Components/Navbar/SideNav';
import theme from './config/theme';
import { AuthenticatedRoutes } from './routes/AuthenticatedRoutes';
import { AppHeader } from './Components/Header/AppHeader';
import { NotAuthenticatedRoutes } from './routes/NotAuthenticatedRoutes';
import { LoginAndOut } from './utils/zustand.store';

import { userProfileStore } from './utils/zustand.store';
import { PendingRoutes } from './routes/PendingRoutes';

export function navigateTo(path: string) {
	window.history.pushState(null, '', path);
}

const App: React.FC = () => {
	const profile = userProfileStore();
	const { logedIn } = LoginAndOut();
	const authenticated = logedIn;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			{authenticated ? (
				<>
					<AppHeader />
					{profile.getUserRole() === 'pending' ? (
						<BrowserRouter>
							<PendingRoutes />
						</BrowserRouter>
					) :
						<Box sx={styles.container}>
							<BrowserRouter>
								<SideNav />
								<Box
									component={'main'}
									sx={styles.mainSection}>
									<AuthenticatedRoutes />
								</Box>
							</BrowserRouter>
						</Box>
					}
				</>
			) : (
				<BrowserRouter>
					<Box
						component={'main'}
						sx={styles.mainSection}>
						<NotAuthenticatedRoutes />

					</Box>
				</BrowserRouter>
			)}
		</ThemeProvider >
	);
};

export default App;

/** @type {import("@mui/material").SxProps} */
const styles = {
	container: {
		display: 'flex',
		bgcolor: 'white',
		height: 'calc(100% - 64px)',
	},
	mainSection: {
		p: 2,
		width: '100%',
		height: '100%',
		overflow: 'auto',
	},
};
