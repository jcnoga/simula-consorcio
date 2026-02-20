// Importa as funções do Firebase v10
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ==============================================================
// 1. CONFIGURAÇÃO DO FIREBASE
// ==============================================================
const firebaseConfig = { 
    apiKey: "AIzaSyAF0czNY5fMmLWN5J95asCuEmeU3yyPYO0", 
    authDomain: "consorcio-86c07.firebaseapp.com", 
    projectId: "consorcio-86c07", 
    storageBucket: "consorcio-86c07.firebasestorage.app", 
    messagingSenderId: "153431493199", 
    appId: "1:153431493199:web:73f85c87fcfa193434383a", 
    measurementId: "G-Q3DRJ1SN4L" 
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==============================================================
// 2. LÓGICA DE AUTENTICAÇÃO E INTERFACE
// ==============================================================

const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const resetCard = document.getElementById('reset-card');

onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = 'none';
        appContainer.style.display = 'flex';
        // Garante que setSimulationType está disponível globalmente antes de chamar
        if(window.setSimulationType) window.setSimulationType('consorcio_veiculo');
    } else {
        authContainer.style.display = 'flex';
        appContainer.style.display = 'none';
        showCard('login');
    }
});

function showCard(cardName) {
    loginCard.style.display = 'none'; 
    registerCard.style.display = 'none'; 
    resetCard.style.display = 'none';
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    if(cardName === 'login') loginCard.style.display = 'block';
    if(cardName === 'register') registerCard.style.display = 'block';
    if(cardName === 'reset') resetCard.style.display = 'block';
}

document.getElementById('link-to-register').onclick = () => showCard('register');
document.getElementById('link-to-login').onclick = () => showCard('login');
document.getElementById('link-back-login').onclick = () => showCard('login');
document.getElementById('link-to-reset').onclick = () => showCard('reset');

document.getElementById('btn-login').onclick = () => { 
    signInWithEmailAndPassword(auth, document.getElementById('login-email').value, document.getElementById('login-password').value)
    .catch((error) => { 
        const el = document.getElementById('login-error'); 
        el.innerText = "Erro: " + error.message; 
        el.style.display = 'block'; 
    }); 
};

document.getElementById('btn-register').onclick = () => { 
    createUserWithEmailAndPassword(auth, document.getElementById('reg-email').value, document.getElementById('reg-password').value)
    .then(() => alert("Conta criada com sucesso!"))
    .catch((error) => { 
        const el = document.getElementById('register-error'); 
        el.innerText = error.message; 
        el.style.display = 'block'; 
    }); 
};

document.getElementById('btn-reset').onclick = () => { 
    sendPasswordResetEmail(auth, document.getElementById('reset-email').value)
    .then(() => { 
        const el = document.getElementById('reset-msg'); 
        el.innerText = "Email de recuperação enviado!"; 
        el.style.display = 'block'; 
        el.style.color = 'green'; 
    }).catch((error) => { 
        const el = document.getElementById('reset-msg'); 
        el.innerText = error.message; 
        el.style.display = 'block'; 
        el.style.color = 'red'; 
    }); 
};

document.getElementById('btn-logout').onclick = () => signOut(auth);


// ==============================================================
// 3. LÓGICA DOS SIMULADORES
// ==============================================================

const CONFIGS = {
    consorcio_veiculo: { titulo: "PARÂMETROS (CONS. VEÍCULOS)", carta: 75000, taxa: 23.4, prazo: 76, rendLabel: "Rend. Extra (R$)", expl: "Após contemplação", th: "EXTRA (+)", desc: 30, reaj: 6.0 },
    consorcio_imovel: { titulo: "PARÂMETROS (CONS. IMÓVEIS)", carta: 400000, taxa: 24.0, prazo: 180, rendLabel: "Aluguel (R$)", expl: "Após chaves", th: "ALUGUEL (+)", desc: 0, reaj: 6.0 },
    consorcio_equipamento: { titulo: "PARÂMETROS (CONS. EQUIPAMENTOS)", carta: 150000, taxa: 18.0, prazo: 60, rendLabel: "Lucro (R$)", expl: "Retorno produtivo", th: "LUCRO (+)", desc: 0, reaj: 5.0 },
    financiamento_cdb: { titulo: "PARÂMETROS (FINANC. GARANTIA CDB)" }
};
const formatarMoeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const getFloat = (id) => parseFloat(document.getElementById(id).value.replace(',', '.')) || 0;
const getInt = (id) => parseInt(document.getElementById(id).value) || 0;
const getValue = (id) => document.getElementById(id).value;
const getChecked = (id) => document.getElementById(id).checked;

