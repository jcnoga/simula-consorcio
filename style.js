:root {
    --primary: #2c3e50;
    --accent: #27ae60;
    --bg-body: #f4f7f6;
    --bg-card: #ffffff;
    --input-bg: #eaf6ff;
    --input-border: #b3d4fc;
    --text-main: #333333;
    --text-muted: #7f8c8d;
    --error-color: #c0392b;
    --info-bg: #fff3cd;
    --info-border: #ffeeba;
}

* { box-sizing: border-box; }

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-body);
    color: var(--text-main);
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

/* --- ESTILOS DE AUTENTICAÇÃO (LOGIN) --- */
#auth-container {
    width: 100%;
    max-width: 400px;
    margin-top: 50px;
    display: flex; /* Começa visível */
    flex-direction: column;
    gap: 20px;
}

.auth-card {
    background: var(--bg-card);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    text-align: center;
}

.auth-card h2 { color: var(--primary); margin-bottom: 20px; }

.auth-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid var(--input-border);
    background-color: var(--input-bg);
    border-radius: 4px;
    font-size: 1rem;
}

.auth-btn {
    width: 100%;
    padding: 12px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
}
.auth-btn:hover { background-color: #34495e; }

.auth-link {
    display: block;
    margin-top: 15px;
    color: var(--primary);
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
}

.error-message {
    color: var(--error-color);
    font-size: 0.85rem;
    margin-bottom: 10px;
    display: none;
}

/* --- ESTILOS DO APP (SIMULADOR) --- */
#app-container {
    display: none; /* Começa oculto */
    width: 100%;
    max-width: 1200px;
    flex-direction: column;
    align-items: center;
}

.header-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.logout-btn {
    background-color: var(--error-color);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
}

h1 { color: var(--text-muted); font-weight: 300; margin-bottom: 25px; text-align: center; }
.type-selector { margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; align-items: center; }
.type-btn { background: #e0e0e0; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; color: #555; font-weight: 600; transition: 0.3s; }
.type-btn.active { background-color: var(--primary); color: white; }
.info-icon { font-size: 1.1rem; color: var(--primary); cursor: pointer; font-weight: bold; margin-left: -5px; }

.grid-container { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; }
.card { background: var(--bg-card); padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.card.full-width { grid-column: 1 / -1; margin-top: 20px; }

h2 { color: var(--primary); font-size: 1rem; text-transform: uppercase; font-weight: 700; margin-top: 0; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid var(--accent); }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.form-group { margin-bottom: 5px; }
.form-group.full-width { grid-column: 1 / -1; }

label { display: block; margin-bottom: 5px; font-weight: 700; font-size: 0.85rem; color: #444; }
input[type="number"], input[type="text"], select { width: 100%; padding: 10px 12px; border: 1px solid var(--input-border); background-color: var(--input-bg); border-radius: 4px; font-size: 0.95rem; color: var(--primary); font-weight: 500; outline: none; }
input:focus, select:focus { border-color: var(--accent); background-color: #fff; }
input:disabled, input[readonly] { background-color: #e2e6ea; color: #888; cursor: not-allowed; }

.highlight-box { grid-column: 1 / -1; background-color: var(--info-bg); border: 1px solid var(--info-border); border-radius: 4px; padding: 12px 15px; display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.small-input { width: 70px !important; padding: 5px !important; text-align: center; background-color: #fff !important; border-color: #e0c46c !important; }
.helper-text { font-size: 0.7rem; color: #999; margin-top: 3px; display: block; }

.calc-btn { grid-column: 1 / -1; background-color: var(--primary); color: white; border: none; padding: 15px; border-radius: 5px; font-size: 1rem; text-transform: uppercase; font-weight: bold; cursor: pointer; margin-top: 15px; }
.calc-btn:hover { background-color: #34495e; }

.result-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
.result-row:last-child { border-bottom: none; }
.res-label-group { display: flex; flex-direction: column; }
.res-label { font-size: 0.9rem; color: #666; font-weight: 400; }
.res-desc { font-size: 0.75rem; color: #aaa; margin-top: 2px; }
.res-value { font-size: 1.1rem; font-weight: 700; color: var(--primary); }
.text-green { color: var(--accent); font-size: 1.3rem; }
.text-blue { color: #3498db; }
.text-red { color: var(--error-color); }
.dashed-separator { border: 0; border-top: 1px dashed #ccc; margin: 20px 0; }

.table-container { max-height: 400px; overflow-y: auto; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th { background-color: var(--primary); color: white; padding: 10px; text-align: center; position: sticky; top: 0; z-index: 1; }
td { padding: 8px 10px; border-bottom: 1px solid #eee; text-align: right; color: #555; }
tr:nth-child(even) { background-color: #f9f9f9; }
.contemplacao-row { background-color: var(--info-bg) !important; border-left: 4px solid #ffc107; font-weight: bold; }
.comparison-section { background-color: #eaf6ff; padding: 15px; border-radius: 6px; margin-top: 20px; }
.comparison-section h3 { margin-top: 0; color: var(--primary); font-size: 1rem; }
.projection-section { background-color: #fafafa; padding: 15px; border-radius: 6px; margin-top: 20px; border: 1px solid #e0e0e0; }

/* --- ESTILOS DO MODAL DE INFORMAÇÃO --- */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0; top: 0;
    width: 100%; height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.6);
    align-items: center;
    justify-content: center;
}
.modal-content {
    background-color: #fff;
    margin: auto;
    padding: 25px 30px;
    border: 1px solid #888;
    width: 90%;
    max-width: 650px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    animation: slide-down 0.3s ease-out;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px; }
.modal-header h3 { margin: 0; color: var(--primary); }
.modal-body p { line-height: 1.6; font-size: 0.95rem; }
.modal-body strong { color: var(--primary); }
.close-btn { color: #aaa; font-size: 28px; font-weight: bold; cursor: pointer; }
.close-btn:hover { color: #000; }
@keyframes slide-down { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

@media (max-width: 768px) {
    .grid-container { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
}