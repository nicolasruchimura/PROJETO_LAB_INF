// Set up the Chart.js chart
const ctx = document.getElementById('spending-chart').getContext('2d');

// Initialize empty data for the chart
let chartData = {
    labels: [], // Dates
    datasets: [{
        label: 'Quantia Gasta (EUR) x Tempo',
        data: [], // Spending amounts
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
    }]
};

// Initialize the chart
const spendingChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Data'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Quantia Gasta (EUR)'
                }
            }
        }
    }
});

// Handle form submission
document.getElementById('spending-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const dateInput = document.getElementById('date');
    const amountInput = document.getElementById('amount');

    // Get the values from the form
    const date = dateInput.value;
    const amount = parseFloat(amountInput.value);

    // Add the data to the chart
    if (date && !isNaN(amount)) {
        // Add the date and amount to the chart data
        chartData.labels.push(date);
        chartData.datasets[0].data.push(amount);

        // Update the chart
        spendingChart.update();

        // Store the data in localStorage (optional)
        localStorage.setItem('spendingData', JSON.stringify(chartData));

        // Clear the form
        dateInput.value = '';
        amountInput.value = '';
    } else {
        alert("Por favor, introduza dados válidos.");
    }
});

// Load saved data from localStorage (optional)
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('spendingData');
    if (savedData) {
        chartData = JSON.parse(savedData);
        spendingChart.update();
    }
});
