import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ErrorPage from '../Pages/Error';
import TestList from '../Components/WatchTutorial/QuizzList';

export const AuthRoutes = () => {
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
				path="/register"
				element={<Register />}
			/>
			<Route
				path="/register/:inviteID"
				element={<Register />}
			/>
			<Route
				path="/**"
				element={<ErrorPage />}
			/>
			<Route
				path="/test"
				element={<TestList />}
			/>
		</Routes>
	);
};
