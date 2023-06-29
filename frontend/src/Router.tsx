import App from './App';
import ErrorPage from './Pages/Error';
import { createBrowserRouter } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

import ContactInfo from './Components/ContactInfo/ContactInfo';
import Stats from './Components/Stats/Stats';
import EmployeeInfo from './Components/EmployeeInfo/EmployeeInfo';
import PieChartComp from './Components/PieChart/PieChart';


const info = {
	firstName: 'jon',
	lastName: 'deen',
	id: 33,
	department: 'finance',
	email: 'jon@gmail.com',
	secondEmail: 'jonson@gmail.com',
	phoneNumber: '782723782'
}

export const Router = createBrowserRouter([
	{
		path: '/Dashboard',
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
		element: <ContactInfo info={info} />
	},
	{
		path: '/stats',
		element: <Stats />
	},
	{
		path: '/staff',
		element: <EmployeeInfo contactInfo={info} taskArr={['fire', 'water', 'earth', 'air']} />
	},
	{
		path: '/piechart',
		element: <PieChartComp width={120} passed={63} todo={17} failed={13} />
	}
]);
