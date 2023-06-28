// @ts-ignore
import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {SideNav} from './Components/Navbar/SideNav';
import theme from './config/theme';
import {AppRoutes} from './AppRoutes';
import {AppHeader} from './Components/Header/AppHeader';

const App: React.FC = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
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
			</ThemeProvider>
		</>
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
