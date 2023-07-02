import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route
				path="/*"
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
		</Routes>
	);
};
