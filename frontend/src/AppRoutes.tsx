import {Route, Routes} from 'react-router-dom';
import {Home} from './Pages/Home/Home';
import {Login} from './Pages/Login';
import Register from './Pages/Register';
import PieChartComp from './Components/PieChart/PieChart';
import EmployeeInfo from './Components/EmployeeInfo/EmployeeInfo';
import Stats from './Components/Stats/Stats';
import ContactInfo from './Components/ContactInfo/ContactInfo';
import Create from './Pages/Create';

const info = {
	firstName: 'jon',
	lastName: 'deen',
	id: 33,
	department: 'finance',
	email: 'jon@gmail.com',
	secondEmail: 'jonson@gmail.com',
	phoneNumber: '782723782',
};

export const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/create-tutorial"
				element={<Create />}
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
				path="/profile"
				element={<ContactInfo info={info} />}
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
		</Routes>
	);
};
