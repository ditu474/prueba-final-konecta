const Home = () => {
	return (
		<>
			<button>Filtros Avanzados</button>
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<div>
				<button aria-label="Previous page" disabled>
					{'<'}
				</button>
				<p aria-label="Page number">1</p>
				<button aria-label="Next page">{'>'}</button>
			</div>
		</>
	);
};

export default Home;
