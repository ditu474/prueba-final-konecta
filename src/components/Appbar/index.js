import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import breakingBadLogo from 'assets/Breaking_Bad_logo.png';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Appbar.module.scss';

export default function Appbar() {
	return (
		<AppBar position="static">
			<div className="container">
				<Toolbar className={styles.toolbar}>
					<NavLink to="/">
						<img src={breakingBadLogo} alt="Logo breaking bad" />
					</NavLink>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/bookstores"
									activeClassName="active-route"
									className={styles['nav-link']}
								>
									Mis librerías
								</NavLink>
							</li>
						</ul>
					</nav>
				</Toolbar>
			</div>
		</AppBar>
	);
}
