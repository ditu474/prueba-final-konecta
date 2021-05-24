import { getSavedResource, saveResource } from 'services/localStorage';

const QUOTE_RATE_KEY = 'quoteRate';

export const getQuoteRate = (quoteId) => {
	const quoteRates = getSavedResource(QUOTE_RATE_KEY);

	if (quoteRates.length === 0) return [];

	const quoteRateObj = quoteRates.find((quoteRate) => quoteRate.id === quoteId);
	if (!quoteRateObj) {
		return [];
	}
	return quoteRateObj.rates;
};

export const saveQuoteRates = (quoteId, quoteRate) => {
	const quoteRates = getSavedResource(QUOTE_RATE_KEY);
	if (quoteRates.length === 0) {
		saveResource([{ id: quoteId, rates: [quoteRate] }], QUOTE_RATE_KEY);
		return;
	}

	const quoteRateObj = quoteRates.find((quoteRate) => quoteRate.id === quoteId);
	if (!quoteRateObj) {
		saveResource(
			[{ id: quoteId, rates: [quoteRate] }, ...quoteRates],
			QUOTE_RATE_KEY
		);
		return;
	}

	quoteRateObj.rates = [quoteRate, ...quoteRateObj.rates];
	saveResource(quoteRates, QUOTE_RATE_KEY);
};
