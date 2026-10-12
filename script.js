/* =========================================================
   MARATHA SERVICES
   Landing Page Interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const scrollTop = document.getElementById("scrollTop");

    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */
    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    /* =====================================================
       SCROLL TO TOP
    ===================================================== */
    function updateScrollTop() {
        if (!scrollTop) return;
        if (window.scrollY > 500) {
            scrollTop.classList.add("show");
        } else {
            scrollTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", updateScrollTop, { passive: true });
    updateScrollTop();

    if (scrollTop) {
        scrollTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const position = target.offsetTop - navbarHeight - 10;

            window.scrollTo({ top: position, behavior: "smooth" });
        });
    });

    /* =====================================================
       FAQ ACCORDION
    ===================================================== */
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.setAttribute("aria-expanded", "false");

        question.addEventListener("click", () => {
            const open = item.classList.contains("active");

            faqItems.forEach(other => {
                other.classList.remove("active");

                const otherAnswer = other.querySelector(".faq-answer");
                const otherButton = other.querySelector(".faq-question");

                if (otherAnswer) otherAnswer.style.maxHeight = null;
                if (otherButton) otherButton.setAttribute("aria-expanded", "false");
            });

            if (!open) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */
    const revealElements = document.querySelectorAll(
        ".section-heading," +
        ".about-content," +
        ".info-card," +
        ".service-card," +
        ".why-card," +
        ".process-card," +
        ".faq-item," +
        ".cta-box," +
        ".hero-poster"
    );

    revealElements.forEach(el => {
        el.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(el => {
            el.classList.add("visible");
        });
    }

    /* =====================================================
       FAQ RESIZE FIX
    ===================================================== */
    window.addEventListener("resize", () => {
        const active = document.querySelector(".faq-item.active .faq-answer");
        if (active) {
            active.style.maxHeight = active.scrollHeight + "px";
        }
    });

});
