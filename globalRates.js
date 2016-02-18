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

		if (netIncome > 11991){totalTax += (11991 - 6011)*0.055;}
		else if (netIncome > 6011 && netIncome < 11991){totalTax += (netIncome - 6011)*0.055; return totalTax;}

		if (netIncome > 26631){totalTax += (26631 - 11991)*0.14;}
		else if (netIncome > 11991 && netIncome < 26631){totalTax += (netIncome - 11991)*0.14; return totalTax;}

		if (netIncome > 71397){totalTax += (71397 - 26631)*0.30;}
		else if (netIncome > 26631 && netIncome < 71397){totalTax += (netIncome - 26631)*0.30; return totalTax;}

		if (netIncome > 71397 && netIncome < 151200){totalTax += (netIncome - 71397)*0.41; return totalTax;}
		if (netIncome > 151200){totalTax += (151200 - 71397)*0.41; totalTax += (netIncome - 151200)*0.45;return totalTax;}
	
	// vat = [standard, groceries, books/restaurants]
	var vat = [0.2,0.055,0.1];
	var totalVat = vat[0] * expenses;
	var socialSecurity = 0.08*(0.97*income);

}

console.log(france(14000,'single'))

