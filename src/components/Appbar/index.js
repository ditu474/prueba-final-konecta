import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import breakingBadLogo from 'assets/Breaking_Bad_logo.png';
import React from 'react';
import styles from './Appbar.module.scss';

export default function Appbar() {
	return (
		<AppBar position="static">
			<div className="container">
				<Toolbar className={styles.toolbar}>
					<img src={breakingBadLogo} alt="Logo breaking bad" />
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
