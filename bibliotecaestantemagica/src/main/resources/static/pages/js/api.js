/* ==========================================================
   api.js — configuração central da API e utilitários comuns
   Biblioteca Estante Mágica
   ========================================================== */

const API_BASE = "http://localhost:8000";

const API = {
    usuarios: {
        listar: () => `${API_BASE}/Usuarios/listarTodos`,
        listarPorId: (id) => `${API_BASE}/Usuarios/listarporId/${id}`,
        salvar: () => `${API_BASE}/Usuarios/salvar`,
        atualizar: (id) => `${API_BASE}/Usuarios/atualizar/${id}`,
        deletar: (id) => `${API_BASE}/Usuarios/deletar/${id}`,
        login: () => `${API_BASE}/Usuarios/login`,
        buscarRa: (ra) => `${API_BASE}/Usuarios/buscarra/${ra}`,
    },
    livros: {
        listar: () => `${API_BASE}/livros/listartodos`,
        listarPorId: (id) => `${API_BASE}/livros/listarid/${id}`,
        buscar: (genero, titulo, autor, isbn) =>
            `${API_BASE}/livros/buscar/${encodeURIComponent(genero || "-")}/${encodeURIComponent(titulo || "-")}/${encodeURIComponent(autor || "-")}/${encodeURIComponent(isbn || "-")}`,
        buscarPorTitulo: (titulo) => `${API_BASE}/livros/BuscarPorTitulo/${encodeURIComponent(titulo)}`,
        salvar: () => `${API_BASE}/livros/salvar`,
        atualizar: (id) => `${API_BASE}/livros/atualizar/${id}`,
        reservar: (id) => `${API_BASE}/livros/reservar/${id}`,
        disponibilizar: (id) => `${API_BASE}/livros/disponibilizar/${id}`,
        deletar: (id) => `${API_BASE}/livros/deletar/${id}`,
        atualizarStatus: (id, status) => `${API_BASE}/livros/atualizarStatus/${id}/${encodeURIComponent(status)}`,
    },
    emprestimos: {
        listar: () => `${API_BASE}/emprestimos/listartodos`,
        listarPorId: (id) => `${API_BASE}/emprestimos/listarid/${id}`,
        salvar: () => `${API_BASE}/emprestimos/salvar`,
        atualizar: (id) => `${API_BASE}/emprestimos/atualizar/${id}`,
        devolver: (id) => `${API_BASE}/emprestimos/devolver/${id}`,
        renovar: (id) => `${API_BASE}/emprestimos/renovar/${id}`,
        deletar: (id) => `${API_BASE}/emprestimos/deletar/${id}`,
        listarPorUsuario: (id) => `${API_BASE}/emprestimos/listarusuario/${id}`,
        listarPorRa: (ra) => `${API_BASE}/emprestimos/listarra/${ra}`,
        atrasados: () => `${API_BASE}/emprestimos/atrasados`,
    },
    reservas: {
        listar: () => `${API_BASE}/reservas/listartodos`,
        listarPorId: (id) => `${API_BASE}/reservas/listarporid/${id}`,
        salvar: () => `${API_BASE}/reservas/salvar`,
        atualizar: (id) => `${API_BASE}/reservas/atualizar/${id}`,
        deletar: (id) => `${API_BASE}/reservas/deletar/${id}`,
    },
    multas: {
        listar: () => `${API_BASE}/multas/listartodos`,
    },
    pix: {
        gerar: (valor) => `${API_BASE}/pix/gerar?valor=${encodeURIComponent(valor)}`,
    },
};

/* ---------- Sessão / autenticação ---------- */

function getUsuarioLogado() {
    const raw = localStorage.getItem("usuarioLogado");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

/**
 * Garante que o usuário está logado e (opcionalmente) que é do tipo esperado.
 * Redireciona para login.html caso contrário.
 * @param {string|null} tipoEsperado "Bibliotecário", "Aluno" ou null (qualquer)
 */
function exigirLogin(tipoEsperado) {
    const usuario = getUsuarioLogado();
    if (!usuario) {
        window.location.href = "login.html";
        return null;
    }
    if (tipoEsperado && usuario.tipo !== tipoEsperado) {
        window.location.href = usuario.tipo === "Bibliotecário"
            ? "dashboard-bibliotecario.html"
            : "dashboard-aluno.html";
        return null;
    }
    return usuario;
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

/* ---------- Helpers de UI ---------- */

function preencherNomeUsuario() {
    const usuario = getUsuarioLogado();
    if (!usuario) return;
    document.querySelectorAll("[data-usuario-nome]").forEach(el => {
        el.textContent = usuario.nome || "Usuário";
    });
    document.querySelectorAll("[data-usuario-tipo]").forEach(el => {
        el.textContent = usuario.tipo || "";
    });
    document.querySelectorAll("[data-usuario-inicial]").forEach(el => {
        el.textContent = (usuario.nome || "U").trim().charAt(0).toUpperCase();
    });
}

function formatarData(dataStr) {
    if (!dataStr) return "-";
    try {
        const d = new Date(dataStr);
        if (isNaN(d.getTime())) return dataStr;
        return d.toLocaleDateString("pt-BR");
    } catch (e) {
        return dataStr;
    }
}

function badgeStatus(status) {
    if (!status) return '<span class="badge-status badge-cinza">-</span>';
    const s = status.toString().toLowerCase();
    let classe = "badge-cinza";
    if (["disponivel", "disponível", "ativo", "ativa", "devolvido"].includes(s)) classe = "badge-verde";
    else if (["reservado", "reservada", "pendente", "emprestado", "aguardando"].includes(s)) classe = "badge-azul";
    else if (["atrasado", "atrasada", "vencido"].includes(s)) classe = "badge-vermelho";
    else if (["indisponivel", "indisponível", "cancelado", "cancelada"].includes(s)) classe = "badge-cinza";
    return `<span class="badge-status ${classe}">${status}</span>`;
}

function mostrarToast(mensagem, tipo) {
    tipo = tipo || "sucesso";
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container-custom";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast-custom toast-${tipo}`;
    toast.innerHTML = `<i class="bi ${tipo === "erro" ? "bi-x-circle-fill" : "bi-check-circle-fill"}"></i><span>${mensagem}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

async function apiFetch(url, options) {
    const controller = new AbortController();
    // evita telas presas em "Carregando..." para sempre quando o backend
    // não responde (ex: Spring Boot ainda não subiu, porta errada, etc.)
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        return response;
    } catch (e) {
        if (e.name === "AbortError") {
            mostrarToast("O servidor demorou muito para responder (localhost:8000). Verifique se o backend está rodando.", "erro");
        } else {
            mostrarToast("Não foi possível conectar ao servidor (localhost:8000). Verifique se o backend está rodando.", "erro");
        }
        throw e;
    } finally {
        clearTimeout(timeoutId);
    }
}
