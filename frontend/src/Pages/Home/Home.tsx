// @ts-ignore
import React, {FC} from 'react';
import {MinonStore} from '../../utils/zustand.store';
import {Box, Button} from '@mui/material';

export const Home = () => {
	const {minon, increase, decrease} = MinonStore();

	return (
		<div>
			<h1>Home</h1>
			<Box>
				<Button
					onClick={() => decrease(1)}
					variant="contained"
					color="secondary"
					aria-label="remove minion">
					- minons
				</Button>
				<Box p={2}>
					<h2>{minon}</h2>
				</Box>
				<Button
					onClick={() => increase(1)}
					variant="contained"
					color="primary"
					aria-label="add minion">
					+ minons
				</Button>
			</Box>
		</div>
	);
};
