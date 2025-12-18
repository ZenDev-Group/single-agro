// Registrar Plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------------------------------------
    // 1. MOTOR DE SCROLL SUAVE (LENIS)
    // ---------------------------------------------------------------------------------
    const lenis = new Lenis({
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true
    });

    // Sincronización única del loop
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Actualizar ScrollTrigger al hacer scroll
    lenis.on('scroll', ScrollTrigger.update);

    // ---------------------------------------------------------------------------------
    // 2. NAVEGACIÓN Y MENÚ (Lógica unificada)
    // ---------------------------------------------------------------------------------
    const boton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.primary-nav');
    const icono = boton ? boton.querySelector('i') : null;

    if (boton && menu) {
        boton.onclick = () => {
            menu.classList.toggle('active');
            icono.classList.toggle('fa-bars');
            icono.classList.toggle('fa-times');
        };
    }

    // Links internos con scroll suave de Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: -80 });
                // Cerrar menú móvil si está abierto
                menu.classList.remove('active');
                if (icono) icono.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // ---------------------------------------------------------------------------------
    // 3. COREOGRAFÍA DE ANIMACIONES (GSAP)
    // ---------------------------------------------------------------------------------

    // --- SECCIÓN 1: HERO (Asincrónico y Entrada) ---
    const introTl = gsap.timeline();
    introTl.to(".hero-title", { y: 0, duration: 1.2, ease: "power4.out", delay: 0.5 })
        .to(".hero-slogan", { y: 0, duration: 1, ease: "power3.out" }, "-=0.8");

    gsap.to(".hero-parallax-bg", {
        yPercent: 20, scale: 1.1, ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
    });

    gsap.to(".hero-content", {
        yPercent: -50, opacity: 0, filter: "blur(10px)", ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 20%", scrub: true }
    });

    // --- SECCIÓN 2: PRESENTACIÓN ---
    gsap.from("#presentacion .section-title, #presentacion .section-lead, #presentacion .main-story", {
        y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: "#presentacion", start: "top 80%" }
    });

    // --- SECCIÓN 3: MAPA ---
    gsap.from(".map-container", {
        scale: 0.9, opacity: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".map-section", start: "top 80%" }
    });

    // --- SECCIÓN 4: PILARES ---
    gsap.from(".pillars-section .animated-card", {
        y: 80, // Movimiento notable hacia arriba
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pillars-section", start: "top 85%" }
    });

    // --- SECCIÓN 5: PRODUCTOS ---
    gsap.from(".solutions-grid .solution-card", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".solutions-grid", start: "top 85%" }
    });

    // --- SECCIÓN 6: AUTORIDAD (Pop dinámico) ---
    gsap.from(".authority-item", {
        scale: 0.7, opacity: 0, y: 40, stagger: 0.2, duration: 1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".authority-grid", start: "top 85%" }
    });

    // --- SECCIÓN 7: DESCARGAS (Fix Lateral) ---
    gsap.from(".download-button", {
        // Reducimos el porcentaje para que no se "rompa" en móviles pequeños
        xPercent: (i) => (i % 2 === 0 ? -40 : 40),
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".downloads-grid",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // Refresco final para asegurar que ScrollTrigger mida bien las alturas
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // --- SECCIÓN 8: CONTACTO PROFESIONAL ---

    // 1. EL FONDO: Parallax de Zoom Inverso
    gsap.to(".cta-parallax-bg", {
        yPercent: 30, // Se mueve en contra del scroll
        ease: "none",
        scrollTrigger: {
            trigger: ".final-cta-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true // Sincronizado al movimiento del mouse/dedo
        }
    });

    // 2. EL CONTENIDO: Revelado secuencial
    const tlCta = gsap.timeline({
        scrollTrigger: {
            trigger: ".final-cta-content",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    tlCta.from(".final-cta-content > *", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 3. CTA DINÁMICO: Latido de WhatsApp
    gsap.to(".whatsapp-btn-simple", {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});