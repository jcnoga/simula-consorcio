// Configurações Padrão por Tipo
const CONFIGS = {
    veiculo: {
        titulo: "Parâmetros (Veículos)",
        carta: 75000,
        taxa: 23.4,
        prazo: 76,
        rendimentoLabel: "Rendimento Mensal do Automóvel (R$)",
        rendimentoExpl: "Ex: Uber, Taxi ou economia de frota.",
        rendimentoTh: "Rend. Veículo (+)",
        descontoInicial: 30,
        reajustePadrao: 6.0 // Geralmente tabela FIPE, mas simulamos inflação
    },
    imovel: {
        titulo: "Parâmetros (Imóveis)",
        carta: 400000,
        taxa: 24.0, 
        prazo: 180, 
        rendimentoLabel: "Renda de Aluguel Estimada (R$)",
        rendimentoExpl: "Válido após pegar as chaves (mês pós-contemplação).",
        rendimentoTh: "Aluguel (+)",
        descontoInicial: 0,
        reajustePadrao: 6.0 // INCC
    },
    equipamento: {
        titulo: "Parâmetros (Equipamentos)",
        carta: 150000,
        taxa: 18.0,
        prazo: 60,
        rendimentoLabel: "Retorno/Produtividade Mensal (R$)",
        rendimentoExpl: "Lucro adicional gerado pelo equipamento novo.",
        rendimentoTh: "Retorno Equip. (+)",
        descontoInicial: 0,
        reajustePadrao: 5.0
    }
};

let currentType = 'veiculo';

// Formatar Moeda
const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para mudar o tipo de consórcio
function setConsortiumType(type) {
    currentType = type;
    const config = CONFIGS[type];
    
    // Atualizar Botões
    document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Atualizar Textos e Labels
    document.getElementById('tituloParametros').innerText = config.titulo;
    document.getElementById('labelRendimentoExtra').innerText = config.rendimentoLabel;
    document.getElementById('explRendimentoExtra').innerText = config.rendimentoExpl;
    document.getElementById('thRendaExtra').innerText = config.rendimentoTh;

    // Atualizar Valores Padrão
    document.getElementById('valorCarta').value = config.carta;
    document.getElementById('taxaAdmin').value = config.taxa;
    document.getElementById('prazoTotal').value = config.prazo;
    document.getElementById('pctDesconto').value = config.descontoInicial;
    document.getElementById('taxaReajuste').value = config.reajustePadrao;
    
    document.getElementById('rendimentoCarro').value = 0;

    atualizarDadosEntrada();
    calcular();
}

function atualizarDadosEntrada() {
    const carta = parseFloat(document.getElementById('valorCarta').value) || 0;
    const pctEmbutido = parseFloat(document.getElementById('pctLanceEmbutido').value) || 0;
    
    // 1. Atualiza visualização Lance Embutido
    const valorEmbutido = carta * (pctEmbutido / 100);
    document.getElementById('valorLanceEmbutidoDisplay').value = formatarMoeda(valorEmbutido);

    // 2. Lógica Automática
    const chkAuto = document.getElementById('chkAutoLance');
    if (chkAuto.checked) {
        let pctAlvo = parseFloat(document.getElementById('targetPercent').value);
        if (isNaN(pctAlvo)) pctAlvo = 60; 

        const metaTotal = carta * (pctAlvo / 100);
        let novoLanceLivre = metaTotal - valorEmbutido;
        if (novoLanceLivre < 0) novoLanceLivre = 0;
        
        document.getElementById('lanceLivre').value = novoLanceLivre.toFixed(0); 
    }

    // 3. Validação Reajuste
    const reajusteInput = document.getElementById('taxaReajuste');
    const erroMsg = document.getElementById('erroReajuste');
    let reajuste = parseFloat(reajusteInput.value);
    
    if (reajuste < 0) {
        erroMsg.innerText = "A taxa não pode ser negativa.";
        reajusteInput.style.borderColor = "#e74c3c";
    } else if (reajuste > 20) {
        erroMsg.innerText = "Máximo permitido: 20%.";
        reajusteInput.style.borderColor = "#e74c3c";
    } else {
        erroMsg.innerText = "";
        reajusteInput.style.borderColor = "#b3d4fc";
    }
}

