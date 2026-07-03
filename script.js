// Particules animées
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        if (mouse.x != null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 1, 60, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(window.innerWidth / 10, 100);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.15;
                ctx.strokeStyle = `rgba(0, 1, 60, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Navigation scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Animation des barres de compétences
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Compteur animé
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current) + '+';
                }
            }, 30);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => statsObserver.observe(num));

// Formulaire de contact
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = '✅ Message envoyé !';
    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============ MULTILINGUE ============
const translations = {
    fr: {
        nav: {
            home: 'Accueil',
            about: 'À propos',
            services: 'Services',
            skills: 'Compétences',
            projects: 'Projets',
            experience: 'Expériences',
            contact: 'Contact'
        },
        hero: {
            subtitle: 'Web & Multimedia Developer',
            title1: 'Mohamed',
            title2: 'Boucheneb',
            desc: 'Je conçois et développe des sites web modernes, des plateformes e-learning, des solutions e-commerce et des expériences digitales qui allient performance, fonctionnalité et impact visuel.',
            btn1: 'Voir mes projets',
            btn2: 'Me contacter'
        },
        about: {
            label: 'À propos',
            title: 'Qui suis-je ?',
            subtitle: 'Web & Multimedia Developer',
            p1: 'Je suis un développeur Web et Multimédia avec une expertise dans la création de sites internet, de solutions e-commerce, de systèmes de gestion de l\'apprentissage et de design digital.',
            p2: 'Avec une expérience dans la réalisation de sites corporate, de boutiques en ligne et de plateformes de formation professionnelle, j\'aide les entreprises à transformer leurs idées en solutions digitales efficaces.',
            p3: 'Mon parcours technique couvre le développement front-end et back-end, la personnalisation WordPress, le développement PrestaShop, la gestion de bases de données, la création multimédia et l\'optimisation des sites web.',
            p4: 'Je suis passionné par la création de produits digitaux intuitifs, évolutifs et performants qui apportent une réelle valeur ajoutée aux entreprises.',
            stat1: 'Projets réalisés',
            stat2: "Années d'expérience",
            stat3: 'Clients satisfaits'
        },
        services: {
            label: 'Services',
            title: 'Mes services',
            service1: {
                title: 'Développement Web',
                list: ['Sites corporate', 'Sites vitrines', 'Landing pages', 'Applications web sur mesure']
            },
            service2: {
                title: 'E-Commerce',
                list: ['Boutiques PrestaShop', 'Boutiques WooCommerce', 'Gestion de catalogues produits', 'Intégration de paiement']
            },
            service3: {
                title: 'E-Learning',
                list: ['LearnDash & Tutor LMS', 'Portails de formation', 'Systèmes de certification', 'Suivi des compétences']
            },
            service4: {
                title: 'Design Multimédia',
                list: ['Graphisme', 'Visuels pour réseaux sociaux', 'Supports marketing', 'Identité de marque']
            },
            service5: {
                title: 'Maintenance Web',
                list: ['Mises à jour sécurité', 'Optimisation performance', 'Gestion des sauvegardes', 'Support technique']
            }
        },
        skills: {
            label: 'Compétences',
            title: 'Mes expertises',
            cat1: 'Développement Web',
            cat2: 'LMS & Design',
            table: {
                category: 'Catégorie',
                technologies: 'Technologies',
                frontend: 'Front-End',
                backend: 'Back-End',
                cms: 'CMS',
                ecommerce: 'E-Commerce',
                lms: 'LMS',
                design: 'Design',
                programming: 'Programmation',
                tools: 'Outils'
            }
        },
        projects: {
            label: 'Portfolio',
            title: 'Mes réalisations',
            view: '🔗 Voir le projet',
            code: '💻 Code source',
            project1: {
                title: 'EXPS – Expert Petroleum Services',
                desc: 'Site corporate complet avec présentation d\'entreprise, vitrine de services, formulaires de contact et optimisation SEO.'
            },
            project2: {
                title: 'NB YES Company',
                desc: 'Site vitrine avec design moderne, interface responsive, pages de présentation et vitrine de services.'
            },
            project3: {
                title: 'Petroleum E-Learning Platform',
                desc: 'Plateforme de formation en ligne avec cours, évaluations, certificats, gestion des apprenants et suivi des compétences.'
            },
            project4: {
                title: 'Electrical Products E-Commerce Store',
                desc: 'Boutique en ligne avec gestion de produits, structure de catégories, configuration de paiement et optimisation SEO.'
            },
            project5: {
                title: 'Stock Monitoring System',
                desc: 'Application Python de suivi des stocks produits, monitoring des prix, traitement CSV, rapports HTML et alertes automatisées.'
            }
        },
        experience: {
            label: 'Expériences',
            title: 'Mon parcours',
            exp1: {
                title: 'EURL Expert Petroleum Services',
                role: 'Web Development & Digital Solutions',
                desc: 'Développement web, solutions numériques et optimisation de sites pour l\'entreprise.'
            },
            exp2: {
                title: 'Agence de Développement ALCOMNET',
                role: 'Web Development & Multimedia Projects',
                desc: 'Réalisation de projets web et multimédia pour divers clients.'
            }
        },
        contact: {
            label: 'Contact',
            title: 'Travaillons ensemble',
            email: 'Email',
            phone: 'Téléphone',
            form: {
                name: 'Nom',
                email: 'Email',
                message: 'Message',
                submit: 'Envoyer le message'
            }
        },
        footer: {
            copyright: '© 2026 Mohamed Boucheneb. Tous droits réservés. Conçu avec ❤️ et beaucoup de café.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            skills: 'Skills',
            projects: 'Projects',
            experience: 'Experience',
            contact: 'Contact'
        },
        hero: {
            subtitle: 'Web & Multimedia Developer',
            title1: 'Mohamed',
            title2: 'Boucheneb',
            desc: 'I design and develop modern websites, e-learning platforms, e-commerce solutions, and digital experiences that combine performance, functionality, and visual impact.',
            btn1: 'View my projects',
            btn2: 'Contact me'
        },
        about: {
            label: 'About',
            title: 'Who am I?',
            subtitle: 'Web & Multimedia Developer',
            p1: 'I am a Web and Multimedia Developer with expertise in website development, e-commerce solutions, learning management systems, and digital design.',
            p2: 'With experience working on corporate websites, online stores, and professional training platforms, I help businesses transform their ideas into efficient digital solutions.',
            p3: 'My technical background covers front-end and back-end web development, WordPress customization, PrestaShop development, database management, multimedia creation, and website optimization.',
            p4: 'I am passionate about creating user-friendly, scalable, and high-performance digital products that deliver real business value.',
            stat1: 'Projects completed',
            stat2: 'Years of experience',
            stat3: 'Happy clients'
        },
        services: {
            label: 'Services',
            title: 'My services',
            service1: {
                title: 'Web Development',
                list: ['Corporate websites', 'Business websites', 'Landing pages', 'Custom web applications']
            },
            service2: {
                title: 'E-Commerce',
                list: ['PrestaShop stores', 'WooCommerce stores', 'Product catalog management', 'Payment gateway integration']
            },
            service3: {
                title: 'E-Learning',
                list: ['LearnDash implementation', 'Tutor LMS deployment', 'Training portals', 'Online certification systems']
            },
            service4: {
                title: 'Multimedia Design',
                list: ['Graphic design', 'Social media visuals', 'Marketing materials', 'Brand identity assets']
            },
            service5: {
                title: 'Website Maintenance',
                list: ['Security updates', 'Performance optimization', 'Backup management', 'Technical support']
            }
        },
        skills: {
            label: 'Skills',
            title: 'My expertise',
            cat1: 'Web Development',
            cat2: 'LMS & Design',
            table: {
                category: 'Category',
                technologies: 'Technologies',
                frontend: 'Front-End',
                backend: 'Back-End',
                cms: 'CMS',
                ecommerce: 'E-Commerce',
                lms: 'LMS',
                design: 'Design',
                programming: 'Programming',
                tools: 'Tools'
            }
        },
        projects: {
            label: 'Portfolio',
            title: 'My work',
            view: '🔗 View project',
            code: '💻 Source code',
            project1: {
                title: 'EXPS – Expert Petroleum Services',
                desc: 'Complete corporate website with company presentation, service showcase, contact forms and SEO optimization.'
            },
            project2: {
                title: 'NB YES Company',
                desc: 'Business website with modern design, responsive interface, company profile pages and service presentation.'
            },
            project3: {
                title: 'Petroleum E-Learning Platform',
                desc: 'Online training platform with courses, assessments, certificates, learner management and competency tracking.'
            },
            project4: {
                title: 'Electrical Products E-Commerce Store',
                desc: 'Online store with product management, category structure, checkout configuration and SEO optimization.'
            },
            project5: {
                title: 'Stock Monitoring System',
                desc: 'Python application for product stock tracking, price monitoring, CSV processing, HTML reporting and automated alerts.'
            }
        },
        experience: {
            label: 'Experience',
            title: 'My journey',
            exp1: {
                title: 'EURL Expert Petroleum Services',
                role: 'Web Development & Digital Solutions',
                desc: 'Web development, digital solutions and website optimization for the company.'
            },
            exp2: {
                title: 'ALCOMNET Development Agency',
                role: 'Web Development & Multimedia Projects',
                desc: 'Development of web and multimedia projects for various clients.'
            }
        },
        contact: {
            label: 'Contact',
            title: 'Let\'s work together',
            email: 'Email',
            phone: 'Phone',
            form: {
                name: 'Name',
                email: 'Email',
                message: 'Message',
                submit: 'Send message'
            }
        },
        footer: {
            copyright: '© 2026 Mohamed Boucheneb. All rights reserved. Made with ❤️ and lots of coffee.'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            about: 'Sobre mí',
            services: 'Servicios',
            skills: 'Habilidades',
            projects: 'Proyectos',
            experience: 'Experiencia',
            contact: 'Contacto'
        },
        hero: {
            subtitle: 'Web & Multimedia Developer',
            title1: 'Mohamed',
            title2: 'Boucheneb',
            desc: 'Diseño y desarrollo sitios web modernos, plataformas e-learning, soluciones de comercio electrónico y experiencias digitales que combinan rendimiento, funcionalidad e impacto visual.',
            btn1: 'Ver mis proyectos',
            btn2: 'Contáctame'
        },
        about: {
            label: 'Sobre mí',
            title: '¿Quién soy?',
            subtitle: 'Web & Multimedia Developer',
            p1: 'Soy un desarrollador Web y Multimedia con experiencia en desarrollo de sitios web, soluciones de comercio electrónico, sistemas de gestión de aprendizaje y diseño digital.',
            p2: 'Con experiencia trabajando en sitios corporativos, tiendas en línea y plataformas de formación profesional, ayudo a las empresas a transformar sus ideas en soluciones digitales eficientes.',
            p3: 'Mi formación técnica abarca desarrollo web front-end y back-end, personalización de WordPress, desarrollo PrestaShop, gestión de bases de datos, creación multimedia y optimización de sitios web.',
            p4: 'Me apasiona crear productos digitales intuitivos, escalables y de alto rendimiento que aporten un valor real a las empresas.',
            stat1: 'Proyectos realizados',
            stat2: 'Años de experiencia',
            stat3: 'Clientes satisfechos'
        },
        services: {
            label: 'Servicios',
            title: 'Mis servicios',
            service1: {
                title: 'Desarrollo Web',
                list: ['Sitios corporativos', 'Sitios institucionales', 'Landing pages', 'Aplicaciones web personalizadas']
            },
            service2: {
                title: 'E-Commerce',
                list: ['Tiendas PrestaShop', 'Tiendas WooCommerce', 'Gestión de catálogos de productos', 'Integración de pagos']
            },
            service3: {
                title: 'E-Learning',
                list: ['LearnDash & Tutor LMS', 'Portales de formación', 'Sistemas de certificación', 'Seguimiento de competencias']
            },
            service4: {
                title: 'Diseño Multimedia',
                list: ['Diseño gráfico', 'Visuales para redes sociales', 'Materiales de marketing', 'Identidad de marca']
            },
            service5: {
                title: 'Mantenimiento Web',
                list: ['Actualizaciones de seguridad', 'Optimización de rendimiento', 'Gestión de copias de seguridad', 'Soporte técnico']
            }
        },
        skills: {
            label: 'Habilidades',
            title: 'Mis especialidades',
            cat1: 'Desarrollo Web',
            cat2: 'LMS & Diseño',
            table: {
                category: 'Categoría',
                technologies: 'Tecnologías',
                frontend: 'Front-End',
                backend: 'Back-End',
                cms: 'CMS',
                ecommerce: 'E-Commerce',
                lms: 'LMS',
                design: 'Diseño',
                programming: 'Programación',
                tools: 'Herramientas'
            }
        },
        projects: {
            label: 'Portafolio',
            title: 'Mis proyectos',
            view: '🔗 Ver proyecto',
            code: '💻 Código fuente',
            project1: {
                title: 'EXPS – Expert Petroleum Services',
                desc: 'Sitio corporativo completo con presentación de empresa, vitrina de servicios, formularios de contacto y optimización SEO.'
            },
            project2: {
                title: 'NB YES Company',
                desc: 'Sitio institucional con diseño moderno, interfaz responsive, páginas de perfil y presentación de servicios.'
            },
            project3: {
                title: 'Plataforma E-Learning Petrolera',
                desc: 'Plataforma de formación en línea con cursos, evaluaciones, certificados, gestión de estudiantes y seguimiento de competencias.'
            },
            project4: {
                title: 'Tienda E-Commerce de Productos Eléctricos',
                desc: 'Tienda en línea con gestión de productos, estructura de categorías, configuración de pago y optimización SEO.'
            },
            project5: {
                title: 'Sistema de Monitoreo de Stock',
                desc: 'Aplicación Python para seguimiento de stock de productos, monitoreo de precios, procesamiento CSV, informes HTML y alertas automatizadas.'
            }
        },
        experience: {
            label: 'Experiencia',
            title: 'Mi trayectoria',
            exp1: {
                title: 'EURL Expert Petroleum Services',
                role: 'Web Development & Digital Solutions',
                desc: 'Desarrollo web, soluciones digitales y optimización de sitios para la empresa.'
            },
            exp2: {
                title: 'Agence de Développement ALCOMNET',
                role: 'Web Development & Multimedia Projects',
                desc: 'Realización de proyectos web y multimedia para diversos clientes.'
            }
        },
        contact: {
            label: 'Contacto',
            title: 'Trabajemos juntos',
            email: 'Correo',
            phone: 'Teléfono',
            form: {
                name: 'Nombre',
                email: 'Correo',
                message: 'Mensaje',
                submit: 'Enviar mensaje'
            }
        },
        footer: {
            copyright: '© 2026 Mohamed Boucheneb. Todos los derechos reservados. Hecho con ❤️ y mucho café.'
        }
    }
};

let currentLang = 'fr';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = t;
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        if (value !== null && typeof value === 'string') {
            el.textContent = value;
        } else if (value !== null && Array.isArray(value)) {
            // Pour les listes (services)
            const listItems = el.querySelectorAll('li');
            value.forEach((item, index) => {
                if (listItems[index]) {
                    listItems[index].textContent = item;
                }
            });
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('preferred-language', lang);
}

// Initialiser la langue
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = ['fr', 'en', 'es'].includes(savedLang) ? savedLang :
                        ['fr', 'en', 'es'].includes(browserLang) ? browserLang : 'fr';
    setLanguage(defaultLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
});