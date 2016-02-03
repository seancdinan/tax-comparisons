
// ***** Historical US Median Incomes, 1935 to Present *****
// Format:
// 	"year": value,
// 	"data": [nominalIncome, presentValueIn2015],
// 	"source": "source info"
var rawMedianIncomes = require('./us_historical_median_incomes.js');
var usMedianIncomes = JSON.parse(rawMedianIncomes);

// ***** Median Incomes of Various Countries *****
// Format:
// 	"continent": "Continent name",
// 	"country": "Country name",
// 	"median household income(usd)": valueIn2015,
// 	"source": "source info"
var rawGlobalIncomes = require('./global_median_incomes.js');
var globalMedianIncomes = JSON.parse(rawGlobalIncomes);

// ***** Historical US Tax Brackets, 1935 to Present *****
// Format:
// 	"year": value,
// 	"rates":
// 		"married filing jointly": [[tax brackets], [percentAsDecimal, minDollars, maxDollars]],
// 		"married filing separately": [same],
// 		"single": [same],
// 		"head of household": [same],
// 	"source": "source info",
// 	"notes": "any relevant notes"
var rawUsTaxRates = require('./us_historical_income_tax_rates.js');
var usTaxRates = JSON.parse(rawUsTaxRates);

// ***** Historical US Standard Deductions and Personal Exemptions, 1935 to Present *****
// Format:
// 	"year": value,
// 	"expemption":
// 		"married person": value,
// 		"single person": value,
// 		"amount per dependent": value,
// 		"source": "source info"
// 	"deduction":
// 		"single": value,
// 		"head of household": value,
// 		"married couple": value,
// 		"source": "source info",
// 		"notes": "Optional area for notes (may not exist)"
// 
// General Notes:
// 	- Deduction value will be $0 if none was allowed.
// 	- Deduction value will be null if special situation applies
// 			- See a given year's notes for specifics
var rawUsDeductions = require('./us_historical_deductions_exemptions.js');
var usDeductions = JSON.parse(rawUsDeductions);


function getYear(data, year) {
	// Get a list of years
	var holder = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i]["year"] = 1990)
			return data[i]["rates"]["single"];
	}
}
