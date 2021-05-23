import React from 'react';
import { useParams } from 'react-router-dom';
import { getQuoteRate, saveQuoteRates } from 'services/quoteRate';

const QuoteRates = () => {
	const { id } = useParams();
	const [quoteRates, setQuoteRates] = React.useState([]);

	React.useEffect(() => {
		setQuoteRates(getQuoteRate(id));
	}, [id]);

	const addRateHandler = () => {
		setQuoteRates((prevQuoteRates) => [...prevQuoteRates, 4]);
		saveQuoteRates(id, 4);
	};

	console.log(quoteRates);

	let content;
	if (quoteRates.length === 0) {
		content = <h4>Añade una calificación</h4>;
	} else {
		content = quoteRates.map((rate) => (
			<li key={Math.random() + rate}>{rate}</li>
		));
	}

	return (
		<>
			<button onClick={addRateHandler}>Añadir calificación</button>
			<ul>{content}</ul>
		</>
	);
};

export default QuoteRates;
