function calculateTax() {
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const interest = parseFloat(document.getElementById('interest').value) || 0;
    const rental = parseFloat(document.getElementById('rental').value) || 0;
    const digitalAssets = parseFloat(document.getElementById('digital-assets').value) || 0;
    const otherIncome = parseFloat(document.getElementById('other-income').value) || 0;
    const exemptAllowances = parseFloat(document.getElementById('exempt-allowances').value) || 0;

    const homeLoanSelf = parseFloat(document.getElementById('home-loan-self').value) || 0;
    const homeLoanLet = parseFloat(document.getElementById('home-loan-let').value) || 0;
    const deductions80C = parseFloat(document.getElementById('deductions-80c').value) || 0;
    const interest80TTA = parseFloat(document.getElementById('interest-80tta').value) || 0;
    const medicalInsurance = parseFloat(document.getElementById('medical-insurance').value) || 0;
    const donations = parseFloat(document.getElementById('donations').value) || 0;
    const educationalLoan = parseFloat(document.getElementById('educational-loan').value) || 0;
    const housingLoan = parseFloat(document.getElementById('housing-loan').value) || 0;
    const nps = parseFloat(document.getElementById('nps').value) || 0;

    const totalIncome = salary + interest + rental + digitalAssets + otherIncome;
    const totalDeductions = Math.min(150000, deductions80C) + interest80TTA + medicalInsurance + donations + educationalLoan + housingLoan + nps;
    const taxableIncome = totalIncome - totalDeductions;

    const ageRange = document.getElementById('age-range').value;
    const taxDue = calculateTaxDue(taxableIncome, ageRange);

    document.getElementById('total-income-old').textContent = `Rs. ${totalIncome.toFixed(2)}`;
    document.getElementById('total-income-new').textContent = `Rs. ${totalIncome.toFixed(2)}`;
    document.getElementById('exemptions-old').textContent = `Rs. ${totalDeductions.toFixed(2)}`;
    document.getElementById('exemptions-new').textContent = `Rs. ${totalDeductions.toFixed(2)}`;
    document.getElementById('taxable-income-old').textContent = `Rs. ${taxableIncome.toFixed(2)}`;
    document.getElementById('taxable-income-new').textContent = `Rs. ${taxableIncome.toFixed(2)}`;
    document.getElementById('tax-due-old').textContent = `Rs. ${taxDue.toFixed(2)}`;
    document.getElementById('tax-due-new').textContent = `Rs. ${taxDue.toFixed(2)}`;

    // Update suggestion based on the regime
    document.getElementById('suggestion').textContent = 'ClearTax Suggestion: You should opt for Old Regime as it allows you to avail exemptions and deductions from your income sources.';
}

function calculateTaxDue(taxableIncome, ageRange) {
    let taxDue = 0;
    let slabs;

    if (ageRange === 'below-60') {
        slabs = [
            { limit: 250000, rate: 0.05 },
            { limit: 500000, rate: 0.1 },
            { limit: 1000000, rate: 0.15 },
            { limit: Infinity, rate: 0.3 }
        ];
    } else if (ageRange === '60-80') {
        slabs = [
            { limit: 300000, rate: 0.05 },
            { limit: 500000, rate: 0.1 },
            { limit: 1000000, rate: 0.15 },
            { limit: Infinity, rate: 0.3 }
        ];
    } else if (ageRange === 'above-80') {
        slabs = [
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.1 },
            { limit: Infinity, rate: 0.15 }
        ];
    }

    let previousLimit = 0;
    slabs.forEach(slab => {
        if (taxableIncome > previousLimit) {
            let taxableAtSlab = Math.min(taxableIncome - previousLimit, slab.limit - previousLimit);
            taxDue += taxableAtSlab * slab.rate;
            previousLimit = slab.limit;
        }
    });

    return taxDue;
}
