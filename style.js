:root {
    --primary: #2c3e50;
    --accent: #27ae60;
    --bg: #f4f7f6;
    --card-bg: #ffffff;
    --text: #333;
    --border: #ddd;
    --input-bg: #eaf6ff;
    --input-border: #b3d4fc;
    --header-bg: #34495e;
    --error: #e74c3c;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg);
    color: var(--text);
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
}

.container {
    width: 100%;
    max-width: 1300px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

/* Header */
.header-section {
    grid-column: 1 / -1;
    background: var(--card-bg);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 4px solid var(--accent);
}

h1 {
    margin: 0 0 15px 0;
    color: var(--primary);
    font-weight: 300;
    text-align: center;
}

.type-selector {
    display: flex;
    gap: 15px;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.type-btn {
    padding: 10px 20px;
    border: 2px solid var(--primary);
    background: transparent;
    color: var(--primary);
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
}

.type-btn:hover {
    background-color: #ecf0f1;
}

.type-btn.active {
    background-color: var(--primary);
    color: white;
    border-color: var(--primary);
    box-shadow: 0 4px 10px rgba(44, 62, 80, 0.3);
}

/* Card */
.card {
    background: var(--card-bg);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.card.full-width-card {
    grid-column: 1 / -1;
}

h2 {
    color: var(--primary);
    border-bottom: 2px solid var(--accent);
    padding-bottom: 10px;
    margin-top: 0;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Forms */
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.form-group {
    margin-bottom: 15px;
    position: relative;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #555;
}

input, select {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--input-border);
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box; 
    transition: all 0.3s;
    background-color: var(--input-bg);
    color: #2c3e50;
    font-weight: 500;
}

input:focus {
    outline: none;
    border-color: var(--accent);
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
}

input[readonly], input:disabled {
    background-color: #e9ecef;
    color: #777;
    cursor: not-allowed;
    border-color: #ccc;
    box-shadow: none;
}

/* Tooltip */
.tooltip-container {
    cursor: help;
    display: flex;
    align-items: center;
    gap: 5px;
}

.tooltip-text {
    visibility: hidden;
    width: 220px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 10;
    bottom: 125%;
    left: 50%;
    margin-left: -110px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 0.8rem;
    font-weight: normal;
}

.tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}

/* Erro */
.error-msg {
    color: var(--error);
    font-size: 0.8rem;
    margin-top: 4px;
    display: block;
}

/* Disclaimer */
.disclaimer-box {
    grid-column: 1 / -1;
    background-color: #fff3cd;
    border-left: 5px solid #ffc107;
    padding: 10px;
    font-size: 0.85rem;
    color: #856404;
    margin-top: 10px;
    border-radius: 4px;
}

/* Checkbox wrapper */
.checkbox-wrapper {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    background-color: #fff3cd;
    padding: 12px 15px;
    border-radius: 6px;
    border: 1px solid #ffeeba;
    margin-bottom: 10px;
}

.checkbox-wrapper input[type="checkbox"] {
    width: auto;
    margin: 0;
    cursor: pointer;
    transform: scale(1.3);
}

.target-input {
    width: 80px !important;
    padding: 5px 10px !important;
    text-align: center;
    border: 1px solid #e0c46c !important; 
    background-color: #fff !important;
    font-weight: bold;
    color: #856404;
}

.calc-btn {
    grid-column: 1 / -1;
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s, transform 0.1s;
    margin-top: 10px;
    font-weight: bold;
}

.calc-btn:hover {
    background-color: #34495e;
    transform: translateY(-2px);
}

/* Results Styles */
.result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.result-item:last-child {
    border-bottom: none;
}

.result-label {
    font-size: 0.95rem;
    color: #666;
}

.result-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary);
}

.highlight-green {
    color: var(--accent);
    font-size: 1.4rem;
}

.highlight-blue {
    color: #2980b9;
}

.reference-val {
    color: #7f8c8d;
}

.explanation {
    font-size: 0.85rem;
    color: #888;
    margin-top: 5px;
    display: block;
}

/* TABLE STYLES */
.table-container {
    overflow-x: auto;
    margin-top: 15px;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem; 
}

th, td {
    padding: 10px 8px;
    text-align: right;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
}

th:first-child, td:first-child {
    text-align: center;
}

th {
    background-color: var(--primary);
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

tr.contemplacao-row {
    background-color: #fff3cd !important;
    border-left: 4px solid #ffc107;
}

tr.contemplacao-row td {
    color: #856404;
    font-weight: bold;
}

.positive-val { color: green; }
.negative-val { color: #c0392b; }

.final-balance { font-weight: bold; }
.final-balance.neg { color: #c0392b; }
.final-balance.pos { color: var(--primary); }

@media (max-width: 768px) {
    .container { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
}