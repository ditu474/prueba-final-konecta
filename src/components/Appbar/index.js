import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import HeisenbergImage from 'assets/heisenberg.png';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Appbar.module.scss';

export default function Appbar() {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<AppBar>
				<div className="container">
					<Toolbar className={styles.toolbar}>
						<NavLink to="/">
							<img src={HeisenbergImage} alt="Logo breaking bad" />
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
		</Slide>
	);
}
