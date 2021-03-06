// NOTE: ALL FUNCTIONS CURRENTLY IGNORE LOCAL TAXES SUCH AS PROPERTY TAX,
//       THESE ARE EITHER ASSUMED OR SPECIFIED TO BE RELATIVELY MINUTE.

function template(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

// EUROPE
function germany(income,status){
	var sources = [['General Info', 'https://en.wikipedia.org/wiki/Taxation_in_Germany'],['VAT tax','http://www.tradingeconomics.com/germany/sales-tax-rate']];
	var moneyLeft = income;
	var incomeTax = 0;
	var totalTax = 0;
	if (status == 'single'){
	}
	else if (status == 'married'){
	}
	else console.log('ERROR --> Germany: Please enter valid filing status')
}

function france(income,status,expenses,children){
	// Currency: Euros
	// VAT currently in its most simple state
	var sources = [['General Info','http://www.tradingeconomics.com/germany/sales-tax-rate']];
	if (children == 'undefined'){children = 0;}
	if (status == 'undefined'){status = 'single'}

	// Calculate Deductions
	var deductions = 0;
	if (income <= 7920){deductions += income};
	if (status == 'single' && income < 16418 && income > 11800){deductions += 1135;}
	if (status == 'married' && income < 25983 && income > 17454 && children == 0){deductions += 1870;}
	if (status == 'married' && income < 35400 && income > 23717 && children > 0){deductions += 1870;}
	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax Calculation
	if (status == 'married'){netIncome = income/2}
	if (netIncome < 6011){totalTax = 0; return totalTax;}

	if (netIncome >= 11991){totalTax += (11991 - 6011)*0.055;}
	else if (netIncome > 6011 && netIncome < 11991){totalTax += (netIncome - 6011)*0.055; return totalTax;}

	if (netIncome >= 26631){totalTax += (26631 - 11991)*0.14;}
	else if (netIncome > 11991 && netIncome < 26631){totalTax += (netIncome - 11991)*0.14; return totalTax;}

	if (netIncome >= 71397){totalTax += (71397 - 26631)*0.30;}
	else if (netIncome > 26631 && netIncome < 71397){totalTax += (netIncome - 26631)*0.30; return totalTax;}

	if (netIncome >= 71397 && netIncome < 151200){totalTax += (netIncome - 71397)*0.41; return totalTax;}
	if (netIncome >= 151200){totalTax += (151200 - 71397)*0.41; totalTax += (netIncome - 151200)*0.45;return totalTax;}
	
	// vat = [standard, groceries, books/restaurants]
	var vat = [0.2,0.055,0.1];
	var totalVat = vat[0] * expenses;
	var socialSecurity = 0.08*(0.97*income);
}

function unitedKingdom(income,status){
	// Currency: Pound Sterling
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_the_United_Kingdom']['National Insurance','https://www.gov.uk/national-insurance-rates-letters/contribution-rates']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;
	deductions += 10600;
	if (income > 100000){deductions  -= (income - 100000)/2;}
	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome < 0){netIncome = 0; totalTax = 0;}

	if (netIncome >= 31785){totalTax += 0.2*(31785 - 0);}
	if (netIncome > 0 && netIncome < 31785){totalTax += 0.2*(netIncome - 0);}

	if (netIncome >= 150000){totalTax += 0.4*(150000 - 31785) + 0.45*(netIncome - 150000);}
	if (netIncome > 31785 && netIncome < 150000){totalTax += 0.4*(netIncome - 31785);}

	// VAT Tax [general, groceries, gas supplies]
	var vat = [0.20, 0, 0.05];
	var vatSum = 0;

	// National Insurance
	var NIdue = 0;
	var weeklySalary = income/52;
	if (weeklySalary <= 155){NIdue = 0;}
	if (weeklySalary > 155 && weeklySalary <= 815){NIdue = 0.12*(weeklySalary - 155);}
	if (weeklySalary > 815){NIdue = 0.12*(815-155) + 0.02*(weeklySalary - 815);}
	

	totalTax += (vatSum + NIdue);
	// Return [total taxes for the year, % of income that goes towards taxes]
	return [totalTax, totalTax/income]
}

