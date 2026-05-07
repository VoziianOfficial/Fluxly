"use strict";

/* ==========================================================
   FLUXLY — HOME PAGE / PREMIUM ELECTRIC LAMP REBUILD
   File: /js/home.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initLiveHeroMotion();
    initPowerPanelMotion();
    initCurrentStatus();
    initLampWallMotion();
    initElectricianSplitMotion();
    initLiveSwitchboard();
    initCurrentPhotoMotion();
    initPlatformLightMotion();
    initLampCtaMotion();

    if (window.FLUXLY && typeof window.FLUXLY.refreshIcons === "function") {
        window.FLUXLY.refreshIcons();
    }
});

/* =========================
   HELPERS
   ========================= */

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

/* =========================
   LIVE HERO MOTION
   ========================= */

function initLiveHeroMotion() {
    const hero = document.querySelector(".home-live-hero");
    const image = document.querySelector(".live-hero-media img");
    const overlay = document.querySelector(".live-hero-overlay");
    const warmLight = document.querySelector(".live-hero-warm-light");

    const wireOne = document.querySelector(".live-wire-one");
    const wireTwo = document.querySelector(".live-wire-two");
    const wireThree = document.querySelector(".live-wire-three");
    const wireFour = document.querySelector(".live-wire-four");

    const sparkOne = document.querySelector(".live-spark-one");
    const sparkTwo = document.querySelector(".live-spark-two");
    const sparkThree = document.querySelector(".live-spark-three");
    const sparkFour = document.querySelector(".live-spark-four");

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

        if (warmLight) {
            warmLight.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0) scale(1.04)`;
        }

        if (wireOne) {
            wireOne.style.transform = `translate3d(${x * 8}px, ${y * 5}px, 0)`;
        }

        if (wireTwo) {
            wireTwo.style.transform = `rotate(-7deg) translate3d(${x * -7}px, ${y * 6}px, 0)`;
        }

        if (wireThree) {
            wireThree.style.transform = `rotate(11deg) translate3d(${x * 7}px, ${y * -6}px, 0)`;
        }

        if (wireFour) {
            wireFour.style.transform = `rotate(-4deg) translate3d(${x * -7}px, ${y * -5}px, 0)`;
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

        if (sparkFour) {
            sparkFour.style.transform = `translate3d(${x * -14}px, ${y * 12}px, 0)`;
        }
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([image, overlay, warmLight, wireOne, sparkOne, sparkTwo, sparkThree, sparkFour]);

        if (wireTwo) {
            wireTwo.style.transform = "rotate(-7deg)";
        }

        if (wireThree) {
            wireThree.style.transform = "rotate(11deg)";
        }

        if (wireFour) {
            wireFour.style.transform = "rotate(-4deg)";
        }
    });
}

/* =========================
   HERO POWER PANEL
   ========================= */

function initPowerPanelMotion() {
    const hero = document.querySelector(".home-live-hero");
    const panel = document.querySelector(".live-power-panel");
    const bulb = document.querySelector(".power-bulb");
    const nodes = document.querySelectorAll(".power-panel-flow article");

    if (!hero || !panel) return;

    hero.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, hero);

        panel.style.transform = `translate3d(${x * 12}px, ${y * 9}px, 0)`;

        if (bulb) {
            bulb.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`;
        }

        nodes.forEach((node, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            node.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([panel, bulb, ...nodes]);
    });

    addElectricHover(nodes);
}

/* =========================
   CURRENT STATUS
   ========================= */

