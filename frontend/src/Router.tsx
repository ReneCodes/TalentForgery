import App from './App.tsx';
import ErrorPage from './Pages/Error.tsx';
import {createBrowserRouter} from 'react-router-dom';
import {Login} from './Pages/Login.tsx';
import {Register} from './Pages/Register.tsx';
import {Home} from './Pages/Home/Home.tsx';

export const Router = createBrowserRouter([
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
		errorElement: <ErrorPage />,
	},
	{
		path: '/register',
		element: <Register />,
		errorElement: <ErrorPage />,
	},
]);