function toggleAutoLance() {
    const chk = document.getElementById('chkAutoLance');
    const inputLivre = document.getElementById('lanceLivre');
    const inputTarget = document.getElementById('targetPercent');

    if (chk.checked) {
        inputLivre.readOnly = true;
        inputTarget.disabled = false;
        if (!inputTarget.value) inputTarget.value = 60;
        atualizarDadosEntrada(); 
    } else {
        inputLivre.readOnly = false;
        inputTarget.disabled = true;
    }
}

function calcular() {
    // --- 1. Obter Valores ---
    const valorAplicado = parseFloat(document.getElementById('valorAplicado').value) || 0;
    const rendimentoMensal = parseFloat(document.getElementById('rendimentoMensal').value) || 0;
    const valorCarta = parseFloat(document.getElementById('valorCarta').value) || 0;
    const taxaAdmin = parseFloat(document.getElementById('taxaAdmin').value) || 0;
    const prazoTotal = parseInt(document.getElementById('prazoTotal').value) || 1;
    
    const mesContemplacao = parseInt(document.getElementById('mesContemplacao').value) || 1;
    const pctDesconto = parseFloat(document.getElementById('pctDesconto').value) || 0;
    
    const lanceLivre = parseFloat(document.getElementById('lanceLivre').value) || 0;
    const pctLanceEmbutido = parseFloat(document.getElementById('pctLanceEmbutido').value) || 0;
    
    const rendimentoExtra = parseFloat(document.getElementById('rendimentoCarro').value) || 0;
    
    // Novo Campo: Reajuste
    let taxaReajuste = parseFloat(document.getElementById('taxaReajuste').value);
    if (isNaN(taxaReajuste) || taxaReajuste < 0 || taxaReajuste > 20) taxaReajuste = 0;

    // Validações
    if (mesContemplacao > prazoTotal) {
        alert("O mês de contemplação não pode ser maior que o prazo total.");
        return;
    }

    // --- 2. Cálculos Base Consórcio (Mês 1) ---
    const dividaTotalInicial = valorCarta + (valorCarta * (taxaAdmin / 100));
    const parcelaCheiaBase = dividaTotalInicial / prazoTotal;
    const parcelaAntesBase = parcelaCheiaBase * (1 - (pctDesconto / 100));

    const valorLanceEmbutido = valorCarta * (pctLanceEmbutido / 100);
    const totalLances = lanceLivre + valorLanceEmbutido;

    // --- 3. Pós-Contemplação (Cálculo Base) ---
    // Nota: O cálculo exato com reajuste varia por administradora. 
    // Aqui usamos uma aproximação onde o Saldo Devedor é recalculado no momento da contemplação, 
    // mas o reajuste inflaciona a parcela anualmente.
    
    const valorPagoAteMomentoBase = parcelaAntesBase * mesContemplacao;
    let saldoDevedorAtualBase = dividaTotalInicial - valorPagoAteMomentoBase;
    let saldoDevedorPosLancesBase = saldoDevedorAtualBase - totalLances;
    if (saldoDevedorPosLancesBase < 0) saldoDevedorPosLancesBase = 0;

    const mesesRestantes = prazoTotal - mesContemplacao;
    let parcelaAposBase = 0;
    if (mesesRestantes > 0) {
        parcelaAposBase = saldoDevedorPosLancesBase / mesesRestantes;
    }

    const valorLiberado = valorCarta - valorLanceEmbutido;

    // --- 4. Exibir Resultados Estáticos (Cards) ---
    document.getElementById('resValorLiberado').innerText = formatarMoeda(valorLiberado);
    document.getElementById('resPrestacaoNormal').innerText = formatarMoeda(parcelaCheiaBase);
    document.getElementById('resPrestacaoAntes').innerText = formatarMoeda(parcelaAntesBase);
    document.getElementById('resPrestacaoApos').innerText = formatarMoeda(parcelaAposBase);
    document.getElementById('valorLanceEmbutidoDisplay').value = formatarMoeda(valorLanceEmbutido);

    // --- 5. Gerar Grid de Evolução com REAJUSTE ANUAL ---
    let saldoInvestimento = valorAplicado;
    const taxaJurosDecimal = rendimentoMensal / 100;
    const taxaReajusteDecimal = taxaReajuste / 100;
    
    let tableHTML = "";
    let saldoSnapshotContemplacao = 0; 
    let totalPagoAcumulado = 0;

    // Variável para controlar o fator de multiplicação do reajuste
    let fatorReajuste = 1;

    for (let i = 1; i <= prazoTotal; i++) {
        
        // Aplica reajuste a cada 12 meses (Mês 13, 25, 37...)
        // Lógica: Se passou um ano completo (i > 12) e estamos no primeiro mês do novo ciclo
        if (i > 1 && (i - 1) % 12 === 0) {
            fatorReajuste *= (1 + taxaReajusteDecimal);
        }

        let saldoInicial = saldoInvestimento;
        let rendimentoApp = saldoInicial * taxaJurosDecimal;
        
        // Fluxos
        let pagamentoParcelaBase = 0;
        let pagamentoLance = 0;
        let entradaExtra = 0;
        
        let rowClass = "";
        let observacao = "";

        // Define parcela BASE (Antes ou Depois)
        if (i <= mesContemplacao) {
            pagamentoParcelaBase = parcelaAntesBase;
            
            if (i === mesContemplacao) {
                rowClass = "contemplacao-row";
                observacao = " (Contemplação)";
                pagamentoLance = lanceLivre;
            }
        } else {
            pagamentoParcelaBase = parcelaAposBase;
            entradaExtra = rendimentoExtra;
        }

        // APLICA O REAJUSTE NA PARCELA
        let pagamentoParcelaReajustada = pagamentoParcelaBase * fatorReajuste;

        // Atualiza acumulados
        totalPagoAcumulado += pagamentoParcelaReajustada + pagamentoLance;

        // Cálculo do Saldo Final
        saldoInvestimento = saldoInicial + rendimentoApp + entradaExtra - pagamentoParcelaReajustada - pagamentoLance;

        // Snapshot
        if (i === mesContemplacao) {
            saldoSnapshotContemplacao = saldoInvestimento;
        }

        // Formatação
        const styleSaldoFinal = saldoInvestimento < 0 ? 'neg' : 'pos';
        const displayLance = pagamentoLance > 0 ? formatarMoeda(pagamentoLance) : "-";
        const displayExtra = entradaExtra > 0 ? formatarMoeda(entradaExtra) : "-";
        const styleExtra = entradaExtra > 0 ? 'class="positive-val"' : '';
        const styleLance = pagamentoLance > 0 ? 'class="negative-val" style="font-weight:bold;"' : '';
        
        // Indicador visual de reajuste na tabela
        let indicadorReajuste = fatorReajuste > 1 ? `<small style='color:#e67e22'> (Reaj. ${(fatorReajuste-1)*100}%)</small>` : "";

        tableHTML += `
            <tr class="${rowClass}">
                <td>${i} ${observacao}</td>
                <td>${formatarMoeda(saldoInicial)}</td>
                <td class="positive-val">+ ${formatarMoeda(rendimentoApp)}</td>
                <td ${styleExtra}>${entradaExtra > 0 ? '+' : ''} ${displayExtra}</td>
                <td class="negative-val">- ${formatarMoeda(pagamentoParcelaReajustada)}</td>
                <td ${styleLance}>${pagamentoLance > 0 ? '-' : ''} ${displayLance}</td>
                <td class="final-balance ${styleSaldoFinal}">${formatarMoeda(saldoInvestimento)}</td>
            </tr>
        `;
    }

    document.querySelector('#tabelaEvolucao tbody').innerHTML = tableHTML;

    // Atualiza cards finais com dados dinâmicos
    const elApp = document.getElementById('resValorAplicacao');
    elApp.innerText = formatarMoeda(saldoSnapshotContemplacao);
    elApp.style.color = saldoSnapshotContemplacao < 0 ? "#c0392b" : "#2c3e50";

    document.getElementById('resTotalPago').innerText = formatarMoeda(totalPagoAcumulado);
    document.getElementById('resTotalLances').innerText = formatarMoeda(totalLances);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarDadosEntrada();
    calcular();
});