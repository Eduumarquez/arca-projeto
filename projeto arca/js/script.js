/**
 * PROGRAMA ARCA - Prefeitura da Serra/ES
 * Sistema de Agendamento e Controle de Castração
 */

// --- CONFIGURAÇÃO E DADOS ---
const APP_CONFIG = {
    systemEmail: 'arca.adocao.es@gmail.com',
    storageKeyUser: 'arca_serra_user',
    storageKeyUsers: 'arca_serra_users_list',
    storageKeyPets: 'arca_serra_pets',
    storageKeyRequests: 'arca_serra_requests',
    storageKeyCampaigns: 'arca_serra_campaigns',
    storageKeyAdoptions: 'arca_serra_adoption_interests',
    storageKeyAdoptionPets: 'arca_serra_adoption_pets',
    storageKeyAppointments: 'arca_serra_appointments',
    storageKeyDenuncias: 'arca_serra_denuncias',
    storageKeyVolunteers: 'arca_serra_volunteers',
    storageKeyNotifications: 'arca_serra_notifications',
    storageKeyFavorites: 'arca_serra_favorites',
    storageKeyRatings: 'arca_serra_clinic_ratings'
};

const INITIAL_DATA = {
    educational: [
        { id: 'edu-1', title: 'Adoção Responsável', category: 'Adoção', icon: 'heart', content: 'Adotar um animal é um compromisso para toda a vida. Antes de adotar, considere o espaço, tempo e recursos necessários.' },
        { id: 'edu-2', title: 'Calendário de Vacinação', category: 'Saúde', icon: 'shield-check', content: 'Cães e gatos precisam de vacinas anuais como V10/V8, Raiva e Gripe para garantir uma vida saudável.' },
        { id: 'edu-3', title: 'Importância da Castração', category: 'Controle', icon: 'scissors', content: 'A castração previne doenças, reduz o abandono e melhora o comportamento do seu pet.' }
    ],
    campaigns: [
        { id: 'camp-1', title: "Mutirão Serra Sede", date: "2026-06-15", location: "Ginásio da Serra Sede", spots: 150, status: "aberta", description: "Vagas para cães e gatos de moradores da região." },
        { id: 'camp-2', title: "Campanha Laranjeiras", date: "2026-07-10", location: "Praça de Laranjeiras", spots: 200, status: "prevista", description: "Agendamentos abrem em breve." },
        { id: 'camp-3', title: "Ação Jacaraípe", date: "2026-05-20", location: "Centro Comunitário", spots: 100, status: "encerrada", description: "Campanha concluída com sucesso." }
    ],
    clinics: [
        { id: 'clin-1', name: "Clínica Pet Amigo", address: "Rua das Flores, 123, Serra", distance: "2.5 km", rating: 4.8, type: "Credenciada", lat: -20.123, lng: -40.321 },
        { id: 'clin-2', name: "Vet Serra", address: "Av. Central, 456, Laranjeiras", distance: "1.2 km", rating: 4.9, type: "Municipal", lat: -20.125, lng: -40.325 }
    ],
    pets: [
        { id: 'pet-1', name: "Bidu", species: "Cachorro", breed: "Vira-lata", age: "2 anos", weight: "12kg", ownerId: 'user1' },
        { id: 'pet-2', name: "Luna", species: "Gato", breed: "Siamês", age: "1 ano", weight: "4kg", ownerId: 'user1' }
    ],
    adoptionPets: [
        { id: 'adopt-1', name: "Mel", species: "Cachorro", breed: "Golden Retriever", age: "3 meses", gender: "Fêmea", size: "Médio", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80", description: "Muito dócil e brincalhona. Ideal para famílias com crianças.", temperamento: "Dócil", status: "disponivel", contact: "(27) 99999-0001" },
        { id: 'adopt-2', name: "Pipoca", species: "Gato", breed: "SRD", age: "1 ano", gender: "Macho", size: "Pequeno", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80", description: "Independente e carinhoso. Adora um cantinho ensolarado.", temperamento: "Independente", status: "disponivel", contact: "(27) 99999-0002" },
        { id: 'adopt-3', name: "Thor", species: "Cachorro", breed: "Labrador", age: "2 anos", gender: "Macho", size: "Grande", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80", description: "Energético e leal. Precisa de espaço para correr.", temperamento: "Ativo", status: "disponivel", contact: "(27) 99999-0003" },
        { id: 'adopt-4', name: "Amora", species: "Gato", breed: "Persa", age: "6 meses", gender: "Fêmea", size: "Pequeno", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80", description: "Calma e sociável. Gosta de companhia e carinho.", temperamento: "Calma", status: "disponivel", contact: "(27) 99999-0004" }
    ],
    requests: [
        { id: 'req-1', petId: 'pet-1', userId: 'user1', campaignId: 'camp-1', status: "pendente", date: "2026-05-10", protocol: "ARC-2026-001" }
    ],
    appointments: [
        { id: 'appt-1', petId: 'pet-1', date: "2025-12-10", procedure: "Castração", clinic: "Vet Serra", status: "concluido" },
        { id: 'appt-2', petId: 'pet-1', date: "2025-06-05", procedure: "Vacinação V10", clinic: "Pet Amigo", status: "concluido" }
    ],
    stats: {
        adopted: 124,
        castrated: 4502,
        campaigns: 8,
        clinics: 15
    }
};

// --- ESTADO DA APLICAÇÃO ---
let state = {
    currentUser: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyUser)) || null,
    theme: localStorage.getItem('arca_theme') || 'light',
    registeredUsers: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyUsers)) || [
        { id: 'admin', name: 'Administrador', email: 'arca.adocao.es@gmail.com', pass: '240be518fabd2724ddb6f04030113c5a0c20b922017c10729792033621453258', role: 'admin' },
        { id: 'user1', name: 'João Silva', email: 'joao@email.com', pass: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', role: 'user', cpf: '123.456.789-00', tel: '(27) 99888-7766', bairro: 'Laranjeiras' }
    ],
    currentView: 'home',
    // ... rest of state remains same
    viewParams: {},
    pets: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyPets)) || INITIAL_DATA.pets,
    adoptionPets: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyAdoptionPets)) || INITIAL_DATA.adoptionPets,
    requests: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyRequests)) || INITIAL_DATA.requests,
    adoptionRequests: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyAdoptions)) || [],
    denuncias: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyDenuncias)) || [],
    volunteers: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyVolunteers)) || [],
    notifications: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyNotifications)) || [],
    favorites: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyFavorites)) || [],
    clinicRatings: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyRatings)) || [],
    campaigns: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyCampaigns)) || INITIAL_DATA.campaigns,
    clinics: INITIAL_DATA.clinics,
    appointments: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyAppointments)) || INITIAL_DATA.appointments,
    calendarDate: new Date(),
    activeProntuarioTab: 'vacinas',
    adoptionFilter: 'Todos',
    adoptionSearch: '',
    adoptionGender: 'Todos',
    adoptionSize: 'Todos',
    clinicsFilter: 'Todas',
    adminFilterStatus: 'Todos'
};

// --- ROTEADOR ---
const router = {
    navigate(view, params = {}) {
        // Bloqueio de rota Admin para não-admins
        if (view === 'admin' && state.currentUser?.role !== 'admin') {
            utils.showToast('Acesso negado. Apenas administradores podem acessar esta área.', 'error');
            this.navigate('home');
            return;
        }
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.classList.add('opacity-0');
            contentArea.style.transform = 'translateY(10px)';
        }

        setTimeout(() => {
            state.currentView = view;
            state.viewParams = params;
            
            // Simulação de carregamento com skeleton para certas views
            if (['adocao', 'campanhas', 'clinicas'].includes(view)) {
                utils.showSkeleton('content-area', 6);
                setTimeout(() => {
                    render();
                    if (contentArea) {
                        contentArea.classList.remove('opacity-0');
                        contentArea.style.transform = 'translateY(0)';
                    }
                }, 600);
            } else {
                render();
                if (contentArea) {
                    contentArea.classList.remove('opacity-0');
                    contentArea.style.transform = 'translateY(0)';
                }
            }
            
            window.scrollTo(0, 0);
            
            // Fecha sidebar e overlay em mobile
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay?.classList.remove('show');
                document.body.style.overflow = '';
            }
        }, 200);
    }
};

// --- UTILITÁRIOS ---
const utils = {
    animateCounter(id, target, duration = 2000) {
        const obj = document.getElementById(id);
        if (!obj) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    },
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    },
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },
    formatCPF(value) {
        return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").substring(0, 14);
    },
    formatPhone(value) {
        const digits = value.replace(/\D/g, '').substring(0, 11);
        if (digits.length <= 10) {
            return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    },
    validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) return false;
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        return rev === parseInt(cpf.charAt(10));
    },
    showModal(title, body, footer = '') {
        const modalEl = document.getElementById('mainModal');
        if (!modalEl) return;
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalBody').innerHTML = body;
        document.getElementById('modalFooter').innerHTML = footer || `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>`;
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    },
    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container') || (() => {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            container.style.zIndex = '3000';
            document.body.appendChild(container);
            return container;
        })();

        const icons = {
            success: 'check-circle',
            error: 'alert-circle',
            warning: 'alert-triangle',
            info: 'info'
        };

        const colors = {
            success: 'text-success',
            error: 'text-danger',
            warning: 'text-warning',
            info: 'text-info'
        };

        const toastId = 'toast-' + Date.now();
        const toastHtml = `
            <div id="${toastId}" class="toast border-0 shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-body d-flex align-items-center gap-2 py-3 bg-white rounded-3">
                    <i data-lucide="${icons[type]}" class="${colors[type]} size-5"></i>
                    <div class="flex-grow-1 text-dark fw-medium">${message}</div>
                    <button type="button" class="btn-close ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        const toastEl = document.getElementById(toastId);
        lucide.createIcons();

        const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
        bsToast.show();

        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    },
    showSkeleton(containerId, count = 3) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let skeletons = '';
        for (let i = 0; i < count; i++) {
            skeletons += `
                <div class="col-md-4 mb-4">
                    <div class="card border-0 shadow-sm overflow-hidden" style="height: 300px;">
                        <div class="skeleton h-50 w-100"></div>
                        <div class="card-body">
                            <div class="skeleton mb-2" style="height: 20px; width: 60%;"></div>
                            <div class="skeleton mb-3" style="height: 14px; width: 80%;"></div>
                            <div class="skeleton mt-auto" style="height: 36px; width: 100%; border-radius: 20px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        container.innerHTML = `<div class="row fade-in">${skeletons}</div>`;
    },
    sendEmailSimulation(to, subject, body) {
        console.log(`Enviando de: ${APP_CONFIG.systemEmail}`);
        console.log(`Para: ${to}`);
        console.log(`Assunto: ${subject}`);
        
        // Simulação visual de envio
        const toast = document.createElement('div');
        toast.className = 'position-fixed bottom-0 end-0 p-3';
        toast.style.zIndex = '2000';
        toast.innerHTML = `
            <div class="toast show bg-dark text-white rounded-3 shadow" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-teal text-white py-2 border-0 rounded-top">
                    <i data-lucide="mail" class="size-4 me-2"></i>
                    <strong class="me-auto">E-mail do Sistema</strong>
                    <small>via ${APP_CONFIG.systemEmail}</small>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body py-3">
                    <div class="d-flex align-items-center gap-2">
                        <div class="spinner-border spinner-border-sm text-teal" role="status"></div>
                        <span>Enviando para <strong>${to}</strong>...</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            const body = toast.querySelector('.toast-body');
            body.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <i data-lucide="check-circle" class="text-success size-5"></i>
                    <span>E-mail enviado com sucesso para <strong>${to}</strong>!</span>
                </div>
            `;
            lucide.createIcons();
            setTimeout(() => toast.remove(), 4000);
        }, 2000);
    },
    syncState() {
        localStorage.setItem(APP_CONFIG.storageKeyUser, JSON.stringify(state.currentUser));
        localStorage.setItem(APP_CONFIG.storageKeyUsers, JSON.stringify(state.registeredUsers));
        localStorage.setItem(APP_CONFIG.storageKeyPets, JSON.stringify(state.pets));
        localStorage.setItem(APP_CONFIG.storageKeyAdoptionPets, JSON.stringify(state.adoptionPets));
        localStorage.setItem(APP_CONFIG.storageKeyRequests, JSON.stringify(state.requests));
        localStorage.setItem(APP_CONFIG.storageKeyAdoptions, JSON.stringify(state.adoptionRequests));
        localStorage.setItem(APP_CONFIG.storageKeyCampaigns, JSON.stringify(state.campaigns));
        localStorage.setItem(APP_CONFIG.storageKeyAppointments, JSON.stringify(state.appointments));
        localStorage.setItem(APP_CONFIG.storageKeyDenuncias, JSON.stringify(state.denuncias));
        localStorage.setItem(APP_CONFIG.storageKeyVolunteers, JSON.stringify(state.volunteers));
        localStorage.setItem(APP_CONFIG.storageKeyNotifications, JSON.stringify(state.notifications));
        localStorage.setItem(APP_CONFIG.storageKeyFavorites, JSON.stringify(state.favorites));
        localStorage.setItem(APP_CONFIG.storageKeyRatings, JSON.stringify(state.clinicRatings));
    }
};

// --- COMPONENTES DE RENDERIZAÇÃO ---

function render() {
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const adminMenu = document.querySelector('.admin-only');
    
    // Atualiza Tema
    document.documentElement.setAttribute('data-theme', state.theme);
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');
    if (state.theme === 'dark') {
        darkIcon?.classList.add('d-none');
        lightIcon?.classList.remove('d-none');
    } else {
        darkIcon?.classList.remove('d-none');
        lightIcon?.classList.add('d-none');
    }

    // Atualiza navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => {
        const parent = link.closest('.nav-item');
        if (parent.dataset.page === state.currentView) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Visibilidade Admin
    if (state.currentUser?.role === 'admin') {
        adminMenu?.classList.remove('d-none');
    } else {
        adminMenu?.classList.add('d-none');
    }

    // Sidebar Profile
    const sidebarProfile = document.getElementById('user-profile-sidebar');
    if (state.currentUser) {
        sidebarProfile?.classList.remove('d-none');
        sidebarProfile.innerHTML = `
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px; font-weight: 600;">
                ${state.currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div class="flex-grow-1 min-width-0">
                <div class="fw-bold text-truncate small">${state.currentUser.name}</div>
                <div class="text-muted text-truncate" style="font-size: 0.7rem;">${state.currentUser.email}</div>
            </div>
        `;
    } else {
        sidebarProfile?.classList.add('d-none');
    }

    // Header Usuário
    const userInfoHeader = document.getElementById('user-info-header');
    if (state.currentUser) {
        userInfoHeader.innerHTML = `
            <div class="d-flex align-items-center gap-2 cursor-pointer" onclick="router.navigate('perfil')">
                <div class="text-end d-none d-sm-block">
                    <div class="fw-bold small lh-1">${state.currentUser.name.split(' ')[0]}</div>
                    <small class="text-muted" style="font-size: 0.7rem;">Munícipe</small>
                </div>
                <div class="bg-primary-soft text-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 38px; height: 38px; font-weight: 600; border: 2px solid var(--primary-soft);">
                    ${state.currentUser.name.charAt(0).toUpperCase()}
                </div>
            </div>
        `;
    } else {
        userInfoHeader.innerHTML = `<button class="btn btn-teal btn-sm px-3 rounded-pill" onclick="router.navigate('login')">Entrar</button>`;
    }

    // Roteamento de Views
    const views = {
        home: renderHome,
        login: renderLogin,
        cadastro: renderCadastro,
        campanhas: renderCampanhas,
        vagas: renderVagas,
        adocao: renderAdocao,
        'cadastro-pet': renderCadastroPet,
        solicitacao: renderSolicitacao,
        acompanhamento: renderAcompanhamento,
        clinicas: renderClinicas,
        calendario: renderCalendario,
        prontuario: renderProntuario,
        perfil: renderPerfil,
        denuncias: renderDenuncias,
        doacoes: renderDoacoes,
        'lar-temporario': renderLarTemporario,
        educativo: renderEducativo,
        favoritos: renderFavoritos,
        carteirinha: renderCarteirinha,
        admin: renderAdmin,
        '404': render404
    };

    const renderFn = views[state.currentView] || views['404'];
    contentArea.innerHTML = renderFn();
    pageTitle.innerText = getPageTitle(state.currentView);
    
    // Atualiza Notificações
    renderNotifications();
    
    // Refresh Icons
    lucide.createIcons();
    
    // Inicializa Tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    initViewEvents();
}

