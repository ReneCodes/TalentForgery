import { Route, Routes } from 'react-router-dom';
import { HomeMe } from '../Pages/Home/HomeMe';
import Stats from '../Components/Stats/Stats';
import ContactInfo from '../Components/ContactInfo/ContactInfo';
// import Create from '../Pages/Create';
import Dashboard from '../Pages/Dashboard';
import NewCreate from '../Pages/NewCreate';
// import ErrorPage from '../Pages/ErrorPage';
import AllUserStats from '../Pages/AllUserStats';
import { userProfileStore } from '../utils/zustand.store';

export const AuthenticatedRoutes = () => {

	const profile = userProfileStore();
	console.log();


	return (
		<Routes>
			<Route
				path="/"
				element={<HomeMe />}
			/>
			<Route
				path="/profile"
				element={<ContactInfo />}
			/>
			<Route
				path="/stats"
				element={<Stats />}
			/>
			{
				profile.localProfileInfo.role === 'admin' && (
					<>
						<Route
							path="/users_stats"
							element={<AllUserStats />}
						/>
						<Route
							path="/create"
							element={<NewCreate />}
						/>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
					</>
				)
			}
		</Routes>
	);
};
