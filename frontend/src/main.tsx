import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {Router} from './Router';
import {RouterProvider} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<>
		<React.StrictMode>
			<CssBaseline />
			<RouterProvider router={Router} />
		</React.StrictMode>
	</>
);
