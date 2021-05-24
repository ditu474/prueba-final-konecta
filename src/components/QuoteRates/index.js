import PropTypes from 'prop-types';
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { getQuoteRate, saveQuoteRates } from 'services/quoteRate';
import RateList from './RateList';

const QuoteRates = ({ quoteId }) => {
	const [quoteRates, setQuoteRates] = React.useState([]);
	const [rateAverage, setRateAverage] = React.useState(0);

	React.useEffect(() => {
		const savedQuoteRates = getQuoteRate(quoteId);
		setQuoteRates(savedQuoteRates);

		if (savedQuoteRates.length > 0) {
			const sum = savedQuoteRates.reduce(
				(prevVal, currentVal) => prevVal + currentVal.rate,
				0
			);
			const newRateAvrg = sum / savedQuoteRates.length;
			setRateAverage(newRateAvrg);
		}
		// eslint-disable-next-line
	}, []);

	const calculateNewRate = (newRate) => {
		const totalRates = quoteRates.length;
		const lastSum = rateAverage * totalRates;
		const newAverage = (lastSum + newRate) / (totalRates + 1);
		setRateAverage(newAverage);
	};

	const addRateHandler = (newRating) => {
		calculateNewRate(newRating);
		const rate = { id: Math.random() + newRating, rate: newRating };
		setQuoteRates((prevQuoteRates) => [rate, ...prevQuoteRates]);
		saveQuoteRates(quoteId, rate);
	};

	return (
		<div className="center-column-childs">
			<h4>Promedio: {rateAverage.toFixed(1)}</h4>
			<ReactStars
				count={5}
				onChange={addRateHandler}
				size={40}
				isHalf={true}
				activeColor="#ffd700"
			/>
			<RateList rates={quoteRates} />
		</div>
	);
};

QuoteRates.propTypes = {
	quoteId: PropTypes.number.isRequired,
};

export default QuoteRates;
