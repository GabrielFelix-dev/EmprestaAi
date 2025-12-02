// Conversas simuladas
const conversas = [
    { id: 1, nome: "João Silva", avatar: "J", online: true,
      mensagens: [
        { texto: "Oi! Esse item ainda está disponível?", remetente: "João" },
        { texto: "Vi o anúncio agora.", remetente: "João" }
      ]
    },
    { id: 2, nome: "Maria Oliveira", avatar: "M", online: false,
      mensagens: [{ texto: "Você consegue entregar hoje?", remetente: "Maria" }]
    },
    { id: 3, nome: "Carlos Souza", avatar: "C", online: true,
      mensagens: [
        { texto: "Bom dia! Alguma novidade?", remetente: "Carlos" },
        { texto: "Estou aguardando sua resposta.", remetente: "Carlos" }
      ]
    },
    { id: 4, nome: "Ana Paula", avatar: "A", online: false,
      mensagens: [
        { texto: "Obrigada pelo empréstimo!", remetente: "Ana" },
        { texto: "Depois combinamos a devolução.", remetente: "Ana" }
      ]
    }
];

// ELEMENTOS DOM
const chatList = document.getElementById("chatList");
const messagesBox = document.getElementById("messages");
const chatName = document.getElementById("chatName");
const chatAvatar = document.getElementById("chatAvatar");
const chatStatus = document.getElementById("chatStatus");
const sendForm = document.getElementById("sendForm");
const textInput = document.getElementById("textInput");

let conversaAtiva = null;


// LISTAR CONVERSAS
function carregarConversas() {
    chatList.innerHTML = "";
    conversas.forEach(conversa => {
        const li = document.createElement("li");
        li.classList.add("chat-item");
        li.textContent = conversa.nome;
        li.onclick = () => abrirConversa(conversa.id);
        chatList.appendChild(li);
    });
}


// ABRIR CONVERSA
function abrirConversa(id) {
    conversaAtiva = conversas.find(c => c.id === id);
    if (!conversaAtiva) return;

    chatName.textContent = conversaAtiva.nome;
    chatAvatar.textContent = conversaAtiva.avatar;
    chatStatus.textContent = conversaAtiva.online ? "Online" : "Offline";

    exibirMensagens();

    // FECHAR SIDEBAR AUTOMATICAMENTE NO CELULAR
    if (window.innerWidth <= 700) {
        document.querySelector(".sidebar").classList.remove("abrir");
    }
}


// EXIBIR MENSAGENS
function exibirMensagens() {
    messagesBox.innerHTML = "";

    conversaAtiva.mensagens.forEach(msg => {
        const div = document.createElement("div");

        div.classList.add(
            msg.remetente === "Você" ? "eu" : "mensagem"
        );

        div.textContent = msg.texto;
        messagesBox.appendChild(div);
    });

    messagesBox.scrollTop = messagesBox.scrollHeight;
}


// ENVIAR MENSAGEM
sendForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!conversaAtiva) return alert("Selecione uma conversa primeiro.");
    if (textInput.value.trim() === "") return;

    conversaAtiva.mensagens.push({
        texto: textInput.value,
        remetente: "Você"
    });

    textInput.value = "";
    exibirMensagens();
});


// ===========================
//    MENU MOBILE INTEGRADO
// ===========================

const sidebar = document.querySelector(".sidebar");
const menuBtn = document.getElementById("menuBtn");

// abrir/fechar sidebar
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("abrir");
});

// fechar ao clicar fora
document.addEventListener("click", (e) => {
    if (window.innerWidth > 700) return;

    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove("abrir");
    }
});


// INICIAR
carregarConversas();