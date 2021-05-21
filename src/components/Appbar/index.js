import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import breakingBadLogo from 'assets/Breaking_Bad_logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Appbar.module.scss';

export default function Appbar() {
	return (
		<AppBar position="static">
			<div className="container">
				<Toolbar className={styles.toolbar}>
					<img src={breakingBadLogo} alt="Logo breaking bad" />
					<nav>
						<ul>
							<li>
								<Link to="/bookstores">Mis librerías</Link>
							</li>
						</ul>
					</nav>
				</Toolbar>
			</div>
		</AppBar>
	);
}
