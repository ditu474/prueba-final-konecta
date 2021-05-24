import Toolbar from '@material-ui/core/Toolbar';
import Appbar from 'components/Appbar';
import LoadingSpinner from 'components/LoadingSpinner';
import ScrollTop from 'components/ScrollTop';
import React from 'react';
import Routes from 'Routes';

function App() {
	return (
		<>
			<div id="back-to-top-anchor"></div>
			<Appbar />
			<Toolbar />
			<React.Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
				<main className="container" style={{ marginTop: '2rem' }}>
					<Routes />
				</main>
			</React.Suspense>
			<ScrollTop />
		</>
	);
}

export default App;
