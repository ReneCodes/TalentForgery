// import {useState} from 'react';
import './App.css';
import {MinonStore} from './utils/zustand.store';

function App() {
	const {minon, increase, decrease} = MinonStore();

	return (
		<>
			<h1>This is Minon Mentor</h1>
			<div>
				<button onClick={() => increase(1)}>+ minons</button>
				<span>{minon}</span>
				<button onClick={() => decrease(1)}>- minons</button>
			</div>
		</>
	);
}

export default App;
