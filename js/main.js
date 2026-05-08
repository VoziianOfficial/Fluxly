"use strict";

/* ==========================================================
   FLUXLY — MAIN SCRIPT / PREMIUM ELECTRIC NAV REBUILD
   File: /js/main.js
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js.");
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
        applyPageMeta();
        renderHeader();
        renderFooter();
        injectConfigValues();
        renderServiceCards();
        renderFaq();
        initMobileMenu();
        initStickyHeader();
        initCookieBanner();
        initFormValidation();
        initRevealAnimations();
        initElectricHoverStates();
        setActiveNavigation();
        refreshIcons();
    });

    /* =========================
       HELPERS
       ========================= */

    function getCurrentFilename() {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf("/") + 1);
        return file || "index.html";
    }

    function normalizeHref(href) {
        if (!href) return "";
        return href.split("#")[0];
    }

    function isCurrentHref(href) {
        return normalizeHref(href) === getCurrentFilename();
    }

    function safeText(value) {
        return value || "";
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function createIcon(name, className = "") {
        const icon = document.createElement("i");
        icon.setAttribute("data-lucide", name);
        icon.setAttribute("aria-hidden", "true");

        if (className) {
            icon.className = className;
        }

        return icon;
    }

    function createLink(href, label, className = "") {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = label;

        if (className) {
            link.className = className;
        }

        return link;
    }

    function getServiceById(id) {
        return config.services.find((service) => service.id === id) || null;
    }

    function getActiveService() {
        const filename = getCurrentFilename();
        return config.services.find((service) => service.href === filename) || null;
    }

    function getServiceIcon(service) {
        const iconMap = {
            "panel-upgrades": "gauge",
            "wiring-rewiring": "cable",
            "ev-charger-installation": "battery-charging",
            "lighting-installation": "lightbulb"
        };

        return iconMap[service.id] || service.icon || "zap";
    }

    function getServiceShortMeta(service) {
        const metaMap = {
            "panel-upgrades": "Panel capacity path",
            "wiring-rewiring": "Circuit route path",
            "ev-charger-installation": "Home charger path",
            "lighting-installation": "Fixture light path"
        };

        return metaMap[service.id] || service.kicker || "Electrical path";
    }

    function setElementText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value || "";
        });
    }

    function setLink(selector, href, label) {
        document.querySelectorAll(selector).forEach((element) => {
            if (href) {
                element.setAttribute("href", href);
            }

            if (label) {
                element.setAttribute("aria-label", label);
            }
        });
    }

    function lockBodyScroll(shouldLock) {
        document.documentElement.classList.toggle("menu-open", shouldLock);
        document.body.classList.toggle("menu-open", shouldLock);
    }

    /* =========================
       CONFIG INJECTION
       ========================= */

    window.injectConfigValues = injectConfigValues;

    function injectConfigValues() {
        setElementText("[data-company-name]", config.companyName);
        setElementText("[data-company-id]", config.companyId);
        setElementText("[data-phone-text]", config.phone);
        setElementText("[data-email-text]", config.email);
        setElementText("[data-address-text]", config.address.full);
        setElementText("[data-footer-text]", config.footerText);
        setElementText("[data-service-area]", config.serviceArea);
        setElementText("[data-disclaimer]", config.disclaimer);
        setElementText("[data-legal-notice]", config.legalNotice);

        setLink("[data-phone-link]", config.phoneHref, config.phoneLabel);
        setLink("[data-email-link]", `mailto:${config.email}`, `Email ${config.companyName}`);

        const mapsQuery = config.address && config.address.full ? encodeURIComponent(config.address.full) : "";
        setLink(
            "[data-map-link]",
            mapsQuery ? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}` : "",
            mapsQuery ? `Open ${config.address.full} in Maps` : ""
        );
    }

    /* =========================
       PAGE META
       ========================= */

    window.applyPageMeta = applyPageMeta;

    function applyPageMeta() {
        const filename = getCurrentFilename();
        const meta = config.pageMeta && config.pageMeta[filename];

        if (!meta) {
            console.warn(`Missing pageMeta entry for ${filename}`);
            return;
        }

        if (meta.title) {
            document.title = meta.title;
        }

        let description = document.querySelector('meta[name="description"]');

        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }

        description.setAttribute("content", meta.description || "");
    }

    /* =========================
       LOGO — ICON + NAME ONLY
       ========================= */

    function createLogo() {
        const logo = document.createElement("a");
        logo.className = "logo-link";
        logo.href = "index.html";
        logo.setAttribute("aria-label", config.brand.logoLabel || config.companyName);

        logo.innerHTML = `
            <span class="logo-symbol" aria-hidden="true" data-logo-bulb>
                <svg viewBox="0 0 44 56" role="img" focusable="false">
                    <path class="bulb-line" d="M22 4.5c-9.1 0-16.2 7.1-16.2 16 0 5.9 3.1 10.2 6.1 13.4 2.3 2.5 3.5 5.4 3.8 8.7h12.6c.3-3.3 1.6-6.2 3.9-8.7 3-3.2 6-7.5 6-13.4 0-8.9-7.1-16-16.2-16Z"/>
                    <path class="bulb-line" d="M15.9 47h12.2"/>
                    <path class="bulb-line" d="M17.5 52h9"/>
                    <path class="bolt-line" d="M24.4 13.5 17.8 25h6.2l-4.4 12.2 8.2-15.1h-6.1l2.7-8.6Z"/>
                </svg>
            </span>

            <span class="logo-text">
                <strong>${safeText(config.brand.shortName || config.companyName)}</strong>
            </span>
        `;

        logo.addEventListener("pointerenter", () => {
            logo.classList.add("is-lit");
        });

        logo.addEventListener("pointerleave", () => {
            logo.classList.remove("is-lit");
        });

        return logo;
    }

    /* =========================
       HEADER
       ========================= */

    window.renderHeader = renderHeader;

    function renderHeader() {
        const mount = document.querySelector("[data-site-header]");
        if (!mount) return;

        const header = document.createElement("header");
        header.className = "site-header";
        header.setAttribute("data-header", "");

        const shell = document.createElement("div");
        shell.className = "container-wide header-shell";

        const brandCluster = document.createElement("div");
        brandCluster.className = "header-brand-cluster";
        brandCluster.appendChild(createLogo());

        const nav = createDesktopNavigation();

        const actions = document.createElement("div");
        actions.className = "header-actions";

        const phone = document.createElement("a");
        phone.className = "header-phone";
        phone.href = config.phoneHref;
        phone.setAttribute("aria-label", config.phoneLabel);
        phone.appendChild(createIcon("phone-call"));

        const phoneText = document.createElement("span");
        phoneText.textContent = config.phone;
        phone.appendChild(phoneText);

        const request = document.createElement("a");
        request.className = "btn btn-primary btn-small header-request";
        request.href = "contact.html";
        request.innerHTML = `
            <span>Start request</span>
            <i data-lucide="zap" aria-hidden="true"></i>
        `;

        const menuToggle = document.createElement("button");
        menuToggle.className = "menu-toggle";
        menuToggle.type = "button";
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.setAttribute("aria-controls", "mobileMenu");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("data-menu-open", "");
        menuToggle.appendChild(createIcon("menu"));

        actions.appendChild(phone);
        actions.appendChild(request);
        actions.appendChild(menuToggle);

        shell.appendChild(brandCluster);
        shell.appendChild(nav);
        shell.appendChild(actions);

        header.appendChild(shell);

        mount.replaceChildren(header, createMobileMenu());
    }

    function createDesktopNavigation() {
        const nav = document.createElement("nav");
        nav.className = "primary-nav electric-route-nav";
        nav.setAttribute("aria-label", "Primary navigation");

        const rail = document.createElement("div");
        rail.className = "electric-nav-rail";
        rail.setAttribute("aria-hidden", "true");

        const navList = document.createElement("ul");
        navList.className = "nav-list";

        config.navigation.forEach((item, index) => {
            const navItem = document.createElement("li");
            navItem.className = "nav-item";

            const number = String(index + 1).padStart(2, "0");

            if (item.children && item.children.length) {
                const trigger = document.createElement("a");
                trigger.className = "nav-link nav-dropdown-trigger";
                trigger.href = item.href;

                trigger.innerHTML = `
                    <span class="nav-index">${number}</span>
                    <span class="nav-label">${item.label}</span>
                    <span class="nav-spark" aria-hidden="true"></span>
                `;

                trigger.appendChild(createIcon("chevron-down"));

                if (isCurrentHref(item.href) || item.children.some((child) => isCurrentHref(child.href))) {
                    trigger.classList.add("is-active");
                    trigger.setAttribute("aria-current", "page");
                }

                const dropdown = document.createElement("div");
                dropdown.className = "nav-dropdown";
                dropdown.setAttribute("aria-label", `${item.label} submenu`);

                const dropdownHead = document.createElement("div");
                dropdownHead.className = "nav-dropdown-head";
                dropdownHead.innerHTML = `
                    <span>⚡ Service routes</span>
                    <strong>Choose the closest electrical path.</strong>
                `;

                dropdown.appendChild(dropdownHead);

                item.children.forEach((child) => {
                    const service = config.services.find((entry) => entry.href === child.href);

                    const childLink = document.createElement("a");
                    childLink.href = child.href;
                    childLink.className = "nav-service-route";

                    if (isCurrentHref(child.href)) {
                        childLink.classList.add("is-active");
                        childLink.setAttribute("aria-current", "page");
                    }

                    const iconWrap = document.createElement("span");
                    iconWrap.className = "nav-service-icon";
                    iconWrap.appendChild(createIcon(service ? getServiceIcon(service) : "zap"));

                    const copy = document.createElement("span");
                    copy.className = "nav-service-copy";

                    const strong = document.createElement("strong");
                    strong.textContent = child.label;

                    const small = document.createElement("small");
                    small.textContent = service ? getServiceShortMeta(service) : "Electrical matching path";

                    copy.appendChild(strong);
                    copy.appendChild(small);

                    const arrow = document.createElement("span");
                    arrow.className = "nav-service-arrow";
                    arrow.appendChild(createIcon("arrow-up-right"));

                    childLink.appendChild(iconWrap);
                    childLink.appendChild(copy);
                    childLink.appendChild(arrow);

                    dropdown.appendChild(childLink);
                });

                navItem.appendChild(trigger);
                navItem.appendChild(dropdown);
            } else {
                const link = document.createElement("a");
                link.className = "nav-link";
                link.href = item.href;

                link.innerHTML = `
                    <span class="nav-index">${number}</span>
                    <span class="nav-label">${item.label}</span>
                    <span class="nav-spark" aria-hidden="true"></span>
                `;

                if (isCurrentHref(item.href)) {
                    link.classList.add("is-active");
                    link.setAttribute("aria-current", "page");
                }

                navItem.appendChild(link);
            }

            navList.appendChild(navItem);
        });

        nav.appendChild(rail);
        nav.appendChild(navList);

        return nav;
    }

    /* =========================
       MENU OVERLAY
       ========================= */

    function createMobileMenu() {
        const menu = document.createElement("div");
        menu.className = "mobile-menu";
        menu.id = "mobileMenu";
        menu.setAttribute("data-mobile-menu", "");
        menu.setAttribute("aria-hidden", "true");
        menu.setAttribute("inert", "");

        const backdrop = document.createElement("button");
        backdrop.className = "mobile-menu-backdrop";
        backdrop.type = "button";
        backdrop.setAttribute("aria-label", "Close navigation menu");
        backdrop.setAttribute("data-menu-close", "");

        const panel = document.createElement("aside");
        panel.className = "mobile-menu-panel";
        panel.setAttribute("aria-label", "Navigation menu");

        const head = document.createElement("div");
        head.className = "mobile-menu-head";

        const close = document.createElement("button");
        close.className = "mobile-menu-close";
        close.type = "button";
        close.setAttribute("aria-label", "Close navigation menu");
        close.setAttribute("data-menu-close", "");
        close.appendChild(createIcon("x"));

        head.appendChild(createLogo());
        head.appendChild(close);

        const body = document.createElement("div");
        body.className = "mobile-menu-body";

        const intro = document.createElement("div");
        intro.className = "mobile-menu-intro";
        intro.innerHTML = `
            <span>⚡ Electrical matching</span>
            <strong>Route your project through Fluxly.</strong>
            <p>Prepare project details, compare independent provider options, and verify credentials before hiring.</p>
        `;

        const mobileNav = document.createElement("nav");
        mobileNav.className = "mobile-nav";
        mobileNav.setAttribute("aria-label", "Main navigation");

        config.navigation.forEach((item) => {
            const link = createLink(item.href, item.label);

            if (isCurrentHref(item.href) || (item.children && item.children.some((child) => isCurrentHref(child.href)))) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }

            link.appendChild(createIcon("arrow-up-right"));
            mobileNav.appendChild(link);
        });

        const servicesWrap = document.createElement("div");
        servicesWrap.className = "mobile-services";

        const servicesTitle = document.createElement("p");
        servicesTitle.className = "mobile-services-title";
        servicesTitle.textContent = "Electrical service paths";

        servicesWrap.appendChild(servicesTitle);

        config.services.forEach((service) => {
            const serviceLink = document.createElement("a");
            serviceLink.className = "mobile-service-link";
            serviceLink.href = service.href;

            if (isCurrentHref(service.href)) {
                serviceLink.classList.add("is-active");
                serviceLink.setAttribute("aria-current", "page");
            }

            const label = document.createElement("span");
            label.textContent = service.title;

            serviceLink.appendChild(label);
            serviceLink.appendChild(createIcon(getServiceIcon(service)));

            servicesWrap.appendChild(serviceLink);
        });

        const request = document.createElement("a");
        request.className = "btn btn-primary mobile-request-button";
        request.href = "contact.html";
        request.innerHTML = `
            <span>Start matching request</span>
            <i data-lucide="zap" aria-hidden="true"></i>
        `;

        const contactCard = document.createElement("div");
        contactCard.className = "mobile-contact-card";

        const phone = document.createElement("a");
        phone.href = config.phoneHref;
        phone.setAttribute("aria-label", config.phoneLabel);
        phone.appendChild(createIcon("phone-call"));
        phone.appendChild(document.createTextNode(config.phone));

        const email = document.createElement("a");
        email.href = `mailto:${config.email}`;
        email.appendChild(createIcon("mail"));
        email.appendChild(document.createTextNode(config.email));

        const area = document.createElement("span");
        area.appendChild(createIcon("map-pin"));
        area.appendChild(document.createTextNode(config.serviceArea));

        const note = document.createElement("p");
        note.className = "mobile-menu-note";
        note.textContent = "Fluxly is a matching platform and does not perform electrical work directly.";

        contactCard.appendChild(phone);
        contactCard.appendChild(email);
        contactCard.appendChild(area);
        contactCard.appendChild(note);

        body.appendChild(intro);
        body.appendChild(mobileNav);
        body.appendChild(servicesWrap);
        body.appendChild(request);
        body.appendChild(contactCard);

        panel.appendChild(head);
        panel.appendChild(body);

        menu.appendChild(backdrop);
        menu.appendChild(panel);

        return menu;
    }

    window.initMobileMenu = initMobileMenu;

    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-menu-open]");
        const closeButtons = document.querySelectorAll("[data-menu-close]");

        if (!menu || !openButton) return;

        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        function openMenu() {
            menu.classList.add("is-open");
            menu.setAttribute("aria-hidden", "false");
            menu.removeAttribute("inert");
            openButton.setAttribute("aria-expanded", "true");
            lockBodyScroll(true);

            const firstFocusable = menu.querySelector(focusableSelector);

            if (firstFocusable) {
                firstFocusable.focus({ preventScroll: true });
            }
        }

        function closeMenu() {
            const active = document.activeElement;

            if (active && menu.contains(active)) {
                openButton.focus({ preventScroll: true });
            }

            menu.classList.remove("is-open");
            menu.setAttribute("aria-hidden", "true");
            menu.setAttribute("inert", "");
            openButton.setAttribute("aria-expanded", "false");
            lockBodyScroll(false);
        }

        openButton.addEventListener("click", openMenu);

        closeButtons.forEach((button) => {
            button.addEventListener("click", closeMenu);
        });

        menu.addEventListener("click", (event) => {
            const link = event.target.closest("a");

            if (link) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (!menu.classList.contains("is-open")) return;

            if (event.key === "Escape") {
                closeMenu();
                return;
            }

            if (event.key !== "Tab") return;

            const focusable = Array.from(menu.querySelectorAll(focusableSelector)).filter((element) => {
                return element.offsetParent !== null || element === document.activeElement;
            });

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }

            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }

    /* =========================
       FOOTER
       ========================= */

    window.renderFooter = renderFooter;

    function renderFooter() {
        const mount = document.querySelector("[data-site-footer]");
        if (!mount) return;

        const footer = document.createElement("footer");
        footer.className = "site-footer";

        const main = document.createElement("div");
        main.className = "container-wide footer-main";

        const brand = document.createElement("div");
        brand.className = "footer-brand";

        const footerCopy = document.createElement("p");
        footerCopy.setAttribute("data-footer-text", "");
        footerCopy.textContent = config.footerText;

        const contact = document.createElement("div");
        contact.className = "footer-contact";

        const address = document.createElement("span");
        address.appendChild(createIcon("map-pin"));
        address.appendChild(document.createTextNode(config.address.full));

        const phone = document.createElement("a");
        phone.href = config.phoneHref;
        phone.setAttribute("aria-label", config.phoneLabel);
        phone.appendChild(createIcon("phone-call"));
        phone.appendChild(document.createTextNode(config.phone));

        const email = document.createElement("a");
        email.href = `mailto:${config.email}`;
        email.appendChild(createIcon("mail"));
        email.appendChild(document.createTextNode(config.email));

        const area = document.createElement("span");
        area.appendChild(createIcon("radio-tower"));
        area.appendChild(document.createTextNode(config.serviceArea));

        const companyId = document.createElement("span");
        companyId.appendChild(createIcon("badge-check"));
        companyId.appendChild(document.createTextNode(config.companyId));

        contact.appendChild(address);
        contact.appendChild(phone);
        contact.appendChild(email);
        contact.appendChild(area);
        contact.appendChild(companyId);

        brand.appendChild(createLogo());
        brand.appendChild(footerCopy);
        brand.appendChild(contact);

        const navCol = createFooterColumn(
            "Navigation",
            config.navigation.map((item) => ({
                label: item.label,
                href: item.href
            }))
        );

        const servicesCol = createFooterColumn(
            "Services",
            config.services.map((service) => ({
                label: service.title,
                href: service.href
            }))
        );

        const legalCol = createFooterColumn("Legal", [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            },
            {
                label: "Start Request",
                href: "contact.html"
            }
        ]);

        main.appendChild(brand);
        main.appendChild(navCol);
        main.appendChild(servicesCol);
        main.appendChild(legalCol);

        const bottom = document.createElement("div");
        bottom.className = "container-wide footer-bottom";

        const legalRow = document.createElement("div");
        legalRow.className = "footer-legal-row";

        const copyright = document.createElement("p");
        copyright.textContent = `© ${new Date().getFullYear()} ${config.companyName}. All rights reserved.`;

        const id = document.createElement("span");
        id.textContent = config.companyId;

        legalRow.appendChild(copyright);
        legalRow.appendChild(id);

        const disclaimer = document.createElement("p");
        disclaimer.className = "footer-disclaimer";
        disclaimer.setAttribute("data-disclaimer", "");
        disclaimer.textContent = config.disclaimer;

        const notice = document.createElement("p");
        notice.className = "footer-notice";
        notice.setAttribute("data-legal-notice", "");
        notice.textContent = config.legalNotice;

        bottom.appendChild(legalRow);
        bottom.appendChild(disclaimer);
        bottom.appendChild(notice);

        footer.appendChild(main);
        footer.appendChild(bottom);

        mount.replaceChildren(footer);
    }

    function createFooterColumn(title, links) {
        const col = document.createElement("div");
        col.className = "footer-col";

        const heading = document.createElement("h2");
        heading.textContent = title;

        const list = document.createElement("div");
        list.className = "footer-links";

        links.forEach((item) => {
            const link = createLink(item.href, item.label);

            if (isCurrentHref(item.href)) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }

            list.appendChild(link);
        });

        col.appendChild(heading);
        col.appendChild(list);

        return col;
    }

    /* =========================
       SERVICE CARDS
       ========================= */

    window.renderServiceCards = renderServiceCards;

    function renderServiceCards() {
        document.querySelectorAll("[data-service-cards]").forEach((mount) => {
            const limit = Number(mount.dataset.limit || config.services.length);
            const services = config.services.slice(0, limit);

            mount.replaceChildren();

            services.forEach((service, index) => {
                const card = document.createElement("a");
                card.className = "service-card reveal-up";
                card.href = service.href;
                card.setAttribute("aria-label", `Explore ${service.title}`);
                card.style.setProperty("--card-index", String(index));

                const img = document.createElement("img");
                img.src = service.image;
                img.alt = `${service.title} electrical provider matching category`;
                img.loading = "lazy";

                const energy = document.createElement("span");
                energy.className = "service-card-energy";
                energy.setAttribute("aria-hidden", "true");

                const content = document.createElement("div");
                content.className = "service-card-content";

                const top = document.createElement("div");
                top.className = "service-card-top";

                const titleGroup = document.createElement("div");
                titleGroup.className = "service-card-title-group";

                const kicker = document.createElement("span");
                kicker.className = "service-card-kicker";
                kicker.textContent = getServiceShortMeta(service);

                const title = document.createElement("h3");
                title.textContent = service.title;

                titleGroup.appendChild(kicker);
                titleGroup.appendChild(title);

                const icon = document.createElement("span");
                icon.className = "icon-pill";
                icon.appendChild(createIcon(getServiceIcon(service)));

                top.appendChild(titleGroup);
                top.appendChild(icon);

                const text = document.createElement("p");
                text.textContent = service.cardText || service.summary;

                const linkText = document.createElement("span");
                linkText.className = "service-card-link";
                linkText.textContent = "View matching path";
                linkText.appendChild(createIcon("arrow-up-right"));

                content.appendChild(top);
                content.appendChild(text);
                content.appendChild(linkText);

                card.appendChild(img);
                card.appendChild(energy);
                card.appendChild(content);

                mount.appendChild(card);
            });
        });

        refreshIcons();
    }

    /* =========================
       FAQ
       ========================= */

    window.renderFaq = renderFaq;

    function renderFaq() {
        document.querySelectorAll("[data-faq-list]").forEach((mount) => {
            const serviceId = mount.dataset.serviceFaq;
            const activeService = serviceId ? getServiceById(serviceId) : getActiveService();
            const items = activeService && activeService.faq ? activeService.faq : config.faq;

            mount.classList.add("faq-list");
            mount.replaceChildren();

            items.forEach((item, index) => {
                const faqItem = document.createElement("article");
                faqItem.className = "faq-item";

                const unique = `${index + 1}-${Math.random().toString(36).slice(2, 7)}`;
                const questionId = `faq-question-${unique}`;
                const answerId = `faq-answer-${unique}`;

                const button = document.createElement("button");
                button.className = "faq-question";
                button.type = "button";
                button.id = questionId;
                button.setAttribute("aria-expanded", "false");
                button.setAttribute("aria-controls", answerId);

                const questionText = document.createElement("span");
                questionText.textContent = item.question;

                button.appendChild(questionText);
                button.appendChild(createIcon("plus"));

                const answer = document.createElement("div");
                answer.className = "faq-answer";
                answer.id = answerId;
                answer.setAttribute("role", "region");
                answer.setAttribute("aria-labelledby", questionId);

                const inner = document.createElement("div");
                inner.className = "faq-answer-inner";

                const paragraph = document.createElement("p");
                paragraph.textContent = item.answer;

                inner.appendChild(paragraph);
                answer.appendChild(inner);

                button.addEventListener("click", () => {
                    const isOpen = faqItem.classList.toggle("is-open");
                    button.setAttribute("aria-expanded", String(isOpen));
                });

                faqItem.appendChild(button);
                faqItem.appendChild(answer);

                mount.appendChild(faqItem);
            });

            renderFaqSchema(items);
        });

        refreshIcons();
    }

    function renderFaqSchema(items) {
        const schemaMount = document.querySelector("[data-faq-schema]");
        if (!schemaMount || !items || !items.length) return;

        const oldScript = schemaMount.querySelector("script[type='application/ld+json']");

        if (oldScript) {
            oldScript.remove();
        }

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer
                }
            }))
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);

        schemaMount.appendChild(script);
    }

    /* =========================
       STICKY HEADER
       ========================= */

    window.initStickyHeader = initStickyHeader;

    function initStickyHeader() {
        const header = document.querySelector("[data-header]");
        if (!header) return;

        function updateHeader() {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        }

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }

    /* =========================
       COOKIE BANNER
       ========================= */

    window.initCookieBanner = initCookieBanner;

    function initCookieBanner() {
        const mount = document.querySelector("[data-policy-banner]");
        if (!mount || !config.cookieBanner) return;

        const bannerConfig = config.cookieBanner;
        const storedChoice = localStorage.getItem(bannerConfig.storageKey);

        if (storedChoice) {
            mount.replaceChildren();
            return;
        }

        const banner = document.createElement("section");
        banner.className = "policy-banner is-visible";
        banner.setAttribute("aria-label", "Cookie preferences");

        const inner = document.createElement("div");
        inner.className = "policy-banner-inner";

        const title = document.createElement("h2");
        title.textContent = bannerConfig.title;

        const text = document.createElement("p");
        text.textContent = bannerConfig.text;

        const links = document.createElement("div");
        links.className = "policy-links";

        bannerConfig.links.forEach((item) => {
            links.appendChild(createLink(item.href, item.label));
        });

        const actions = document.createElement("div");
        actions.className = "policy-actions";

        const accept = document.createElement("button");
        accept.className = "btn btn-primary btn-small";
        accept.type = "button";
        accept.textContent = bannerConfig.accept;

        const decline = document.createElement("button");
        decline.className = "btn btn-secondary btn-small";
        decline.type = "button";
        decline.textContent = bannerConfig.decline;

        function setChoice(choice) {
            localStorage.setItem(bannerConfig.storageKey, choice);
            banner.classList.remove("is-visible");

            window.setTimeout(() => {
                mount.replaceChildren();
            }, 220);
        }

        accept.addEventListener("click", () => setChoice("accepted"));
        decline.addEventListener("click", () => setChoice("declined"));

        actions.appendChild(accept);
        actions.appendChild(decline);

        inner.appendChild(title);
        inner.appendChild(text);
        inner.appendChild(links);
        inner.appendChild(actions);

        banner.appendChild(inner);
        mount.replaceChildren(banner);
    }

    /* =========================
       FORM VALIDATION
       ========================= */

    window.initFormValidation = initFormValidation;

    function initFormValidation() {
        document.querySelectorAll("[data-request-form]").forEach((form) => {
            const message = form.querySelector("[data-form-message]");
            const submit = form.querySelector("[type='submit']");

            form.setAttribute("novalidate", "");

            form.querySelectorAll("input, select, textarea").forEach((field) => {
                field.addEventListener("input", () => validateField(field));
                field.addEventListener("change", () => validateField(field));
            });

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const fields = Array.from(form.querySelectorAll("[required]"));
                const valid = fields.every((field) => validateField(field));

                if (!valid) {
                    const firstInvalid = form.querySelector(".has-error input, .has-error select, .has-error textarea");

                    if (firstInvalid) {
                        firstInvalid.focus();
                    }

                    if (message) {
                        showFormMessage(message, "error");
                    }

                    return;
                }

                if (message) {
                    showFormMessage(message, "success");
                }

                if (submit) {
                    submit.blur();
                }

                form.reset();

                form.querySelectorAll(".has-error").forEach((field) => {
                    field.classList.remove("has-error");
                });
            });
        });
    }

    function validateField(field) {
        const wrapper = field.closest(".form-field, .checkbox-field");
        if (!wrapper) return true;

        let isValid = true;

        if (field.type === "checkbox") {
            isValid = field.checked;
        } else if (field.type === "email") {
            isValid = Boolean(field.value.trim()) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        } else {
            isValid = Boolean(field.value.trim());
        }

        wrapper.classList.toggle("has-error", !isValid);

        return isValid;
    }

    function showFormMessage(message, type) {
        const formCopy = config.forms && config.forms.request ? config.forms.request : {};

        message.classList.add("is-visible");
        message.dataset.status = type;

        if (type === "success") {
            message.innerHTML = `
                <strong>${formCopy.successTitle || "Request received"}</strong>
                <p>${formCopy.successMessage || "Your request details have been prepared."}</p>
            `;
        } else {
            message.innerHTML = `
                <strong>Check required fields</strong>
                <p>${formCopy.errorMessage || "Please complete the required fields before submitting."}</p>
            `;
        }
    }

    /* =========================
       REVEAL
       ========================= */

    window.initRevealAnimations = initRevealAnimations;

    function initRevealAnimations() {
        const elements = document.querySelectorAll(".reveal-up, .reveal-fade, .reveal-scale");

        if (!elements.length) return;

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -42px 0px"
            }
        );

        elements.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index % 5, 4) * 45}ms`;
            observer.observe(element);
        });
    }

    /* =========================
       ELECTRIC HOVER STATES
       ========================= */

    function initElectricHoverStates() {
        const hoverItems = document.querySelectorAll(
            ".card, .service-card, .faq-item, .btn, .icon-pill, .mobile-nav a, .mobile-service-link, .footer-links a, .nav-link, .nav-service-route"
        );

        hoverItems.forEach((item) => {
            item.addEventListener("pointerenter", () => {
                item.classList.add("is-electric-hover");
            });

            item.addEventListener("pointerleave", () => {
                item.classList.remove("is-electric-hover");
            });
        });
    }

    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    window.setActiveNavigation = setActiveNavigation;

    function setActiveNavigation() {
        const filename = getCurrentFilename();

        document.querySelectorAll("a[href]").forEach((link) => {
            const href = normalizeHref(link.getAttribute("href"));

            if (href === filename) {
                link.classList.add("is-active");

                if (
                    link.classList.contains("nav-link") ||
                    link.classList.contains("nav-service-route") ||
                    link.classList.contains("mobile-service-link") ||
                    link.closest(".mobile-nav") ||
                    link.closest(".footer-links")
                ) {
                    link.setAttribute("aria-current", "page");
                }
            }
        });
    }

    /* =========================
       GLOBAL ACCESS
       ========================= */

    window.FLUXLY = {
        getCurrentFilename,
        getServiceById,
        getActiveService,
        refreshIcons,
        injectConfigValues,
        renderServiceCards,
        renderFaq
    };
})();
