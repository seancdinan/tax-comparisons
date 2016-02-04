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
// 	"exemption":
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

function getDeductedValue(value, year, deductionType, exemptionType, numberOfDependents) {
	// Determine the value to be taxed in the given year after standard deduction and exemptions are removed
	// 'value' should already be adjusted to 'year' value
	// 'year' must be between 1935 and 2015 and end in a 5 or a 0
	// OPTIONAL: Deduction type can be "single", "head of household", or "married couple". Default value is "single".
	// OPTIONAL: Exemption type can be "married person" or "single person". Default value is "single person".
	// OPTIONAL: Number of dependents can be any positive integer value. Default is 0.

	// Let's make sure everything is entered in OK.
	if ((year >= 1935) && (year <= 2015) && (year % 5 == 0)) {

	if (value < 0)
		return 'ERROR --> getDeductedValue: I know you\'re broke, but you gotta enter at least $0';
	if (deductionType != 'single' && deductionType != 'head of household' && deductionType != "married couple" && deductionType != undefined)
		return 'ERROR --> getDeductedValue: Deduction Type can only be \'single\', \'head of household\' or \'married couple\'.'
	if (exemptionType != 'married person' && exemptionType != 'single person' && exemptionType != undefined)
		return 'ERROR --> getDeductedValue: Exemption type can only be \'married person\' or \'single person\'.'

	// Set default values for deduction type & number of dependents.
	var exemptionCount = 0;
	if (deductionType == undefined)
		deductionType = "single";
	if (numberOfDependents == undefined)
		numberOfDependents = 0;

	// Determine the amount of allowable exemptions
	if (exemptionType == undefined)
		exemptionType = "single person";
	if (exemptionType == "married person")
		exemptionCount = 2 + numberOfDependents;
	else if (exemptionType == "single person")
		exemptionCount = 1 + numberOfDependents;
	else return 'ERROR --> getDeductedValue: Unaccepted value for exemption type';

	// Pull the data for the given year
	for (var i = 0; i < usDeduction.length; i++) {
		if (usDeduction[i]["year"] == year) {
			if (year >= 1970 || year == 1935 || year == 1940) {
				// FOR YEARS 1970 AND LATER, ALSO 1935/1940(THEIR DEDUCTION = 0):
				var deductionTotal = usDeduction[i]["deduction"][deductionType];
				var exemptionTotal = usDeduction[i]["exemption"]["single person"] * exemptionCount;
			}
			else if (year >= 1945 && year < 1970) {
				// FOR YEARS 1945 THRU 1965, DEDUCTION VALUE = 10% OF INCOME UP TO $1000
				var exemptionTotal = usDeduction[i]["exemption"][exemptionType] + (usDeduction[i]["exemption"]["amount per dependent"] * exemptionCount);
				if ((0.1 * value) <= 1000)
					var deductionTotal = 0.1 * value;
				else
					var deductionTotal = 1000;  
			}
			else return 'ERROR --> getDeductedValue: Something weird happened...';
		}
	}

	// Return the original value less the sum of exemptions and deduction (or 0 if you'll owe nothing).
	var result = value - (deductionTotal + exemptionTotal);
	if (result < 0)
		return 0;
	else
		return result;
	}

	else
		return 'ERROR --> getDeductedValue: Please enter valid year';
}


//*************************************************
//************* Pay the Taxes *********************
//*************************************************

