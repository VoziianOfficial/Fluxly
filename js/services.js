"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initServicesHeroMotion();
    initServicesMeterMotion();
    initServicesStatus();
    initServiceCircuitMotion();
    initServicesFlowRail();
    initServicesChecklistMotion();
    initServicesCtaMotion();

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



function initServicesHeroMotion() {
    const hero = document.querySelector(".services-hero-live");
    const image = document.querySelector(".services-hero-media img");
    const overlay = document.querySelector(".services-hero-overlay");
    const glow = document.querySelector(".services-hero-glow");

    const lineOne = document.querySelector(".services-hero-line-one");
    const lineTwo = document.querySelector(".services-hero-line-two");
    const lineThree = document.querySelector(".services-hero-line-three");

    const sparkOne = document.querySelector(".services-spark-one");
    const sparkTwo = document.querySelector(".services-spark-two");
    const sparkThree = document.querySelector(".services-spark-three");

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



function initServicesMeterMotion() {
    const hero = document.querySelector(".services-hero-live");
    const meter = document.querySelector(".services-live-meter");
    const bulb = document.querySelector(".services-meter-bulb");
    const lines = document.querySelectorAll(".services-meter-lines span");

    if (!hero || !meter) return;

    hero.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, hero);

        meter.style.transform = `translate3d(${x * 12}px, ${y * 9}px, 0)`;

        if (bulb) {
            bulb.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`;
        }

        lines.forEach((line, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            line.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([meter, bulb, ...lines]);
    });

    addElectricHover(lines);
}



function initServicesStatus() {
    const strip = document.querySelector(".services-status-line");
    const items = document.querySelectorAll(".services-status-line span");

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



function initServiceCircuitMotion() {
    const board = document.querySelector(".service-circuit-board");
    const routes = document.querySelectorAll(".service-circuit-route");

    if (!board || !routes.length) return;

    addElectricHover(routes);

    routes.forEach((route) => {
        const image = route.querySelector("img");
        const icon = route.querySelector(".route-icon");
        const current = route.querySelector(".route-current");

        route.addEventListener("pointermove", (event) => {
            if (!canUseMotion()) return;

            const { x, y } = getPointerRatio(event, route);

            route.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
            route.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);

            if (image) {
                image.style.transform = `translate3d(${x * 9}px, ${y * 7}px, 0) scale(1.05)`;
            }

            if (icon) {
                icon.style.transform = `translate3d(${x * -5}px, ${y * -5}px, 0)`;
            }

            if (current) {
                current.style.transform = `translate3d(${x * 7}px, ${y * 4}px, 0)`;
            }
        });

        route.addEventListener("pointerleave", () => {
            clearTransforms([image, icon, current]);
        });
    });
}



function initServicesFlowRail() {
    const section = document.querySelector(".services-flow");
    const rail = document.querySelector(".services-flow-rail");
    const items = document.querySelectorAll(".services-flow-rail article");
    const current = document.querySelector(".flow-rail-current");

    if (!section || !rail || !items.length) return;

    addElectricHover(items);

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        rail.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;

        if (current) {
            current.style.transform = `translate3d(${x * 8}px, ${y * 5}px, 0)`;
        }

        items.forEach((item, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            item.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([rail, current, ...items]);
    });
}



function initServicesChecklistMotion() {
    const section = document.querySelector(".services-checklist");
    const image = document.querySelector(".services-checklist-bg img");
    const stack = document.querySelector(".services-check-stack");
    const items = document.querySelectorAll(".check-stack-item");

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



function initServicesCtaMotion() {
    const cta = document.querySelector(".services-cta-shell");
    const image = document.querySelector(".services-cta-shell > img");
    const overlay = document.querySelector(".services-cta-overlay");
    const glow = document.querySelector(".services-cta-glow");

    const lineOne = document.querySelector(".services-cta-line-one");
    const lineTwo = document.querySelector(".services-cta-line-two");

    const sparkOne = document.querySelector(".services-cta-spark-one");
    const sparkTwo = document.querySelector(".services-cta-spark-two");

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