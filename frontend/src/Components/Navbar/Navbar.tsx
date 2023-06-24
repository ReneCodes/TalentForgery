import {FC} from 'react';
import {MinonStore} from '../../utils/zustand.store';
import {Button} from '@mui/material';

export const Navbar: FC = () => {
	const {minon, increase, decrease} = MinonStore();

	return (
		<div>
			<p>Navbar</p>
			<Button
				onClick={() => decrease(1)}
				variant="contained"
				color="error">
				- minons
			</Button>
			{/* <button onClick={() => decrease(1)}>- minons</button> */}
			<span style={{color: 'blue', padding: '20px'}}>{minon}</span>
			<Button
				onClick={() => increase(1)}
				variant="contained"
				color="success">
				+ minons
			</Button>
			{/* <button onClick={() => increase(1)}>+ minons</button> */}
		</div>
	);
};
