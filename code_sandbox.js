//*************************************************
//***************** Load in the Data **************
//*************************************************

// ***** Historical US Median Incomes, 1935 to Present *****
// Format:
// 	"year": value,
// 	"data": [nominalIncome, presentValueIn2015],
// 	"source": "source info"
var rawMedianIncome = require('./us_historical_median_incomes.js');
var usMedianIncome = JSON.parse(rawMedianIncome);

// ***** Median Incomes of Various Countries *****
// Format:
// 	"continent": "Continent name",
// 	"country": "Country name",
// 	"median household income(usd)": valueIn2015,
// 	"source": "source info"
var rawGlobalIncome = require('./global_median_incomes.js');
var globalMedianIncome = JSON.parse(rawGlobalIncome);

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
var rawUsTaxRate = require('./us_historical_income_tax_rates.js');
var usTaxRate = JSON.parse(rawUsTaxRate);

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
var rawUsDeduction = require('./us_historical_deductions_exemptions.js');
var usDeduction = JSON.parse(rawUsDeduction);

//*************************************************
//************ Helper Functions *******************
//*************************************************
	
function yearAdjuster(value, year1, year2) {
	// value in year1 equals ??? in year2
	if ((year1 >= 1935) && (year1 <= 2015) && (year2 >= 1935) && (year2 <= 2015) && (year1 % 5 == 0) && (year2 % 5 == 0)) {
		for (var i = 0; i < usMedianIncome.length; i++) {
			if (usMedianIncome[i]["year"] == year1) {
				var medianThen1 = usMedianIncome[i]["data"][0]; 
				var medianNow1 = usMedianIncome[i]["data"][1];
			};
			if (usMedianIncome[i]["year"] == year2) {
				var medianThen2 = usMedianIncome[i]["data"][0]; 
				var medianNow2 = usMedianIncome[i]["data"][1];
			};
		}
		return value * (medianNow1 / medianThen1) * (medianThen2 / medianNow2);
	}
	else
		console.log('ERROR --> yearAdjuster: Please enter valid years')
}

function getDeductedValue(value, year, numberOfExemptions) {
	// Determine the value to be taxed in the given year after standard deduction and exemptions are removed
	// 'value' should already be adjusted to 'year' value
	// 'year' must be between 1935 and 2015 and end in a 5 or a 0
	// Number of exemptions can be any positive integer value
}



//*************************************************
//************* Pay the Taxes *********************
//*************************************************

function taxesDue(value, year1, year2) {
	// value in year1 owes ??? in year2
	// Output: "You would owe $$$ in Federal Income Tax in the year YEAR2, which would be about $$$ in YEAR1"
}

























