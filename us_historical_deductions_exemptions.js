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

var usHistoricalDeductionsExemptions = '[\n ' + [
'{"year": 1935, "expemption": {"married person": 2500, "single person": 1000, "amount per dependent": 400, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 0, "head of household": 0, "married couple": 0, "source": null, "notes": "Doesn\'t appear to be any deductions allowed?"}}',
'{"year": 1940, "expemption": {"married person": 2000, "single person": 800, "amount per dependent": 400, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 0, "head of household": 0, "married couple": 0, "source": null, "notes": "Doesn\'t appear to be any deductions allowed?"}}',
'{"year": 1945, "expemption": {"married person": 1000, "single person": 500, "amount per dependent": 500, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": null, "head of household": null, "married couple": null, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?Docid=171", "notes": "Deduction is 10% of of income up to $1000 max"}}',
'{"year": 1950, "expemption": {"married person": 1200, "single person": 600, "amount per dependent": 600, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": null, "head of household": null, "married couple": null, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?Docid=171", "notes": "Deduction is 10% of of income up to $1000 max"}}',
'{"year": 1955, "expemption": { "married person": 1200, "single person": 600, "amount per dependent": 600, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": null, "head of household": null, "married couple": null, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?Docid=171", "notes": "Deduction is 10% of of income up to $1000 max"}}',
'{"year": 1960, "expemption": {"married person": 1200, "single person": 600, "amount per dependent": 600, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": null, "head of household": null, "married couple": null, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?Docid=171", "notes": "Deduction is 10% of of income up to $1000 max"}}',
'{"year": 1965, "expemption": {"married person": 1200, "single person": 600, "amount per dependent": 600, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": null, "head of household": null, "married couple": null, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?Docid=171", "notes": "Deduction is 10% of of income up to $1000 max"}}',
'{"year": 1970, "expemption": {"married person": 1250, "single person": 625, "amount per dependent": 625, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006" }, "deduction": {"single": 1100, "head of household": 1100, "married couple": 1100, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 1975, "expemption": {"married person": 1500, "single person": 750, "amount per dependent": 750, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 1600, "head of household": 1600, "married couple": 1900, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 1980, "expemption": {"married person": 2000, "single person": 1000, "amount per dependent": 1000, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 2300, "head of household": 2300, "married couple": 3400, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 1985, "expemption": {"married person": 2000, "single person": 1000, "amount per dependent": 1000, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 2400, "head of household": 2400, "married couple": 3550, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 1990, "expemption": {"married person": 4100, "single person": 2050, "amount per dependent": 2050, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 3250, "head of household": 4750, "married couple": 5450, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 1995, "expemption": {"married person": 5000, "single person": 2500, "amount per dependent": 2500, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 3900, "head of household": 5750, "married couple": 6550, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 2000, "expemption": {"married person": 5600, "single person": 2800, "amount per dependent": 2800, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 4400, "head of household": 6450, "married couple": 7350, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 2005, "expemption": {"married person": 6200, "single person": 3100, "amount per dependent": 3100, "source": "http://taxfoundation.org/article/federal-individual-income-tax-exemptions-and-treatment-dividends-1913-2006"}, "deduction": {"single": 5000, "head of household": 7300, "married couple": 10000, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 2010, "expemption": {"married person": 7300, "single person": 3650, "amount per dependent": 3650, "source": "http://www.bankrate.com/finance/taxes/2010-exemption-amounts.aspx"}, "deduction": {"single": 5700, "head of household": 8400, "married couple": 11400, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}',
'{"year": 2015, "expemption": {"married person": 8000, "single person": 4000, "amount per dependent": 4000, "source": "https://www.irs.com/articles/2015-federal-tax-rates-personal-exemptions-and-standard-deductions"}, "deduction": {"single": 6300, "head of household": 9250, "married couple": 12600, "source": "http://www.taxpolicycenter.org/taxfacts/displayafact.cfm?DocID=171&Topic2id=30&Topic3id=39"}}'
].join(',\n ') + '\n]';

if (typeof module != "undefined" && module.exports)
module.exports = usHistoricalDeductionsExemptions;