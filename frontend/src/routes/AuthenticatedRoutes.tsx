import { Route, Routes } from 'react-router-dom';
import { HomeMe } from '../Pages/Home/HomeMe';
import Stats from '../Components/Stats/Stats';
import ContactInfo from '../Components/ContactInfo/ContactInfo';
// import Create from '../Pages/Create';
import Dashboard from '../Pages/Dashboard';
import NewCreate from '../Pages/Create';
// import ErrorPage from '../Pages/ErrorPage';
import AllUserStats from '../Pages/AllUserStats';
import { userProfileStore } from '../utils/zustand.store';
import Unauthorized from '../Pages/Unauthorized';
import ServerDown from '../Pages/serverDown';
import NotFound from '../Pages/NotFound';
export const AuthenticatedRoutes = () => {

	const profile = userProfileStore();

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
			<Route
				path="/unauthorized"
				element={<Unauthorized />}
			/>
			<Route
				path="/not_found"
				element={<NotFound />}
			/>
			<Route
				path="/server_down"
				element={<ServerDown />}
			/>
			<Route
				path="/*"
				element={<NotFound />}
			/>
		</Routes>
	);
};