// Anexa a função à janela global para que o HTML (onclick) possa acessá-la
window.setSimulationType = function(type) {
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    const clickedButton = Array.from(document.querySelectorAll('.type-btn')).find(b => b.getAttribute('onclick') === `setSimulationType('${type}')`);
    if (clickedButton) clickedButton.classList.add('active');
    const isConsorcio = type.startsWith('consorcio');
    document.getElementById('consorcio-inputs').style.display = isConsorcio ? 'block' : 'none';
    document.getElementById('consorcio-results').style.display = isConsorcio ? 'block' : 'none';
    document.getElementById('consorcio-table-card').style.display = isConsorcio ? 'block' : 'none';
    document.getElementById('financiamento-inputs').style.display = !isConsorcio ? 'block' : 'none';
    document.getElementById('financiamento-results').style.display = !isConsorcio ? 'block' : 'none';
    document.getElementById('financiamento-table-card').style.display = !isConsorcio ? 'block' : 'none';
    const c = CONFIGS[type];
    document.getElementById('tituloParametros').innerText = c.titulo;
    document.getElementById('tituloResultados').innerText = isConsorcio ? "RESULTADOS DO CONSÓRCIO" : "RESULTADOS DO FINANCIAMENTO";
    if (isConsorcio) {
        document.getElementById('labelRendimentoExtra').innerText = c.rendLabel;
        document.getElementById('explRendimentoExtra').innerText = c.expl;
        document.getElementById('thRendaExtra').innerText = c.th;
        document.getElementById('valorCarta').value = c.carta;
        document.getElementById('taxaAdmin').value = c.taxa;
        document.getElementById('prazoTotal').value = c.prazo;
        document.getElementById('pctDesconto').value = c.desc;
        document.getElementById('taxaReajuste').value = c.reaj;
        window.atualizarDadosEntrada();
        window.calcularConsorcio();
    } else {
        window.calcularFinanciamento();
    }
}

window.toggleAutoLance = function() {
    const chk = document.getElementById('chkAutoLance');
    const livre = document.getElementById('lanceLivre');
    const target = document.getElementById('targetPercent');
    livre.readOnly = chk.checked;
    target.disabled = !chk.checked;
    if (chk.checked) window.atualizarDadosEntrada();
}

window.atualizarDadosEntrada = function() {
    const carta = getFloat('valorCarta');
    const pctEmb = getFloat('pctLanceEmbutido');
    const valEmb = carta * (pctEmb/100);
    document.getElementById('valorLanceEmbutidoDisplay').value = formatarMoeda(valEmb);
    if (document.getElementById('chkAutoLance').checked) {
        const meta = getFloat('targetPercent');
        const valMeta = carta * (meta/100);
        let valLivre = Math.max(0, valMeta - valEmb);
        document.getElementById('lanceLivre').value = valLivre.toFixed(0);
    }
}

