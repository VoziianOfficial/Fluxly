"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initAboutHeroMotion();
    initIdentityPanelMotion();
    initAboutStatus();
    initStoryMotion();
    initAboutCurrentRows();
    initNotContractorMotion();
    initVerificationMotion();
    initAboutCtaMotion();

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



function initAboutHeroMotion() {
    const hero = document.querySelector(".about-hero-live");
    const image = document.querySelector(".about-hero-media img");
    const overlay = document.querySelector(".about-hero-overlay");
    const glow = document.querySelector(".about-hero-glow");

    const lineOne = document.querySelector(".about-hero-line-one");
    const lineTwo = document.querySelector(".about-hero-line-two");
    const lineThree = document.querySelector(".about-hero-line-three");

    const sparkOne = document.querySelector(".about-spark-one");
    const sparkTwo = document.querySelector(".about-spark-two");
    const sparkThree = document.querySelector(".about-spark-three");

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



function initIdentityPanelMotion() {
    const hero = document.querySelector(".about-hero-live");
    const panel = document.querySelector(".about-identity-panel");
    const bulb = document.querySelector(".identity-bulb");
    const lines = document.querySelectorAll(".identity-lines span");

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



function initAboutStatus() {
    const strip = document.querySelector(".about-status-line");
    const items = document.querySelectorAll(".about-status-line span");

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



function initStoryMotion() {
    const section = document.querySelector(".about-story");
    const photo = document.querySelector(".about-story-photo");
    const image = document.querySelector(".about-story-photo img");
    const glow = document.querySelector(".about-story-glow");
    const note = document.querySelector(".story-photo-note");

    const lineOne = document.querySelector(".about-story-line-one");
    const lineTwo = document.querySelector(".about-story-line-two");

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

        if (note) {
            note.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
        }

        if (lineOne) {
            lineOne.style.transform = `rotate(-10deg) translate3d(${x * 7}px, ${y * 5}px, 0)`;
        }

        if (lineTwo) {
            lineTwo.style.transform = `rotate(9deg) translate3d(${x * -7}px, ${y * -5}px, 0)`;
        }
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([photo, image, glow, note]);

        if (lineOne) {
            lineOne.style.transform = "rotate(-10deg)";
        }

        if (lineTwo) {
            lineTwo.style.transform = "rotate(9deg)";
        }
    });
}



function initAboutCurrentRows() {
    const rows = document.querySelectorAll(".about-current-row");

    if (!rows.length) return;

    addElectricHover(rows);

    rows.forEach((row) => {
        const icon = row.querySelector(".row-icon");

        row.addEventListener("pointermove", (event) => {
            if (!canUseMotion()) return;

            const { x, y } = getPointerRatio(event, row);

            if (icon) {
                icon.style.transform = `translate3d(${x * -5}px, ${y * -5}px, 0)`;
            }
        });

        row.addEventListener("pointerleave", () => {
            clearTransforms([icon]);
        });
    });
}



function initNotContractorMotion() {
    const section = document.querySelector(".about-not-contractor");
    const image = document.querySelector(".about-not-bg img");
    const stack = document.querySelector(".not-contractor-stack");
    const items = document.querySelectorAll(".not-item");

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



function initVerificationMotion() {
    const section = document.querySelector(".about-verification");
    const symbol = document.querySelector(".verification-symbol");
    const icon = document.querySelector(".verification-symbol i, .verification-symbol svg");
    const glow = document.querySelector(".verification-bulb-glow");

    const lineOne = document.querySelector(".verification-line-one");
    const lineTwo = document.querySelector(".verification-line-two");
    const pills = document.querySelectorAll(".verification-pills span");

    if (!section || !symbol) return;

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        symbol.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;

        if (icon) {
            icon.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
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
        clearTransforms([symbol, icon, glow, lineOne, lineTwo]);
    });

    addElectricHover(pills);
}



function initAboutCtaMotion() {
    const cta = document.querySelector(".about-cta-shell");
    const image = document.querySelector(".about-cta-shell > img");
    const overlay = document.querySelector(".about-cta-overlay");
    const glow = document.querySelector(".about-cta-glow");

    const lineOne = document.querySelector(".about-cta-line-one");
    const lineTwo = document.querySelector(".about-cta-line-two");

    const sparkOne = document.querySelector(".about-cta-spark-one");
    const sparkTwo = document.querySelector(".about-cta-spark-two");

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