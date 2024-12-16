const shelves = [
    { id: 1, name: "Prateleira A1", capacity: 100, pesoAtual: 0 },
];

// Função para determinar a cor da barra de progresso
function getProgressBarColor(usagePercentage) {
    if (usagePercentage >= 0 && usagePercentage <= 30) {
        return 'red'; // Vermelho para 0-30%
    } else if (usagePercentage > 30 && usagePercentage <= 60) {
        return 'yellow'; // Amarelo para 31-60%
    } else {
        return 'green'; // Verde para 61-100%
    }
}

// Função para criar um card de prateleira
function createShelfCard(shelf) {
    

    const usagePercentage = (shelf.pesoAtual / shelf.capacity) * 100;
    const progressBarColor = getProgressBarColor(usagePercentage);

    const card = document.createElement('div');
    card.className = 'shelf-card';

    card.innerHTML = `
        <div class="shelf-header">
            <h2>${shelf.name}</h2>
        </div>
        <div class="shelf-content">
            <div class="shelf-info">
                <div>
                    <span>Capacidade:</span>
                    <span>${shelf.capacity} itens</span>
                </div>
                <div>
                    <span>Em uso:</span>
                    <span id="peso-atual-${shelf.id}">${shelf.pesoAtual} itens</span>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" 
                     style="width: ${usagePercentage}%; background-color: ${progressBarColor}">
                </div>
            </div>
            <div class="usage-text">
                ${usagePercentage.toFixed(1)}% utilizado
            </div>
        </div>
    `;

    return card;
}

// Função para renderizar todas as prateleiras
function renderShelves() {
    const container = document.getElementById('shelvesContainer');
    container.innerHTML = '';
    shelves.forEach(shelf => {
        container.appendChild(createShelfCard(shelf));
    });
}

// Função para atualizar o peso atual de uma prateleira específica
function atualizarPesoAtual() {
    
   
    const pesoAtualRef = database.ref("Prateleira/pesoAtual");

    // Lendo os dados do Firebase
    pesoAtualRef.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("Peso atual recebido do Firebase:", pesoAtual);
        
        if (data) {
            // Atualiza o peso das prateleiras no array de shelves
            shelves.forEach(shelf => {
                if (data[`pesoAtual-${shelf.id}`]) {
                    shelf.pesoAtual = data[`pesoAtual-${shelf.id}`];
                }
            });

            // Re-renderiza as prateleiras com os novos dados
            renderShelves();
        }
    }, (error) => {
        console.error("Erro ao acessar o Firebase:", error);
    });
}

// Inicializar o dashboard e carregar dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderShelves();
    atualizarPesoAtual();
});


const database = firebase.Prateleira();
const app = firebase.initializeApp(firebaseConfig);


const firebaseConfig = {
  apiKey: "AIzaSyApF1lrZDydzkoAyc3jtudDxdlGTysON2Q",
  authDomain: "esp32-6fe25.firebaseapp.com",
  databaseURL: "https://esp32-6fe25-default-rtdb.firebaseio.com",
  projectId: "esp32-6fe25",
  storageBucket: "esp32-6fe25.firebasestorage.app",
  messagingSenderId: "357944367709",
  appId: "1:357944367709:web:6ad04ad636cc4c97b94bb4"
}