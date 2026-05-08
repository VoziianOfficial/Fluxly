"use strict";



document.addEventListener("DOMContentLoaded", () => {
    applyServicePageConfig();

    initServiceHeroMotion();
    initServicePanelMotion();
    initServiceStatus();
    initServiceContextMotion();
    initServiceEvaluationMotion();
    initServicePreparationMotion();
    initServiceFlowMotion();
    initServiceCtaMotion();

    if (window.FLUXLY && typeof window.FLUXLY.refreshIcons === "function") {
        window.FLUXLY.refreshIcons();
    }
});



function getCurrentFilename() {
    try {
        const path = window.location.pathname || "";
        const filename = path.split("/").filter(Boolean).pop();
        return filename || "index.html";
    } catch (error) {
        return "index.html";
    }
}

function applyServicePageConfig() {
    const config = window.SITE_CONFIG;
    if (!config || !Array.isArray(config.services)) {
        console.warn("Missing SITE_CONFIG.services for service page rendering.");
        return;
    }

    const filename = getCurrentFilename();
    const service = config.services.find((entry) => entry && entry.href === filename) ||
        config.services.find((entry) => entry && `${entry.id}.html` === filename);

    if (!service) {
        console.warn(`Missing service config for ${filename}`);
        return;
    }

    applyServiceHero(service);
    applyServiceContext(service);
    applyServiceEvaluation(service);
    applyServicePreparation(service);
    applyServiceFlow(service);
    applyServiceCta(service);
}

function setText(target, text) {
    if (!target) return;
    target.textContent = text == null ? "" : String(text);
}

function applyServiceHero(service) {
    const kicker = document.querySelector("[data-service-hero-kicker]") || document.querySelector(".service-hero-copy .kicker");
    if (kicker) {
        const kickerText = service.heroKicker || (service.kicker ? `⚡ ${service.kicker}` : "⚡ Service matching");
        kicker.textContent = kickerText;
    }

    setText(document.querySelector("[data-service-hero-title]") || document.getElementById("serviceHeroTitle"), service.heroTitle);
    setText(
        document.querySelector("[data-service-hero-text]") || document.querySelector(".service-hero-copy .lead"),
        service.heroText || service.pageIntro
    );

    const heroImg = document.querySelector("[data-service-hero-image]") || document.querySelector(".service-hero-media img");
    if (heroImg && service.image) {
        heroImg.src = service.image;
        heroImg.alt = service.title ? `${service.title} hero image` : "";
    }

    const heroIcon = document.querySelector("[data-service-hero-icon]") || document.querySelector(".service-panel-icon i[data-lucide]");
    if (heroIcon && service.icon) {
        heroIcon.setAttribute("data-lucide", service.icon);
    }
}

function applyServiceContext(service) {
    setText(document.querySelector("[data-service-context-title]") || document.getElementById("serviceContextTitle"), service.contextTitle);
    setText(document.querySelector("[data-service-context-text]"), service.contextText);

    const pointsMount = document.querySelector("[data-service-context-points]");
    if (pointsMount) {
        const points = Array.isArray(service.contextPoints) ? service.contextPoints : [];
        pointsMount.innerHTML = points
            .map((point) => (typeof point === "string" ? point : point && point.text))
            .filter(Boolean)
            .map((point) => `<li>${escapeHtml(point)}</li>`)
            .join("");
    }

    const detailImg = document.querySelector("[data-service-detail-image]") || document.querySelector(".service-context-photo img");
    if (detailImg && service.detailImage) {
        detailImg.src = service.detailImage;
        detailImg.alt = service.title ? `${service.title} detail image` : detailImg.alt;
    }
}

