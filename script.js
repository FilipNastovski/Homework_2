// Populate Stock Data Table
function populateStockDataTable() {
    const dataBody = document.getElementById('stock-data-body');
    const sampleData = [
        {date: '2024-01-01', open: 100.00, close: 105.50, high: 106.25, low: 99.75},
        {date: '2024-01-02', open: 105.50, close: 107.20, high: 108.00, low: 104.75},
        {date: '2024-01-03', open: 107.20, close: 106.80, high: 108.50, low: 106.00},
        {date: '2024-01-04', open: 106.80, close: 110.25, high: 111.00, low: 106.50},
        {date: '2024-01-05', open: 110.25, close: 112.40, high: 113.00, low: 109.75}
    ];

    dataBody.innerHTML = sampleData.map(row => `
        <tr>
            <td>${row.date}</td>
            <td>${row.open.toFixed(2)}</td>
            <td>${row.close.toFixed(2)}</td>
            <td>${row.high.toFixed(2)}</td>
            <td>${row.low.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Populate Technical Indicators Table
function populateTechnicalIndicatorsTable() {
    const indicatorsBody = document.getElementById('technical-indicators-body');
    const indicators = [
        {name: 'RSI', category: 'Oscillator', value: 65.5, signal: 'Buy'},
        {name: 'MACD', category: 'Oscillator', value: 2.3, signal: 'Hold'},
        {name: 'Stochastic', category: 'Oscillator', value: 45.2, signal: 'Neutral'},
        {name: 'Simple MA', category: 'Moving Average', value: 120.5, signal: 'Buy'},
        {name: 'Exponential MA', category: 'Moving Average', value: 118.7, signal: 'Hold'}
    ];

    indicatorsBody.innerHTML = indicators.map(indicator => `
        <tr>
            <td>${indicator.name}</td>
            <td>${indicator.category}</td>
            <td>${indicator.value.toFixed(2)}</td>
            <td>${indicator.signal}</td>
        </tr>
    `).join('');
}

// Tab Switching (keep the previous tab switching code)
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(tabId).classList.add('active');

        // Populate data for specific tabs
        if (tabId === 'scraping') {
            populateStockDataTable();
        } else if (tabId === 'technical') {
            populateTechnicalIndicatorsTable();
        }
    });
});

// Ensure first tab is populated on load
document.addEventListener('DOMContentLoaded', () => {
    const firstTabButton = document.querySelector('.tab-button');
    if (firstTabButton) {
        firstTabButton.click();
    }
});

// Existing functions from previous script
function scrapeData() {
    const issuerCode = document.getElementById('search-code').value;
    populateStockDataTable();
}

// Training Ratio Slider
document.getElementById('training-ratio').addEventListener('input', (e) => {
    document.getElementById('training-ratio-value').textContent = `${e.target.value}%`;
});

// Sentiment Analysis Slider
document.getElementById('sentiment-score').addEventListener('input', (e) => {
    const score = e.target.value;
    const resultDiv = document.getElementById('sentiment-result');

    if (score < 40) {
        resultDiv.textContent = 'Sentiment: Negative (Recommendation: Sell)';
        resultDiv.style.color = 'red';
    } else if (score < 60) {
        resultDiv.textContent = 'Sentiment: Neutral (Recommendation: Hold)';
        resultDiv.style.color = 'orange';
    } else {
        resultDiv.textContent = 'Sentiment: Positive (Recommendation: Buy)';
        resultDiv.style.color = 'green';
    }
});

function runPrediction() {
    const trainingRatio = document.getElementById('training-ratio').value;
    const metricsDiv = document.getElementById('prediction-metrics');

    metricsDiv.innerHTML = `
        <p>Mean Squared Error: 0.0245</p>
        <p>Root Mean Squared Error: 0.1567</p>
    `;
}