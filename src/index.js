const mortgageAmount = document.querySelector(".mortgage-amount");
const mortgageTerm = document.querySelector(".mortgage-term");
const interestRate = document.querySelector(".interest-rate");
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interest-only");
const calculateBtn = document.querySelector(".calculate");
const resultsSection = document.querySelector(".completed");
const resultsContainer = document.querySelector(".results");
const emptySection = document.querySelector(".empty");

calculateBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let isValid = true;

    // Validaciones
    if (mortgageAmount.value === "") {
        showError(0, mortgageAmount);
        isValid = false;
    } else {
        hideError(0, mortgageAmount);
    }

    if (mortgageTerm.value === "") {
        showError(1, mortgageTerm);
        isValid = false;
    } else {
        hideError(1, mortgageTerm);
    }

    if (interestRate.value === "") {
        showError(2, interestRate);
        isValid = false;
    } else {
        hideError(2, interestRate);
    }

    if (!repayment.checked && !interestOnly.checked) {
        showError(3, document.querySelector(".mortgage-type"));
        isValid = false;
    } else {
        hideError(3, document.querySelector(".mortgage-type"));
    }

    if (isValid) {
        calculateResults();
        resultsSection.classList.remove("hidden");
        emptySection.classList.add("hidden");
    }
});

function calculateResults() {
    // Obtener los valores
    const principal = parseFloat(mortgageAmount.value);
    const years = parseFloat(mortgageTerm.value);
    const rate = parseFloat(interestRate.value) / 100;
    const months = years * 12;

    let monthlyPayment;

    if (repayment.checked) {
        const monthlyInterest = rate / 12;
        monthlyPayment = (principal * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -months));
    } else if (interestOnly.checked) {
        monthlyPayment = (principal * rate) / 12;
    }

    const totalPaid = monthlyPayment * months;

    resultsContainer.querySelector("span:nth-of-type(1)").textContent = `£${monthlyPayment.toFixed(2)}`;
    resultsContainer.querySelector("span:nth-of-type(2)").textContent = `£${totalPaid.toFixed(2)}`;
}

function showError(index, element) {
    const errorElements = document.querySelectorAll('.error-container .error');
    errorElements[index].style.display = 'block';
    element.classList.add('error-input'); 
}

function hideError(index, element) {
    const errorElements = document.querySelectorAll('.error-container .error');
    errorElements[index].style.display = 'none';
    element.classList.remove('error-input'); 
}
