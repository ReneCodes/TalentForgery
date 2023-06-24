import {FC} from 'react';
import {MinonStore} from '../../utils/zustand.store';

export const Navbar: FC = () => {
	const {minon, increase, decrease} = MinonStore();

	return (
		<div>
			<p>Navbar</p>
			<button onClick={() => decrease(1)}>- minons</button>
			<span style={{color: 'blue', padding: '20px'}}>{minon}</span>
			<button onClick={() => increase(1)}>+ minons</button>
		</div>
	);
};
