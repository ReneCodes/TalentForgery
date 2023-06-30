// @ts-ignore
import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {SideNav} from './Components/Navbar/SideNav';
import theme from './config/theme';
import {AppRoutes} from './routes/AppRoutes';
import {AppHeader} from './Components/Header/AppHeader';
import {AuthRoutes} from './routes/AuthRoutes';
import {LoginAndOut} from './utils/zustand.store';

const App: React.FC = () => {
	const {logedIn} = LoginAndOut();

	const authenticated = logedIn;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{authenticated ? (
				<>
					<AppHeader />
					<Box sx={styles.container}>
						<BrowserRouter>
							<SideNav />
							<Box
								component={'main'}
								sx={styles.mainSection}>
								<AppRoutes />
							</Box>
						</BrowserRouter>
					</Box>
				</>
			) : (
				<BrowserRouter>
					<AuthRoutes />
				</BrowserRouter>
			)}
		</ThemeProvider>
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
		p: 4,
		width: '100%',
		height: '100%',
		overflow: 'auto',
	},
};
