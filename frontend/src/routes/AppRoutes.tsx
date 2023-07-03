import { Route, Routes } from 'react-router-dom';
import { HomeMe } from '../Pages/Home/HomeMe';
import PieChartComp from '../Components/PieChart/PieChart';
import EmployeeInfo from '../Components/EmployeeInfo/EmployeeInfo';
import Stats from '../Components/Stats/Stats';
import ContactInfo from '../Components/ContactInfo/ContactInfo';
// import Create from '../Pages/Create';
import Dashboard from '../Pages/Dashboard';
import NewCreate from '../Pages/NewCreate';
import ErrorPage from '../Pages/ErrorPage';
import AllUserStats from '../Pages/AllUserStats';


const info = {
	first_name: 'jon',
	last_name: 'deen',
	user_id: 33,
	department: 'finance',
	email: 'jon@gmail.com',
	secondEmail: 'jonson@gmail.com',
	phoneNumber: '782723782',
};

export const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/*"
				element={<HomeMe />}
			/>
			<Route
				path="/dashboard"
				element={<Dashboard />}
			/>
			<Route
				path="/profile"
				element={<ContactInfo />}
			/>
			<Route
				path="/stats"
				element={<Stats />}
			/>
			<Route
				path="/staff"
				element={
					<EmployeeInfo
						contactInfo={info}
						taskArr={['fire', 'water', 'earth', 'air']}
					/>
				}
			/>
			<Route
				path="/users_stats"
				element={<AllUserStats />}
			/>
			<Route
				path="/piechart"
				element={
					<PieChartComp
						width={120}
						passed={63}
						todo={17}
						failed={13}
					/>
				}
			/>
			<Route
				path="/create"
				element={<NewCreate />}
			/>
		</Routes>
	);
};