function taxesDue(value, year1, year2, filingType, deductionType, exemptionType, numberOfDependents) {
	// value in year1 owes ??? in year2
	// Output: "You would owe $$$ in Federal Income Tax in the year YEAR2, which would be about $$$ in YEAR1"
	// Value is any positive integer in USD.
	// year1 is any year between 1935 and 2015, falling every five years.
	// OPTIONAL: year2 default value is set to match year1. Other options are same as year1 options.
	// OPTIONAL: filingType default value is 'single'. Other options: 'married filing jointly/separately', 'head of household'
	// OPTIONAL: deductionType can be "single", "head of household", or "married couple". Default value is "single".
	// OPTIONAL: exemptionType can be "married person" or "single person". Default value is "single person".
	// OPTIONAL: Number of dependents can be any positive integer value. Default is 0.

	// Let's make sure everything is OK
	if ((year1 >= 1935) && (year1 <= 2015) && (year2 >= 1935) && (year2 <= 2015) && (year1 % 5 == 0) && (year2 % 5 == 0)) {
		if (value < 0)
			return 'ERROR --> getDeductedValue: I know you\'re broke, but you gotta enter at least $0';
		if (deductionType != 'single' && deductionType != 'head of household' && deductionType != "married couple" && deductionType != undefined)
			return 'ERROR --> getDeductedValue: Deduction Type can only be \'single\', \'head of household\' or \'married couple\'.'
		if (exemptionType != 'married person' && exemptionType != 'single person' && exemptionType != undefined)
			return 'ERROR --> getDeductedValue: Exemption type can only be \'married person\' or \'single person\'.'
		// Give some default values to optional arguments
		if (year2 == undefined)
			year2 = year1;
		if (filingType == undefined)
			filingType = 'single';
		if (deductionType == undefined)
			deductionType = 'single';
		if (exemptionType == undefined)
			exemptionType = 'single person';
		if (numberOfDependents == undefined)
			numberOfDependents = 0;
	
		// Find out the taxable amount
		var adjustedValue = yearAdjuster(value, year1, year2);
		var taxableAmount = getDeductedValue(adjustedValue, year2, deductionType, exemptionType, numberOfDependents);
		
		// Get tax brackets
		for (var i = 0; i < usTaxRate.length; i++) {
			if (usTaxRate[i]["year"] == year2) {
				var brackets = usTaxRate[i]["rates"][filingType];
			}
		}

		// Go thru the brackets to find total amount due
		var runningTotal = 0;
		var done = false;
		// This will spit out the total amount due in year2 dollars
		for (var i = 0; i < brackets.length; i++){
			if (done == false) {
				if (taxableAmount >= brackets[i][2] && brackets[i][2] != null) {
					runningTotal += brackets[i][0] * (brackets[i][2] - brackets[i][1]);
				}
				else if (taxableAmount < brackets[i][2] || brackets[i][2] == null) {
					runningTotal += brackets[i][0] * (taxableAmount - brackets[i][1]);
					done = true;
				}
				else return 'ERROR --> taxesDue: Something weird happened...'
			}
		}

		var year1Total = yearAdjuster(runningTotal, year2, year1);
		// if (year1 != year2) {
		// 	return ['\nIf you made $', value, ' in ', year1, ',\nYou would owe $', year1Total.toFixed(2),
		// 					' with the ', year2, ' tax plan.\nThat would be about $', runningTotal.toFixed(2), ' in ', year2, '.\n'].join('');}
		// else return ['\nYou would owe $', runningTotal.toFixed(2), ' on $', value.toFixed(2), ' in Federal Income Tax in ', year1, '\n'].join('');
		return year1Total;
	}
	else
		return 'ERROR --> taxesDue: Please enter valid years';
}

//*************************************************
//************  Compare 2 Years   *****************
//*************************************************

function yearComparer(value, year1, year2, filingType, deductionType, exemptionType, numberOfDependents) {
	var year1Value = taxesDue(value,year1,year1,filingType,deductionType,exemptionType,numberOfDependents);
	var year2Value = yearAdjuster(taxesDue(yearAdjuster(value,year1,year2),year2,year2,filingType,deductionType,exemptionType,numberOfDependents),year2,year1);
	var difference = year1Value - year2Value;
	var diffPercent= difference/year1Value;
	//return [year1Value.toFixed(2), year2Value.toFixed(2)];
	return ['\nIf you made $', value, ' in ', year1, ',\nYou would owe $', year1Value.toFixed(2),
					 ' under a ', year1, ' tax plan.\nYou would owe $', year2Value.toFixed(2), ' under a ', year2, ' tax plan.',
					 '\nThat\'s a difference of $', difference.toFixed(2), '! (', (diffPercent*100).toFixed(2), '%)\n'].join('')
}

//*************************************************
//*********** Compare 2 Countries *****************
//*************************************************

function countryComparer(country1, country2) {
	// Make sure the 2 countries are on the list.
	var country1Tester = false;
	var country2Tester = false;
	for (var i = 0; i < globalMedianIncome.length; i++) {
		if (country1Tester == false) {
			if (globalMedianIncome[i]["country"] == country1) {
				country1Tester = true;
				medianIncome1 = globalMedianIncome[i]["median household income(usd)"];
			}
		}
		if (country2Tester == false) {
			if (globalMedianIncome[i]["country"] == country2) {
				country2Tester = true;
				medianIncome2 = globalMedianIncome[i]["median household income(usd)"];
			}
		}
	}
	if (country1Tester == false || country2Tester == false)
		return 'ERROR --> countryComparer: Countries chosen not in database.'

	// Get their info.
	var difference = medianIncome1 - medianIncome2;
	var diffPercent= difference/medianIncome1;
	return ['\nThe median income of ', country1, ' is $', medianIncome1 ,
					'.\nThe median income of ', country2, ' is $', medianIncome2,
					'.\nThat\'s a difference of $', difference.toFixed(2), ' (', (diffPercent*100).toFixed(2), '%).\n'].join('')
}



//*************************************************
//*************  Run Some Tests!  *****************
//*************************************************
console.log(countryComparer('United Kingdom', 'South Africa'))













