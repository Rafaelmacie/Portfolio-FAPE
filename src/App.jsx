import React, { useState, useEffect } from 'react';
import {
  Layout, Wallet, Briefcase, Leaf, ShoppingCart,
  CheckCircle2, Clock, Code2, Home,
  ChevronLeft, ChevronRight, X, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

// DADOS DOS MÓDULOS - Caminhos apontando para a raiz (pasta public)
const MODULOS_DATA = [
  {
    id: 'admin',
    icone: <Layout size={20} />,
    titulo: "Visão Administrativa",
    subtitulo: "Motor da Cooperativa",
    descricao: "O coração da Cooperativa. Orquestração de demandas, controle de clientes, cooperados e produtos, além de um painel administrativo para apoio a decisões.",
    imagens: [
      { src: "/telas/administrativo.png", caption: "Gestão de Cooperados" },
      { src: "telas/administrativo_produtos.png", caption: "Gestão de Produtos" }
    ],
    features: [
      { nome: "Gestão de Cooperados", status: "Operacional" },
      { nome: "Gestão de Produtos", status: "Operacional" },
      { nome: "Gestão de Clientes", status: "Operacional" },
      { nome: "Gestão de Demandas", status: "Em Progresso" },
      { nome: "Painel Administrativo", status: "Pendente" },
    ],
    tech: "React, Node.js, PostgreSQL"
  },
  {
    id: 'financeiro',
    icone: <Wallet size={20} />,
    titulo: "Visão Financeira",
    subtitulo: "Saúde e Tesouraria da cooperativa.",
    descricao: "Controle estrito do capital social, gestão de integralizações dos produtores e manutenção do livro-caixa operacional.",
    imagens: [
      { src: "/telas/dados_bancarios.png", caption: "Dados Bancários de um Cooperado" },
      { src: "telas/Integralizacao.png", caption: "Gestão de Integralizações" }
    ],
    features: [
      { nome: "Controle de Cooperados", status: "Operacional" },
      { nome: "Controle de Integralizações", status: "Em Progresso" },
      { nome: "Painel financeiro", status: "Pendente" },
      { nome: "Livro-Caixa", status: "Em Planejamento" }
    ],
    tech: "React, Node.js, PostgreSQL"
  },
  {
    id: 'executivo',
    icone: <Briefcase size={20} />,
    titulo: "Visão Executiva",
    subtitulo: "Business Intelligence",
    descricao: "Painéis de alto nível desenhados para a diretoria. Cruzamento de dados entre produção, finanças e metas estratégicas. Controle do visual da empresa.",
    imagens: [
      { src: "/telas/adiministrativo2.png", caption: "Tela Inicial do Sistema" },
      { src: "/telas/executivo.png", caption: "Painel de Novidades" }
    ],
    features: [
      { nome: "Gestão de Acessos e Perfis", status: "Em Progresso" },
      { nome: "Gestão dos Dados da Cooperativa", status: "Em Progresso" },
      { nome: "Administração da Página Principal", status: "Em Progresso" },
      { nome: "Dashboards de Performance", status: "Pendente" }
    ],
    tech: "React, Node.js, PostgreSQL"
  },
  {
    id: 'cooperado',
    icone: <Leaf size={20} />,
    titulo: "Cooperado",
    subtitulo: "Autoatendimento Rural",
    descricao: "Interface simplificada para o produtor rural acompanhar demandas abertas, emitir documentos oficiais e gerenciar sua produção",
    features: [
      { nome: "Manifestação de Interesse", status: "Pendente" },
      { nome: "Emissão de Fichas e Termos", status: "Pendente" },
      { nome: "Gerenciamento de Produção", status: "Pendente" }
    ],
    tech: "Mobile-First UI, React-Native"
  },
  {
    id: 'cliente',
    icone: <ShoppingCart size={20} />,
    titulo: " Cliente",
    subtitulo: "Vitrine e Compras",
    descricao: "Canal direto para compradores (governamentais ou atacado) registrarem suas necessidades de compra direto no funil da cooperativa.",
    features: [
      { nome: "Visualização de Produtos", status: "Pendente" },
      { nome: "Realização de Demandas", status: "Pendente" },
    ],
    tech: "React, Node.js, PostgreSQL"

  }
];

const CAROUSEL_IMAGES_HOME = [
  { src: "/telas/sede.png", caption: "Sede da Cooperativa FAPE" },
  { src: "/telas/Equipe.png", caption: "Nossa Equipe de 5 Membros" },
];

const StatusBadge = ({ status }) => {
  const isOp = status === 'Operacional';
  const isProg = status === 'Em Progresso';

  return (
    <span className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded border uppercase tracking-wider whitespace-nowrap
      ${isOp ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
        isProg ? 'bg-amber-50 text-amber-700 border-amber-200' :
          'bg-slate-50 text-slate-500 border-slate-200'}`}>
      {isOp ? <CheckCircle2 size={12} /> : <Clock size={12} />}
      {status}
    </span>
  );
};

// COMPONENTE: Carrossel Reutilizável
const ImageCarousel = ({ images, onExpand, heightClass }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-full relative flex flex-col items-center justify-center bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl md:rounded-[2rem] ${heightClass} mb-8 transition-colors hover:bg-slate-100`}>
        <div className="bg-white p-4 rounded-full shadow-sm mb-4 border border-slate-100">
          <Code2 size={32} className="text-slate-300" />
        </div>
        <p className="text-slate-500 font-bold text-sm md:text-base uppercase tracking-wider">
          Telas Em Progresso
        </p>
        <p className="text-slate-400 text-xs mt-2 font-medium">
          As imagens deste módulo estarão disponíveis em breve.
        </p>
      </div>
    );
  }

  // Código original do carrossel para quando há imagens
  return (
    <div
      className={`w-full relative group cursor-pointer ${heightClass} mb-8`}
      onClick={() => onExpand(images[currentIndex])}
    >
      <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl bg-slate-100 relative">
        <img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].caption}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Legenda na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent pt-16 pb-6 px-8 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm md:text-base font-semibold tracking-wide">{images[currentIndex].caption}</p>
          <p className="text-[10px] text-white/80 uppercase tracking-wider mt-1">Clique para expandir</p>
        </div>
      </div>

      {/* Controles só aparecem se houver mais de 1 imagem */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-emerald-50 hover:text-emerald-700 transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-emerald-50 hover:text-emerald-700 transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Bolinhas */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-emerald-500 w-6' : 'bg-slate-300 hover:bg-emerald-300'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function PortfolioFape() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* MODAL LIGHTBOX */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 md:p-10 transition-opacity animate-in fade-in"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
            onClick={() => setExpandedImage(null)}
          >
            <X size={24} />
          </button>

          <img
            src={expandedImage.src}
            alt={expandedImage.caption}
            className="max-w-full max-h-full rounded-xl shadow-2xl object-contain animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-2 rounded-full backdrop-blur-md text-sm font-medium whitespace-nowrap">
            {expandedImage.caption}
          </div>
        </div>
      )}

      <div className="flex h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden selection:bg-emerald-200 selection:text-emerald-900">

        <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
          <div className="w-[80vw] h-[80vw] bg-emerald-50/50 rounded-full blur-[120px] -translate-y-1/2" />
        </div>

        {/* SIDEBAR COM LÓGICA DE COLAPSO */}
        <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64 md:w-72'} flex flex-col bg-white border-r border-slate-200 relative z-20 shrink-0 shadow-sm transition-all duration-300`}>

          <div className={`p-4 md:p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} border-b border-slate-50 transition-all`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-slate-100 flex items-center justify-center bg-white shadow-sm overflow-hidden p-1 shrink-0">
                <img
                  src="/telas/logo2.png"
                  alt="FAPE"
                  className="w-full h-full object-contain"
                />
              </div>

              {!isSidebarCollapsed && (
                <div className="flex flex-col animate-in fade-in duration-300 overflow-hidden whitespace-nowrap">
                  <h1 className="font-extrabold text-emerald-600 text-base md:text-lg tracking-widest leading-tight">SERTANEJA FAPE</h1>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {!isSidebarCollapsed && (
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-1 px-3 animate-in fade-in whitespace-nowrap">
                Módulos do Sistema
              </p>
            )}

            <button
              onClick={() => scrollToSection('home')}
              title={isSidebarCollapsed ? "Visão Geral" : ""}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 text-sm rounded-lg transition-all duration-300
                ${activeSection === 'home'
                  ? 'bg-emerald-50 text-emerald-700 font-bold shadow-sm border border-emerald-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}
            >
              <Home size={20} className={activeSection === 'home' ? 'text-emerald-600' : 'text-slate-400'} />
              {!isSidebarCollapsed && <span className="whitespace-nowrap">Visão Geral</span>}
            </button>

            {MODULOS_DATA.map((modulo) => {
              const isActive = activeSection === modulo.id;
              return (
                <button
                  key={modulo.id}
                  title={isSidebarCollapsed ? modulo.titulo : ""}
                  onClick={() => scrollToSection(modulo.id)}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 text-sm rounded-lg transition-all duration-300 group
                    ${isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold shadow-sm border border-emerald-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}
                >
                  <span className={`transition-colors duration-300 ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'}`}>
                    {modulo.icone}
                  </span>
                  {!isSidebarCollapsed && <span className="whitespace-nowrap">{modulo.titulo}</span>}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100 flex justify-center">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center"
              title={isSidebarCollapsed ? "Expandir menu" : "Minimizar menu"}
            >
              {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 w-full h-full overflow-y-auto scroll-smooth relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="w-full pb-32">

            {/* HOME SECTION */}
            <section id="home" className="min-h-[85vh] w-full flex flex-col xl:flex-row items-center justify-center py-16 px-8 md:px-16 lg:px-24 gap-12 lg:gap-16">

              <div className="flex-1 w-full flex flex-col items-start text-left">

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight w-full">
                  Cooperativas<span className="text-emerald-600">
                    CE
                  </span>
                </h2>

                <h3 className="text-4xl md:text-5l lg:text-6l font-extrabold text-slate-900 mb-6 leading-tight tracking-tight w-full">
                  O sistema do futuro <span className="text-emerald-600">cooperativista.
                  </span></h3>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed w-full">
                  Explore a documentação viva do Sistema de Gerenciamento para Cooperativas. Navegue pelos painéis para entender a estrutura, o design e o progresso das funcionalidades desenvolvidas.
                </p>
              </div>

              {/* Usando o componente Reutilizável na Home */}
              <div className="flex-1 w-full xl:max-w-xl relative mt-8 xl:mt-0">
                <ImageCarousel
                  images={CAROUSEL_IMAGES_HOME}
                  onExpand={setExpandedImage}
                  heightClass="h-[300px] md:h-[400px]"
                />
              </div>
            </section>

            {/* MÓDULOS SECTIONS */}
            {MODULOS_DATA.map((modulo) => (
              <section
                id={modulo.id}
                key={modulo.id}
                className="min-h-screen w-full flex flex-col justify-center py-20 border-t border-slate-200/60 px-8 md:px-16 lg:px-24 xl:px-32"
              >
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
                  <div className="w-full flex flex-col items-start">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 mb-5 shadow-sm">
                      {modulo.icone}
                    </div>
                    <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-2">
                      {modulo.subtitulo}
                    </h3>
                    <h4 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight w-full">
                      {modulo.titulo}
                    </h4>
                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-6 w-full">
                      {modulo.descricao}
                    </p>

                    <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm">
                      <Code2 className="text-slate-400 shrink-0" size={20} />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Stack</p>
                        <p className="text-emerald-700 font-mono font-bold text-xs">{modulo.tech}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Funcionalidades</h5>
                      <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-600 font-mono font-bold">v1.0.0</span>
                    </div>

                    <div className="space-y-3">
                      {modulo.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-emerald-200 transition-colors"
                        >
                          <p className="text-sm text-slate-700 font-medium leading-tight">
                            {feat.nome}
                          </p>
                          <StatusBadge status={feat.status} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Usando o componente Reutilizável em Cada Módulo */}
                <ImageCarousel
                  images={modulo.imagens}
                  onExpand={setExpandedImage}
                  heightClass="h-[350px] md:h-[450px] lg:h-[550px]"
                />

              </section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}