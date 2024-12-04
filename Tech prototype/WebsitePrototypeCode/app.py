import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for local development

# Database initialization
def init_db():
    conn = sqlite3.connect('stock_data.db')
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS stock_prices (
        id INTEGER PRIMARY KEY,
        symbol TEXT,
        date TEXT,
        open REAL,
        close REAL,
        high REAL,
        low REAL
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS technical_indicators (
        id INTEGER PRIMARY KEY,
        symbol TEXT,
        indicator TEXT,
        timeframe TEXT,
        value REAL,
        signal TEXT
    )
    ''')
    
    conn.commit()
    conn.close()

# Initial data insertion (sample data)
def insert_sample_data():
    conn = sqlite3.connect('stock_data.db')
    cursor = conn.cursor()
    
    # Sample stock price data
    cursor.executemany('''
    INSERT OR REPLACE INTO stock_prices 
    (symbol, date, open, close, high, low) VALUES (?, ?, ?, ?, ?, ?)
    ''', [
        ('AAPL', '2024-01-01', 100.00, 105.50, 106.25, 99.75),
        ('GOOGL', '2024-01-01', 120.50, 125.75, 126.50, 119.25)
    ])
    
    # Sample technical indicators
    cursor.executemany('''
    INSERT OR REPLACE INTO technical_indicators 
    (symbol, indicator, timeframe, value, signal) VALUES (?, ?, ?, ?, ?)
    ''', [
        ('AAPL', 'RSI', '1day', 65.5, 'Buy'),
        ('GOOGL', 'MACD', '1week', 2.3, 'Hold')
    ])
    
    conn.commit()
    conn.close()

@app.route('/stock_data', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol', 'AAPL')
    
    conn = sqlite3.connect('stock_data.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM stock_prices WHERE symbol = ?', (symbol,))
    columns = [column[0] for column in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    conn.close()
    return jsonify(data)

@app.route('/technical_indicators', methods=['GET'])
def get_technical_indicators():
    symbol = request.args.get('symbol', 'AAPL')
    timeframe = request.args.get('timeframe', '1day')
    
    conn = sqlite3.connect('stock_data.db')
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT * FROM technical_indicators 
    WHERE symbol = ? AND timeframe = ?
    ''', (symbol, timeframe))
    
    columns = [column[0] for column in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    init_db()
    insert_sample_data()
    app.run(debug=True)
