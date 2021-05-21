import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';

export default function Appbar() {
	return (
		<AppBar position="static">
			<div className="container">
				<Toolbar>
					Breaking Bad Logo
					<nav>
						<ul>
							<li>Mis librerias</li>
						</ul>
					</nav>
				</Toolbar>
			</div>
		</AppBar>
	);
}