function initCurrentStatus() {
    const strip = document.querySelector(".current-status-line");
    const items = document.querySelectorAll(".current-status-line span");

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

/* =========================
   SERVICE LAMP WALL
   ========================= */

function initLampWallMotion() {
    const wall = document.querySelector(".lamp-wall");
    const routes = document.querySelectorAll(".lamp-route");

    if (!wall || !routes.length) return;

    addElectricHover(routes);

    routes.forEach((route) => {
        const image = route.querySelector("img");
        const icon = route.querySelector(".lamp-route-icon");
        const line = route.querySelector(".lamp-route-line");

        route.addEventListener("pointermove", (event) => {
            if (!canUseMotion()) return;

            const { x, y } = getPointerRatio(event, route);

            if (image) {
                image.style.transform = `translate3d(${x * 9}px, ${y * 7}px, 0) scale(1.05)`;
            }

            if (icon) {
                icon.style.transform = `translate3d(${x * -5}px, ${y * -5}px, 0)`;
            }

            if (line) {
                line.style.transform = `translate3d(${x * 7}px, ${y * 4}px, 0)`;
            }
        });

        route.addEventListener("pointerleave", () => {
            clearTransforms([image, icon, line]);
        });
    });
}

/* =========================
   ELECTRICIAN SPLIT
   ========================= */

function initElectricianSplitMotion() {
    const section = document.querySelector(".home-electrician-split");
    const photo = document.querySelector(".electrician-photo");
    const image = document.querySelector(".electrician-photo img");
    const glow = document.querySelector(".electrician-photo-glow");
    const badge = document.querySelector(".electrician-photo-badge");

    const lineOne = document.querySelector(".electrician-photo-line-one");
    const lineTwo = document.querySelector(".electrician-photo-line-two");
    const chips = document.querySelectorAll(".electric-checkline span");

    if (!section || !photo) return;

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        photo.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;

        if (image) {
            image.style.transform = `translate3d(${x * 9}px, ${y * 7}px, 0) scale(1.035)`;
        }

        if (glow) {
            glow.style.transform = `translate3d(${x * 16}px, ${y * 12}px, 0)`;
        }

        if (badge) {
            badge.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
        }

        if (lineOne) {
            lineOne.style.transform = `rotate(-10deg) translate3d(${x * 7}px, ${y * 5}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `rotate(9deg) translate3d(${x * -7}px, ${y * -5}px, 0)`;
        }
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([photo, image, glow, badge]);

        if (lineOne) {
            lineOne.style.transform = "rotate(-10deg)";
        }

        if (lineTwo) {
            lineTwo.style.transform = "rotate(9deg)";
        }
    });

    addElectricHover(chips);
}

/* =========================
   LIVE SWITCHBOARD
   ========================= */

function initLiveSwitchboard() {
    const section = document.querySelector(".home-live-switch");
    const board = document.querySelector(".live-switchboard");
    const toggles = document.querySelectorAll(".switch-toggle");

    const lineOne = document.querySelector(".switchboard-current-one");
    const lineTwo = document.querySelector(".switchboard-current-two");

    if (!section || !board || !toggles.length) return;

    toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("is-on");
        });

        toggle.addEventListener("pointerenter", () => {
            toggle.classList.add("is-current-active");
        });

        toggle.addEventListener("pointerleave", () => {
            toggle.classList.remove("is-current-active");
        });
    });

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        board.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;

        if (lineOne) {
            lineOne.style.transform = `translate3d(${x * 7}px, ${y * 4}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `rotate(-3deg) translate3d(${x * -7}px, ${y * -4}px, 0)`;
        }

        toggles.forEach((toggle, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            toggle.style.transform = `translate3d(${x * 3 * direction}px, ${y * 2 * direction}px, 0)`;
        });
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([board, lineOne, ...toggles]);

        if (lineTwo) {
            lineTwo.style.transform = "rotate(-3deg)";
        }
    });
}

/* =========================
   CURRENT PHOTO STRIP
   ========================= */

function initCurrentPhotoMotion() {
    const section = document.querySelector(".home-current-photo");
    const image = document.querySelector(".current-photo-bg img");
    const signalList = document.querySelector(".signal-list");
    const items = document.querySelectorAll(".signal-item");

    if (!section || !items.length) return;

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        if (image) {
            image.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0) scale(1.03)`;
        }

        if (signalList) {
            signalList.style.transform = `translate3d(${x * -7}px, ${y * -5}px, 0)`;
        }

        items.forEach((item, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            item.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([image, signalList, ...items]);
    });

    addElectricHover(items);
}

/* =========================
   PLATFORM LIGHT
   ========================= */

function initPlatformLightMotion() {
    const section = document.querySelector(".home-platform-light");
    const symbol = document.querySelector(".platform-light-symbol");
    const bulb = document.querySelector(".platform-light-symbol i, .platform-light-symbol svg");
    const glow = document.querySelector(".platform-bulb-glow");

    const lineOne = document.querySelector(".platform-line-one");
    const lineTwo = document.querySelector(".platform-line-two");
    const statements = document.querySelectorAll(".platform-light-statements span");

    if (!section || !symbol) return;

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        symbol.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;

        if (bulb) {
            bulb.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
        }

        if (glow) {
            glow.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0)`;
        }

        if (lineOne) {
            lineOne.style.transform = `translate3d(${x * 8}px, ${y * 5}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `translate3d(${x * -8}px, ${y * -5}px, 0)`;
        }
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([symbol, bulb, glow, lineOne, lineTwo]);
    });

    addElectricHover(statements);
}

/* =========================
   FINAL LAMP CTA
   ========================= */

function initLampCtaMotion() {
    const cta = document.querySelector(".lamp-cta-shell");
    const image = document.querySelector(".lamp-cta-shell > img");
    const overlay = document.querySelector(".lamp-cta-overlay");
    const light = document.querySelector(".lamp-cta-light");

    const lineOne = document.querySelector(".lamp-cta-line-one");
    const lineTwo = document.querySelector(".lamp-cta-line-two");

    const sparkOne = document.querySelector(".lamp-cta-spark-one");
    const sparkTwo = document.querySelector(".lamp-cta-spark-two");

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

        if (light) {
            light.style.transform = `translate3d(${x * 15}px, ${y * 10}px, 0)`;
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
        clearTransforms([image, overlay, light, sparkOne, sparkTwo]);

        if (lineOne) {
            lineOne.style.transform = "rotate(-8deg)";
        }

        if (lineTwo) {
            lineTwo.style.transform = "rotate(11deg)";
        }
    });
}