function applyServiceEvaluation(service) {
    setText(document.querySelector("[data-service-evaluation-title]") || document.getElementById("serviceEvaluationTitle"), service.evaluationTitle);
    setText(document.querySelector("[data-service-evaluation-intro]"), service.evaluationIntro);

    const mount = document.querySelector("[data-service-evaluation-items]");
    if (!mount) return;

    mount.querySelectorAll(".evaluation-item").forEach((node) => node.remove());

    const items = Array.isArray(service.evaluationPoints) ? service.evaluationPoints : [];
    const html = items
        .map((item, index) => {
            if (typeof item === "string") {
                return `
                    <button class="evaluation-item${index % 2 === 0 ? " is-on" : ""}" type="button">
                        <span class="evaluation-light"></span>
                        <strong>${escapeHtml(item)}</strong>
                        <em>Confirm this detail directly with each provider.</em>
                    </button>
                `;
            }

            const title = item && item.title ? item.title : "";
            const text = item && item.text ? item.text : "";
            const isOn = item && typeof item.isOn === "boolean" ? item.isOn : index % 2 === 0;

            return `
                <button class="evaluation-item${isOn ? " is-on" : ""}" type="button">
                    <span class="evaluation-light"></span>
                    <strong>${escapeHtml(title)}</strong>
                    <em>${escapeHtml(text)}</em>
                </button>
            `;
        })
        .join("");

    mount.insertAdjacentHTML("beforeend", html);
}

function applyServicePreparation(service) {
    setText(document.querySelector("[data-service-prep-title]") || document.getElementById("servicePreparationTitle"), service.prepTitle);
    setText(document.querySelector("[data-service-prep-intro]"), service.prepIntro);

    const mount = document.querySelector("[data-service-prep-items]");
    if (!mount) return;

    const items = Array.isArray(service.prepItems) ? service.prepItems : [];
    mount.innerHTML = items
        .map((item) => {
            if (typeof item === "string") {
                return `
                    <div class="prep-item">
                        <span>⚡</span>
                        <strong>${escapeHtml(item)}</strong>
                        <p></p>
                    </div>
                `;
            }

            const icon = item && item.icon ? item.icon : "⚡";
            const title = item && item.title ? item.title : "";
            const text = item && item.text ? item.text : "";

            return `
                <div class="prep-item">
                    <span>${escapeHtml(icon)}</span>
                    <strong>${escapeHtml(title)}</strong>
                    <p>${escapeHtml(text)}</p>
                </div>
            `;
        })
        .join("");
}

function applyServiceFlow(service) {
    setText(document.querySelector("[data-service-flow-title]") || document.getElementById("serviceFlowTitle"), service.flowTitle);
    setText(document.querySelector("[data-service-flow-intro]"), service.flowIntro);

    const mount = document.querySelector("[data-service-flow-steps]");
    if (!mount) return;

    mount.querySelectorAll(".service-flow-step").forEach((node) => node.remove());

    const steps = Array.isArray(service.flowSteps) ? service.flowSteps : [];
    const html = steps
        .map((step, index) => {
            if (typeof step === "string") {
                return `
                    <article class="service-flow-step">
                        <span>${String(index + 1).padStart(2, "0")}</span>
                        <i data-lucide="workflow" aria-hidden="true"></i>
                        <strong>${escapeHtml(step)}</strong>
                        <p></p>
                    </article>
                `;
            }

            const icon = step && step.icon ? step.icon : "workflow";
            const title = step && step.title ? step.title : "";
            const text = step && step.text ? step.text : "";

            return `
                <article class="service-flow-step">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <i data-lucide="${escapeHtml(icon)}" aria-hidden="true"></i>
                    <strong>${escapeHtml(title)}</strong>
                    <p>${escapeHtml(text)}</p>
                </article>
            `;
        })
        .join("");

    mount.insertAdjacentHTML("beforeend", html);
}

