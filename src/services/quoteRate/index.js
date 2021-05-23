const QUOTE_RATE_KEY = 'quoteRate';

const getSavedQuoteRates = () => {
	const savedQuoteRates = localStorage.getItem(QUOTE_RATE_KEY);
	if (!savedQuoteRates) {
		return [];
	}
	return JSON.parse(savedQuoteRates);
};

const saveQuoteRatesLocally = (quoteRates) => {
	try {
		localStorage.setItem(QUOTE_RATE_KEY, JSON.stringify(quoteRates));
	} catch (err) {
		console.error('Error saving quoteRates: ', err.message);
	}
};

export const getQuoteRate = (quoteId) => {
	const quoteRates = getSavedQuoteRates();

	if (quoteRates.length === 0) return [];

	const quoteRateObj = quoteRates.find(
		(quoteRate) => quoteRate.id === String(quoteId)
	);
	if (!quoteRateObj) {
		return [];
	}
	return quoteRateObj.rates;
};

export const saveQuoteRates = (quoteId, quoteRate) => {
	const quoteRates = getSavedQuoteRates();
	if (quoteRates.length === 0) {
		saveQuoteRatesLocally([{ id: quoteId, rates: [quoteRate] }]);
		return;
	}

	const quoteRateObj = quoteRates.find(
		(quoteRate) => quoteRate.id === String(quoteId)
	);
	if (!quoteRateObj) {
		saveQuoteRatesLocally([{ id: quoteId, rates: [quoteRate] }, ...quoteRates]);
		return;
	}

	quoteRateObj.rates = [quoteRate, ...quoteRateObj.rates];
	saveQuoteRatesLocally(quoteRates);
};
