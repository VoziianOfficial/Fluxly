"use strict";

/* ==========================================================
   FLUXLY — GLOBAL CONFIG
   File: /js/config.js
   ========================================================== */

window.SITE_CONFIG = {
    companyName: "Fluxly",
    companyId: "Fluxly Electrical Matching LLC",

    brand: {
        shortName: "Fluxly",
        tagline: "Smarter electrical provider matching.",
        logoLabel: "Fluxly electrical provider matching platform"
    },

    phone: "(800) 314-2218",
    phoneHref: "tel:+18003142218",
    phoneLabel: "Call Fluxly at (800) 314-2218",

    email: "hello@fluxlymatch.com",

    address: {
        line1: "845 W Madison St",
        city: "Chicago",
        state: "IL",
        zip: "60607",
        country: "USA",
        full: "845 W Madison St, Chicago, IL 60607, USA"
    },

    serviceArea: "USA electrical provider matching platform",

    footerText:
        "Fluxly helps homeowners prepare electrical project details and compare independent local provider options across selected service categories.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "Fluxly is an independent electrical provider matching platform. Fluxly does not perform electrical work directly, does not employ electricians, and does not guarantee provider availability, pricing, licensing, insurance, permits, timelines, or workmanship. Homeowners are responsible for reviewing provider details and verifying credentials before hiring.",

    navigation: [
        {
            label: "Home",
            href: "index.html"
        },
        {
            label: "Services",
            href: "services.html",
            children: [
                {
                    label: "Panel Upgrades",
                    href: "panel-upgrades.html"
                },
                {
                    label: "Wiring & Rewiring",
                    href: "wiring-rewiring.html"
                },
                {
                    label: "EV Charger Installation",
                    href: "ev-charger-installation.html"
                },
                {
                    label: "Lighting Installation",
                    href: "lighting-installation.html"
                }
            ]
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    services: [
        {
            id: "panel-upgrades",
            title: "Panel Upgrades",
            shortTitle: "Panels",
            href: "panel-upgrades.html",
            icon: "gauge",
            image: "assets/images/panel-upgrades.jpg",
            detailImage: "assets/images/electrical-panel-detail.jpg",
            kicker: "Panel capacity matching",
            summary:
                "Compare independent provider options for electrical panel upgrade requests, capacity concerns, breaker issues, or planned home improvements.",
            cardText:
                "Prepare details about your current panel, home size, project goals, and timing before reviewing local provider options.",
            heroTitle: "Compare provider options for panel upgrade requests.",
            heroText:
                "Fluxly helps homeowners organize panel upgrade details and compare independent local electrical provider options before continuing with quotes.",
            pageIntro:
                "Panel upgrade requests often involve capacity needs, appliance changes, renovation plans, EV charging goals, or older electrical equipment. Fluxly helps organize the request so homeowners can compare relevant provider options more clearly.",
            contextTitle: "When homeowners may explore panel upgrade providers",
            contextText:
                "A panel upgrade category may be useful when a home needs more electrical capacity, has outdated equipment, or requires provider review before adding new electrical loads.",
            contextPoints: [
                "Older electrical panels or limited breaker space",
                "Planned EV charger installation",
                "Kitchen, basement, or whole-home renovation planning",
                "Frequent breaker trips or capacity concerns",
                "Interest in comparing provider scopes and timelines"
            ],
            evaluationTitle: "What to compare before choosing a provider",
            evaluationIntro:
                "Electrical panel work can involve permits, local code requirements, utility coordination, and careful scope review. Homeowners should verify details directly with each provider.",
            evaluationPoints: [
                "License and insurance information",
                "Permit and inspection responsibilities",
                "Panel size, brand, and scope clarity",
                "Utility coordination expectations",
                "Quote detail, timing, and warranty terms"
            ],
            prepTitle: "Helpful details to include in your request",
            prepItems: [
                "Current panel size if known",
                "Reason for the upgrade request",
                "Photos of the panel area if available",
                "ZIP code and property type",
                "Preferred timing and quote expectations"
            ],
            flowTitle: "How Fluxly supports the matching flow",
            flowSteps: [
                "Share your panel-related project details.",
                "Choose the closest electrical service category.",
                "Review independent local provider options when available.",
                "Continue directly with providers to discuss quotes and next steps."
            ],
            faq: [
                {
                    question: "Does Fluxly upgrade electrical panels directly?",
                    answer:
                        "No. Fluxly does not perform panel upgrades or any electrical work directly. Fluxly helps homeowners compare independent local provider options."
                },
                {
                    question: "Should I verify permits for a panel upgrade?",
                    answer:
                        "Yes. Homeowners should ask each provider about permits, inspections, utility coordination, and local code requirements before hiring."
                },
                {
                    question: "Can provider availability vary by ZIP code?",
                    answer:
                        "Yes. Provider availability, service area coverage, timing, and quote options may vary by ZIP code and project type."
                },
                {
                    question: "What should I compare in panel upgrade quotes?",
                    answer:
                        "Useful comparison points include scope, panel capacity, permit responsibilities, timeline, warranty details, and license or insurance information."
                }
            ],
            ctaTitle: "Prepare a panel upgrade matching request.",
            ctaText:
                "Share a few project details so Fluxly can help organize your request before comparing independent provider options."
        },

        {
            id: "wiring-rewiring",
            title: "Wiring & Rewiring",
            shortTitle: "Wiring",
            href: "wiring-rewiring.html",
            icon: "cable",
            image: "assets/images/wiring-rewiring.jpg",
            detailImage: "assets/images/wiring-detail.jpg",
            kicker: "Wiring project matching",
            summary:
                "Explore provider options for wiring and rewiring requests related to renovations, older homes, room additions, or electrical updates.",
            cardText:
                "Organize wiring project notes, affected rooms, property details, and timing before comparing local provider options.",
            heroTitle: "Compare provider options for wiring and rewiring projects.",
            heroText:
                "Fluxly helps homeowners prepare wiring project details and compare independent local electrical provider options for relevant requests.",
            pageIntro:
                "Wiring and rewiring requests can vary widely depending on property age, room layout, renovation scope, and local code requirements. Fluxly helps homeowners present the request clearly before comparing provider options.",
            contextTitle: "When this service category may fit",
            contextText:
                "This category may be useful for homeowners planning electrical updates, remodeling work, new circuits, or provider review of existing wiring conditions.",
            contextPoints: [
                "Room additions or renovation planning",
                "Older wiring concerns",
                "New circuit needs",
                "Outlet, switch, or fixture wiring updates",
                "Preparing to compare project scopes from providers"
            ],
            evaluationTitle: "Provider details worth comparing",
            evaluationIntro:
                "Wiring work can require careful review of access, walls, circuits, permits, and safety requirements. Homeowners should confirm all technical details directly with providers.",
            evaluationPoints: [
                "License and insurance information",
                "Permit and inspection expectations",
                "Scope of rooms, circuits, and access points",
                "Wall access, cleanup, and repair responsibilities",
                "Quote clarity, timing, and warranty details"
            ],
            prepTitle: "Useful request details",
            prepItems: [
                "Rooms or areas involved",
                "Renovation plans or wiring concerns",
                "Property age if known",
                "Photos or notes about existing electrical areas",
                "Preferred schedule and communication method"
            ],
            flowTitle: "A cleaner way to compare wiring provider options",
            flowSteps: [
                "Describe the wiring or rewiring need.",
                "Add project area, property, and timing details.",
                "Review provider options where available.",
                "Discuss quotes, credentials, and next steps with providers."
            ],
            faq: [
                {
                    question: "Does Fluxly perform wiring or rewiring?",
                    answer:
                        "No. Fluxly is not an electrical contractor and does not perform wiring or rewiring directly."
                },
                {
                    question: "Do wiring projects usually require permits?",
                    answer:
                        "Permit requirements can vary by location and project scope. Homeowners should ask providers about permits, inspections, and local code requirements."
                },
                {
                    question: "What should I include in a wiring request?",
                    answer:
                        "Include affected rooms, project goals, property type, timing, and any photos or details that help providers understand the request."
                },
                {
                    question: "Can I compare multiple wiring provider options?",
                    answer:
                        "Fluxly helps homeowners organize requests and compare independent local provider options when available in the service area."
                }
            ],
            ctaTitle: "Start a wiring provider matching request.",
            ctaText:
                "Prepare your wiring project details and compare independent provider options with a clearer request flow."
        },

        {
            id: "ev-charger-installation",
            title: "EV Charger Installation",
            shortTitle: "EV Chargers",
            href: "ev-charger-installation.html",
            icon: "battery-charging",
            image: "assets/images/ev-charger.jpg",
            detailImage: "assets/images/ev-charger-detail.jpg",
            kicker: "EV charging match flow",
            summary:
                "Compare provider options for home EV charger installation requests, including panel capacity, charger location, and circuit planning.",
            cardText:
                "Prepare charger type, parking location, panel details, and timing before reviewing local provider options.",
            heroTitle: "Compare provider options for EV charger installation requests.",
            heroText:
                "Fluxly helps homeowners organize home EV charging details and compare independent local electrical provider options.",
            pageIntro:
                "Home EV charger installation requests often depend on charger type, parking layout, panel capacity, distance from the electrical panel, and local permitting rules. Fluxly helps homeowners structure the request before comparing provider options.",
            contextTitle: "When this category may help",
            contextText:
                "This service category is built for homeowners planning a residential EV charging setup and wanting a clearer way to compare electrical provider options.",
            contextPoints: [
                "Level 2 home charger planning",
                "Garage or driveway charger placement",
                "Panel capacity review needs",
                "New dedicated circuit requests",
                "Quote comparison before choosing a provider"
            ],
            evaluationTitle: "What homeowners may compare",
            evaluationIntro:
                "EV charger installation can involve load calculations, permits, wiring routes, charger compatibility, and installation location details.",
            evaluationPoints: [
                "Provider license and insurance details",
                "Experience with EV charger installation requests",
                "Panel capacity and circuit requirements",
                "Permit and inspection handling",
                "Quote scope, charger compatibility, and warranty terms"
            ],
            prepTitle: "Details to prepare before requesting provider options",
            prepItems: [
                "EV make or charger model if known",
                "Preferred charger location",
                "Distance from panel to parking area",
                "Current panel size if available",
                "Installation timeline and ZIP code"
            ],
            flowTitle: "How the EV charger matching flow works",
            flowSteps: [
                "Share charger, location, and property details.",
                "Fluxly organizes the request by service type.",
                "Review available independent provider options.",
                "Continue with providers to discuss quote details and installation requirements."
            ],
            faq: [
                {
                    question: "Does Fluxly install EV chargers?",
                    answer:
                        "No. Fluxly does not install EV chargers directly. Fluxly helps homeowners compare independent electrical provider options."
                },
                {
                    question: "Will my electrical panel need review?",
                    answer:
                        "Many EV charger requests involve panel capacity review. Homeowners should discuss load requirements directly with qualified providers."
                },
                {
                    question: "Do EV charger installations require permits?",
                    answer:
                        "Permit requirements vary by location and scope. Homeowners should confirm permit and inspection responsibilities with providers."
                },
                {
                    question: "What information helps with EV charger quote requests?",
                    answer:
                        "Helpful details include charger type, panel location, parking location, distance between them, ZIP code, and preferred timing."
                }
            ],
            ctaTitle: "Prepare an EV charger matching request.",
            ctaText:
                "Share your home charging details and compare independent electrical provider options available for your area."
        },

        {
            id: "lighting-installation",
            title: "Lighting Installation",
            shortTitle: "Lighting",
            href: "lighting-installation.html",
            icon: "lightbulb",
            image: "assets/images/lighting-installation.jpg",
            detailImage: "assets/images/lighting-detail.jpg",
            kicker: "Lighting provider matching",
            summary:
                "Explore provider options for indoor, outdoor, recessed, accent, and fixture-related lighting installation requests.",
            cardText:
                "Organize fixture type, room or outdoor area, wiring needs, and timing before comparing provider options.",
            heroTitle: "Compare provider options for lighting installation requests.",
            heroText:
                "Fluxly helps homeowners prepare lighting project details and compare independent local electrical provider options.",
            pageIntro:
                "Lighting installation requests can range from fixture replacement to recessed lighting, exterior lighting, accent lighting, or room-specific upgrades. Fluxly helps homeowners organize key details before comparing providers.",
            contextTitle: "When homeowners may use this category",
            contextText:
                "This category may fit homeowners planning lighting improvements that require electrical provider review, installation, wiring, or fixture placement discussion.",
            contextPoints: [
                "Recessed or ceiling lighting requests",
                "Outdoor lighting or security lighting planning",
                "Fixture replacement involving wiring",
                "Kitchen, bathroom, or living area lighting updates",
                "Comparing provider quotes and project scope"
            ],
            evaluationTitle: "What to compare before choosing a lighting provider",
            evaluationIntro:
                "Lighting projects may involve fixture compatibility, switch placement, dimmer requirements, wiring routes, and local electrical code considerations.",
            evaluationPoints: [
                "License and insurance information",
                "Fixture and wiring scope clarity",
                "Indoor or outdoor installation experience",
                "Permit or code considerations where applicable",
                "Quote detail, timing, and warranty terms"
            ],
            prepTitle: "Helpful lighting request details",
            prepItems: [
                "Fixture type or lighting goal",
                "Room, ceiling, or outdoor area involved",
                "Photos of the current setup if available",
                "Dimmer, switch, or smart lighting preferences",
                "ZIP code and preferred project timing"
            ],
            flowTitle: "How Fluxly helps structure the request",
            flowSteps: [
                "Choose the lighting installation category.",
                "Add fixture, location, and timing details.",
                "Review available independent provider options.",
                "Continue with providers to compare quote details."
            ],
            faq: [
                {
                    question: "Does Fluxly install lighting fixtures?",
                    answer:
                        "No. Fluxly does not install lighting directly. Fluxly helps homeowners compare independent electrical provider options."
                },
                {
                    question: "Can lighting projects involve wiring changes?",
                    answer:
                        "Some lighting requests may involve wiring, switches, dimmers, or new fixture locations. Homeowners should confirm scope directly with providers."
                },
                {
                    question: "What should I include in a lighting request?",
                    answer:
                        "Include fixture type, room or outdoor area, photos if available, timing, ZIP code, and any dimmer or smart lighting preferences."
                },
                {
                    question: "Does provider availability vary?",
                    answer:
                        "Yes. Availability can vary by ZIP code, service category, provider schedule, and project scope."
                }
            ],
            ctaTitle: "Start a lighting provider matching request.",
            ctaText:
                "Prepare your lighting project details and compare independent local electrical provider options."
        }
    ],

    forms: {
        request: {
            title: "Start an electrical provider matching request",
            subtitle:
                "Share a few project details so Fluxly can help organize your request before you compare independent local provider options.",
            nameLabel: "Full name",
            namePlaceholder: "Your name",
            phoneLabel: "Phone number",
            phonePlaceholder: "(555) 000-0000",
            emailLabel: "Email address",
            emailPlaceholder: "you@example.com",
            zipLabel: "ZIP code",
            zipPlaceholder: "Enter ZIP code",
            serviceLabel: "Service type",
            timingLabel: "Project timing",
            notesLabel: "Project notes",
            notesPlaceholder:
                "Briefly describe the electrical project, property type, timing, and any details providers should know.",
            checkboxText:
                "I understand Fluxly is a matching platform and does not perform electrical work directly. I should verify provider license, insurance, permits, and quote details before hiring.",
            submitText: "Submit matching request",
            successTitle: "Request prepared",
            successMessage:
                "Thank you. Your request details have been captured for the matching flow. Continue reviewing provider credentials, quotes, and project terms directly with any provider you choose.",
            errorMessage:
                "Please complete the required fields before submitting your request.",
            serviceOptions: [
                {
                    label: "Panel Upgrades",
                    value: "panel-upgrades"
                },
                {
                    label: "Wiring & Rewiring",
                    value: "wiring-rewiring"
                },
                {
                    label: "EV Charger Installation",
                    value: "ev-charger-installation"
                },
                {
                    label: "Lighting Installation",
                    value: "lighting-installation"
                },
                {
                    label: "Not sure yet",
                    value: "not-sure"
                }
            ],
            timingOptions: [
                {
                    label: "As soon as possible",
                    value: "as-soon-as-possible"
                },
                {
                    label: "Within 1–2 weeks",
                    value: "within-1-2-weeks"
                },
                {
                    label: "Within 30 days",
                    value: "within-30-days"
                },
                {
                    label: "Planning ahead",
                    value: "planning-ahead"
                }
            ]
        }
    },

    cookieBanner: {
        storageKey: "fluxly_cookie_choice",
        title: "Cookie preferences",
        text:
            "Fluxly uses essential browser storage to remember your preference and improve basic site functionality. Review our Privacy Policy, Cookie Policy, and Terms of Service for more information.",
        accept: "Accept",
        decline: "Decline",
        links: [
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
            }
        ]
    },

    faq: [
        {
            question: "How does Fluxly help compare local electrical providers?",
            answer:
                "Fluxly helps homeowners organize project details, choose a relevant service category, and compare independent local electrical provider options when available."
        },
        {
            question: "Does Fluxly perform electrical work directly?",
            answer:
                "No. Fluxly is not an electrical contractor, does not employ electricians, and does not perform electrical work directly."
        },
        {
            question: "What should homeowners check before hiring an electrical provider?",
            answer:
                "Homeowners should verify license, insurance, permits, inspection responsibilities, quote details, timing, warranty terms, and provider qualifications before hiring."
        },
        {
            question: "Are quotes from providers usually free?",
            answer:
                "Quote policies can vary by provider, location, and project type. Homeowners should confirm quote terms directly with each provider."
        },
        {
            question: "Does provider availability vary by ZIP code?",
            answer:
                "Yes. Provider availability, response timing, service coverage, and quote options may vary by ZIP code and service category."
        }
    ],

    socialProof: {
        eyebrow: "Electrical matching flow",
        title: "A clearer way to prepare and compare.",
        items: [
            {
                label: "4",
                value: "Service categories",
                text: "Focused electrical categories help homeowners route requests more clearly."
            },
            {
                label: "USA",
                value: "Service area",
                text: "Fluxly is designed for homeowners comparing provider options across the United States."
            },
            {
                label: "Verify",
                value: "Before hiring",
                text: "Homeowners should always confirm license, insurance, permits, quote details, and provider qualifications."
            }
        ]
    },

    comparisonFactors: [
        "License information",
        "Insurance information",
        "Permit responsibilities",
        "Inspection requirements",
        "Quote clarity",
        "Project scope",
        "Timeline expectations",
        "Warranty details"
    ],

    matchingSteps: [
        {
            title: "Describe the project",
            text: "Share service type, ZIP code, timing, and basic project notes.",
            icon: "clipboard-check"
        },
        {
            title: "Match by service type",
            text: "Fluxly organizes your request around the electrical category that best fits.",
            icon: "workflow"
        },
        {
            title: "Review provider options",
            text: "Compare independent local provider options when available in your area.",
            icon: "shield-check"
        },
        {
            title: "Continue with quotes",
            text: "Discuss pricing, credentials, permits, and project details directly with providers.",
            icon: "phone"
        }
    ],

    pageMeta: {
        "index.html": {
            title: "Fluxly | Electrical Provider Matching Platform",
            description:
                "Fluxly helps homeowners prepare electrical project details and compare independent local provider options for panel upgrades, wiring, EV chargers, and lighting."
        },
        "services.html": {
            title: "Electrical Service Categories | Fluxly",
            description:
                "Explore Fluxly electrical service categories and compare independent provider options for panel upgrades, wiring, EV charger installation, and lighting installation."
        },
        "about.html": {
            title: "About Fluxly | Independent Electrical Matching Platform",
            description:
                "Learn how Fluxly helps homeowners organize electrical project requests and compare independent local electrical provider options."
        },
        "contact.html": {
            title: "Start an Electrical Matching Request | Fluxly",
            description:
                "Contact Fluxly to prepare an electrical provider matching request for panel upgrades, wiring, EV charger installation, or lighting installation."
        },
        "panel-upgrades.html": {
            title: "Panel Upgrade Provider Matching | Fluxly",
            description:
                "Prepare a panel upgrade request and compare independent local electrical provider options through Fluxly."
        },
        "wiring-rewiring.html": {
            title: "Wiring & Rewiring Provider Matching | Fluxly",
            description:
                "Organize wiring or rewiring project details and compare independent local electrical provider options through Fluxly."
        },
        "ev-charger-installation.html": {
            title: "EV Charger Installation Provider Matching | Fluxly",
            description:
                "Prepare a home EV charger installation request and compare independent electrical provider options through Fluxly."
        },
        "lighting-installation.html": {
            title: "Lighting Installation Provider Matching | Fluxly",
            description:
                "Compare independent local provider options for lighting installation requests with Fluxly."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | Fluxly",
            description:
                "Review the Fluxly Privacy Policy for information about how this electrical provider matching platform handles basic user and request information."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | Fluxly",
            description:
                "Review the Fluxly Cookie Policy for information about cookies, localStorage, and basic browser preference storage."
        },
        "terms-of-service.html": {
            title: "Terms of Service | Fluxly",
            description:
                "Review the Fluxly Terms of Service for use of this independent electrical provider matching platform."
        }
    }
};