function applyServiceCta(service) {
    setText(document.querySelector("[data-service-cta-title]") || document.getElementById("serviceCtaTitle"), service.ctaTitle);
    setText(document.querySelector("[data-service-cta-text]"), service.ctaText);
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

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



function initServiceHeroMotion() {
    const hero = document.querySelector(".service-hero-live");
    const image = document.querySelector(".service-hero-media img");
    const overlay = document.querySelector(".service-hero-overlay");
    const glow = document.querySelector(".service-hero-glow");

    const lineOne = document.querySelector(".service-hero-line-one");
    const lineTwo = document.querySelector(".service-hero-line-two");
    const lineThree = document.querySelector(".service-hero-line-three");

    const sparkOne = document.querySelector(".service-spark-one");
    const sparkTwo = document.querySelector(".service-spark-two");
    const sparkThree = document.querySelector(".service-spark-three");

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



function initServicePanelMotion() {
    const hero = document.querySelector(".service-hero-live");
    const panel = document.querySelector(".service-live-panel");
    const icon = document.querySelector(".service-panel-icon");
    const lines = document.querySelectorAll(".service-panel-lines span");

    if (!hero || !panel) return;

    hero.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, hero);

        panel.style.transform = `translate3d(${x * 12}px, ${y * 9}px, 0)`;

        if (icon) {
            icon.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`;
        }

        lines.forEach((line, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            line.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    hero.addEventListener("pointerleave", () => {
        clearTransforms([panel, icon, ...lines]);
    });

    addElectricHover(lines);
}



function initServiceStatus() {
    const strip = document.querySelector(".service-status-line");
    const items = document.querySelectorAll(".service-status-line span");

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



function initServiceContextMotion() {
    const section = document.querySelector(".service-context");
    const photo = document.querySelector(".service-context-photo");
    const image = document.querySelector(".service-context-photo img");
    const glow = document.querySelector(".service-context-glow");
    const note = document.querySelector(".service-context-note");

    const lineOne = document.querySelector(".service-context-line-one");
    const lineTwo = document.querySelector(".service-context-line-two");

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



function initServiceEvaluationMotion() {
    const section = document.querySelector(".service-evaluation");
    const board = document.querySelector(".evaluation-switchboard");
    const items = document.querySelectorAll(".evaluation-item");

    const lineOne = document.querySelector(".evaluation-current-one");
    const lineTwo = document.querySelector(".evaluation-current-two");

    if (!section || !board || !items.length) return;

    items.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.toggle("is-on");
        });

        item.addEventListener("pointerenter", () => {
            item.classList.add("is-current-active");
        });

        item.addEventListener("pointerleave", () => {
            item.classList.remove("is-current-active");
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

        items.forEach((item, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            item.style.transform = `translate3d(${x * 3 * direction}px, ${y * 2 * direction}px, 0)`;
        });
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([board, lineOne, ...items]);

        if (lineTwo) {
            lineTwo.style.transform = "rotate(-3deg)";
        }
    });
}



function initServicePreparationMotion() {
    const section = document.querySelector(".service-preparation");
    const image = document.querySelector(".service-preparation-bg img");
    const stack = document.querySelector(".prep-stack");
    const items = document.querySelectorAll(".prep-item");

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



function initServiceFlowMotion() {
    const section = document.querySelector(".service-matching-flow");
    const rail = document.querySelector(".service-flow-rail");
    const current = document.querySelector(".service-flow-current");
    const steps = document.querySelectorAll(".service-flow-step");

    if (!section || !rail || !steps.length) return;

    addElectricHover(steps);

    section.addEventListener("pointermove", (event) => {
        if (!canUseMotion()) return;

        const { x, y } = getPointerRatio(event, section);

        rail.style.transform = `translate3d(${x * -6}px, ${y * -5}px, 0)`;

        if (current) {
            current.style.transform = `translate3d(${x * 8}px, ${y * 5}px, 0)`;
        }

        steps.forEach((step, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            step.style.transform = `translate3d(${x * 4 * direction}px, ${y * 3 * direction}px, 0)`;
        });
    });

    section.addEventListener("pointerleave", () => {
        clearTransforms([rail, current, ...steps]);
    });
}



function initServiceCtaMotion() {
    const cta = document.querySelector(".service-cta-shell");
    const image = document.querySelector(".service-cta-shell > img");
    const overlay = document.querySelector(".service-cta-overlay");
    const glow = document.querySelector(".service-cta-glow");

    const lineOne = document.querySelector(".service-cta-line-one");
    const lineTwo = document.querySelector(".service-cta-line-two");

    const sparkOne = document.querySelector(".service-cta-spark-one");
    const sparkTwo = document.querySelector(".service-cta-spark-two");

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
