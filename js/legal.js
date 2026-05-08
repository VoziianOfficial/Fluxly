"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initLegalHeroMotion();
    initLegalPanelMotion();
    initLegalContentMotion();

    if (window.FLUXLY && typeof window.FLUXLY.refreshIcons === "function") {
        window.FLUXLY.refreshIcons();
    }
});



function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canUseMotion() {
    return window.innerWidth >= 1024 && !prefersReducedMotion();
}

function getPointerRatio(event, element) {
    const rect = element.getBoundingClientRect();

    return {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5
    };
}

function clearTransforms(elements) {
    elements.forEach((element) => {
        if (element) {
            element.style.transform = "";
        }
    });
}

function addElectricHover(elements, className = "is-current-active") {
    elements.forEach((element) => {
        element.addEventListener("pointerenter", () => {
            element.classList.add(className);
        });

        element.addEventListener("pointerleave", () => {
            element.classList.remove(className);
        });
    });
}



function initLegalHeroMotion() {
    const hero = document.querySelector(".legal-hero-live");
    const image = document.querySelector(".legal-hero-media img");
    const overlay = document.querySelector(".legal-hero-overlay");
    const glow = document.querySelector(".legal-hero-glow");

    const lineOne = document.querySelector(".legal-hero-line-one");
    const lineTwo = document.querySelector(".legal-hero-line-two");

    const sparkOne = document.querySelector(".legal-spark-one");
    const sparkTwo = document.querySelector(".legal-spark-two");

    if (!hero) return;

    hero.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, hero);

        if (image) {
            image.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0) scale(1.035)`;
        }

        if (overlay) {
            overlay.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
        }

        if (glow) {
            glow.style.transform = `translate3d(${x * 15}px, ${y * 12}px, 0) scale(1.04)`;
        }

        if (lineOne) {
            lineOne.style.transform = `translate3d(${x * 7}px, ${y * 5}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `rotate(-8deg) translate3d(${x * -7}px, ${y * 5}px, 0)`;
        }

        if (sparkOne) {
            sparkOne.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0)`;
        }

        if (sparkTwo) {
            sparkTwo.style.transform = `translate3d(${x * -16}px, ${y * -12}px, 0)`;
        }
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([image, overlay, glow, lineOne, sparkOne, sparkTwo]);

        if (lineTwo) {
            lineTwo.style.transform = "rotate(-8deg)";
        }
    });
}



function initLegalPanelMotion() {
    const hero = document.querySelector(".legal-hero-live");
    const panel = document.querySelector(".legal-summary-panel");
    const icon = document.querySelector(".legal-panel-icon");
    const lines = document.querySelectorAll(".legal-panel-lines span");

    if (!hero || !panel) return;

    hero.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, hero);

        panel.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;

        if (icon) {
            icon.style.transform = `translate3d(${x * -7}px, ${y * -5}px, 0)`;
        }

        lines.forEach((line, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            line.style.transform = `translate3d(${x * 3 * direction}px, ${y * 2 * direction}px, 0)`;
        });
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([panel, icon, ...lines]);
    });

    addElectricHover(lines);
}



function initLegalContentMotion() {
    const section = document.querySelector(".legal-content-section");
    const documentShell = document.querySelector(".legal-document");
    const blocks = document.querySelectorAll(".legal-block");
    const noticeBox = document.querySelector(".legal-notice-box");

    if (!section || !documentShell) return;

    addElectricHover(blocks);

    if (noticeBox) {
        addElectricHover([noticeBox]);
    }

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        documentShell.style.transform = `translate3d(${x * -3}px, ${y * -2}px, 0)`;

        if (noticeBox) {
            noticeBox.style.transform = `translate3d(${x * 4}px, ${y * 3}px, 0)`;
        }

        blocks.forEach((block, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            block.style.transform = `translate3d(${x * 1.2 * direction}px, ${y * 0.8 * direction}px, 0)`;
        });
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([documentShell, noticeBox, ...blocks]);
    });
}