function italy(income,status){
	// Currency: EURO
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Italy']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome >= 15000){totalTax += 0.23 * (15000 - 0);}
	if (netIncome < 15000){totalTax += 0.23 * netIncome;}

	if (netIncome >= 28000){totalTax += 0.27 * (28000 - 15000);}
	if (netIncome < 28000 && netIncome > 15000){totalTax += 0.27 * (netIncome - 15000);}

	if (netIncome >= 55000){totalTax += 0.38 * (55000 - 28000);}
	if (netIncome < 55000 && netIncome > 28000){totalTax += 0.38 * (netIncome - 28000);}

	if (netIncome >= 75000){totalTax += 0.41 * (75000 - 55000);}
	if (netIncome < 75000 && netIncome > 55000){totalTax += 0.41 * (netIncome - 55000);}

	if (netIncome > 75000){totalTax += 0.43 * (netIncome - 75000);}

	// VAT Tax [general, groceries, restaurants]
	var vat = [0.22, 0.04, 0.10];
	var vatSum = 0;


	// Social Security
	var socSec = 0.0919 * income;

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function spain(income,status, dependents){
	// Currency: EURO
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Spain']];
	// Default Values
	if (status == 'undefined'){status == 'single';}
	if (dependents == 'undefined'){dependents = 0;}

	// Deductions (Assume <65 year old)
	var deductions = 0;
	deductions += 5151;
	for (var i = 0; i <= dependents; i++){
		if (i == 0){deductions += 0;}
		if (i == 1){deductions += 1836;}
		if (i == 2){deductions += 2040;}
		if (i == 3){deductions += 3672;}
		if (i >= 4){deductions += 4182;}
	}
	var netIncome = income - deductions;
	if (netIncome < 0){netIncome = 0;}
	var totalTax = 0;

	// Income Tax
	if (netIncome >= 12450){totalTax += 0.2 * (12450 - 0);}
	if (netIncome < 12450){totalTax += 0.2 * (netIncome - 0);}

	if (netIncome >= 20200){totalTax += 0.25 * (20200 - 12450);}
	if (netIncome < 20200 && netIncome > 12450){totalTax += 0.25 * (netIncome - 12450);}

	if (netIncome >= 35200){totalTax += 0.31 * (35200 - 20200);}
	if (netIncome < 35200 && netIncome > 20200){totalTax += 0.31 * (netIncome - 20200);}

	if (netIncome >= 60000){totalTax += 0.39 * (60000 - 35200);}
	if (netIncome < 60000 && netIncome > 35200){totalTax += 0.39 * (netIncome - 35200);}

	if (netIncome > 60000){totalTax += 0.47 * (netIncome - 60000);}

	// VAT Tax [general, groceries, misc]
	var vat = [0.21, 0.04, 0.10];
	var vatSum = 0;

	// Social Security
	var socSec = 0.0635 * income;
	if (socSec > 3596){socSec = 3596;}

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function ukraine(income,status){
	// Currency: UKRAINIAN HRYVNIA
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','http://www.worldwide-tax.com/ukraine/ukraine_taxes.asp'],['Monthly Min Wage','https://en.wikipedia.org/wiki/List_of_sovereign_states_in_Europe_by_minimum_wage'],['Social Security','http://www.tradingeconomics.com/ukraine/social-security-rate-for-employees']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;
	// Different rate applies if making over 10x minumum.
	var minWage10 = 1378 * 12 * 10;

	// Income Tax
	if (netIncome >= minWage*10){totalTax += 0.15 * (minWage*10);}
	if (netIncome < minWage*10){totalTax += 0.15 * netIncome;}
	if (netIncome > minWage*10){totalTax += 0.17 * (netIncome - 10*minWage);}


	// VAT Tax [general, groceries, baby food and a few random things]
	var vat = [0.20, 0.20, 0.07];
	var vatSum = 0;

	// Social Security
	var socSec = 0.036 * income;

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function poland(income,status){
	// Currency: Polish złoty
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Poland'],['Social Security','https://home.kpmg.com/xx/en/home/insights/2011/12/poland-other-taxes-levies.html']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome >= 85528){totalTax += 0.18 * (85528 - 3091);}
	if (netIncome < 85528){totalTax += 0.18 * (netIncome - 3091);}
	if (netIncome > 85528){totalTax += 0.32 + (netIncome - 85528);}

	// VAT Tax [general, groceries, misc]
	var vat = [0.23, 0.05, 0.08];
	var vatSum = 0;

	// Social Security
	var socSec = 0;
	if (income < 118770){socSec += 0.1371 * income;}
	if (income >= 118770){socSec += (0.1371 * 118770) + (0.0245 * (income - 118770));}

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function romania(income,status){
	// Currency: Romanian leu
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://home.kpmg.com/xx/en/home/insights/2011/12/romania-other-taxes-levies.html'],['Income Tax', 'http://www.worldwide-tax.com/romania/romania_taxes.asp']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	totalTax += 0.16 * netIncome;

	// VAT Tax [general, groceries, misc]
	var vat = [0.24];
	var vatSum = 0;

	// Social Security
	var maxAmt = 2415 * 5;
	var socSec = 0;
	socSec += 0.06 * income;
	if (income >= maxAmt){socSec += 0.105 * maxAmt;}
	if (income < maxAmt){socSec += 0.105 * income;}

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function netherlands(income,status){
	// Currency: Euros
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_the_Netherlands'],['Income Tax','https://en.wikipedia.org/wiki/Income_tax_in_the_Netherlands']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome >= 19922){totalTax += 0.3655 * 19922;}
	if (netIncome < 19922){totalTax += 0.3655 * netIncome;}

	if (netIncome >= 66421){totalTax += 0.4040 * (66421 - 19922);}
	if (netIncome < 66421 && netIncome > 19922){totalTax += 0.4040 * (netIncome - 19922);}

	if (netIncome > 66421){totalTax += 0.52 * (netIncome - 66421);}

	// VAT Tax [general, groceries, misc]
	var vat = [0.21, 0.06];
	var vatSum = 0;

	// €2001 tax credit applied
	totalTax -= 2001;

	return [totalTax, totalTax/income]
}

function belgium(income,status, dependents){
	// Currency: Euros
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Belgium']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;
	deductions += 7070;
	for (var i = 1; i <= dependents; i++){
		if (i == 1){deductions += 1500;}
		if (i == 2){deductions += 3870;}
		if (i == 3){deductions += 8670;}
		if (i == 4){deductions += 14020;}
	}

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome >= 8680){totalTax += 0.25 * 8680;}
	if (netIncome < 8680){totalTax += 0.25 * netIncome;}

	if (netIncome >= 12360){totalTax += 0.30 * (12360 - 8680);}
	if (netIncome < 12360 && netIncome > 8680){totalTax += 0.30 * (netIncome - 8680);}

	if (netIncome >= 20600){totalTax += 0.4 * (20600 - 12360);}
	if (netIncome < 20600 && netIncome > 12360){totalTax += 0.4 * (netIncome - 12360);}

	if (netIncome >= 37750){totalTax += 0.45 * (37750 - 20600);}
	if (netIncome < 37750 && netIncome > 20600){totalTax += 0.45 * (netIncome - 20600);}

	if (netIncome > 37750){totalTax += 0.5 * (netIncome - 37750);}

	// VAT Tax [general, groceries, misc]
	var vat = [0.21, 0.06];
	var vatSum = 0;

	// Social Security
	var socSec = 0.1307 * income;

	totalTax += socSec;
	return [totalTax, totalTax/income]
}
// UP THRU FEB 19
function greece(income,status){
	// Currency: Euro
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Greece'],['VAT Breakdown','http://livingingreece.gr/2010/07/01/vat-fpa-taxes-greece/']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome < 25000){totalTax += 0.22 * netIncome;}
	if (netIncome >= 25000){totalTax += 0.22 * (25000 - 0);}

	if (netIncome >= 42000){totalTax += 0.32 * (42000 - 25000);}
	if (netIncome < 42000 && netIncome > 25000){totalTax += 0.32 * (netIncome - 25000);}

	if (netIncome > 42000){totalTax += 0.42 * (netIncome - 42000);}

	// VAT Tax [general, groceries, books and a few other things]
	var vat = [0.23, 0.13, 0.065];
	var vatSum = 0;

	// Social Security
	var socSec = 0.155 * income;

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function czechRepublic(income,status){
	// Currency: Czech Koruna
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_the_Czech_Republic']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	totalTax += 0.15 * netIncome;

	// VAT Tax [general, groceries, misc]
	var vat = [0.21, 0.15];
	var vatSum = 0;

	// Social Security
	var socSec += 0.13 * income;

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function portugal(income,status,dependents){
	// Currency: Euro
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Portugal'],['Deductions','https://www.justlanded.com/english/Portugal/Portugal-Guide/Money/Income-tax-allowances']];
	// Default Values
	if (status == 'undefined'){status == 'single';}
	if (dependents == 'undefined'){dependents = 0;}

	// Deductions
	var deductions = 0;
	deductions += 0.11 * income;
	deductions += 175.88;
	var baseDeduction = 0.70 * income;
	if (baseDeduction > 2484){baseDeduction = 2484;}
	deductions += baseDeduction;
	if (dependents > 0){
		for (var i = 1; i <= dependents; i++){
			deductions += 96.77;
		}
	}
	if (status == 'married'){deductions += 133.68;}

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome >= 7000){totalTax += 0.145 * (7000 - 0);}
	if (netIncome < 7000){totalTax += 0.145 * netIncome;}

	if (netIncome >= 20000){totalTax += 0.285 * (20000 - 7000);}
	if (netIncome < 20000 && netIncome > 7000){totalTax += 0.285 * (netIncome - 7000);}

	if (netIncome >= 40000){totalTax += 0.37 * (40000 - 20000);}
	if (netIncome < 40000 && netIncome > 20000){totalTax += 0.37 * (netIncome - 20000);}

	if (netIncome >= 80000){totalTax += 0.45 * (80000 - 40000);}
	if (netIncome < 80000 && netIncome > 40000){totalTax += 0.45 * (netIncome - 40000);}

	if (netIncome > 80000){totalTax += 0.48 * (netIncome - 80000);}

	// VAT Tax [general, groceries, wine/water/cultural events]
	var vat = [0.23, 0.06, 0.12];
	var vatSum = 0;

	// Social Security
	var socSec = 0.11 * income;

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function hungary(income,status, dependents){
	// Currency: HUF
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Hungary'],['Social Security','https://hro.ceu.edu/social-security-system']];
	// Default Values
	if (status == 'undefined'){status == 'single';}
	if (dependents == 'undefined'){dependents = 0;}

	// Deductions
	var deductions = 0;
	if (dependents > 0 && dependents < 3){
		for (var i = 1; i <= dependents; i++){deductions += 62500;}
	}
	else if (dependents > 2){
		for (var i = 1; i <= dependents; i++){deductions += 206250;}
	}
	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	totalTax += 0.16 * netIncome;

	// VAT Tax [general, bakery/dairy, medicine]
	var vat = [0.27, 0.18, 0.05];
	var vatSum = 0;

	// Social Security
	var socSec = 0.185 * income;

	totalTax += socSec;
	return [totalTax, totalTax/income]
}

function sweden(income,status){
	// Currency: kroner
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Sweden'],['Deductions','https://home.kpmg.com/xx/en/home/insights/2011/12/sweden-income-tax.html'],['Social Security','https://www.ssa.gov/policy/docs/progdesc/ssptw/2014-2015/europe/sweden.html']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;
	if (income <= 44400){deductions += 18900;}
	if (income > 44400 && income <= 120900){deductions += ((income - 44400)/(120900 - 44400)) * (34200 - 19000);}
	if (income > 120900 && income <= 139000){deductions += 34300;}
	if (income > 139000 && income <= 350000){deductions += ((income - 139000)/(350000 - 139000)) * (34200 - 13200);}
	if (income > 350000){deductions += 13100;}

	var netIncome = income - deductions;
	if (netIncome < 0){netIncome = 0;}
	var totalTax = 0;

	// Income Tax
	if (netIncome <= 18800){totalTax += 0;}

	if (netIncome >= 433900){totalTax += 0.31 * (433900 - 18800);}
	if (netIncome > 18800 && netIncome < 433900){totalTax += 0.31 * (netIncome - 18800);}

	if (netIncome >= 615700){totalTax += 0.51 * (615700 - 433900);}
	if (netIncome > 433900 && netIncome < 615700){totalTax += 0.51 * (netIncome - 433900);}

	if (netIncome > 615700){totalTax += 0.56 * (netIncome - 615700);}

	// VAT Tax [general, groceries, cultural events]
	var vat = [0.25, 0.12, 0.06];
	var vatSum = 0;

	// Social Security
	var socSec = 0;
	if (netIncome >= 18781 && netIncome <= 459183){socSec += 0.07451 * netIncome;}
	if (netIncome > 459183){socSec += 0.07451 * 459183;}

	return [totalTax, totalTax/income]
}

function austria(income,status){
	// Currency: Euro
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','https://en.wikipedia.org/wiki/Taxation_in_Austria'],['Social Security','https://www.ssa.gov/policy/docs/progdesc/ssptw/2012-2013/europe/austria.html']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax
	if (netIncome >= 7270){totalTax += 0.21 * (7270 - 3640);}
	if (netIncome > 3640 && netIncome < 7270){totalTax += 0.21 * (netIncome - 3640);}

	if (netIncome >= 21800){totalTax += 0.31 * (21800 - 7270);}
	if (netIncome > 7270 && netIncome < 21800){totalTax += 0.31 * (netIncome - 7270);}

	if (netIncome >= 50870){totalTax += 0.41 * (50870 - 21800);}
	if (netIncome > 21800 && netIncome < 50870){totalTax += 0.41 * (netIncome - 50870);}

	if (netIncome > 51000){totalTax += 0.50 * (netIncome - 51000);}

	// VAT Tax [general, groceries, most entertainment stuff]
	var vat = [0.20, 0.10, 0.10];
	var vatSum = 0;

	// Social Security
	var socSec = 0;
	if (income/12 > 4230){
		socSec += 0.1025 * (12 * 4230);
	}
	else socSec += 0.1025 * income;

	return [totalTax, totalTax/income]
}

function switzerland(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['VAT tax','https://en.wikipedia.org/wiki/Taxation_in_Switzerland'],['Social Security','https://www.ssa.gov/policy/docs/progdesc/ssptw/2012-2013/europe/switzerland.html'],['Income Tax','http://taxsummaries.pwc.com/uk/taxsummaries/wwts.nsf/ID/Switzerland-Individual-Taxes-on-personal-income']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function bulgaria(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function serbia(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function denmark(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function finland(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function norway(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function ireland(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function croatia(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

function iceland(income,status){
	// Currency: #####
	// VAT CURRENTLY UNIMPLEMENTED
	var sources = [['General Info','']];
	// Default Values
	if (status == 'undefined'){status == 'single';}

	// Deductions
	var deductions = 0;

	var netIncome = income - deductions;
	var totalTax = 0;

	// Income Tax

	// VAT Tax [general, groceries, misc]
	var vat = [];
	var vatSum = 0;

	// ### OTHER TAXES ###

	return [totalTax, totalTax/income]
}

console.log(belgium(72000))
