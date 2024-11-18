document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Daily Expenses (USD)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }
            }
        }
    });

    document.getElementById('expenseForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (date && !isNaN(amount)) {
            const dateIndex = expenseChart.data.labels.indexOf(date);
            if (dateIndex !== -1) {
                expenseChart.data.datasets[0].data[dateIndex] += amount;
            } else {
                expenseChart.data.labels.push(date);
                expenseChart.data.datasets[0].data.push(amount);
            }
            expenseChart.update();
        }

        document.getElementById('expenseForm').reset();
    });
});
