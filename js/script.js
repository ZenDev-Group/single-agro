// 1. Registrar Plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------------------------------------
    // 2. CONFIGURACIÓN DE LENIS (Scroll Suave Pro)
    // ---------------------------------------------------------------------------------
    const lenis = new Lenis({
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
    });

    // Sincronización única: Dejamos que GSAP maneje el loop de Lenis
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Actualizar ScrollTrigger cuando Lenis hace scroll
    lenis.on('scroll', ScrollTrigger.update);

    console.log("Sistema de scroll sincronizado");

    // ---------------------------------------------------------------------------------
    // 3. NAVEGACIÓN Y MENÚ
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

    // Links internos suaves
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: -80 });
                menu.classList.remove('active'); // Cierra el menú en móvil
                if (icono) icono.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // ---------------------------------------------------------------------------------
    // 4. COREOGRAFÍA DE ANIMACIONES (GSAP)
    // ---------------------------------------------------------------------------------

    // --- 4. ANIMACIONES GSAP: HERO PROFESIONAL (ASINCRÓNICO) ---

    // --- ANIMACIÓN DE ENTRADA (CARGA) ---
    const introTl = gsap.timeline();

    introTl
        .to(".hero-title", {
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5
        })
        .to(".hero-slogan", {
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8"); // Empieza un poco antes de que termine el título

    // B. Scroll Asincrónico (Efecto Parallax de 3 capas)
    gsap.to(".hero-parallax-bg", {
        yPercent: 20, // El fondo baja un poco
        scale: 1.1,   // Se agranda sutilmente
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".hero-content", {
        yPercent: -50, // El texto sube rápido (efecto asincrónico)
        opacity: 0,
        filter: "blur(10px)", // Se desenfoca al irse
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom 20%",
            scrub: true
        }
    });

    gsap.to(".hero-overlay", {
        backgroundColor: "rgba(0,0,0,0.8)", // Se oscurece al bajar para dar paso al texto de abajo
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // --- PRESENTACIÓN (Sección 2) ---
    const tlPres = gsap.timeline({
        scrollTrigger: { trigger: "#presentacion", start: "top 80%" }
    });
    tlPres.from("#presentacion .section-title, #presentacion .section-lead", {
        y: 40, opacity: 0, stagger: 0.2, duration: 1
    });

    // --- MAPA (Sección 3) ---
    gsap.from(".map-container", {
        scale: 0.9, opacity: 0, duration: 1.5,
        scrollTrigger: { trigger: ".map-section", start: "top 50%" }
    });

    // ---------------------------------------------------------------------------------
    // 7. ANIMACIONES: SECCIÓN 4 (PILARES)
    // ---------------------------------------------------------------------------------
    gsap.from(".pillars-section .animated-card", {
        y: 0,               // Distancia de recorrido
        opacity: 0,
        duration: 1.2,       // Tiempo de la animación
        ease: "power3.out",
        stagger: 0.2,        // Espaciado entre tarjetas de esta sección
        scrollTrigger: {
            trigger: ".pillars-section",
            start: "top 35%", // Se activa cuando la sección está cerca del fondo
            toggleActions: "play none none none"
        }
    });

    // ---------------------------------------------------------------------------------
    // 8. ANIMACIONES: SECCIÓN 5 (PRODUCTOS)
    // ---------------------------------------------------------------------------------
    gsap.from(".solutions-grid .solution-card", {
        y: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,        // Espaciado independiente para estas tarjetas
        scrollTrigger: {
            trigger: ".solutions-grid", // <<-- AHORA CADA UNA TIENE SU PROPIO DISPARADOR
            start: "top 65%",
            toggleActions: "play none none none"
        }
    });

    // --- AUTORIDAD (Sección 6) - Efecto de "Pop" en iconos ---
    gsap.from(".authority-item", {
        scale: 0.7,
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".authority-grid", start: "top 65%" }
    });

    // --- DESCARGAS (Sección 7) - Deslizamiento lateral ---
    gsap.from(".download-button", {
        x: (i) => i % 2 === 0 ? -100 : 100, // Los pares vienen de la izquierda, impares de la derecha
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: ".downloads-grid", start: "top 85%" }
    });
});