window.calcularConsorcio = function() {
    const valApp = getFloat('valorAplicado'); const rendMes = getFloat('rendimentoMensal')/100; const carta = getFloat('valorCarta'); const taxa = getFloat('taxaAdmin'); const prazo = getInt('prazoTotal'); const mesCont = getInt('mesContemplacao'); const desc = getFloat('pctDesconto'); const livre = getFloat('lanceLivre'); const pctEmb = getFloat('pctLanceEmbutido'); const extra = getFloat('rendimentoCarro'); const reaj = getFloat('taxaReajuste')/100;
    if (mesCont <= 0 || prazo <= 0 || mesCont > prazo) return;
    const divTotal = carta * (1 + (taxa/100)); const parcCheia = divTotal/prazo; const parcAntes = parcCheia * (1 - (desc/100)); const valEmb = carta * (pctEmb/100); const totalLance = livre + valEmb; const lib = carta - valEmb; const pagoAteCont = parcAntes * (mesCont - 1); const sDevedor = divTotal - pagoAteCont - parcAntes; const sPosLance = Math.max(0, sDevedor - totalLance); const mesesRest = prazo - mesCont; const parcApos = mesesRest > 0 ? sPosLance / mesesRest : 0;
    let saldo = valApp; let html = ""; let saldoCont = 0; let totalPago = 0; let fatorReaj = 1;
    for(let i=1; i<=prazo; i++) {
        if(i > 1 && (i - 1) % 12 === 0) fatorReaj *= (1 + reaj);
        let sIni = saldo; let rApp = sIni * rendMes; let pParc = (i < mesCont) ? parcAntes : (i === mesCont ? parcAntes : parcApos); let pLance = (i === mesCont) ? livre : 0; let pExtra = (i > mesCont) ? extra : 0; let cls = (i === mesCont) ? "contemplacao-row" : ""; let pParcReaj = pParc * fatorReaj;
        totalPago += pParcReaj + pLance;
        saldo = sIni + rApp + pExtra - pParcReaj - pLance;
        if(i === mesCont) saldoCont = saldo;
        html += `<tr class="${cls}"><td>${i}</td><td>${formatarMoeda(sIni)}</td><td style="color:green">+${formatarMoeda(rApp)}</td><td>${pExtra > 0 ? '+' + formatarMoeda(pExtra) : '-'}</td><td style="color:#c0392b">-${formatarMoeda(pParcReaj)}</td><td style="color:#c0392b">${pLance > 0 ? '-' + formatarMoeda(pLance) : '-'}</td><td style="font-weight:bold;color:${saldo < 0 ? '#c0392b' : '#2c3e50'}">${formatarMoeda(saldo)}</td></tr>`;
    }
    document.getElementById('resValorLiberado').innerText = formatarMoeda(lib); document.getElementById('resPrestacaoNormal').innerText = formatarMoeda(parcCheia); document.getElementById('resPrestacaoAntes').innerText = formatarMoeda(parcAntes); document.getElementById('resPrestacaoApos').innerText = formatarMoeda(parcApos); document.getElementById('resTotalLances').innerText = formatarMoeda(totalLance); document.getElementById('resTotalPago').innerText = formatarMoeda(totalPago);
    const elSaldo = document.getElementById('resValorAplicacao'); elSaldo.innerText = formatarMoeda(saldoCont); elSaldo.style.color = saldoCont < 0 ? "#c0392b" : "#2c3e50";
    document.querySelector('#tabelaEvolucao tbody').innerHTML = html;
}

