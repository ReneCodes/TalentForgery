import App from '../App';
import ErrorPage from '../Pages/ErrorPage';
import {createBrowserRouter} from 'react-router-dom';

import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';

import ContactInfo from '../Components/ContactInfo/ContactInfo';
import Stats from '../Components/Stats/Stats';
import EmployeeInfo from '../Components/EmployeeInfo/EmployeeInfo';
import PieChartComp from '../Components/PieChart/PieChart';
import Create from '../Pages/Create';
import AllUserStats from '../Pages/AllUserStats';

const info = {
	firstName: 'jon',
	lastName: 'deen',
	id: 33,
	department: 'finance',
	email: 'jon@gmail.com',
	secondEmail: 'jonson@gmail.com',
	phoneNumber: '782723782',
};

export const Router = createBrowserRouter([
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register/',
		element: <Register />,
	},
	{
		path: '/register/:inviteID',
		element: <Register />,
	},
	{
		path: '/profile',
		element: <ContactInfo />,
	},
	{
		path: '/user_stats',
		element: <AllUserStats />,
	},
	{
		path: '/stats',
		element: <Stats />,
	},
	{
		path: '/create',
		element: <Create />,
	},
]);
