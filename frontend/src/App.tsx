// @ts-ignore
import React from 'react';
import './App.css';
import {Login} from './Pages/Login';
import {Register} from './Pages/Register';
import {Home} from './Pages/Home/Home';

function App() {
	return (
		<>
			<h1>This is Minon Mentor</h1>
			<Login></Login>
			<Register></Register>
			<Home></Home>
		</>
	);
}

export default App;
