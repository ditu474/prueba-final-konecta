import React from 'react';
import { useParams } from 'react-router-dom';
import { getQuoteRate, saveQuoteRates } from 'services/quoteRate';

const QuoteRates = () => {
	const { id } = useParams();
	const [quoteRates, setQuoteRates] = React.useState([]);
	const [rateAverage, setRateAverage] = React.useState(0);

	React.useEffect(() => {
		const savedQuoteRates = getQuoteRate(id);
		setQuoteRates(savedQuoteRates);

		if (savedQuoteRates.length > 0) {
			const sum = savedQuoteRates.reduce(
				(prevVal, currentVal) => prevVal + currentVal,
				0
			);
			const newRateAvrg = sum / savedQuoteRates.length;
			setRateAverage(newRateAvrg.toFixed(1));
		}
		// eslint-disable-next-line
	}, []);

	React.useEffect(() => {
		const quoteRateslength = quoteRates.length;
		if (quoteRateslength === 0) return;

		const lastRate = quoteRates[quoteRateslength - 1];
		const lastSum = rateAverage * (quoteRateslength - 1);
		const newAverage = (lastSum + lastRate) / quoteRateslength;
		setRateAverage(newAverage.toFixed(1));
		// eslint-disable-next-line
	}, [quoteRates]);

	const addRateHandler = () => {
		setQuoteRates((prevQuoteRates) => [...prevQuoteRates, 4]);
		saveQuoteRates(id, 4);
	};

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
			<h4>Promedio: {rateAverage}</h4>
			<button onClick={addRateHandler}>Añadir calificación</button>
			<ul>{content}</ul>
		</>
	);
};

export default QuoteRates;