function getPageTitle(view) {
    const titles = {
        home: 'Início',
        login: 'Acesso ao Sistema',
        cadastro: 'Cadastro de Munícipe',
        campanhas: 'Campanhas de Castração',
        vagas: 'Vagas Disponíveis',
        adocao: 'Adoção Responsável',
        'cadastro-pet': 'Cadastrar Animal',
        solicitacao: 'Nova Solicitação',
        acompanhamento: 'Meus Agendamentos',
        clinicas: 'Rede de Atendimento',
        calendario: 'Calendário Municipal',
        prontuario: 'Prontuário do Pet',
        perfil: 'Meus Dados',
        denuncias: 'Denúncia de Maus-tratos',
        doacoes: 'Doações ao Programa',
        'lar-temporario': 'Cadastro de Lar Temporário',
        educativo: 'Educação Animal',
        favoritos: 'Meus Favoritos',
        carteirinha: 'Carteirinha Digital',
        admin: 'Gestão do Programa'
    };
    return titles[view] || 'Página não encontrada';
}

// --- VIEWS IMPLEMENTATIONS ---

function renderHome() {
    const stats = INITIAL_DATA.stats;
    
    // Agendar animação dos contadores
    setTimeout(() => {
        utils.animateCounter('stat-adopted', stats.adopted);
        utils.animateCounter('stat-castrated', stats.castrated);
        utils.animateCounter('stat-campaigns', stats.campaigns);
        utils.animateCounter('stat-clinics', stats.clinics);
    }, 100);

    return `
        <div class="row g-4 fade-in">
            <div class="col-12">
                <div class="hero-card shadow-xl border-0">
                    <div class="position-relative z-1 col-lg-7">
                        <span class="badge bg-white text-primary rounded-pill px-3 py-2 mb-3 fw-bold small text-uppercase tracking-wider">Iniciativa Municipal</span>
                        <h1 class="display-5 fw-bold mb-3 lh-sm">Cuidando de quem sempre nos amou.</h1>
                        <p class="lead mb-4 opacity-90 fw-medium">A plataforma oficial da Serra para adoção responsável e castração gratuita. Juntos, transformamos a vida dos animais da nossa cidade.</p>
                        <div class="d-flex flex-wrap gap-3">
                            <button class="btn btn-white btn-lg px-4 text-primary fw-bold rounded-pill shadow-sm hover-lift" onclick="router.navigate('adocao')">
                                <i data-lucide="heart" class="size-5"></i> Quero Adotar
                            </button>
                            <button class="btn btn-outline-light btn-lg px-4 rounded-pill hover-lift" onclick="router.navigate('solicitacao')">
                                <i data-lucide="clipboard-list" class="size-5"></i> Solicitar Castração
                            </button>
                        </div>
                    </div>
                    <div class="hero-pattern-container">
                        <i data-lucide="paw-print" class="hero-pattern opacity-10" style="width: 300px; height: 300px;"></i>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-primary-soft text-primary"><i data-lucide="heart" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 text-primary counter-value" id="stat-adopted">0</h2>
                    <p class="text-muted small fw-medium mb-0">Animais Adotados</p>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-success-soft text-success" style="background: rgba(34, 197, 94, 0.1); color: #22c55e;"><i data-lucide="shield-check" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 counter-value" style="color: #22c55e;" id="stat-castrated">0</h2>
                    <p class="text-muted small fw-medium mb-0">Castrações</p>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-warning-soft text-warning" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;"><i data-lucide="megaphone" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 counter-value" style="color: #f59e0b;" id="stat-campaigns">0</h2>
                    <p class="text-muted small fw-medium mb-0">Campanhas</p>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-info-soft text-info" style="background: rgba(6, 182, 212, 0.1); color: #06b6d4;"><i data-lucide="hospital" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 counter-value" style="color: #06b6d4;" id="stat-clinics">0</h2>
                    <p class="text-muted small fw-medium mb-0">Clínicas</p>
                </div>
            </div>

            <!-- Quick Tips Section -->
            <div class="col-12 mt-5">
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <h4 class="fw-bold mb-0">Dicas para seu Pet</h4>
                    <button class="btn btn-link text-primary p-0 text-decoration-none small fw-bold" onclick="router.navigate('educativo')">Ver todas as dicas</button>
                </div>
                <div class="row g-3 row-cols-1 row-cols-md-3">
                    ${INITIAL_DATA.educational.map(tip => `
                        <div class="col-md-4">
                            <div class="card h-100 border-0 shadow-sm p-3 hover-lift">
                                <div class="d-flex align-items-center gap-3 mb-2">
                                    <div class="bg-primary-soft text-primary rounded-circle p-2">
                                        <i data-lucide="${tip.icon}" class="size-4"></i>
                                    </div>
                                    <h6 class="fw-bold mb-0 text-truncate">${tip.title}</h6>
                                </div>
                                <p class="text-muted small mb-0 line-clamp-2">${tip.content}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Featured Pets -->
            <div class="col-12 mt-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h3 class="fw-bold mb-0 text-primary">Aguardando um Lar</h3>
                        <p class="text-muted small mb-0">Conheça alguns dos nossos amigos que buscam uma família.</p>
                    </div>
                    <button class="btn btn-outline-primary btn-sm rounded-pill px-3" onclick="router.navigate('adocao')">
                        Ver todos <i data-lucide="arrow-right" class="size-4 ms-1"></i>
                    </button>
                </div>
                <div class="row g-4 row-cols-1 row-cols-md-4">
                    ${state.adoptionPets.slice(0, 4).map(pet => `
                        <div class="col-md-3">
                            <div class="card h-100 border-0 shadow-sm group hover-lift">
                                <div class="position-relative overflow-hidden">
                                    <img src="${pet.image}" class="pet-card-img" alt="${pet.name}" style="height: 200px; object-fit: cover;">
                                    <span class="pet-badge">${pet.species}</span>
                                    <div class="pet-card-overlay">
                                        <button class="btn btn-white btn-sm rounded-pill fw-bold" onclick="showPetDetails('${pet.id}')">Conhecer</button>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <h6 class="fw-bold mb-0">${pet.name}</h6>
                                        <button class="btn btn-link p-0 text-danger" onclick="toggleFavorite('${pet.id}', event)">
                                            <i data-lucide="heart" class="size-4 ${state.favorites.some(f => f.petId === pet.id && f.userId === state.currentUser?.id) ? 'fill-danger' : ''}"></i>
                                        </button>
                                    </div>
                                    <p class="text-muted extra-small mb-2">${pet.breed} • ${pet.age}</p>
                                    <button class="btn btn-primary-soft text-primary w-100 btn-sm rounded-pill fw-bold" onclick="showPetDetails('${pet.id}')">Ver Detalhes</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Como Funciona -->
            <div class="col-12 my-5">
                <div class="card bg-white border-0 shadow-sm p-5 rounded-xl">
                    <div class="text-center mb-5">
                        <h2 class="fw-bold">Como funciona?</h2>
                        <p class="text-muted">Três passos simples para você e seu pet.</p>
                    </div>
                    <div class="row g-5">
                        <div class="col-md-4">
                            <div class="text-center">
                                <div class="bg-primary-soft text-primary rounded-circle p-4 mx-auto mb-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i data-lucide="user-plus" class="size-8"></i>
                                </div>
                                <h5 class="fw-bold">1. Cadastre-se</h5>
                                <p class="text-muted small px-lg-4">Crie sua conta como munícipe da Serra em poucos minutos.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-center">
                                <div class="bg-primary-soft text-primary rounded-circle p-4 mx-auto mb-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i data-lucide="clipboard-check" class="size-8"></i>
                                </div>
                                <h5 class="fw-bold">2. Solicite</h5>
                                <p class="text-muted small px-lg-4">Escolha o serviço desejado e preencha as informações do pet.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-center">
                                <div class="bg-primary-soft text-primary rounded-circle p-4 mx-auto mb-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i data-lucide="bell-ring" class="size-8"></i>
                                </div>
                                <h5 class="fw-bold">3. Acompanhe</h5>
                                <p class="text-muted small px-lg-4">Receba atualizações em tempo real sobre seu pedido.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAdocao() {
    const filter = state.adoptionFilter || 'Todos';
    const gender = state.adoptionGender || 'Todos';
    const size = state.adoptionSize || 'Todos';
    const search = state.adoptionSearch.toLowerCase();

    const filteredPets = state.adoptionPets.filter(pet => {
        const matchesFilter = filter === 'Todos' || (filter === 'Cães' && pet.species === 'Cachorro') || (filter === 'Gatos' && pet.species === 'Gato');
        const matchesGender = gender === 'Todos' || pet.gender === gender;
        const matchesSize = size === 'Todos' || pet.size === size;
        const matchesSearch = pet.name.toLowerCase().includes(search) || pet.breed.toLowerCase().includes(search);
        return matchesFilter && matchesGender && matchesSize && matchesSearch;
    });

    return `
        <div class="row g-4 fade-in">
            <div class="col-12">
                <div class="card bg-white p-4 border-0 shadow-sm rounded-xl mb-4">
                    <div class="row align-items-center g-4">
                        <div class="col-lg-4">
                            <h3 class="fw-bold text-primary mb-1">Encontre seu amigo</h3>
                            <p class="text-muted mb-0 small">Mostrando ${filteredPets.length} animais disponíveis para adoção</p>
                        </div>
                        <div class="col-lg-8">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-light border-0 text-muted"><i data-lucide="search" class="size-4"></i></span>
                                <input type="text" class="form-control border-0 bg-light" placeholder="Pesquisar por nome ou raça..." 
                                       value="${state.adoptionSearch}" oninput="state.adoptionSearch = this.value; render();">
                            </div>
                            <div class="d-flex flex-column gap-3">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="small fw-bold text-muted flex-shrink-0">Espécie:</span>
                                    <div class="mobile-scroll-x">
                                        <div class="tag-pill ${filter === 'Todos' ? 'active' : ''}" onclick="state.adoptionFilter = 'Todos'; render();">Todos</div>
                                        <div class="tag-pill ${filter === 'Cães' ? 'active' : ''}" onclick="state.adoptionFilter = 'Cães'; render();">Cães</div>
                                        <div class="tag-pill ${filter === 'Gatos' ? 'active' : ''}" onclick="state.adoptionFilter = 'Gatos'; render();">Gatos</div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="small fw-bold text-muted flex-shrink-0">Gênero:</span>
                                    <div class="mobile-scroll-x">
                                        <div class="tag-pill ${gender === 'Todos' ? 'active' : ''}" onclick="state.adoptionGender = 'Todos'; render();">Ambos</div>
                                        <div class="tag-pill ${gender === 'Macho' ? 'active' : ''}" onclick="state.adoptionGender = 'Macho'; render();">Machos</div>
                                        <div class="tag-pill ${gender === 'Fêmea' ? 'active' : ''}" onclick="state.adoptionGender = 'Fêmea'; render();">Fêmeas</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${filteredPets.length === 0 ? `
                <div class="col-12 text-center py-5">
                    <div class="bg-white rounded-circle shadow-sm p-4 mx-auto mb-3" style="width: 120px; height: 120px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="search-x" class="text-muted" style="width: 60px; height: 60px;"></i>
                    </div>
                    <h4 class="text-muted fw-bold">Nenhum pet encontrado.</h4>
                    <p class="text-muted">Tente ajustar seus filtros para encontrar outros amiguinhos.</p>
                </div>
            ` : ''}

            ${filteredPets.map(pet => `
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden hover-lift">
                        <div class="position-relative">
                            <img src="${pet.image}" class="pet-card-img" alt="${pet.name}">
                            <span class="pet-badge">${pet.age}</span>
                        </div>
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="fw-bold mb-0">${pet.name}</h5>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-link p-0 text-danger" onclick="toggleFavorite('${pet.id}', event)">
                                        <i data-lucide="heart" class="size-5 ${state.favorites.some(f => f.petId === pet.id && f.userId === state.currentUser?.id) ? 'fill-danger' : ''}"></i>
                                    </button>
                                    <i data-lucide="${pet.gender === 'Fêmea' ? 'venus' : 'mars'}" class="size-4 ${pet.gender === 'Fêmea' ? 'text-danger' : 'text-primary'}"></i>
                                </div>
                            </div>
                            <p class="text-muted small mb-3">${pet.breed} • ${pet.size}</p>
                            <button class="btn btn-teal w-100 fw-bold rounded-pill" onclick="showPetDetails('${pet.id}')">Quero Adotar</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showPetDetails(petId) {
    const pet = state.adoptionPets.find(p => p.id === petId);
    if (!pet) return;

    const body = `
        <div class="row g-4 fade-in">
            <div class="col-md-6">
                <div class="position-relative">
                    <img src="${pet.image}" class="img-fluid rounded-xl shadow-md mb-3 w-100" alt="${pet.name}" style="height: 350px; object-fit: cover;">
                    <div class="d-flex gap-2 mt-2">
                        <img src="${pet.image}" class="rounded-3 border border-primary" style="width: 80px; height: 60px; object-fit: cover; cursor: pointer; opacity: 1;">
                        <div class="rounded-3 bg-light d-flex align-items-center justify-content-center text-muted" style="width: 80px; height: 60px; font-size: 10px;">+ Fotos</div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h2 class="fw-bold mb-0 text-primary">${pet.name}</h2>
                        <span class="text-muted small">${pet.breed} • ${pet.age}</span>
                    </div>
                    <span class="badge bg-primary-soft text-primary px-3 py-2 rounded-pill small fw-bold">Disponível</span>
                </div>
                
                <div class="row g-2 mb-4 text-center">
                    <div class="col-4">
                        <div class="p-2 bg-light rounded-3">
                            <i data-lucide="venus-mars" class="size-4 text-primary mb-1"></i>
                            <div class="extra-small text-muted fw-bold">SEXO</div>
                            <div class="small fw-bold">${pet.gender}</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="p-2 bg-light rounded-3">
                            <i data-lucide="maximize" class="size-4 text-primary mb-1"></i>
                            <div class="extra-small text-muted fw-bold">PORTE</div>
                            <div class="small fw-bold">${pet.size}</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="p-2 bg-light rounded-3">
                            <i data-lucide="smile" class="size-4 text-primary mb-1"></i>
                            <div class="extra-small text-muted fw-bold">TEMPER.</div>
                            <div class="small fw-bold">${pet.temperamento}</div>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="fw-bold small mb-2 text-primary text-uppercase tracking-wider">História & Personalidade</h6>
                    <p class="text-muted small mb-0 lh-base">${pet.description}</p>
                </div>
                
                <div class="p-3 bg-primary-soft rounded-xl mb-4 border border-primary-soft">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-primary text-white rounded-circle p-2">
                            <i data-lucide="phone" class="size-4"></i>
                        </div>
                        <div>
                            <div class="extra-small text-primary fw-bold">FALE COM O TUTOR</div>
                            <div class="small fw-bold">${pet.contact}</div>
                        </div>
                        <button class="btn btn-primary btn-sm rounded-pill ms-auto px-3" onclick="utils.showToast('Abrindo WhatsApp...', 'info')">Chamar</button>
                    </div>
                </div>

                <form id="interestForm" onsubmit="handleAdoptionInterest(event, '${pet.id}')">
                    <button type="submit" class="btn btn-primary w-100 btn-lg fw-bold rounded-pill hover-lift shadow-sm">
                        <i data-lucide="heart" class="size-5"></i> Quero Adotar o ${pet.name}
                    </button>
                    <p class="text-muted extra-small text-center mt-2 mb-0">Ao clicar, o tutor receberá seu interesse e entrará em contato.</p>
                </form>
            </div>
        </div>
    `;
    utils.showModal(`${pet.name} - Detalhes`, body, '');
    lucide.createIcons();
}

async function handleAdoptionInterest(event, petId) {
    event.preventDefault();
    if (!state.currentUser) {
        utils.showToast('Faça login para manifestar interesse em adoção.', 'warning');
        bootstrap.Modal.getInstance(document.getElementById('mainModal'))?.hide();
        router.navigate('login');
        return;
    }

    const pet = state.adoptionPets.find(p => p.id === petId);
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Enviando interesse...`;

    setTimeout(() => {
        const interest = {
            id: utils.generateId(),
            userId: state.currentUser.id,
            petId: petId,
            petName: pet.name,
            date: new Date().toISOString(),
            status: 'pendente'
        };

        state.adoptionRequests.push(interest);
        
        addNotification(
            state.currentUser.id,
            'Interesse Registrado',
            `Seu interesse em adotar ${pet.name} foi enviado com sucesso!`,
            'heart'
        );

        utils.syncState();

        bootstrap.Modal.getInstance(document.getElementById('mainModal'))?.hide();
        utils.showToast(`Obrigado! Seu interesse em ${pet.name} foi registrado.`, 'success');
        
        utils.sendEmailSimulation(
            state.currentUser.email,
            `Interesse em Adoção - ${pet.name}`,
            `Olá ${state.currentUser.name},\n\nConfirmamos seu interesse em adotar o(a) ${pet.name}. O tutor entrará em contato em breve.`
        );
    }, 1500);
}

function renderCadastroPet() {
    if (!state.currentUser) {
        return `<div class="alert alert-warning">Você precisa estar logado para cadastrar um animal. <button class="btn btn-link p-0 fw-bold" onclick="router.navigate('login')">Fazer Login</button></div>`;
    }

    return `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card p-5 border-0 shadow-sm">
                    <div class="text-center mb-5">
                        <div class="bg-teal-light text-teal rounded-circle p-3 mx-auto mb-3" style="width: 72px; height: 72px;">
                            <i data-lucide="plus-circle" class="size-6"></i>
                        </div>
                        <h3 class="fw-bold">Cadastrar Animal para Adoção</h3>
                        <p class="text-muted">Ajude um amiguinho a encontrar um novo lar.</p>
                    </div>
                    <form id="cadastroPetForm">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Nome do Pet</label>
                                <input type="text" class="form-control" id="petName" required placeholder="Ex: Mel, Thor">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Espécie</label>
                                <select class="form-select" id="petSpecies" required>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Raça</label>
                                <input type="text" class="form-control" id="petBreed" required placeholder="Ex: SRD, Poodle">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Idade Aproximada</label>
                                <input type="text" class="form-control" id="petAge" required placeholder="Ex: 2 anos, 3 meses">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label small fw-bold">Sexo</label>
                                <select class="form-select" id="petGender" required>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label small fw-bold">Porte</label>
                                <select class="form-select" id="petSize" required>
                                    <option value="Pequeno">Pequeno</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label small fw-bold">Temperamento</label>
                                <input type="text" class="form-control" id="petTemp" required placeholder="Ex: Dócil, Ativo">
                            </div>
                            <div class="col-12">
                                <label class="form-label small fw-bold">Descrição</label>
                                <textarea class="form-control" id="petDesc" rows="3" required placeholder="Conte a história do pet e suas características..."></textarea>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">URL da Foto</label>
                                <input type="url" class="form-control" id="petPhoto" required placeholder="https://exemplo.com/foto.jpg">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Telefone de Contato</label>
                                <input type="tel" class="form-control" id="petContact" required placeholder="(27) 99999-9999">
                            </div>
                            <div class="col-12 mt-5">
                                <button type="submit" class="btn btn-teal w-100 btn-lg fw-bold rounded-pill">Publicar para Adoção</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}


function renderLogin() {
    return `
        <div class="row justify-content-center pt-md-5 fade-in">
            <div class="col-12 col-md-5 col-lg-4">
                <div class="card p-4 border-0 shadow-lg rounded-xl">
                    <div class="text-center mb-4">
                        <div class="bg-primary-soft text-primary rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                            <i data-lucide="user" class="size-6"></i>
                        </div>
                        <h4 class="fw-bold mb-1">Acesse sua conta</h4>
                        <p class="text-muted small">Entre para gerenciar seus pets e agendamentos</p>
                    </div>
                    <form id="loginForm">
                        <div class="mb-3">
                            <label class="form-label extra-small fw-bold text-muted text-uppercase">E-mail</label>
                            <input type="email" class="form-control" id="loginEmail" required placeholder="exemplo@email.com">
                        </div>
                        <div class="mb-3">
                            <label class="form-label extra-small fw-bold text-muted text-uppercase">Senha</label>
                            <input type="password" class="form-control" id="loginPass" required placeholder="••••••••">
                        </div>
                        <div id="loginError" class="alert alert-danger d-none py-2 small mb-3"></div>
                        <button type="submit" class="btn btn-primary w-100 fw-bold rounded-pill py-2 shadow-sm">
                            Entrar no Sistema
                        </button>
                    </form>
                    <div class="mt-4 text-center">
                        <span class="text-muted small">Não tem conta?</span>
                        <button class="btn btn-link text-primary btn-sm fw-bold p-0 ms-1" onclick="router.navigate('cadastro')">Cadastre-se aqui</button>
                    </div>
                    <div class="mt-4 p-3 bg-light rounded-xl text-center small text-muted border border-dashed">
                        Dica: Use <strong class="text-dark">${APP_CONFIG.systemEmail}</strong> para acesso administrativo.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCadastro() {
    return `
        <div class="row justify-content-center pt-md-4 fade-in pb-5">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card p-4 border-0 shadow-lg rounded-xl">
                    <div class="text-center mb-4">
                        <div class="bg-primary-soft text-primary rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                            <i data-lucide="user-plus" class="size-6"></i>
                        </div>
                        <h4 class="fw-bold mb-1">Crie sua conta</h4>
                        <p class="text-muted small">Junte-se à nossa comunidade de proteção animal</p>
                    </div>
                    <form id="cadastroForm">
                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label extra-small fw-bold text-muted text-uppercase">Nome Completo</label>
                                <input type="text" class="form-control" required placeholder="João da Silva">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label extra-small fw-bold text-muted text-uppercase">CPF</label>
                                <input type="text" class="form-control" id="cpfInput" maxlength="14" placeholder="000.000.000-00" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label extra-small fw-bold text-muted text-uppercase">Telefone</label>
                                <input type="tel" class="form-control" placeholder="(27) 99999-9999" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label extra-small fw-bold text-muted text-uppercase">E-mail</label>
                                <input type="email" class="form-control" required placeholder="joao@exemplo.com">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label extra-small fw-bold text-muted text-uppercase">Senha</label>
                                <input type="password" class="form-control" required placeholder="••••••••">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label extra-small fw-bold text-muted text-uppercase">Confirmar Senha</label>
                                <input type="password" class="form-control" required placeholder="••••••••">
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" required id="terms">
                                    <label class="form-check-label small" for="terms">
                                        Declaro residir no município da Serra e aceito os termos do programa.
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-primary w-100 fw-bold rounded-pill py-2 shadow-sm">
                                    Criar Conta
                                </button>
                            </div>
                        </div>
                    </form>
                    <div class="mt-4 text-center">
                        <span class="text-muted small">Já possui uma conta?</span>
                        <button class="btn btn-link text-primary btn-sm fw-bold p-0 ms-1" onclick="router.navigate('login')">Fazer Login</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCampanhas() {
    const activeTab = state.campaignsTab || 'ativas';
    const filteredCampaigns = state.campaigns.filter(c => 
        activeTab === 'ativas' ? (c.status === 'aberta' || c.status === 'prevista') : c.status === 'encerrada'
    );

    return `
        <div class="row g-4 fade-in">
            <div class="col-12">
                <div class="mobile-scroll-x mb-4 pb-2 border-bottom">
                    <div class="tag-pill ${activeTab === 'ativas' ? 'active' : ''}" onclick="state.campaignsTab = 'ativas'; render();">Campanhas Ativas</div>
                    <div class="tag-pill ${activeTab === 'historico' ? 'active' : ''}" onclick="state.campaignsTab = 'historico'; render();">Histórico / Realizadas</div>
                </div>
            </div>
            ${filteredCampaigns.length === 0 ? `
                <div class="col-12 text-center py-5">
                    <p class="text-muted">Nenhuma campanha encontrada nesta categoria.</p>
                </div>
            ` : ''}
            ${filteredCampaigns.map(c => `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 border-0 shadow-sm hover-lift">
                        <div class="card-header bg-white border-0 pt-3">
                            <span class="badge ${c.status === 'aberta' ? 'bg-success' : c.status === 'prevista' ? 'bg-warning text-dark' : 'bg-secondary'}">${c.status.toUpperCase()}</span>
                        </div>
                        <div class="card-body">
                            <h5 class="fw-bold mb-2">${c.title}</h5>
                            <p class="text-muted small mb-3">${c.description}</p>
                            <div class="d-flex flex-column gap-2">
                                <div class="small text-muted d-flex align-items-center gap-2">
                                    <i data-lucide="calendar" class="size-4"></i> ${new Date(c.date).toLocaleDateString()}
                                </div>
                                <div class="small text-muted d-flex align-items-center gap-2">
                                    <i data-lucide="map-pin" class="size-4"></i> ${c.location}
                                </div>
                                <div class="small fw-bold text-teal d-flex align-items-center gap-2 mt-2">
                                    <i data-lucide="users" class="size-4"></i> ${c.spots} Vagas Disponíveis
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-white border-0 pb-3">
                            <button class="btn btn-teal w-100 btn-sm fw-bold rounded-pill" 
                                    ${c.status !== 'aberta' ? 'disabled' : ''} 
                                    onclick="router.navigate('solicitacao', {campaignId: ${c.id}})">
                                ${c.status === 'encerrada' ? 'Campanha Encerrada' : 'Solicitar Participação'}
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderVagas() {
    const totalVagas = state.campaigns.reduce((acc, c) => acc + (c.status === 'aberta' ? c.spots : 0), 0);
    return `
        <div class="row g-4 fade-in">
            <div class="col-12">
                <div class="card bg-primary-soft border-0 p-4 text-center rounded-xl">
                    <h1 class="fw-bold text-primary mb-0">${totalVagas}</h1>
                    <p class="text-muted mb-0 small fw-bold text-uppercase tracking-wider">Vagas disponíveis para agendamento</p>
                </div>
            </div>
            <div class="col-12">
                <h5 class="fw-bold mb-3 px-1">Disponibilidade por Região</h5>
                <div class="card border-0 shadow-sm overflow-hidden rounded-xl">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr class="extra-small text-muted text-uppercase fw-bold">
                                    <th class="ps-4">Localização</th>
                                    <th>Próxima Data</th>
                                    <th>Vagas</th>
                                    <th class="text-end pe-4">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${state.campaigns.filter(c => c.status !== 'encerrada').map(c => `
                                    <tr class="small">
                                        <td class="ps-4 fw-bold text-dark">${c.location}</td>
                                        <td class="text-muted">${new Date(c.date).toLocaleDateString()}</td>
                                        <td><span class="badge bg-primary-soft text-primary rounded-pill px-3">${c.spots}</span></td>
                                        <td class="text-end pe-4">
                                            <button class="btn btn-primary btn-sm rounded-pill px-3 fw-bold" ${c.status !== 'aberta' ? 'disabled' : ''} onclick="router.navigate('solicitacao', {campaignId: ${c.id}})">
                                                Agendar
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSolicitacao() {
    if (!state.currentUser) {
        return `<div class="alert alert-warning">Você precisa estar logado para solicitar castração. <button class="btn btn-link p-0 fw-bold" onclick="router.navigate('login')">Fazer Login</button></div>`;
    }
    
    const campaigns = state.campaigns.filter(c => c.status === 'aberta');
    
    return `
        <div class="row justify-content-center fade-in">
            <div class="col-12 col-lg-8">
                <div class="card p-4 border-0 shadow-sm rounded-xl">
                    <h5 class="fw-bold mb-4 text-primary">Solicitação de Castração</h5>
                    <form id="solicitacaoForm">
                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label">Selecione a Campanha/Vaga</label>
                                <select class="form-select" id="solicCampaign" required>
                                    <option value="">Selecione...</option>
                                    ${campaigns.map(c => `<option value="${c.id}" ${state.viewParams.campaignId == c.id ? 'selected' : ''}>${c.title} - ${c.location}</option>`).join('')}
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Nome do Pet</label>
                                <input type="text" class="form-control" id="solicPetName" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Espécie</label>
                                <select class="form-select" id="solicPetSpecies" required>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Sexo</label>
                                <select class="form-select" id="solicPetGender" required>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Peso Aproximado (kg)</label>
                                <input type="number" class="form-control" id="solicPetWeight" required step="0.1" min="0.1">
                            </div>
                            <div class="col-md-12">
                                <label class="form-label">Raça (ou SRD)</label>
                                <input type="text" class="form-control" id="solicPetBreed" placeholder="Ex: Poodle, SRD, Siamês">
                            </div>
                            <div class="col-12 mt-4">
                                <div class="p-3 bg-light rounded border small text-muted mb-3">
                                    <i data-lucide="info" class="me-2" style="width: 14px;"></i>
                                    <strong>Requisitos:</strong> O animal deve estar em jejum de 8h e em boas condições de saúde. O tutor deve levar documento oficial com foto e comprovante de residência na Serra.
                                </div>
                                <button type="submit" class="btn btn-teal text-white w-100 fw-bold">Enviar Solicitação</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderAcompanhamento() {
    if (!state.currentUser) return `<div class="alert alert-warning">Faça login para acompanhar suas solicitações.</div>`;
    
    const userRequests = state.requests.filter(r => r.userId === state.currentUser.id);
    
    return `
        <div class="row g-4">
            <div class="col-12">
                <div class="card border-0 shadow-sm p-4 mb-4 bg-teal text-white hero-card" style="padding: 2rem;">
                    <div class="d-flex align-items-center gap-3 position-relative z-1">
                        <div class="bg-white bg-opacity-20 rounded-circle p-3">
                            <i data-lucide="clock" class="size-6"></i>
                        </div>
                        <div>
                            <h4 class="fw-bold mb-0">Meus Agendamentos</h4>
                            <p class="mb-0 opacity-80 small">Acompanhe o status das suas solicitações de castração.</p>
                        </div>
                    </div>
                    <i data-lucide="calendar" class="hero-pattern" style="width: 150px; height: 150px; right: -20px; bottom: -20px;"></i>
                </div>
            </div>

            ${userRequests.length === 0 ? `
                <div class="col-12 text-center py-5">
                    <div class="bg-white rounded-4 shadow-sm p-5 mx-auto mb-3" style="max-width: 400px;">
                        <i data-lucide="clipboard-x" class="text-muted mb-3" style="width: 64px; height: 64px;"></i>
                        <h5 class="fw-bold text-muted">Nenhuma solicitação encontrada</h5>
                        <p class="text-muted small mb-4">Você ainda não realizou nenhum pedido de castração pelo sistema.</p>
                        <button class="btn btn-teal rounded-pill px-4" onclick="router.navigate('solicitacao')">Solicitar Agora</button>
                    </div>
                </div>
            ` : userRequests.map(r => {
                const pet = state.pets.find(p => p.id === r.petId);
                const campaign = state.campaigns.find(c => c.id === r.campaignId);
                
                const steps = [
                    { label: 'Solicitado', status: 'completed' },
                    { label: 'Em Análise', status: r.status === 'pendente' ? 'active' : 'completed' },
                    { label: 'Aprovado', status: r.status === 'aprovado' ? 'active' : r.status === 'rejeitado' ? 'rejected' : r.status === 'pendente' ? 'pending' : 'completed' },
                    { label: 'Concluído', status: 'pending' }
                ];

                return `
                <div class="col-12">
                    <div class="card border-0 shadow-sm overflow-hidden mb-4">
                        <div class="card-body p-0">
                            <div class="row g-0">
                                <div class="col-md-3 bg-light p-4 border-end">
                                    <div class="d-flex align-items-center gap-2 mb-3">
                                        <span class="badge bg-teal-light text-teal rounded-pill px-3">PROTOCOLO</span>
                                        <strong class="text-teal">${r.protocol}</strong>
                                    </div>
                                    <h5 class="fw-bold mb-1">${pet ? pet.name : 'N/A'}</h5>
                                    <p class="text-muted small mb-0">${pet ? pet.species : ''} • ${pet ? pet.breed : ''}</p>
                                    <hr class="my-3 opacity-10">
                                    <div class="small text-muted mb-2">
                                        <i data-lucide="calendar" class="size-4 me-1"></i> Pedido em: ${new Date(r.date).toLocaleDateString()}
                                    </div>
                                    <div class="small text-muted">
                                        <i data-lucide="map-pin" class="size-4 me-1"></i> ${campaign ? campaign.location : 'Clínica Municipal'}
                                    </div>
                                </div>
                                <div class="col-md-9 p-4">
                                    <div class="d-flex justify-content-between align-items-center mb-5">
                                        <h6 class="fw-bold text-muted mb-0 uppercase small tracking-wider">Status do Processo</h6>
                                        <span class="badge ${r.status === 'pendente' ? 'bg-warning text-dark' : r.status === 'aprovado' ? 'bg-success' : 'bg-danger'} px-3 py-2 rounded-pill">
                                            ${r.status.toUpperCase()}
                                        </span>
                                    </div>
                                    
                                    <div class="progress-stepper mb-5 px-md-5">
                                        ${steps.map((step, idx) => `
                                            <div class="step-item ${step.status}" data-bs-toggle="tooltip" title="${step.label}">
                                                ${step.status === 'completed' ? '<i data-lucide="check" class="size-4"></i>' : idx + 1}
                                                <div class="position-absolute text-center small fw-bold mt-2 step-label" style="top: 100%; width: 100px; left: 50%; transform: translateX(-50%); color: ${step.status === 'active' ? 'var(--primary)' : 'var(--text-muted)'}">
                                                    ${step.label}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                    
                                    ${r.status === 'aprovado' ? `
                                        <div class="alert bg-success-subtle border-0 rounded-4 d-flex align-items-center gap-3 mt-5 mx-4">
                                            <i data-lucide="info" class="text-success size-6"></i>
                                            <div>
                                                <strong class="text-success d-block">Sua solicitação foi aprovada!</strong>
                                                <span class="small text-success opacity-75">Compareça ao local indicado na data da campanha portando seus documentos e o pet em jejum.</span>
                                            </div>
                                        </div>
                                    ` : r.status === 'rejeitado' ? `
                                        <div class="alert bg-danger-subtle border-0 rounded-4 d-flex align-items-center gap-3 mt-5 mx-4">
                                            <i data-lucide="alert-circle" class="text-danger size-6"></i>
                                            <div>
                                                <strong class="text-danger d-block">Solicitação Recusada</strong>
                                                <span class="small text-danger opacity-75">Infelizmente seu pedido não atende aos requisitos do programa no momento. Entre em contato para mais informações.</span>
                                            </div>
                                        </div>
                                    ` : `
                                        <div class="alert bg-light border-0 rounded-4 d-flex align-items-center gap-3 mt-5 mx-4">
                                            <i data-lucide="info" class="text-muted size-6"></i>
                                            <div>
                                                <strong class="text-dark d-block">Em análise pela equipe técnica</strong>
                                                <span class="small text-muted opacity-75">Aguarde o prazo de até 5 dias úteis para a validação dos dados e agendamento.</span>
                                            </div>
                                        </div>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderClinicas() {
    return `
        <div class="row g-4">
            <div class="col-12">
                <div class="d-flex gap-2 mb-2">
                    <button class="filter-pill ${state.clinicsFilter === 'Todas' ? 'active' : ''}" onclick="state.clinicsFilter = 'Todas'; render();">Todas</button>
                    <button class="filter-pill ${state.clinicsFilter === 'Municipal' ? 'active' : ''}" onclick="state.clinicsFilter = 'Municipal'; render();">Municipais</button>
                    <button class="filter-pill ${state.clinicsFilter === 'Credenciada' ? 'active' : ''}" onclick="state.clinicsFilter = 'Credenciada'; render();">Credenciadas</button>
                </div>
            </div>
            ${state.clinics.filter(c => !state.clinicsFilter || state.clinicsFilter === 'Todas' || c.type === state.clinicsFilter).map(c => {
                const ratings = state.clinicRatings.filter(r => r.clinicId === c.id);
                const avgRating = ratings.length > 0 ? (ratings.reduce((acc, r) => acc + r.stars, 0) / ratings.length).toFixed(1) : c.rating;
                
                return `
                <div class="col-md-6">
                    <div class="card h-100 p-4 shadow-sm border-0">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h5 class="fw-bold mb-0">${c.name}</h5>
                                <span class="badge bg-teal-light text-teal small">${c.type}</span>
                            </div>
                            <div class="text-end">
                                <div class="d-flex align-items-center gap-1 text-warning fw-bold">
                                    <i data-lucide="star" class="size-4 fill-warning"></i> ${avgRating}
                                </div>
                                <small class="text-muted" style="font-size: 10px;">${ratings.length} avaliações</small>
                            </div>
                        </div>
                        <p class="text-muted small mb-3"><i data-lucide="map-pin" class="me-2 text-teal" style="width: 14px;"></i> ${c.address}</p>
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <span class="small text-muted"><i data-lucide="navigation" class="me-1" style="width: 14px;"></i> ${c.distance}</span>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-teal text-white flex-grow-1 btn-sm fw-bold" onclick="openMap(${c.lat}, ${c.lng}, '${c.name}')">Ver no Mapa</button>
                            <button class="btn btn-outline-teal btn-sm" onclick="openRatingModal('${c.id}', '${c.name}')" title="Avaliar Clínica">
                                <i data-lucide="message-square" class="size-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;
}

function openRatingModal(id, name) {
    if (!state.currentUser) {
        utils.showToast('Faça login para avaliar uma clínica.', 'warning');
        router.navigate('login');
        return;
    }

    const body = `
        <div class="text-center p-3">
            <h6 class="mb-3">Como foi sua experiência na <strong>${name}</strong>?</h6>
            <div class="d-flex justify-content-center gap-2 mb-4" id="star-rating">
                ${[1, 2, 3, 4, 5].map(i => `<i data-lucide="star" class="size-8 cursor-pointer text-muted star-btn" data-star="${i}" onclick="setRatingStars(${i})"></i>`).join('')}
            </div>
            <textarea class="form-control" id="ratingComment" rows="3" placeholder="Deixe um comentário opcional..."></textarea>
            <input type="hidden" id="ratingValue" value="0">
        </div>
    `;
    const footer = `
        <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn btn-teal btn-sm" onclick="saveClinicRating('${id}')">Enviar Avaliação</button>
    `;
    utils.showModal('Avaliar Clínica', body, footer);
    lucide.createIcons();
}

function setRatingStars(count) {
    const stars = document.querySelectorAll('.star-btn');
    document.getElementById('ratingValue').value = count;
    stars.forEach((s, i) => {
        if (i < count) {
            s.classList.add('text-warning', 'fill-warning');
            s.classList.remove('text-muted');
        } else {
            s.classList.remove('text-warning', 'fill-warning');
            s.classList.add('text-muted');
        }
    });
}

function saveClinicRating(clinicId) {
    const stars = parseInt(document.getElementById('ratingValue').value);
    const comment = document.getElementById('ratingComment').value;

    if (stars === 0) {
        utils.showToast('Por favor, selecione pelo menos uma estrela.', 'warning');
        return;
    }

    const rating = {
        id: utils.generateId(),
        userId: state.currentUser.id,
        clinicId,
        stars,
        comment,
        date: new Date().toISOString()
    };

    state.clinicRatings.push(rating);
    utils.syncState();
    utils.showToast('Obrigado pela sua avaliação!', 'success');
    bootstrap.Modal.getInstance(document.getElementById('mainModal'))?.hide();
    render();
}

function openMap(lat, lng, name) {
    const url = `https://www.google.com/maps?q=${lat},${lng}(${encodeURIComponent(name)})&z=15&t=m`;
    window.open(url, '_blank');
}

function renderCalendario() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const currentMonth = state.calendarDate.getMonth();
    const currentYear = state.calendarDate.getFullYear();
    
    // Lógica para dias do mês
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    return `
        <div class="card shadow-sm border-0 p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold mb-0 text-teal">${monthNames[currentMonth]} ${currentYear}</h5>
                <div class="btn-group shadow-sm">
                    <button class="btn btn-white btn-sm border" onclick="changeCalendarMonth(-1)"><i data-lucide="chevron-left" class="size-4"></i></button>
                    <button class="btn btn-white btn-sm border" onclick="state.calendarDate = new Date(); render();">Hoje</button>
                    <button class="btn btn-white btn-sm border" onclick="changeCalendarMonth(1)"><i data-lucide="chevron-right" class="size-4"></i></button>
                </div>
            </div>
            <div class="calendar-grid rounded overflow-hidden shadow-sm">
                ${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => `<div class="day-header">${d}</div>`).join('')}
                ${Array(firstDay).fill('').map(() => `<div class="calendar-day bg-light"></div>`).join('')}
                ${Array.from({length: daysInMonth}, (_, i) => {
                    const day = i + 1;
                    const campaignsToday = state.campaigns.filter(c => {
                        const d = new Date(c.date);
                        return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
                    });
                    const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
                    return `
                        <div class="calendar-day ${isToday ? 'bg-teal-light' : ''}">
                            <span class="small fw-bold ${isToday ? 'text-teal' : 'text-muted'}">${day}</span>
                            <div class="d-flex flex-column gap-1 mt-1">
                                ${campaignsToday.map(c => `
                                    <div class="bg-teal text-white rounded px-1 py-0.5 cursor-pointer" 
                                         style="font-size: 9px; line-height: 1;" 
                                         onclick="router.navigate('campanhas')"
                                         title="${c.title}">
                                        Mutirão
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="mt-4 p-3 bg-light rounded-3">
                <h6 class="fw-bold small mb-2"><i data-lucide="info" class="size-4 me-1"></i> Legenda</h6>
                <div class="d-flex align-items-center gap-3">
                    <div class="d-flex align-items-center gap-1 small text-muted">
                        <div class="bg-teal rounded" style="width: 12px; height: 12px;"></div> Mutirão de Castração
                    </div>
                    <div class="d-flex align-items-center gap-1 small text-muted">
                        <div class="bg-teal-light border border-teal rounded" style="width: 12px; height: 12px;"></div> Dia Atual
                    </div>
                </div>
            </div>
        </div>
    `;
}

function changeCalendarMonth(offset) {
    state.calendarDate.setMonth(state.calendarDate.getMonth() + offset);
    render();
}

function renderProntuario() {
    if (!state.currentUser) return `<div class="alert alert-warning">Faça login para ver o prontuário dos seus pets.</div>`;
    
    const userPets = state.pets.filter(p => p.ownerId === state.currentUser.id);
    const activeTab = state.activeProntuarioTab || 'vacinas';
    
    // Pet selecionado (padrão o primeiro)
    const selectedPetId = state.viewParams.petId || (userPets.length > 0 ? userPets[0].id : null);
    const selectedPet = userPets.find(p => p.id === selectedPetId);
    
    return `
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card p-4 shadow-sm border-0">
                    <h6 class="fw-bold mb-3 px-2">Meus Pets</h6>
                    <div class="list-group list-group-flush">
                        ${userPets.map(p => `
                            <button class="list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center gap-3 ${selectedPetId === p.id ? 'bg-teal-light' : ''}" 
                                    onclick="router.navigate('prontuario', {petId: '${p.id}'})">
                                <div class="bg-teal text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 44px; height: 44px;">
                                    <i data-lucide="${p.species === 'Cachorro' ? 'dog' : 'cat'}" class="size-5"></i>
                                </div>
                                <div class="text-start">
                                    <div class="fw-bold small">${p.name}</div>
                                    <div class="text-muted" style="font-size: 11px;">${p.species} • ${p.breed}</div>
                                </div>
                            </button>
                        `).join('')}
                        ${userPets.length === 0 ? '<div class="p-4 text-center"><p class="small text-muted mb-0">Nenhum pet cadastrado.</p></div>' : ''}
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                ${selectedPet ? `
                    <div class="card overflow-hidden shadow-sm border-0">
                        <div class="card-header bg-white border-bottom-0 pt-4 px-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="bg-teal-light text-teal rounded-circle p-2">
                                        <i data-lucide="file-text" class="size-6"></i>
                                    </div>
                                    <h5 class="fw-bold mb-0">Prontuário: ${selectedPet.name}</h5>
                                </div>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-teal btn-sm fw-bold rounded-pill px-3 shadow-sm" onclick="openAddRecordModal('${selectedPet.id}', 'vacina')">
                                        <i data-lucide="plus" class="size-4"></i> Vacina
                                    </button>
                                    <button class="btn btn-teal btn-sm fw-bold rounded-pill px-3 shadow-sm" onclick="openAddRecordModal('${selectedPet.id}', 'consulta')">
                                        <i data-lucide="plus" class="size-4"></i> Consulta
                                    </button>
                                    <button class="btn btn-outline-teal btn-sm fw-bold rounded-pill px-3" onclick="router.navigate('carteirinha', {petId: '${selectedPet.id}'})">
                                        <i data-lucide="id-card" class="size-4"></i> Carteirinha
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex gap-2 mb-2">
                                <button class="filter-pill ${activeTab === 'vacinas' ? 'active' : ''}" onclick="setProntuarioTab('vacinas')">Vacinas</button>
                                <button class="filter-pill ${activeTab === 'consultas' ? 'active' : ''}" onclick="setProntuarioTab('consultas')">Atendimentos</button>
                                <button class="filter-pill ${activeTab === 'medicamentos' ? 'active' : ''}" onclick="setProntuarioTab('medicamentos')">Medicamentos</button>
                            </div>
                        </div>
                        <div class="card-body p-4">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light small">
                                        <tr>
                                            <th>Data</th>
                                            <th>Descrição</th>
                                            <th>Local / Clínica</th>
                                            <th class="text-end">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="small">
                                        ${state.appointments.filter(a => {
                                            if (String(a.petId) !== String(selectedPet.id)) return false;
                                            if (activeTab === 'vacinas') return a.procedure.toLowerCase().includes('vacina');
                                            if (activeTab === 'consultas') return !a.procedure.toLowerCase().includes('vacina');
                                            return false;
                                        }).map(a => `
                                            <tr>
                                                <td class="py-3 text-muted">${new Date(a.date).toLocaleDateString()}</td>
                                                <td class="py-3 fw-bold text-teal">${a.procedure}</td>
                                                <td class="py-3">${a.clinic}</td>
                                                <td class="py-3 text-end"><span class="badge bg-success-subtle text-success rounded-pill">CONCLUÍDO</span></td>
                                            </tr>
                                        `).join('')}
                                        ${state.appointments.filter(a => String(a.petId) === String(selectedPet.id)).length === 0 ? 
                                            '<tr><td colspan="4" class="text-center py-5 text-muted"><i data-lucide="inbox" class="size-6 d-block mx-auto mb-2 opacity-50"></i>Nenhum registro encontrado.</td></tr>' : ''}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="card p-5 text-center shadow-sm border-0 h-100 d-flex flex-column align-items-center justify-content-center">
                        <div class="bg-light rounded-circle p-4 mb-3">
                            <i data-lucide="dog" class="text-muted" style="width: 48px; height: 48px;"></i>
                        </div>
                        <h5 class="fw-bold text-muted">Selecione um pet</h5>
                        <p class="text-muted small">Escolha um pet na lista lateral para ver o prontuário completo.</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function setProntuarioTab(tab) {
    state.activeProntuarioTab = tab;
    render();
}

function openAddRecordModal(petId, type) {
    const title = type === 'vacina' ? 'Registrar Nova Vacina' : 'Registrar Nova Consulta';
    const body = `
        <form id="recordForm">
            <input type="hidden" id="recPetId" value="${petId}">
            <input type="hidden" id="recType" value="${type}">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">${type === 'vacina' ? 'Nome da Vacina' : 'Motivo da Consulta'}</label>
                    <input type="text" class="form-control" id="recDesc" required placeholder="${type === 'vacina' ? 'Ex: V10, Raiva' : 'Ex: Rotina, Mal estar'}">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Data</label>
                    <input type="date" class="form-control" id="recDate" value="${new Date().toISOString().split('T')[0]}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Clínica</label>
                    <input type="text" class="form-control" id="recClinic" required placeholder="Nome da clínica">
                </div>
                ${type === 'vacina' ? `
                <div class="col-md-6">
                    <label class="form-label">Próxima Dose (Opcional)</label>
                    <input type="date" class="form-control" id="recNextDate">
                </div>
                ` : `
                <div class="col-12">
                    <label class="form-label">Observações</label>
                    <textarea class="form-control" id="recObs" rows="2" placeholder="Notas adicionais..."></textarea>
                </div>
                `}
            </div>
        </form>
    `;
    const footer = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-teal" onclick="handleSaveRecord()">Salvar Registro</button>
    `;
    utils.showModal(title, body, footer);
}

function handleSaveRecord() {
    const petId = document.getElementById('recPetId').value;
    const type = document.getElementById('recType').value;
    const desc = document.getElementById('recDesc').value;
    const date = document.getElementById('recDate').value;
    const clinic = document.getElementById('recClinic').value;

    if (!desc || !date || !clinic) {
        utils.showToast('Por favor, preencha todos os campos obrigatórios.', 'warning');
        return;
    }

    const newAppointment = {
        id: utils.generateId(),
        petId: petId,
        date: date,
        procedure: type === 'vacina' ? `Vacina: ${desc}` : desc,
        clinic: clinic,
        status: 'concluido'
    };

    state.appointments.push(newAppointment);
    utils.syncState();
    
    // Fecha modal
    const modalEl = document.getElementById('mainModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    utils.showToast('Registro adicionado com sucesso!', 'success');
    render();
}

function renderPerfil() {
    if (!state.currentUser) return `<div class="alert alert-warning">Faça login para ver seu perfil.</div>`;
    
    return `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card p-4">
                    <div class="d-flex align-items-center gap-4 mb-4">
                        <div class="bg-teal-light text-teal rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; font-size: 32px;">
                            ${state.currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h4 class="fw-bold mb-1">${state.currentUser.name}</h4>
                            <p class="text-muted mb-0">Munícipe da Serra / ES</p>
                        </div>
                    </div>
                    <form id="perfilForm">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">Nome</label>
                                <input type="text" class="form-control" value="${state.currentUser.name}" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">E-mail</label>
                                <input type="email" class="form-control" value="${state.currentUser.email}" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Telefone</label>
                                <input type="tel" class="form-control" id="perfilTel" value="${state.currentUser.tel || ''}" placeholder="(27) 99999-9999">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Bairro</label>
                                <input type="text" class="form-control" value="${state.currentUser.bairro || ''}" placeholder="Seu bairro">
                            </div>
                            <div class="col-12 mt-4 d-flex gap-2">
                                <button type="submit" class="btn btn-teal text-white px-4 fw-bold">Salvar Alterações</button>
                                <button type="button" class="btn btn-outline-secondary px-4" onclick="openChangePasswordModal()">Alterar Senha</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function openChangePasswordModal() {
    const body = `
        <form id="changePasswordForm">
            <div class="mb-3">
                <label class="form-label small">Senha Atual</label>
                <input type="password" class="form-control" id="pwdAtual" required>
            </div>
            <div class="mb-3">
                <label class="form-label small">Nova Senha</label>
                <input type="password" class="form-control" id="pwdNova" required>
            </div>
            <div class="mb-3">
                <label class="form-label small">Confirmar Nova Senha</label>
                <input type="password" class="form-control" id="pwdConfirm" required>
            </div>
        </form>
    `;
    const footer = `
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-teal btn-sm" onclick="handleChangePassword()">Salvar Nova Senha</button>
    `;
    utils.showModal('Alterar Senha', body, footer);
}

async function handleChangePassword() {
    const atual = document.getElementById('pwdAtual').value;
    const nova = document.getElementById('pwdNova').value;
    const confirm = document.getElementById('pwdConfirm').value;

    if (!atual || !nova || !confirm) {
        utils.showToast('Preencha todos os campos.', 'warning');
        return;
    }
    if (nova.length < 6) {
        utils.showToast('A nova senha deve ter pelo menos 6 caracteres.', 'warning');
        return;
    }
    if (nova !== confirm) {
        utils.showToast('As senhas não coincidem.', 'warning');
        return;
    }

    const hashedAtual = await utils.hashPassword(atual);
    if (hashedAtual !== state.currentUser.pass) {
        utils.showToast('Senha atual incorreta.', 'error');
        return;
    }

    const hashedNova = await utils.hashPassword(nova);
    state.currentUser.pass = hashedNova;

    const userIndex = state.registeredUsers.findIndex(u => u.id === state.currentUser.id);
    if (userIndex !== -1) {
        state.registeredUsers[userIndex].pass = hashedNova;
        utils.syncState();
    }

    const modalEl = document.getElementById('mainModal');
    bootstrap.Modal.getInstance(modalEl)?.hide();
    utils.showToast('Senha alterada com sucesso!', 'success');
}

function renderDenuncias() {
    const userDenuncias = state.currentUser?.role === 'admin' ? state.denuncias : state.denuncias.filter(d => d.userId === state.currentUser?.id);

    return `
        <div class="row g-4 fade-in">
            <div class="col-12">
                <div class="card p-4 border-0 shadow-sm hero-card mb-4">
                    <div class="position-relative z-1">
                        <h3 class="fw-bold mb-2">Denúncia de Maus-tratos</h3>
                        <p class="mb-0 opacity-80">Ajude-nos a proteger os animais da nossa cidade. Sua denúncia pode ser anônima.</p>
                    </div>
                    <i data-lucide="alert-triangle" class="hero-pattern" style="width: 150px; height: 150px;"></i>
                </div>
            </div>

            <div class="col-12 col-lg-4">
                <div class="card p-4 border-0 shadow-sm rounded-xl">
                    <h5 class="fw-bold mb-4 text-primary">Nova Denúncia</h5>
                    <form id="denunciaForm">
                        <div class="mb-3">
                            <label class="form-label extra-small fw-bold text-muted text-uppercase">Endereço da Ocorrência</label>
                            <input type="text" class="form-control" id="denAddress" required placeholder="Rua, número, bairro...">
                        </div>
                        <div class="mb-3">
                            <label class="form-label extra-small fw-bold text-muted text-uppercase">Descrição dos Fatos</label>
                            <textarea class="form-control" id="denDesc" rows="4" required placeholder="Descreva o que está acontecendo..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label extra-small fw-bold text-muted text-uppercase">URL da Foto (Opcional)</label>
                            <input type="url" class="form-control" id="denPhoto" placeholder="https://...">
                        </div>
                        <div class="form-check mb-4">
                            <input class="form-check-input" type="checkbox" id="denAnonimo">
                            <label class="form-check-label small fw-bold text-muted" for="denAnonimo">Denúncia Anônima</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 fw-bold rounded-pill py-2 shadow-sm">
                            Enviar Denúncia
                        </button>
                    </form>
                </div>
            </div>

            <div class="col-12 col-lg-8">
                <div class="card border-0 shadow-sm rounded-xl overflow-hidden">
                    <div class="card-header bg-white border-bottom py-3">
                        <h6 class="fw-bold mb-0 text-primary">Minhas Denúncias / Histórico</h6>
                    </div>
                    <div class="card-body p-0">
                        ${userDenuncias.length === 0 ? `
                            <div class="p-5 text-center text-muted">
                                <i data-lucide="shield-check" class="size-8 mb-2 opacity-50"></i>
                                <p class="small mb-0">Nenhuma denúncia registrada.</p>
                            </div>
                        ` : `
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">
                                    <thead class="bg-light extra-small text-muted text-uppercase fw-bold">
                                        <tr>
                                            <th class="ps-4">Data</th>
                                            <th>Local</th>
                                            <th>Status</th>
                                            <th class="text-end pe-4">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody class="small">
                                        ${userDenuncias.slice().reverse().map(d => `
                                            <tr>
                                                <td class="ps-4 text-muted">${new Date(d.date).toLocaleDateString()}</td>
                                                <td class="fw-bold text-dark">${d.address}</td>
                                                <td>
                                                    <span class="badge ${d.status === 'pendente' ? 'bg-warning text-dark' : d.status === 'em_investigacao' ? 'bg-info' : 'bg-success'} rounded-pill px-3">
                                                        ${d.status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </td>
                                                <td class="text-end pe-4">
                                                    <button class="btn btn-primary-soft btn-sm rounded-pill px-3 fw-bold" onclick="showDenunciaDetail('${d.id}')">Detalhes</button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showDenunciaDetail(id) {
    const den = state.denuncias.find(d => d.id === id);
    if (!den) return;

    const body = `
        <div class="row g-4">
            ${den.photo ? `<div class="col-12"><img src="${den.photo}" class="img-fluid rounded-3 mb-3" style="max-height: 300px; width: 100%; object-fit: cover;"></div>` : ''}
            <div class="col-md-6">
                <h6 class="fw-bold text-teal small uppercase tracking-wider mb-2">Informações Gerais</h6>
                <p class="small mb-1"><strong>Data:</strong> ${new Date(den.date).toLocaleString()}</p>
                <p class="small mb-1"><strong>Local:</strong> ${den.address}</p>
                <p class="small mb-1"><strong>Status:</strong> ${den.status.toUpperCase()}</p>
                <p class="small mb-1"><strong>Anônima:</strong> ${den.anonimo ? 'Sim' : 'Não'}</p>
            </div>
            <div class="col-12">
                <h6 class="fw-bold text-teal small uppercase tracking-wider mb-2">Descrição</h6>
                <p class="small text-muted p-3 bg-light rounded-3">${den.description}</p>
            </div>
            ${state.currentUser?.role === 'admin' ? `
                <div class="col-12 border-top pt-3 mt-3">
                    <h6 class="fw-bold mb-3">Ações Administrativas</h6>
                    <div class="d-flex gap-2">
                        <button class="btn btn-info btn-sm text-white" onclick="updateDenunciaStatus('${den.id}', 'em_investigacao')">Em Investigação</button>
                        <button class="btn btn-success btn-sm" onclick="updateDenunciaStatus('${den.id}', 'concluida')">Concluir</button>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    utils.showModal('Detalhes da Denúncia', body);
}

function updateDenunciaStatus(id, status) {
    const index = state.denuncias.findIndex(d => d.id === id);
    if (index !== -1) {
        state.denuncias[index].status = status;
        utils.syncState();
        utils.showToast(`Status da denúncia atualizado para ${status.replace('_', ' ')}.`, 'success');
        
        // Notifica o usuário
        if (!state.denuncias[index].anonimo) {
            addNotification(
                state.denuncias[index].userId,
                'Atualização de Denúncia',
                `Sua denúncia em ${state.denuncias[index].address} agora está: ${status.toUpperCase()}.`,
                'alert-triangle'
            );
        }
        
        bootstrap.Modal.getInstance(document.getElementById('mainModal'))?.hide();
        render();
    }
}

function renderDoacoes() {
    return `
        <div class="row g-4">
            <div class="col-12">
                <div class="card p-5 border-0 shadow-sm text-center bg-white">
                    <div class="bg-teal-light text-teal rounded-circle p-4 mx-auto mb-4" style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="gift" style="width: 50px; height: 50px;"></i>
                    </div>
                    <h2 class="fw-bold mb-3">Sua ajuda transforma vidas.</h2>
                    <p class="text-muted col-lg-8 mx-auto">O Programa ARCA sobrevive com o apoio da prefeitura e de cidadãos como você. Escolha como deseja contribuir.</p>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="card h-100 p-4 text-center border-0 shadow-sm">
                    <div class="stats-icon bg-light-primary text-primary mx-auto mb-3"><i data-lucide="beef"></i></div>
                    <h5 class="fw-bold">Ração</h5>
                    <p class="text-muted small mb-4">Aceitamos doações de ração para cães e gatos de todos os portes.</p>
                    <button class="btn btn-outline-teal w-100 btn-sm" onclick="showDonationInfo('Ração')">Onde entregar</button>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 p-4 text-center border-0 shadow-sm">
                    <div class="stats-icon bg-light-danger text-danger mx-auto mb-3"><i data-lucide="pill"></i></div>
                    <h5 class="fw-bold">Medicamentos</h5>
                    <p class="text-muted small mb-4">Itens básicos, antipulgas, vermífugos e remédios no prazo.</p>
                    <button class="btn btn-outline-teal w-100 btn-sm" onclick="showDonationInfo('Medicamentos')">Ver lista</button>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 p-4 text-center border-0 shadow-sm">
                    <div class="stats-icon bg-light-warning text-warning mx-auto mb-3"><i data-lucide="sun"></i></div>
                    <h5 class="fw-bold">Cobertores</h5>
                    <p class="text-muted small mb-4">Toalhas, mantas e camas para aquecer nossos peludinhos.</p>
                    <button class="btn btn-outline-teal w-100 btn-sm" onclick="showDonationInfo('Cobertores')">Onde entregar</button>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 p-4 text-center border-0 shadow-sm">
                    <div class="stats-icon bg-light-success text-success mx-auto mb-3"><i data-lucide="dollar-sign"></i></div>
                    <h5 class="fw-bold">Dinheiro (PIX)</h5>
                    <p class="text-muted small mb-4">Contribua com qualquer valor para o fundo municipal animal.</p>
                    <button class="btn btn-teal w-100 btn-sm" onclick="showDonationInfo('Dinheiro')">Doar via PIX</button>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card p-4 border-0 shadow-sm bg-light">
                    <h5 class="fw-bold mb-3"><i data-lucide="info" class="size-5 me-2 text-teal"></i> Transparência</h5>
                    <p class="text-muted small mb-0">Todas as doações recebidas são registradas no Portal da Transparência da Prefeitura da Serra e destinadas exclusivamente ao bem-estar animal e manutenção do Programa ARCA.</p>
                </div>
            </div>
        </div>
    `;
}

function showDonationInfo(type) {
    let content = '';
    if (type === 'Dinheiro') {
        content = `
            <div class="text-center p-4">
                <p class="mb-4">Use a chave PIX abaixo para realizar sua doação:</p>
                <div class="bg-white p-3 border rounded-3 mb-4">
                    <h5 class="fw-bold text-teal mb-0">CNPJ: 27.174.000/0001-00</h5>
                    <small class="text-muted">Fundo Municipal de Bem-Estar Animal - Serra/ES</small>
                </div>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PIX_KEY_HERE" class="img-fluid rounded shadow-sm mb-3" style="width: 180px;">
                <p class="small text-muted">Após a doação, se desejar, envie o comprovante para <strong>${APP_CONFIG.systemEmail}</strong>.</p>
            </div>
        `;
    } else {
        content = `
            <div class="p-3">
                <h6 class="fw-bold mb-3">Pontos de Coleta para ${type}:</h6>
                <ul class="list-group list-group-flush small">
                    <li class="list-group-item d-flex align-items-center gap-3 py-3">
                        <i data-lucide="map-pin" class="text-teal"></i>
                        <div>
                            <strong>Centro de Vigilância Ambiental (CVA)</strong><br>
                            Rua Projetada, s/n, Serra Sede. 08:00 às 17:00.
                        </div>
                    </li>
                    <li class="list-group-item d-flex align-items-center gap-3 py-3">
                        <i data-lucide="map-pin" class="text-teal"></i>
                        <div>
                            <strong>Prédio da Prefeitura (Protocolo)</strong><br>
                            Rua Maestro Antônio Cícero, 111, Serra Centro.
                        </div>
                    </li>
                </ul>
            </div>
        `;
    }
    utils.showModal(`Doação de ${type}`, content);
    lucide.createIcons();
}

function renderLarTemporario() {
    const isVolunteer = state.volunteers.find(v => v.userId === state.currentUser?.id);

    return `
        <div class="row g-4">
            <div class="col-12">
                <div class="hero-card p-5 text-white border-0 shadow-sm mb-4" style="background: linear-gradient(135deg, #f2a766 0%, #f26849 100%);">
                    <div class="position-relative z-1">
                        <h2 class="fw-bold mb-2">Seja um Lar Temporário</h2>
                        <p class="lead mb-0 opacity-90">Abra as portas do seu coração e do seu lar para um animal enquanto ele espera pela adoção definitiva.</p>
                    </div>
                    <i data-lucide="home" class="hero-pattern" style="width: 180px; height: 180px; opacity: 0.15;"></i>
                </div>
            </div>

            <div class="col-lg-7">
                <div class="card p-4 border-0 shadow-sm mb-4">
                    <h5 class="fw-bold mb-4">Como funciona?</h5>
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="d-flex gap-3">
                                <div class="bg-warning-subtle text-warning rounded-circle p-3 h-fit-content">
                                    <i data-lucide="check-circle" class="size-6"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Hospedagem</h6>
                                    <p class="text-muted small">Você oferece o espaço físico e carinho para o animal.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex gap-3">
                                <div class="bg-success-subtle text-success rounded-circle p-3 h-fit-content">
                                    <i data-lucide="package" class="size-6"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Suporte do Programa</h6>
                                    <p class="text-muted small">A prefeitura fornece ração e assistência veterinária básica.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex gap-3">
                                <div class="bg-info-subtle text-info rounded-circle p-3 h-fit-content">
                                    <i data-lucide="clock" class="size-6"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Tempo Determinado</h6>
                                    <p class="text-muted small">O período é combinado previamente, geralmente até a adoção.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex gap-3">
                                <div class="bg-primary-subtle text-primary rounded-circle p-3 h-fit-content">
                                    <i data-lucide="heart" class="size-6"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Prioridade de Adoção</h6>
                                    <p class="text-muted small">Se você se apaixonar, tem prioridade para adotar legalmente.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card p-4 border-0 shadow-sm">
                    <h5 class="fw-bold mb-3">Requisitos Mínimos</h5>
                    <ul class="list-unstyled mb-0">
                        <li class="d-flex align-items-center gap-2 mb-2 small text-muted">
                            <i data-lucide="check" class="size-4 text-success"></i> Ser maior de 21 anos e residir na Serra/ES.
                        </li>
                        <li class="d-flex align-items-center gap-2 mb-2 small text-muted">
                            <i data-lucide="check" class="size-4 text-success"></i> Possuir espaço seguro (casa murada ou apto com tela).
                        </li>
                        <li class="d-flex align-items-center gap-2 mb-2 small text-muted">
                            <i data-lucide="check" class="size-4 text-success"></i> Ter tempo para cuidados básicos e socialização.
                        </li>
                        <li class="d-flex align-items-center gap-2 small text-muted">
                            <i data-lucide="check" class="size-4 text-success"></i> Concordar com visitas técnicas da equipe ARCA.
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-lg-5">
                ${isVolunteer ? `
                    <div class="card p-5 border-0 shadow-sm text-center">
                        <div class="bg-success-subtle text-success rounded-circle p-4 mx-auto mb-4" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
                            <i data-lucide="user-check" style="width: 40px; height: 40px;"></i>
                        </div>
                        <h4 class="fw-bold mb-2">Você é um Voluntário!</h4>
                        <p class="text-muted small mb-4">Seu cadastro de Lar Temporário está ativo. Nossa equipe entrará em contato quando houver um animal que precise de você.</p>
                        <div class="alert bg-light border-0 small text-start">
                            <strong>Status:</strong> <span class="badge bg-success">DISPONÍVEL</span><br>
                            <strong>Desde:</strong> ${new Date(isVolunteer.date).toLocaleDateString()}
                        </div>
                        <button class="btn btn-outline-danger btn-sm w-100 rounded-pill" onclick="cancelVolunteer()">Remover meu cadastro</button>
                    </div>
                ` : `
                    <div class="card p-4 border-0 shadow-sm">
                        <h5 class="fw-bold mb-4">Quero ser voluntário</h5>
                        <form id="volunteerForm">
                            <div class="mb-3">
                                <label class="form-label small fw-bold">Tipo de imóvel</label>
                                <select class="form-select" id="volHouseType" required>
                                    <option value="Casa">Casa com quintal</option>
                                    <option value="Apartamento">Apartamento</option>
                                    <option value="Sitio">Sítio/Chácara</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label small fw-bold">Prefere hospedar:</label>
                                <select class="form-select" id="volPref" required>
                                    <option value="Cachorro">Cachorros</option>
                                    <option value="Gato">Gatos</option>
                                    <option value="Ambos">Ambos</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label small fw-bold">Já possui outros animais?</label>
                                <select class="form-select" id="volHasPets" required>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="form-label small fw-bold">Por quanto tempo pode hospedar?</label>
                                <input type="text" class="form-control" id="volTime" placeholder="Ex: 15 dias, até a adoção..." required>
                            </div>
                            <button type="submit" class="btn btn-teal w-100 fw-bold rounded-pill">Enviar Cadastro</button>
                        </form>
                    </div>
                `}
            </div>
        </div>
    `;
}

function renderEducativo() {
    return `
        <div class="row g-4">
            <div class="col-12">
                <div class="card p-4 border-0 shadow-sm bg-primary text-white mb-4" style="background: linear-gradient(135deg, #037373 0%, #049292 100%);">
                    <h3 class="fw-bold mb-2">Conhecimento é Cuidado</h3>
                    <p class="mb-0 opacity-80">Aprenda as melhores práticas para garantir a saúde e felicidade do seu pet.</p>
                </div>
            </div>

            ${INITIAL_DATA.educational.map(item => `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 p-4 border-0 shadow-sm">
                        <div class="stats-icon mb-3 bg-teal-light text-teal">
                            <i data-lucide="${item.icon}"></i>
                        </div>
                        <span class="badge bg-light text-teal border mb-2 w-fit-content">${item.category}</span>
                        <h5 class="fw-bold mb-2">${item.title}</h5>
                        <p class="text-muted small mb-0">${item.content}</p>
                        <button class="btn btn-link text-teal p-0 mt-3 fw-bold small text-decoration-none">Ler mais <i data-lucide="arrow-right" class="size-4 ms-1"></i></button>
                    </div>
                </div>
            `).join('')}

            <div class="col-12 mt-4">
                <div class="card border-0 shadow-sm overflow-hidden">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80" class="img-fluid h-100 w-100" style="object-fit: cover;">
                        </div>
                        <div class="col-md-8 p-5">
                            <h4 class="fw-bold mb-3">Guia do Tutor Iniciante</h4>
                            <p class="text-muted">Baixe nosso guia completo em PDF com tudo o que você precisa saber após adotar um novo amigo.</p>
                            <button class="btn btn-teal rounded-pill px-4 mt-3" onclick="utils.showToast('Iniciando download...', 'info')">
                                <i data-lucide="download" class="size-5"></i> Baixar Guia (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFavoritos() {
    const favorites = state.favorites.filter(f => f.userId === state.currentUser?.id);
    const favoritePets = state.adoptionPets.filter(p => favorites.some(f => f.petId === p.id));

    return `
        <div class="row g-4">
            <div class="col-12">
                <div class="card p-4 border-0 shadow-sm mb-4">
                    <h5 class="fw-bold mb-1">Meus Pets Favoritos</h5>
                    <p class="text-muted small mb-0">Animais que você marcou com um coração para acompanhar.</p>
                </div>
            </div>

            ${favoritePets.length === 0 ? `
                <div class="col-12 text-center py-5">
                    <div class="bg-white rounded-circle shadow-sm p-4 mx-auto mb-3" style="width: 120px; height: 120px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="heart" class="text-muted opacity-20" style="width: 60px; height: 60px;"></i>
                    </div>
                    <h4 class="text-muted fw-bold">Nenhum favorito ainda.</h4>
                    <p class="text-muted">Explore a área de adoção e clique no coração para salvar seus pets preferidos.</p>
                    <button class="btn btn-teal rounded-pill px-4 mt-3" onclick="router.navigate('adocao')">Ver Pets para Adoção</button>
                </div>
            ` : favoritePets.map(pet => `
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <div class="position-relative">
                            <img src="${pet.image}" class="pet-card-img" alt="${pet.name}">
                            <button class="btn btn-white p-2 rounded-circle shadow position-absolute top-0 end-0 m-3" onclick="toggleFavorite('${pet.id}', event)">
                                <i data-lucide="heart" class="size-5 fill-danger text-danger"></i>
                            </button>
                            <span class="pet-badge">${pet.age}</span>
                        </div>
                        <div class="card-body p-4">
                            <h5 class="fw-bold mb-1">${pet.name}</h5>
                            <p class="text-muted small mb-3">${pet.breed} • ${pet.gender}</p>
                            <button class="btn btn-teal w-100 fw-bold rounded-pill" onclick="showPetDetails('${pet.id}')">Ver Detalhes</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCarteirinha() {
    const petId = state.viewParams.petId;
    const pet = state.pets.find(p => p.id === petId) || state.adoptionPets.find(p => p.id === petId);

    if (!pet) return `<div class="alert alert-warning">Pet não encontrado para gerar carteirinha.</div>`;

    return `
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div id="carteirinha-digital" class="card border-0 shadow-lg overflow-hidden p-0" style="max-width: 450px; margin: 0 auto; border-radius: 24px;">
                    <div class="bg-teal p-4 text-white text-center position-relative">
                        <img src="assets/logo.png" style="max-height: 40px; filter: brightness(0) invert(1);" class="mb-2">
                        <h6 class="fw-bold tracking-widest mb-0" style="font-size: 10px; opacity: 0.8;">CARTEIRA DIGITAL DO PET</h6>
                        <div class="position-absolute" style="top: 20px; right: 20px;">
                            <i data-lucide="paw-print" class="opacity-10" style="width: 60px; height: 60px;"></i>
                        </div>
                    </div>
                    <div class="card-body p-4 bg-white">
                        <div class="d-flex gap-4 mb-4">
                            <div class="flex-shrink-0">
                                <div class="rounded-4 overflow-hidden shadow-sm" style="width: 120px; height: 120px;">
                                    <img src="${pet.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80'}" class="w-100 h-100" style="object-fit: cover;">
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h4 class="fw-bold text-teal mb-0">${pet.name}</h4>
                                <p class="text-muted small mb-2">${pet.species} • ${pet.breed}</p>
                                <div class="p-2 bg-light rounded-3 d-flex justify-content-between align-items-center">
                                    <div class="text-center px-2 border-end">
                                        <div class="fw-bold text-teal h6 mb-0">${pet.age || 'N/A'}</div>
                                        <small class="text-muted" style="font-size: 9px;">IDADE</small>
                                    </div>
                                    <div class="text-center px-2">
                                        <div class="fw-bold text-teal h6 mb-0">${pet.gender || 'N/A'}</div>
                                        <small class="text-muted" style="font-size: 9px;">SEXO</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-3 border-top pt-4">
                            <div class="col-6">
                                <small class="text-muted d-block" style="font-size: 9px;">RESPONSÁVEL</small>
                                <span class="fw-bold small">${state.currentUser?.name || 'Prefeitura da Serra'}</span>
                            </div>
                            <div class="col-6">
                                <small class="text-muted d-block" style="font-size: 9px;">REGISTRO ARCA</small>
                                <span class="fw-bold small">${pet.id.toUpperCase().substring(0, 8)}</span>
                            </div>
                            <div class="col-12">
                                <small class="text-muted d-block" style="font-size: 9px;">STATUS SANITÁRIO</small>
                                <div class="d-flex gap-2 mt-1">
                                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill" style="font-size: 9px;">VACINADO</span>
                                    <span class="badge bg-info-subtle text-info border border-info-subtle rounded-pill" style="font-size: 9px;">CASTRADO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-light p-3 d-flex justify-content-between align-items-center border-top">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${pet.id}" style="width: 40px; height: 40px; opacity: 0.5;">
                        <small class="text-muted" style="font-size: 8px; max-width: 150px;">Valide esta carteira no site oficial do Programa ARCA Serra/ES</small>
                    </div>
                </div>
                <div class="mt-4 d-grid">
                    <button class="btn btn-teal rounded-pill fw-bold" onclick="printCarteirinha()">
                        <i data-lucide="printer" class="size-5"></i> Imprimir Carteirinha
                    </button>
                    <p class="text-muted small text-center mt-3">Dica: Ao imprimir, selecione "Salvar como PDF" para ter a versão digital.</p>
                </div>
            </div>
        </div>
    `;
}

function printCarteirinha() {
    const printContent = document.getElementById('carteirinha-digital').innerHTML;
    const originalContent = document.body.innerHTML;
    
    // Cria uma folha de estilo temporária para impressão
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            body * { visibility: hidden; }
            #print-area, #print-area * { visibility: visible; }
            #print-area { position: absolute; left: 0; top: 0; width: 100%; }
            .btn { display: none !important; }
        }
    `;
    document.head.appendChild(style);

    const printArea = document.createElement('div');
    printArea.id = 'print-area';
    printArea.innerHTML = printContent;
    document.body.appendChild(printArea);

    window.print();

    // Limpa
    document.body.removeChild(printArea);
    document.head.removeChild(style);
    location.reload(); // Recarrega para restaurar o estado da SPA
}

function renderNotifications() {
    const notifBtn = document.getElementById('notif-btn');
    const notifBadge = document.getElementById('notif-badge');
    const notifList = document.getElementById('notif-list');
    
    if (!state.currentUser) {
        if (notifBtn) notifBtn.parentElement.classList.add('d-none');
        return;
    }
    
    notifBtn.parentElement.classList.remove('d-none');
    
    const userNotifs = state.notifications.filter(n => n.userId === state.currentUser.id);
    const unread = userNotifs.filter(n => !n.read);
    
    if (unread.length > 0) {
        notifBadge.innerText = unread.length;
        notifBadge.classList.remove('d-none');
    } else {
        notifBadge.classList.add('d-none');
    }
    
    notifBtn.onclick = (e) => {
        e.stopPropagation();
        notifList.style.display = notifList.style.display === 'none' ? 'block' : 'none';
        if (notifList.style.display === 'block') {
            // Marca como lidas ao abrir
            userNotifs.forEach(n => n.read = true);
            utils.syncState();
            setTimeout(() => renderNotifications(), 100);
        }
    };

    notifList.innerHTML = `
        <div class="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
            <h6 class="fw-bold mb-0">Notificações</h6>
            <span class="badge bg-teal-light text-teal">${userNotifs.length} total</span>
        </div>
        <div class="notif-scroll" style="max-height: 350px; overflow-y: auto;">
            ${userNotifs.length === 0 ? `
                <div class="p-4 text-center text-muted">
                    <i data-lucide="bell-off" class="size-6 mb-2 opacity-50"></i>
                    <p class="small mb-0">Nenhuma notificação por enquanto.</p>
                </div>
            ` : userNotifs.slice().reverse().map(n => `
                <div class="p-3 border-bottom hover-bg-light cursor-pointer ${!n.read ? 'bg-teal-light-notif' : ''}">
                    <div class="d-flex gap-3">
                        <div class="bg-teal text-white rounded-circle p-2 flex-shrink-0" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
                            <i data-lucide="${n.icon || 'bell'}" class="size-4"></i>
                        </div>
                        <div>
                            <div class="fw-bold small mb-1">${n.title}</div>
                            <div class="text-muted small" style="font-size: 11px;">${n.message}</div>
                            <div class="text-muted mt-1" style="font-size: 9px;">${new Date(n.date).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="p-2 text-center border-top">
            <button class="btn btn-link btn-sm text-teal text-decoration-none small" onclick="clearNotifications()">Limpar todas</button>
        </div>
    `;
    lucide.createIcons();
}

function addNotification(userId, title, message, icon = 'bell') {
    const newNotif = {
        id: utils.generateId(),
        userId,
        title,
        message,
        icon,
        date: new Date().toISOString(),
        read: false
    };
    state.notifications.push(newNotif);
    utils.syncState();
    renderNotifications();
}

function clearNotifications() {
    if (state.currentUser) {
        state.notifications = state.notifications.filter(n => n.userId !== state.currentUser.id);
        utils.syncState();
        renderNotifications();
    }
}

// Fechar notificações ao clicar fora
document.addEventListener('click', () => {
    const notifList = document.getElementById('notif-list');
    if (notifList) notifList.style.display = 'none';
});

function renderAdmin() {
    if (state.currentUser?.role !== 'admin') {
        return `<div class="alert alert-danger">Acesso restrito. Apenas administradores podem visualizar esta página.</div>`;
    }

    const totalSpots = state.campaigns.reduce((acc, c) => acc + c.spots, 0);

    return `
        <div class="row g-4 fade-in">
            <!-- Header do Dashboard -->
            <div class="col-12">
                <div class="card p-4 border-0 shadow-sm bg-primary text-white hero-card" style="padding: 2.5rem;">
                    <div class="position-relative z-1">
                        <span class="badge bg-white text-primary rounded-pill px-3 py-1 mb-2 fw-bold extra-small">PAINEL DE CONTROLE</span>
                        <h2 class="fw-bold mb-1">Bem-vindo, ${state.currentUser.name}</h2>
                        <p class="mb-0 opacity-80">Gerencie solicitações, denúncias e o catálogo de animais do município.</p>
                    </div>
                    <i data-lucide="shield" class="hero-pattern" style="width: 150px; height: 150px; opacity: 0.1;"></i>
                </div>
            </div>

            <!-- Cards de Resumo -->
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-warning-soft text-warning"><i data-lucide="clock" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 counter-value">${state.requests.filter(r => r.status === 'pendente').length}</h2>
                    <p class="text-muted small fw-medium mb-0">Pedidos Pendentes</p>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-danger-soft text-danger"><i data-lucide="alert-triangle" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 counter-value">${state.denuncias.filter(d => d.status === 'pendente').length}</h2>
                    <p class="text-muted small fw-medium mb-0">Denúncias Ativas</p>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-info-soft text-info"><i data-lucide="users" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 counter-value">${state.registeredUsers.length}</h2>
                    <p class="text-muted small fw-medium mb-0">Usuários Ativos</p>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card stats-card h-100 border-0 shadow-sm hover-lift">
                    <div class="stats-icon bg-success-soft text-success"><i data-lucide="check-circle" class="size-6"></i></div>
                    <h2 class="fw-bold mb-0 counter-value">${state.adoptionRequests.length}</h2>
                    <p class="text-muted small fw-medium mb-0">Interesses Adoção</p>
                </div>
            </div>

            <div class="col-lg-8">
                <!-- Filtros e Gráficos Rápidos -->
                <div class="card p-4 border-0 shadow-sm mb-4 rounded-xl">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h6 class="fw-bold mb-0 text-primary uppercase tracking-wider small">Visão Geral do Sistema</h6>
                        <select class="form-select form-select-sm w-auto bg-light border-0 small fw-bold">
                            <option>Últimos 30 dias</option>
                            <option>Este ano</option>
                        </select>
                    </div>
                    <div class="row g-4">
                        <div class="col-md-6">
                            <label class="extra-small fw-bold text-muted mb-2 text-uppercase tracking-wider">Pedidos de Castração por Status</label>
                            <div class="d-flex flex-column gap-3">
                                ${['pendente', 'aprovado', 'rejeitado'].map(status => {
                                    const count = state.requests.filter(r => r.status === status).length;
                                    const total = state.requests.length;
                                    const perc = total > 0 ? (count / total * 100).toFixed(0) : 0;
                                    const color = status === 'pendente' ? 'warning' : status === 'aprovado' ? 'success' : 'danger';
                                    return `
                                        <div>
                                            <div class="d-flex justify-content-between small mb-1">
                                                <span class="text-capitalize fw-medium">${status}</span>
                                                <span class="fw-bold">${count} (${perc}%)</span>
                                            </div>
                                            <div class="progress" style="height: 6px;">
                                                <div class="progress-bar bg-${color}" style="width: ${perc}%"></div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="extra-small fw-bold text-muted mb-2 text-uppercase tracking-wider">Status das Denúncias</label>
                            <div class="d-flex flex-column gap-3">
                                ${['pendente', 'em_investigacao', 'concluida'].map(status => {
                                    const count = state.denuncias.filter(d => d.status === status).length;
                                    const total = state.denuncias.length;
                                    const perc = total > 0 ? (count / total * 100).toFixed(0) : 0;
                                    const color = status === 'pendente' ? 'danger' : status === 'em_investigacao' ? 'info' : 'success';
                                    return `
                                        <div>
                                            <div class="d-flex justify-content-between small mb-1">
                                                <span class="text-capitalize fw-medium">${status.replace('_', ' ')}</span>
                                                <span class="fw-bold">${count} (${perc}%)</span>
                                            </div>
                                            <div class="progress" style="height: 6px;">
                                                <div class="progress-bar bg-${color}" style="width: ${perc}%"></div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity Tables -->
                <div class="card shadow-sm border-0 mb-4 rounded-xl overflow-hidden">
                    <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                        <h6 class="fw-bold mb-0 text-primary uppercase tracking-wider small">Solicitações Recentes</h6>
                        <div class="d-flex gap-2">
                            <select class="form-select form-select-sm w-auto bg-light border-0 extra-small fw-bold" id="adminFilterStatus" onchange="state.adminFilterStatus = this.value; render();">
                                <option value="Todos" ${state.adminFilterStatus === 'Todos' ? 'selected' : ''}>Todos Status</option>
                                <option value="pendente" ${state.adminFilterStatus === 'pendente' ? 'selected' : ''}>Pendentes</option>
                                <option value="aprovado" ${state.adminFilterStatus === 'aprovado' ? 'selected' : ''}>Aprovados</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light extra-small text-muted text-uppercase fw-bold">
                                <tr>
                                    <th class="ps-4">Protocolo</th>
                                    <th>Pet / Tutor</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th class="text-end pe-4">Ações</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                ${state.requests.slice().reverse().filter(r => state.adminFilterStatus === 'Todos' || !state.adminFilterStatus || r.status === state.adminFilterStatus).slice(0, 8).map(r => {
                                    const pet = state.pets.find(p => p.id === r.petId);
                                    const user = state.registeredUsers.find(u => u.id === r.userId);
                                    return `
                                        <tr>
                                            <td class="ps-4 fw-bold text-primary">${r.protocol}</td>
                                            <td>
                                                <div class="fw-bold text-dark">${pet ? pet.name : 'N/A'}</div>
                                                <div class="extra-small text-muted">${user ? user.name : 'ID: ' + r.userId}</div>
                                            </td>
                                            <td class="text-muted">${new Date(r.date).toLocaleDateString()}</td>
                                            <td>
                                                <span class="badge ${r.status === 'pendente' ? 'bg-warning text-dark' : r.status === 'aprovado' ? 'bg-success' : 'bg-danger'} rounded-pill px-3">
                                                    ${r.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td class="text-end pe-4">
                                                ${r.status === 'pendente' ? `
                                                <div class="d-flex gap-2 justify-content-end">
                                                    <button class="btn btn-primary btn-sm p-1 rounded-circle" style="width: 32px; height: 32px;" onclick="handleAdminAction('${r.id}', 'aprovado')" title="Aprovar">
                                                        <i data-lucide="check" class="size-4"></i>
                                                    </button>
                                                    <button class="btn btn-outline-danger btn-sm p-1 rounded-circle" style="width: 32px; height: 32px;" onclick="handleAdminAction('${r.id}', 'rejeitado')" title="Recusar">
                                                        <i data-lucide="x" class="size-4"></i>
                                                    </button>
                                                </div>
                                                ` : '<i data-lucide="check-circle" class="text-success size-5"></i>'}
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card p-4 border-0 shadow-sm mb-4 rounded-xl">
                    <h6 class="fw-bold mb-3 text-primary uppercase tracking-wider small">Relatório de Impacto</h6>
                    <div class="mb-4">
                        <div class="d-flex justify-content-between extra-small mb-1">
                            <span class="text-muted fw-bold">VAGAS OCUPADAS (META 1000)</span>
                            <span class="fw-bold text-primary">${1000 - totalSpots}</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-primary" style="width: ${((1000 - totalSpots) / 10).toFixed(0)}%"></div>
                        </div>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary-soft btn-sm rounded-pill fw-bold" onclick="utils.showToast('Gerando PDF...', 'info')">
                            <i data-lucide="file-text" class="size-4"></i> Exportar Relatório PDF
                        </button>
                    </div>
                </div>

                <div class="card p-4 border-0 shadow-sm rounded-xl">
                    <h6 class="fw-bold mb-3 text-primary uppercase tracking-wider small">Ações Administrativas</h6>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-sm rounded-pill fw-bold py-2 shadow-sm" onclick="router.navigate('cadastro-pet')">
                            <i data-lucide="plus" class="size-4"></i> Novo Pet para Adoção
                        </button>
                        <button class="btn btn-primary-soft btn-sm rounded-pill fw-bold py-2" onclick="utils.showToast('Abrindo gerenciador...', 'info')">
                            <i data-lucide="megaphone" class="size-4"></i> Nova Campanha
                        </button>
                        <button class="btn btn-primary-soft btn-sm rounded-pill fw-bold py-2" onclick="utils.showToast('Buscando usuários...', 'info')">
                            <i data-lucide="users" class="size-4"></i> Gerenciar Munícipes
                        </button>
                        <button class="btn btn-outline-danger btn-sm rounded-pill fw-bold py-2" onclick="router.navigate('denuncias')">
                            <i data-lucide="alert-triangle" class="size-4"></i> Gerenciar Denúncias
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleAdminAction(id, status) {
    const reqIndex = state.requests.findIndex(r => r.id === id);
    if (reqIndex !== -1) {
        state.requests[reqIndex].status = status;
        
        // Se aprovado, cria um agendamento fictício no prontuário
        if (status === 'aprovado') {
            const req = state.requests[reqIndex];
            const campaign = state.campaigns.find(c => c.id === req.campaignId);
            const newAppointment = {
                id: utils.generateId(),
                petId: req.petId,
                date: campaign ? campaign.date : new Date().toISOString(),
                procedure: 'Castração',
                clinic: campaign ? campaign.location : 'Clínica Municipal',
                status: 'concluido'
            };
            state.appointments.push(newAppointment);
        }

        utils.syncState();
        utils.showToast(`Solicitação ${status === 'aprovado' ? 'aprovada' : 'recusada'} com sucesso!`, status === 'aprovado' ? 'success' : 'info');
        
        // Notifica o usuário sobre a mudança de status
        const user = state.registeredUsers.find(u => u.id === state.requests[reqIndex].userId);
        if (user) {
            addNotification(
                user.id,
                'Solicitação Atualizada',
                `Sua solicitação ${state.requests[reqIndex].protocol} foi ${status.toUpperCase()}.`,
                status === 'aprovado' ? 'check-circle' : 'x-circle'
            );

            utils.sendEmailSimulation(
                user.email,
                `Atualização de Solicitação - ${state.requests[reqIndex].protocol}`,
                `Olá ${user.name},\n\nSua solicitação ${state.requests[reqIndex].protocol} foi ${status === 'aprovado' ? 'APROVADA' : 'RECUSADA'}.\n\nStatus Atual: ${status.toUpperCase()}\n\nAcesse o sistema para mais detalhes.`
            );
        }

        render();
    }
}

function render404() {
    return `
        <div class="text-center py-5">
            <h1 class="display-1 fw-bold text-teal">404</h1>
            <h3>Página não encontrada</h3>
            <p class="text-muted">O link que você seguiu pode estar quebrado ou a página pode ter sido removida.</p>
            <button class="btn btn-teal text-white mt-3" onclick="router.navigate('home')">Voltar ao Início</button>
        </div>
    `;
}

// --- EVENTOS E LOGICA ---

function toggleFavorite(petId, event) {
    if (event) event.stopPropagation();
    if (!state.currentUser) {
        utils.showToast('Faça login para salvar seus pets favoritos.', 'warning');
        router.navigate('login');
        return;
    }

    const index = state.favorites.findIndex(f => f.petId === petId && f.userId === state.currentUser.id);
    if (index === -1) {
        state.favorites.push({ userId: state.currentUser.id, petId });
        utils.showToast('Pet adicionado aos favoritos!', 'success');
    } else {
        state.favorites.splice(index, 1);
        utils.showToast('Pet removido dos favoritos.', 'info');
    }
    utils.syncState();
    render();
}

function cancelVolunteer() {
    const index = state.volunteers.findIndex(v => v.userId === state.currentUser?.id);
    if (index !== -1) {
        state.volunteers.splice(index, 1);
        utils.syncState();
        utils.showToast('Cadastro de voluntário removido.', 'info');
        render();
    }
}

function initViewEvents() {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileClose = document.getElementById('mobile-close');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    const toggleSidebar = (show) => {
        if (show) {
            sidebar.classList.add('open');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    if (mobileBtn) mobileBtn.onclick = () => toggleSidebar(true);
    if (mobileClose) mobileClose.onclick = () => toggleSidebar(false);
    if (overlay) overlay.onclick = () => toggleSidebar(false);

    // Logout
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            state.currentUser = null;
            localStorage.removeItem(APP_CONFIG.storageKeyUser);
            router.navigate('login');
        };
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPass').value;
            const errorDiv = document.getElementById('loginError');
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            
            // Estado de Loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Aguarde...`;
            loginForm.querySelectorAll('input').forEach(i => i.disabled = true);

            try {
                const hashedPass = await utils.hashPassword(pass);
                
                // Busca usuário (tenta hash primeiro, depois plain text para migração imediata)
                let user = state.registeredUsers.find(u => u.email === email && (u.pass === hashedPass || u.pass === pass));
                
                if (user) {
                    // Se logou com plain text, atualiza para hash agora mesmo
                    if (user.pass === pass) {
                        user.pass = hashedPass;
                        const userIndex = state.registeredUsers.findIndex(u => u.id === user.id);
                        state.registeredUsers[userIndex] = user;
                    }

                    state.currentUser = user;
                    utils.syncState();
                    utils.showToast(`Bem-vindo de volta, ${user.name}!`, 'success');
                    router.navigate('home');
                } else {
                    errorDiv.innerText = "E-mail ou senha incorretos.";
                    errorDiv.classList.remove('d-none');
                    // Restaura estado em caso de erro
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    loginForm.querySelectorAll('input').forEach(i => i.disabled = false);
                }
            } catch (err) {
                utils.showToast('Erro ao processar login.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                loginForm.querySelectorAll('input').forEach(i => i.disabled = false);
            }
        };
    }

    // CPF Mask
    const cpfInput = document.getElementById('cpfInput');
    if (cpfInput) {
        cpfInput.oninput = (e) => e.target.value = utils.formatCPF(e.target.value);
    }

    // Phone Mask
    const telInputs = document.querySelectorAll('input[type="tel"]');
    telInputs.forEach(tel => {
        if (tel.id !== 'loginTel') {
            tel.oninput = (e) => e.target.value = utils.formatPhone(e.target.value);
        }
    });

    // Cadastro Form
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.onsubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const name = form.querySelector('input[type="text"]').value;
            const cpf = document.getElementById('cpfInput').value;
            const email = form.querySelector('input[type="email"]').value;
            const pass = form.querySelectorAll('input[type="password"]')[0].value;
            const passConfirm = form.querySelectorAll('input[type="password"]')[1].value;
            const tel = form.querySelector('input[type="tel"]').value;

            if (!utils.validateCPF(cpf)) {
                utils.showToast('CPF inválido. Por favor, verifique.', 'error');
                return;
            }

            if (pass !== passConfirm) {
                utils.showToast('As senhas não coincidem.', 'warning');
                return;
            }

            if (state.registeredUsers.find(u => u.email === email)) {
                utils.showToast('Este e-mail já está cadastrado.', 'warning');
                return;
            }

            // Estado de Loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Processando...`;
            form.querySelectorAll('input, button').forEach(i => i.disabled = true);

            try {
                const hashedPass = await utils.hashPassword(pass);
                const newUser = {
                    id: utils.generateId(),
                    name,
                    cpf,
                    email,
                    pass: hashedPass,
                    tel,
                    role: 'user',
                    bairro: 'Serra'
                };

                state.registeredUsers.push(newUser);
                utils.syncState();
                
                utils.showToast('Cadastro realizado com sucesso! Bem-vindo ao Programa ARCA.', 'success');
                setTimeout(() => router.navigate('login'), 1500);
            } catch (err) {
                utils.showToast('Erro ao realizar cadastro.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                form.querySelectorAll('input, button').forEach(i => i.disabled = false);
            }
        };
    }

    // Perfil Form
    const perfilForm = document.getElementById('perfilForm');
    if (perfilForm) {
        perfilForm.onsubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const tel = document.getElementById('perfilTel').value;
            const bairro = form.querySelector('input[placeholder="Seu bairro"]').value;

            // Estado de Loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Salvando...`;
            form.querySelectorAll('input, button').forEach(i => i.disabled = true);

            setTimeout(() => {
                // Atualiza usuário atual
                state.currentUser.name = name;
                state.currentUser.email = email;
                state.currentUser.tel = tel;
                state.currentUser.bairro = bairro;

                // Atualiza na lista global
                const userIndex = state.registeredUsers.findIndex(u => u.id === state.currentUser.id);
                if (userIndex !== -1) {
                    state.registeredUsers[userIndex] = { ...state.registeredUsers[userIndex], ...state.currentUser };
                }

                utils.syncState();
                utils.showToast('Perfil atualizado com sucesso!', 'success');
                render();
            }, 800);
        };
    }

    // Cadastro Pet Form
    const cadastroPetForm = document.getElementById('cadastroPetForm');
    if (cadastroPetForm) {
        cadastroPetForm.onsubmit = (e) => {
            e.preventDefault();
            const submitBtn = cadastroPetForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Publicando...`;

            setTimeout(() => {
                const newPet = {
                    id: utils.generateId(),
                    name: document.getElementById('petName').value,
                    species: document.getElementById('petSpecies').value,
                    breed: document.getElementById('petBreed').value,
                    age: document.getElementById('petAge').value,
                    gender: document.getElementById('petGender').value,
                    size: document.getElementById('petSize').value,
                    temperamento: document.getElementById('petTemp').value,
                    description: document.getElementById('petDesc').value,
                    image: document.getElementById('petPhoto').value,
                    contact: document.getElementById('petContact').value,
                    status: 'disponivel',
                    createdAt: new Date().toISOString(),
                    ownerId: state.currentUser.id
                };

                state.adoptionPets.push(newPet);
                utils.syncState();

                utils.showToast('Animal cadastrado com sucesso!', 'success');
                router.navigate('adocao');
            }, 1500);
        };
    }

    // Solicitação Form
    const solicitacaoForm = document.getElementById('solicitacaoForm');
    if (solicitacaoForm) {
        solicitacaoForm.onsubmit = (e) => {
            e.preventDefault();
            const submitBtn = solicitacaoForm.querySelector('button[type="submit"]');
            const campaignId = document.getElementById('solicCampaign').value;
            const petName = document.getElementById('solicPetName').value;
            const species = document.getElementById('solicPetSpecies').value;
            const gender = document.getElementById('solicPetGender').value;
            const weight = document.getElementById('solicPetWeight').value;
            const breed = document.getElementById('solicPetBreed').value || 'SRD';
            
            // Verificação de solicitação duplicada (Improvement 6)
            const hasPending = state.requests.find(r => r.userId === state.currentUser.id && r.status === 'pendente');
            if (hasPending) {
                utils.showToast(`Você já possui uma solicitação em análise (Protocolo: ${hasPending.protocol}).`, 'warning');
                utils.showModal(
                    'Solicitação Duplicada',
                    `<p>Você já possui uma solicitação pendente no sistema para este ou outro pet.</p>
                     <p><strong>Protocolo:</strong> ${hasPending.protocol}</p>`,
                    `<button class="btn btn-teal" data-bs-dismiss="modal" onclick="router.navigate('acompanhamento')">Ver Acompanhamento</button>`
                );
                return;
            }

            // Estado de Loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Enviando...`;
            solicitacaoForm.querySelectorAll('input, select, button').forEach(i => i.disabled = true);

            setTimeout(() => {
                const newPet = { 
                    id: utils.generateId(), 
                    name: petName, 
                    species: species, 
                    gender: gender,
                    weight: weight + 'kg',
                    breed: breed,
                    ownerId: state.currentUser.id,
                    age: 'Não informada'
                };
                
                const newRequest = {
                    id: utils.generateId(),
                    petId: newPet.id,
                    userId: state.currentUser.id,
                    campaignId: campaignId,
                    status: 'pendente',
                    date: new Date().toISOString(),
                    protocol: `ARC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
                };
                
                state.pets.push(newPet);
                state.requests.push(newRequest);
                
                // Atualiza vagas na campanha
                const campaign = state.campaigns.find(c => c.id === campaignId);
                if (campaign && campaign.spots > 0) {
                    campaign.spots--;
                }

                utils.syncState();
                
                utils.showToast(`Solicitação enviada com sucesso! Protocolo: ${newRequest.protocol}`, 'success');
                
                utils.sendEmailSimulation(
                    state.currentUser.email,
                    `Solicitação de Castração - ${newRequest.protocol}`,
                    `Olá ${state.currentUser.name},\n\nSua solicitação de castração para o pet ${petName} foi recebida com sucesso.\n\nProtocolo: ${newRequest.protocol}\nStatus: Em Análise\n\nAcompanhe o progresso no painel do munícipe.`
                );

                router.navigate('acompanhamento');
            }, 1200);
        };
    }

    // Denuncia Form
    const denunciaForm = document.getElementById('denunciaForm');
    if (denunciaForm) {
        denunciaForm.onsubmit = (e) => {
            e.preventDefault();
            if (!state.currentUser) {
                utils.showToast('Faça login para registrar uma denúncia.', 'warning');
                router.navigate('login');
                return;
            }

            const newDenuncia = {
                id: utils.generateId(),
                userId: state.currentUser.id,
                address: document.getElementById('denAddress').value,
                description: document.getElementById('denDesc').value,
                photo: document.getElementById('denPhoto').value,
                anonimo: document.getElementById('denAnonimo').checked,
                status: 'pendente',
                date: new Date().toISOString()
            };

            state.denuncias.push(newDenuncia);
            utils.syncState();
            utils.showToast('Denúncia enviada com sucesso! A prefeitura irá averiguar.', 'success');
            
            // Notifica Admin (Simulação)
            console.log('Admin notificado de nova denúncia');
            
            render();
        };
    }

    // Volunteer Form
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.onsubmit = (e) => {
            e.preventDefault();
            if (!state.currentUser) {
                utils.showToast('Faça login para se candidatar a Lar Temporário.', 'warning');
                router.navigate('login');
                return;
            }

            const newVolunteer = {
                id: utils.generateId(),
                userId: state.currentUser.id,
                houseType: document.getElementById('volHouseType').value,
                preference: document.getElementById('volPref').value,
                hasPets: document.getElementById('volHasPets').value,
                time: document.getElementById('volTime').value,
                date: new Date().toISOString(),
                status: 'ativo'
            };

            state.volunteers.push(newVolunteer);
            utils.syncState();
            utils.showToast('Seu cadastro de voluntário foi realizado! Obrigado.', 'success');
            render();
        };
    }

    // Navegação via data-page nos itens da lista (caso não use links)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.onclick = (e) => {
            e.preventDefault();
            const view = item.dataset.page;
            if (view) router.navigate(view);
        };
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('arca_theme', state.theme);
            render();
        };
    }

    // Back to Top Logic
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.onscroll = () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        };
        backToTop.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    lucide.createIcons();
}

async function migrateData() {
    let updated = false;
    
    // Fix Amora's photo if it's the old one
    const amora = state.adoptionPets.find(p => p.id === 'adopt-4');
    const newAmoraPhoto = "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80";
    if (amora && amora.image !== newAmoraPhoto) {
        amora.image = newAmoraPhoto;
        updated = true;
    }

    if (updated) {
        utils.syncState();
    }
}

async function migrateUsers() {
    let users = JSON.parse(localStorage.getItem(APP_CONFIG.storageKeyUsers)) || state.registeredUsers;
    let updated = false;
    const adminHash = '240be518fabd2724ddb6f04030113c5a0c20b922017c10729792033621453258'; // admin123

    // Garante que o admin oficial sempre exista e tenha a senha correta
    const adminIndex = users.findIndex(u => u.email === APP_CONFIG.systemEmail);
    if (adminIndex === -1) {
        users.push({ id: 'admin', name: 'Administrador', email: APP_CONFIG.systemEmail, pass: adminHash, role: 'admin' });
        updated = true;
    } else if (users[adminIndex].pass !== adminHash && (users[adminIndex].pass === 'admin123' || users[adminIndex].pass.length < 60)) {
        // Se a senha for a padrão antiga ou não for um hash SHA-256 (64 chars), força o reset
        users[adminIndex].pass = adminHash;
        updated = true;
    }

    // Migração de outros usuários legados
    users = users.map(u => {
        if (u.email === 'admin@serra.gov.br') {
            u.email = APP_CONFIG.systemEmail;
            u.pass = adminHash;
            updated = true;
        }
        // Converte 123456 plain text para hash
        if (u.pass === '123456') {
            u.pass = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';
            updated = true;
        }
        return u;
    });

    if (updated) {
        state.registeredUsers = users;
        // Se o usuário logado foi alterado na migração, atualiza o state.currentUser
        if (state.currentUser) {
            const updatedCurrentUser = users.find(u => u.id === state.currentUser.id);
            if (updatedCurrentUser) state.currentUser = updatedCurrentUser;
        }
        utils.syncState();
    }
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([migrateUsers(), migrateData()]).then(() => {
        render();
    });
});
