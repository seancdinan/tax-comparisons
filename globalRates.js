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


console.log(poland(20000))
