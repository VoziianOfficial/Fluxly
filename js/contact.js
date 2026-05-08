"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initContactHeroMotion();
    initContactPanelMotion();
    initContactStatus();
    initRequestSectionMotion();
    initContactInfoPanel();
    initContactMapMotion();
    initContactChecklistMotion();
    initContactCtaMotion();

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



function initContactHeroMotion() {
    const hero = document.querySelector(".contact-hero-live");
    const image = document.querySelector(".contact-hero-media img");
    const overlay = document.querySelector(".contact-hero-overlay");
    const glow = document.querySelector(".contact-hero-glow");

    const lineOne = document.querySelector(".contact-hero-line-one");
    const lineTwo = document.querySelector(".contact-hero-line-two");
    const lineThree = document.querySelector(".contact-hero-line-three");

    const sparkOne = document.querySelector(".contact-spark-one");
    const sparkTwo = document.querySelector(".contact-spark-two");
    const sparkThree = document.querySelector(".contact-spark-three");

    if (!hero) return;

    hero.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, hero);

        if (image) {
            image.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0) scale(1.04)`;
        }

        if (overlay) {
            overlay.style.transform = `translate3d(${x * 12}px, ${y * 9}px, 0)`;
        }

        if (glow) {
            glow.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0) scale(1.04)`;
        }

        if (lineOne) {
            lineOne.style.transform = `translate3d(${x * 8}px, ${y * 5}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `rotate(-7deg) translate3d(${x * -7}px, ${y * 6}px, 0)`;
        }

        if (lineThree) {
            lineThree.style.transform = `rotate(11deg) translate3d(${x * 7}px, ${y * -6}px, 0)`;
        }

        if (sparkOne) {
            sparkOne.style.transform = `translate3d(${x * 22}px, ${y * 16}px, 0)`;
        }

        if (sparkTwo) {
            sparkTwo.style.transform = `translate3d(${x * -18}px, ${y * -14}px, 0)`;
        }

        if (sparkThree) {
            sparkThree.style.transform = `translate3d(${x * 15}px, ${y * -17}px, 0)`;
        }
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([image, overlay, glow, lineOne, sparkOne, sparkTwo, sparkThree]);

        if (lineTwo) {
            lineTwo.style.transform = "rotate(-7deg)";
        }

        if (lineThree) {
            lineThree.style.transform = "rotate(11deg)";
        }
    });
}



function initContactPanelMotion() {
    const hero = document.querySelector(".contact-hero-live");
    const panel = document.querySelector(".contact-live-panel");
    const bulb = document.querySelector(".contact-panel-bulb");
    const lines = document.querySelectorAll(".contact-panel-lines span");

    if (!hero || !panel) return;

    hero.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, hero);

        panel.style.transform = `translate3d(${x * 12}px, ${y * 9}px, 0)`;

        if (bulb) {
            bulb.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`;
        }

        lines.forEach((line, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            line.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([panel, bulb, ...lines]);
    });

    addElectricHover(lines);
}



function initContactStatus() {
    const strip = document.querySelector(".contact-status-line");
    const items = document.querySelectorAll(".contact-status-line span");

    if (!strip || !items.length) return;

    items.forEach((item) => {
        item.addEventListener("pointerenter", () => {
            item.classList.add("is-current-active");
            strip.classList.add("is-strip-active");
        });

        item.addEventListener("pointerleave", () => {
            item.classList.remove("is-current-active");
            strip.classList.remove("is-strip-active");
        });
    });
}



function initRequestSectionMotion() {
    const section = document.querySelector(".contact-request");
    const formShell = document.querySelector(".request-form-shell");
    const infoPanel = document.querySelector(".contact-info-panel");
    const fields = document.querySelectorAll(".form-field input, .form-field select, .form-field textarea");

    if (!section) return;

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        if (formShell) {
            formShell.style.transform = `translate3d(${x * -4}px, ${y * -3}px, 0)`;
        }

        if (infoPanel) {
            infoPanel.style.transform = `translate3d(${x * 5}px, ${y * 4}px, 0)`;
        }
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([formShell, infoPanel]);
    });

    fields.forEach((field) => {
        field.addEventListener("focus", () => {
            const wrapper = field.closest(".form-field");
            if (wrapper) {
                wrapper.classList.add("is-current-active");
            }
        });

        field.addEventListener("blur", () => {
            const wrapper = field.closest(".form-field");
            if (wrapper) {
                wrapper.classList.remove("is-current-active");
            }
        });
    });
}



