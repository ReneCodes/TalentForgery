import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Unauthorized from '../Pages/Unauthorized';
import ServerDown from '../Pages/serverDown';
import NotFound from '../Pages/NotFound';

export const NotAuthenticatedRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/login/*"
				element={<Login />}
			/>
			<Route
				path="/register"
				element={<Register />}
			/>
			<Route
				path="/register/:inviteID"
				element={<Register />}
			/>
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