window.calcularFinanciamento = function() {
    const valorVeiculo = getFloat('fin-valor-veiculo'); const valorCDB = getFloat('fin-valor-cdb'); const prazoAnos = getInt('fin-prazo-anos'); const taxaGarantia = getFloat('fin-taxa-garantia') / 100; const taxaNormal = getFloat('fin-taxa-normal') / 100; const pctRendimentoCDB = getFloat('fin-rendimento-cdb') / 100; const taxaCDIAnual = getFloat('fin-taxa-cdi') / 100; const rendimentoBem = getFloat('fin-rendimento-bem'); const tipoRendimento = getValue('fin-tipo-rendimento'); const abaterParcelas = getChecked('fin-abater-parcelas');
    const valorFinanciado = Math.max(0, valorVeiculo - valorCDB); const prazoMeses = prazoAnos * 12;
    if (prazoMeses <= 0 || valorFinanciado < 0) return;
    const calcularParcela = (valor, taxa, prazo) => (taxa === 0) ? valor / prazo : valor * (taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
    const taxaCDIMensal = Math.pow(1 + taxaCDIAnual, 1/12) - 1;
    const DIAS_UTEIS_MES = 21; const taxaCDIDiariaUtil = Math.pow(1 + taxaCDIAnual, 1/252) - 1;
    const getRendimentoMes = (saldoAtual) => { switch (tipoRendimento) { case 'diario': return saldoAtual * (Math.pow(1 + taxaCDIDiariaUtil * pctRendimentoCDB, DIAS_UTEIS_MES) - 1); default: return saldoAtual * taxaCDIMensal * pctRendimentoCDB; } };
    let saldoCDB_CenarioReinvestimento = valorCDB;
    for(let i = 1; i <= prazoMeses; i++) { const rendimentoDoMes = getRendimentoMes(saldoCDB_CenarioReinvestimento); saldoCDB_CenarioReinvestimento += rendimentoDoMes; }
    document.getElementById('res-fin-saldo-cdb-sem-abatimento').innerText = formatarMoeda(saldoCDB_CenarioReinvestimento);
    document.getElementById('res-fin-saldo-cdb-com-abatimento').innerText = formatarMoeda(valorCDB);
    const parcelaGarantia = valorFinanciado > 0 ? calcularParcela(valorFinanciado, taxaGarantia, prazoMeses) : 0;
    let saldoDevedor = valorFinanciado; let saldoCDB = valorCDB; let totalRendimentoGerado = 0; let html = "";
    for(let i = 1; i <= prazoMeses; i++) {
        const rendimentoMesCDB = getRendimentoMes(saldoCDB);
        totalRendimentoGerado += rendimentoMesCDB + rendimentoBem;
        if (!abaterParcelas) { saldoCDB += rendimentoMesCDB; }
        const jurosMes = saldoDevedor * taxaGarantia; const amortizacao = parcelaGarantia - jurosMes; saldoDevedor -= amortizacao;
        html += `<tr><td>${i}</td><td>${formatarMoeda(parcelaGarantia)}</td><td style="color:#c0392b">-${formatarMoeda(jurosMes)}</td><td>-${formatarMoeda(amortizacao)}</td><td style="color:green">+${formatarMoeda(rendimentoMesCDB)}</td><td style="font-weight:bold;">${formatarMoeda(Math.max(0, saldoDevedor))}</td><td style="font-weight:bold;">${formatarMoeda(saldoCDB)}</td></tr>`;
    }
    document.querySelector('#tabelaFinanciamento tbody').innerHTML = html;
    const mediaRendimentoTotal = prazoMeses > 0 ? totalRendimentoGerado / prazoMeses : 0;
    const parcelaLiquida = parcelaGarantia - (abaterParcelas ? mediaRendimentoTotal : 0);
    document.getElementById('res-fin-parcela-liquida-desc').innerText = abaterParcelas ? "Parcela - Rendimento Total" : "Não há abatimento";
    const parcelaNormal = calcularParcela(valorFinanciado, taxaNormal, prazoMeses);
    const economia = (parcelaNormal * prazoMeses) - (parcelaGarantia * prazoMeses);
    document.getElementById('res-fin-valor-financiado').innerText = formatarMoeda(valorFinanciado);
    document.getElementById('res-fin-parcela-garantia').innerText = formatarMoeda(parcelaGarantia);
    document.getElementById('res-fin-desc-taxa-garantia').innerText = `Taxa de ${(taxaGarantia * 100).toFixed(2)}% a.m.`;
    document.getElementById('res-fin-rendimento-total').innerText = formatarMoeda(mediaRendimentoTotal);
    document.getElementById('res-fin-parcela-liquida').innerText = formatarMoeda(parcelaLiquida);
    document.getElementById('res-fin-parcela-normal').innerText = formatarMoeda(parcelaNormal);
    document.getElementById('res-fin-desc-taxa-normal').innerText = `Taxa de ${(taxaNormal * 100).toFixed(2)}% a.m.`;
    document.getElementById('res-fin-economia').innerText = formatarMoeda(economia);
}

// --- LÓGICA DO MODAL ---
const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

window.showInfo = function(type) {
    let title = ""; let content = "";
    
    switch(type) {
        case 'consorcio_veiculo':
        case 'consorcio_imovel':
        case 'consorcio_equipamento':
            const nomeBem = type.split('_')[1];
            title = `Como Funciona o Consórcio de ${nomeBem.charAt(0).toUpperCase() + nomeBem.slice(1)}`;
            content = `<p>O consórcio é uma forma de compra planejada em grupo. Veja como suas escolhas impactam a simulação:</p>
                <p> • <strong>Valor da Carta:</strong> O valor de <strong>${formatarMoeda(getFloat('valorCarta'))}</strong> é o seu objetivo de crédito para comprar o bem.</p>
                <p> • <strong>Prazo e Taxa:</strong> O custo total (carta + taxa de <strong>${getFloat('taxaAdmin')}%</strong>) é dividido pelo prazo de <strong>${getInt('prazoTotal')} meses</strong> para definir a parcela cheia.</p>
                <p> • <strong>Contemplação e Lances:</strong> Você simulou ser contemplado no mês <strong>${getInt('mesContemplacao')}</strong>, possivelmente através de um lance total de <strong>${formatarMoeda(getFloat('lanceLivre') + (getFloat('valorCarta') * getFloat('pctLanceEmbutido') / 100))}</strong>. O lance adianta parcelas, reduzindo o saldo devedor e, consequentemente, o valor das parcelas futuras.</p>
                <p> • <strong>Aplicação Financeira:</strong> Sua aplicação inicial de <strong>${formatarMoeda(getFloat('valorAplicado'))}</strong>, com rendimento de <strong>${getFloat('rendimentoMensal')}% a.m.</strong>, serve como seu caixa. A tabela "Fluxo de Caixa" mostra como esse dinheiro é usado para pagar as parcelas e o lance, e como seu saldo evolui.</p>
                <p> • <strong>Renda Extra:</strong> Após a contemplação, o valor de <strong>${formatarMoeda(getFloat('rendimentoCarro'))}</strong> ajuda a pagar as parcelas restantes, aliviando seu fluxo de caixa mensal.</p>`;
            break;
        case 'financiamento_cdb':
            title = 'Como Funciona o Financiamento com Garantia em CDB';
            content = `<p>Nesta modalidade, seu investimento em CDB é usado como garantia para obter juros menores no financiamento.</p>
                <p> • <strong>Estrutura:</strong> Para um bem de <strong>${formatarMoeda(getFloat('fin-valor-veiculo'))}</strong>, você usa <strong>${formatarMoeda(getFloat('fin-valor-cdb'))}</strong> como garantia. O banco então financia a diferença de <strong>${formatarMoeda(getFloat('fin-valor-veiculo') - getFloat('fin-valor-cdb'))}</strong>.</p>
                <p> • <strong>Taxa de Juros:</strong> Graças à garantia, sua taxa é de <strong>${getFloat('fin-taxa-garantia')}% a.m.</strong>, resultando em parcelas fixas durante <strong>${getInt('fin-prazo-anos')} anos</strong>. Sem isso, a taxa seria maior.</p>
                <p> • <strong>Rendimento do CDB:</strong> Seu CDB de <strong>${formatarMoeda(getFloat('fin-valor-cdb'))}</strong> rende <strong>${getFloat('fin-rendimento-cdb')}%</strong> do CDI (referência de <strong>${getFloat('fin-taxa-cdi')}% a.a.</strong>). Este rendimento é a chave da operação.</p>
                <p> • <strong>Uso do Rendimento:</strong> Você escolheu <strong>${getChecked('fin-abater-parcelas') ? 'USAR' : 'NÃO USAR'}</strong> o rendimento para abater as parcelas.
                ${getChecked('fin-abater-parcelas')
                    ? "Isso significa que o rendimento do CDB + a renda do bem diminuem o valor que você desembolsa por mês (a 'Parcela Líquida'). O saldo principal do seu CDB fica intacto."
                    : "Isso significa que o rendimento é 100% reinvestido no CDB, fazendo seu patrimônio crescer. A projeção 'Saldo Final do CDB' mostra o potencial desse crescimento, enquanto você paga a parcela cheia do financiamento."}
                </p>
                <p> • <strong>Tabela de Evolução:</strong> A tabela detalha, mês a mês, o pagamento de juros, a amortização da dívida e como o saldo do seu CDB evolui de acordo com sua escolha.</p>`;
            break;
    }

    modalTitle.innerHTML = title;
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
}

closeBtn.onclick = () => { modal.style.display = 'none'; }
window.onclick = (event) => { if (event.target == modal) { modal.style.display = 'none'; } }