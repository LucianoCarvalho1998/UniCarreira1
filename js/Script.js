document.addEventListener("DOMContentLoaded", function () {
    const conteudo = document.getElementById("conteudo");
    const listaVagas = document.getElementById("lista-vagas");

    // Função para ativar a animação da lista quando a página é rolada
    function ativarAnimacao() {
        const alturaViewport = window.innerHeight;
        const posicaoLista = listaVagas.getBoundingClientRect().top;

        if (posicaoLista < alturaViewport) {
            listaVagas.classList.add("aparecer");
            window.removeEventListener("scroll", ativarAnimacao); // Para a animação após a primeira vez
        }
    }

    // Adicionar evento de rolagem para ativar a animação
    window.addEventListener("scroll", ativarAnimacao);
});

    // Função para criar uma vaga na lista
    function criarVaga(vaga) {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${vaga.nome}</h3>
            <p>${vaga.descricao}</p>
            <button class="candidatar" data-vaga="${vaga.nome}">Candidatar-se</button>
        `;
        listaVagas.appendChild(li);
    }

    // Adicionar vagas à lista
    vagas.forEach(vaga => criarVaga(vaga));

    // Lidar com o evento de candidatura
    listaVagas.addEventListener("click", function (event) {
        if (event.target.classList.contains("candidatar")) {
            const vagaNome = event.target.getAttribute("data-vaga");
            alert(`Você se candidatou à vaga de ${vagaNome}.`);
            // Aqui você pode adicionar a lógica real de candidatura
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const conteudo = document.getElementById("conteudo");

    // Carregar conteúdo da página inicial por padrão
    carregarPagina("pages/home.html");

    // Função para carregar conteúdo com base na URL
    function carregarPagina(pagina) {
        fetch(pagina)
            .then(response => response.text())
            .then(html => {
                conteudo.innerHTML = html;
            })
            .catch(error => {
                console.error("Erro ao carregar a página:", error);
            });
    }

    // Configurar navegação de página
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const pagina = this.getAttribute("href");
            carregarPagina(pagina);
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const listaVagas = document.getElementById("lista-vagas");
    const opcoesOrdenacao = document.querySelectorAll(".opcoes-ordenacao a");

    // Função para ordenar a lista de vagas com base na opção selecionada
    function ordenarVagas(ordenacao) {
        const vagas = Array.from(listaVagas.querySelectorAll(".vaga-item"));
        vagas.sort(function (a, b) {
            switch (ordenacao) {
                case "recentes":
                    return 1; // Implemente sua lógica de ordenação para vagas mais recentes aqui
                case "antigas":
                    return -1; // Implemente sua lógica de ordenação para vagas mais antigas aqui
                case "salario":
                    return 1; // Implemente sua lógica de ordenação por salário aqui
                case "reverso":
                    return -1; // Implemente sua lógica de ordenação reversa aqui
                default:
                    return 0; // Não fazer nada por padrão
            }
        });

        // Reorganize as vagas na lista
        vagas.forEach(vaga => listaVagas.appendChild(vaga));
    }

    // Adicionar evento de clique às opções de ordenação
    opcoesOrdenacao.forEach(opcao => {
        opcao.addEventListener("click", function (event) {
            event.preventDefault();
            const ordenacao = event.target.getAttribute("data-ordenacao");
            ordenarVagas(ordenacao);
        });
    });
});
