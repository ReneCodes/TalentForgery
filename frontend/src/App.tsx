// @ts-ignore
import React from 'react';
import './App.css';
import {Navbar} from './Components/Navbar/Navbar';
import {Outlet} from 'react-router-dom';

const App: React.FC = () => {
	return (
		<div className="app">
			{/* <h1 className="header">This is Minon Mentor</h1> */}
			{/* <Navbar></Navbar> */}
			<Outlet />
		</div>
	);
};

export default App;