function initContactInfoPanel() {
    const panel = document.querySelector(".contact-info-panel");
    const light = document.querySelector(".info-panel-light");
    const items = document.querySelectorAll(".contact-info-list a, .contact-info-list > span");

    if (!panel) return;

    panel.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, panel);

        if (light) {
            light.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;
        }

        items.forEach((item, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            item.style.transform = `translate3d(${x * 3 * direction}px, ${y * 2 * direction}px, 0)`;
        });
    });

    panel.addEventListener("pointerleave", () => {
        clearTransforms([light, ...items]);
    });

    addElectricHover(items);
}



function initContactMapMotion() {
    const section = document.querySelector(".contact-map-section");
    const visual = document.querySelector(".contact-map-visual");
    const image = document.querySelector(".contact-map-visual img");
    const overlay = document.querySelector(".map-overlay");
    const caption = document.querySelector(".map-caption");

    const lineOne = document.querySelector(".map-line-one");
    const lineTwo = document.querySelector(".map-line-two");
    const lineThree = document.querySelector(".map-line-three");

    const nodeOne = document.querySelector(".map-node-one");
    const nodeTwo = document.querySelector(".map-node-two");
    const nodeThree = document.querySelector(".map-node-three");

    if (!section || !visual) return;

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        visual.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;

        if (image) {
            image.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0) scale(1.035)`;
        }

        if (overlay) {
            overlay.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
        }

        if (caption) {
            caption.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
        }

        if (lineOne) {
            lineOne.style.transform = `rotate(-8deg) translate3d(${x * 7}px, ${y * 5}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `rotate(7deg) translate3d(${x * -7}px, ${y * -5}px, 0)`;
        }

        if (lineThree) {
            lineThree.style.transform = `rotate(-3deg) translate3d(${x * 7}px, ${y * -5}px, 0)`;
        }

        if (nodeOne) {
            nodeOne.style.transform = `translate3d(${x * 13}px, ${y * 10}px, 0)`;
        }

        if (nodeTwo) {
            nodeTwo.style.transform = `translate3d(${x * -13}px, ${y * -10}px, 0)`;
        }

        if (nodeThree) {
            nodeThree.style.transform = `translate3d(${x * 10}px, ${y * -12}px, 0)`;
        }
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([visual, image, overlay, caption, nodeOne, nodeTwo, nodeThree]);

        if (lineOne) {
            lineOne.style.transform = "rotate(-8deg)";
        }

        if (lineTwo) {
            lineTwo.style.transform = "rotate(7deg)";
        }

        if (lineThree) {
            lineThree.style.transform = "rotate(-3deg)";
        }
    });
}



function initContactChecklistMotion() {
    const section = document.querySelector(".contact-checklist");
    const image = document.querySelector(".contact-checklist-bg img");
    const stack = document.querySelector(".contact-check-stack");
    const items = document.querySelectorAll(".contact-check-item");

    if (!section || !items.length) return;

    addElectricHover(items);

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        if (image) {
            image.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0) scale(1.03)`;
        }

        if (stack) {
            stack.style.transform = `translate3d(${x * -7}px, ${y * -5}px, 0)`;
        }

        items.forEach((item, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            item.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([image, stack, ...items]);
    });
}



function initContactCtaMotion() {
    const cta = document.querySelector(".contact-cta-shell");
    const image = document.querySelector(".contact-cta-shell > img");
    const overlay = document.querySelector(".contact-cta-overlay");
    const glow = document.querySelector(".contact-cta-glow");

    const lineOne = document.querySelector(".contact-cta-line-one");
    const lineTwo = document.querySelector(".contact-cta-line-two");

    const sparkOne = document.querySelector(".contact-cta-spark-one");
    const sparkTwo = document.querySelector(".contact-cta-spark-two");

    if (!cta) return;

    cta.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, cta);

        if (image) {
            image.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0) scale(1.035)`;
        }

        if (overlay) {
            overlay.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
        }

        if (glow) {
            glow.style.transform = `translate3d(${x * 15}px, ${y * 10}px, 0)`;
        }

        if (lineOne) {
            lineOne.style.transform = `rotate(-8deg) translate3d(${x * 8}px, ${y * 6}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `rotate(11deg) translate3d(${x * -8}px, ${y * -6}px, 0)`;
        }

        if (sparkOne) {
            sparkOne.style.transform = `translate3d(${x * 14}px, ${y * 12}px, 0)`;
        }

        if (sparkTwo) {
            sparkTwo.style.transform = `translate3d(${x * -14}px, ${y * -12}px, 0)`;
        }
    });

    cta.addEventListener("pointerleave", () => {
        clearTransforms([image, overlay, glow, sparkOne, sparkTwo]);

        if (lineOne) {
            lineOne.style.transform = "rotate(-8deg)";
        }

        if (lineTwo) {
            lineTwo.style.transform = "rotate(11deg)";
        }
    });
}