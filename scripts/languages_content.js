// scripts/contact-i18n.js

const languagesContent = {
  de: {
    //Menu
    menuIndex: `Startseite`,
    menuProjekte: `Projekte`,
    menuCV: `Lebenslauf`,
    menuKontakt: `Kontakt`,

    //Index
    digitalStrategy: "DIGITALSTRATEGIE",
    digitalStrategyMobile: "DIGITAL<br>STRATEGIE",
    webTechnologies: "WEBTECHNOLOGIEN",
    webTechnologiesMobile: "WEB<br>TECHNOLOGIEN",
    coolAnimations: "COOLE ANIMATIONEN",
    coolAnimationsMobile: "COOLE<br>ANIMATIONEN",
    graphicDesign: "GRAFIKDESIGN",
    graphicDesignMobile: "GRAFIKDESIGN",
    seoReach: "SEO-REICHWEITE",
    seoReachMobile: "SEO<br>REICHWEITE",
    aiImplementation: "KI-IMPLEMENTIERUNG",
    aiImplementationMobile: "KI<br>UMSETZUNG",
    onlineShops: "ONLINE-SHOPS",
    onlineShopsMobile: "ONLINE<br>SHOPS",

    indexSubtitle: `Willkommen zu meinem Portfolio <br>als Webentwickler und Designer`,
    clickToStart: `Klicken, um zu starten`,
    homeButton: `Projekt starten`,

    wilmerIntroduction: "Ich bin Webentwickler, Grafikdesigner und bildender Künstler mit internationaler Erfahrung in Deutschland, China und Kolumbien. In diesem Portfolio präsentiere ich sowohl berufliche als auch persönliche Projekte, die meinen Ansatz widerspiegeln: Design, Technologie und Kreativität zu verbinden, um digitale Lösungen auf höchstem Niveau zu entwickeln.",
    projectTitle: "PROJEKTE",
    projectContent: "Erfahren Sie in verschiedenen Projektbeispielen, wie ich Kunden mit wirkungsvollem Webdesign und -entwicklung unterstützt habe.",
    projectButton: "Zu meinen Projekten",
    curriculumTitle: `LEBENSLAUF`,
    cvContent: "Entdecken Sie meinen Lebenslauf und erfahren Sie mehr über meine berufliche Erfahrung, meine technischen Fähigkeiten und meinen internationalen Werdegang.",
    curriculumButton: `Zu meinem Lebenslauf`,
    contactTitle: "KONTAKT",
    contactContent: "Möchten Sie mit mir zusammenarbeiten? Haben Sie bereits konkrete Vorstellungen oder möchten Sie gemeinsam erste Ideen entwickeln? Kontaktieren Sie mich gerne – und lassen Sie uns Ihre digitale Zukunft in Bewegung setzen.",
    contactButton: `Zum Kontakt`,

    //Projekte
    projekteTitle: "PROJEKTE",
    joblabKunde: "<strong>Kunde:</strong><br /> Deutscher Akademischer Austauschdienst (DAAD)",
    joblabLeistungen: "<strong>Leistungen:</strong><br/> Webentwicklung - Webdesign - Markenentwicklung - Plakatgestaltung",
    joblabUebersicht: "<strong>Übersicht:</strong><br/>Im Mai und Juni 2024 führte der DAAD in China gemeinsam mit der Deutschen Botschaft, dem Goethe-Institut und weiteren Partnern das Projekt Job Lab durch. Die Messe bot unter dem Motto „Mit Deutsch in die Zukunft“ Karriereperspektiven für chinesische Germanistik-Studierende.",
    blancecKunde: "<strong>Kunde:</strong><br/> Laboratorios Blancec S.A.S.",
    blancecLeistungen: "<strong>Leistungen:</strong><br /> Webentwicklung & Design - Markenentwicklung - WebsiteBetreuung",
    blancecUebersicht: "<strong>Übersicht:</strong><br />BLANCEC S.A.S. ist ein kolumbianisches Prüflabor, das sich auf die Zertifizierung von Produkten für die nationale Verteidigungsindustrie spezialisiert hat. Das Labor prüft Ausrüstung und Materialien, damit sie die vom kolumbianischen Verteidigungsministerium geforderten technischen Normen und Sicherheitsvorschriften (u. a. NTS- und MINDEN-Standards) erfüllen.",
    banderasTitle: "BANDERAS NILA LOPEZ",
    banderasKunde: "<strong>Kunde:</strong><br /> Banderas Nila Lopez",
    banderasLeistungen: "<strong>Leistungen:</strong><br /> Webentwicklung & Design - Markenentwicklung - WebsiteBetreuung",
    banderasUebersicht: "<strong>Übersicht:</strong><br />Banderas Nila Lopez ist ein kolumbianisches Unternehmen, das sich auf die Herstellung und den Vertrieb von hochwertigen Textilprodukten spezialisiert hat. Das Projekt umfasst die Entwicklung einer modernen Website, die das Markenimage stärkt und die Online-Präsenz des Unternehmens verbessert.",
    tarotTitle: "INTERACTIVES TAROT",
    tarotKunde: "<strong>Projekt:</strong><br /> Persönliches Projekt in Entwicklung",
    tarotLeistungen: "<strong>Tech Stack:</strong><br /> JavaScript · OpenAI API · HTML/CSS · Vercel · Node.js",
    tarotUebersicht: "<strong>Übersicht:</strong><br />Ein persönliches Projekt in Entwicklung: Eine interaktive Tarot-Webanwendung, die die ChatGPT-API nutzt, um personalisierte Karteninterpretationen zu generieren. Das Projekt kombiniert modernes Frontend-Design mit serverloser Backend-Architektur und demonstriert den Einsatz von KI zur Erstellung dynamischer, mehrsprachiger Inhalte.",
    stopdesertTitle: "STOP THE DESERT",
    stopdesertKunde: "<strong>Projekt:</strong><br /> Ehrenamtliches Projekt",
    stopdesertLeistungen: "<strong>Tech Stack:</strong><br /> WordPress · Kadence · HTML/CSS · JavaScript · Spendensystem",
    stopdesertUebersicht: "<strong>Übersicht:</strong><br />Stop the Desert ist eine NGO, die die Wüstenbildung weltweit bekämpft. Das Projekt umfasst die Verwaltung der WordPress-Website mit Kadence und die Implementierung eines Spendensystems, das Landwirte direkt unterstützt.",
    vollstaendigeFallstudie: "Vollständige Fallstudie ansehen",

    //Joblab
    joblabTitle1: "PROJEKTÜBERSICHT & ZIELSETZUNG",
    joblabContent1: "<strong>Einführung des Job Labs:</strong><br><br>Das Job Lab ist ein Projekt, das vom DAAD (Deutscher Akademischer Austauschdienst) China in Auftrag gegeben und in enger Zusammenarbeit mit der Deutschen Botschaft in Peking sowie den Deutschen Generalkonsulaten in Shanghai und Guangzhou entwickelt wurde. Sein zentrales Ziel: Chinesische Studierende der deutschen Sprache über Karrierechancen auf dem deutschen Arbeitsmarkt zu informieren - durch eine speziell entwickelte digitale Plattform sowie praxisorientierte Vor-Ort-Veranstaltungen.",
    joblabTitle2: "WICHTIGE AKTEURE & KOOPERATIONEN",
    joblabContent2: "<strong>Ein Netzwerk internationaler Partner:</strong><br><br>Das Job Lab vereinte zentrale Akteure aus den Bereichen internationale Bildung und Kulturaustausch. Gemeinsam mit dem DAAD, den deutschen Auslandsvertretungen in Guangzhou, Shanghai und Peking, dem German Centre Shanghai, dem German Centre Beijing, der AHK Greater China, Advantage Austria, dem OeAD und dem Goethe-Institut Peking haben wir eine kooperative Plattform geschaffen. DAAD-Lektoren aus ganz China unterstützten die Workshops und sorgten für ein fundiertes und fachkundig geleitetes Programm.",
    joblabTitle3: "WEBENTWICKLUNG & MEHRSPRACHIGER FOKUS",
    joblabContent3: "<strong>Eine Plattform für internationale Partner:</strong><br><br>Wir haben eine vollständig zweisprachige Website in Deutsch und Chinesisch entwickelt. Diese Plattform diente als Informationszentrale und bot Details zum Arbeitsmarkt, aktuelle Veranstaltungsupdates und relevante Ressourcen. Von der Verwaltung des Webhostings und der Domains bis hin zur kontinuierlichen Aktualisierung der Inhalte sorgten wir dafür, dass die Plattform stets aktuell und wertvoll für ihr vielfältiges Publikum blieb.",
    joblabTitle4: "MOBILE- & WECHAT-OPTIMIERUNG",
    joblabContent4: "<strong>Perfekte Performance für mobile Nutzer:</strong><br><br>Unsere Zielgruppe nutzt überwiegend mobile Geräte und WeChat. Daher haben wir die Website so entwickelt, dass sie auf mobilen Browsern nahtlos funktioniert - inklusive spezieller JavaScript-Erkennung für WeChat. Dieser Ansatz stellte sicher, dass die Nutzer die benötigten Informationen genau dort abrufen konnten, wo sie sich am meisten aufhalten - für eine maßgeschneiderte und ansprechende Benutzererfahrung.",
    joblabTitle5: "BRANDING & PRINTMATERIALIEN",
    joblabContent5: "<strong>Eine einheitliche visuelle Identität:</strong><br><br>Über den digitalen Bereich hinaus haben wir eine starke Markenidentität entwickelt. Dazu gehörte die Gestaltung des Projektlogos, die Erstellung auffälliger Webgrafiken sowie die Produktion von über 20 informativen Postern für die Ausstellungsevents. Diese Poster, die bei den Job Lab-Veranstaltungen präsentiert wurden, vermittelten den Besuchern klare und strukturierte Informationen über den Arbeitsmarkt und verstärkten so die bildungsfördernde Wirkung des Projekts.",
    joblabTitle6: "ERFOLG & RESONANZ DER VERANSTALTUNGEN",
    joblabContent6: "<strong>Hohe Beteiligung & positives Feedback:</strong><br><br>Die Job Lab-Veranstaltungen in Guangzhou, Shanghai und Peking zogen rund 300 Besucher an. Die Teilnehmenden beteiligten sich an lebhaften Diskussionen, stellten durchdachte Fragen und blieben während des gesamten Tagesprogramms aktiv dabei. Diese begeisterte Resonanz unterstreicht den Wert des Projekts und schafft eine starke Grundlage für eine jährliche Wiederholung, wodurch sich das Job Lab zu einer potenziell fortlaufenden Tradition entwickeln könnte.",

    //Blancec
    blancecTitle1: "PROJEKTÜBERBLICK",
    blancecContent1: "Vollständige Neugestaltung und Neuentwicklung der offiziellen Website für Laboratorio Blancec, ein von ONAC akkreditiertes Industrielabor für Prüfungen in Bogotá, Kolumbien. Die vorherige Website wies strukturelle Fehler und ein schwaches Design auf. Ich habe sie von Grund auf neu aufgebaut und eine klare, funktionale und professionelle digitale Präsenz geschaffen, die den Standards des Unternehmens entspricht.",
    blancecTitle2: "TECH-STACK",
    blancecContent2: "Entwickelt mit CodeIgniter 4 (PHP), einer MySQL-Datenbank und explizitem MVC-Routing. Das Frontend nutzt Bootstrap 4, AOS-Scroll-Animationen, CountUp.js und jQuery-Plugins. Benutzerdefiniertes CSS deckt Typografie (Raleway), responsive Tabellen und Layout ab. Alte URLs geben den Status 410 Gone zurück, um die SEO-Integrität der vorherigen Website zu bewahren.",
    blancecTitle3: "SEO & STRUKTURIERTE DATEN",
    blancecContent3: "Jede Seite erzeugt dynamische Meta-Tags: Canonical-URLs, Open-Graph-Tags für das Teilen in sozialen Netzwerken, Twitter Cards und strukturierte JSON-LD-Daten (Schemas für Organization und WebPage). Das sorgt für eine korrekte Indexierung, erweiterte Suchergebnisse und konsistente Vorschaubilder in sozialen Medien in allen Bereichen der Website.",
    blancecTitle4: "FUNKTIONEN & MERKMALE",
    blancecContent4: "Die Website präsentiert die fünf Dienstleistungsbereiche des Labors, Qualitätspolitiken, Akkreditierungsinformationen und ein Beschwerdeverfahren. Ein Kontaktformular verarbeitet verschiedene Anfragearten mit serverseitiger Validierung, CSRF-Schutz und E-Mail-Versand über SMTP. Eine eingebettete Google Map und direkte Kontaktdaten vervollständigen den Kommunikationsbereich.",
    blancecTitle5: "DESIGN & UX",
    blancecContent5: "Jedes UI-Element wurde von Grund auf gestaltet: Sticky-Navigation, Hero-Bereiche pro Seite, mobiles Hamburger-Menü, Smooth-Scroll-Anker und eine Preloader-Animation. Alle Layouts sind vollständig responsiv. Die visuelle Identität nutzt eine konsistente Typografie, strukturierte Kartenraster und eine professionelle Farbpalette, die zu einem industriellen Prüflabor passt.",
    blancecTitle6: "ROLLE & WARTUNG",
    blancecContent6: "Ich war der alleinige Entwickler und Designer und verantwortlich für Architektur, UI/UX, Backend-Logik, SEO-Metadaten (Open Graph, strukturierte JSON-LD-Daten) und Deployment. Das Projekt ist live und abgeschlossen. Ich übernehme weiterhin laufende Wartung, Inhaltsaktualisierungen und technischen Support im Rahmen eines Servicevertrags mit dem Kunden.",

    // Banderas Nila López
    banderasSubtitle: "Unternehmenswebsite <br>Live-Projekt (in Entwicklung) <br>Einzelentwickler & Designer",
    banderasTitle1: "PROJEKTÜBERSICHT",
    banderasContent1: "Entwicklung einer modernen, leistungsoptimierten Website für ein kolumbianisches Flaggenunternehmen, das sich auf die Produktion von nationalen, Firmen-, internationalen und institutionellen Flaggen spezialisiert hat. Die Plattform dient sowohl als digitaler Showroom als auch als Kanal zur Kundengewinnung.",
    banderasTitle2: "TECHNISCHE UMSETZUNG",
    banderasContentBullet1: "Entwicklung einer Vue.js 3-Website mit komponentenbasierter Architektur, Lazy Loading und Performance-Optimierung.",
    banderasContentBullet2: "Implementierung einer dynamischen Produktgalerie mit über 450 Bildern mithilfe von Masonry.js-Layout, Intersection Observer API und Batch-Rendering für optimale Performance.",
    banderasContentBullet3: "Design und Entwicklung von 8 modularen Komponenten mit responsivem Mobile-First-Design für eine reibungslose Benutzererfahrung auf allen Geräten.",
    banderasContentBullet4: "Entwicklung eines progressiven Ladesystems zur Reduzierung der Ladezeit durch gestaffeltes Einbinden von Komponenten und asynchrones Laden von Bildern.",
    banderasTitle3: "MEINE ROLLE",
    banderasContent3: "Full-Stack-Entwickler & UI/UX-Designer – Alleinige Verantwortung für:",
    banderasContentBullet5: "Komplette Frontend-Entwicklung und -Architektur",
    banderasContentBullet6: "UI/UX-Design und responsive Layouts",
    banderasContentBullet7: "Strategien zur Performance-Optimierung",
    banderasContentBullet8: "Komponentenarchitektur und Zustandsverwaltung",
    banderasContentBullet9: "Bildmanagement und -optimierung",
    banderasTitle4: "VERWENDETE TECHNOLOGIEN",
    banderasContent4: "Vue.js 3 (Composition API) • JavaScript (ES6+) • HTML5 • CSS3 • Masonry.js • Intersection Observer API • LocalStorage API • Responsive Web Design",
    liveWebsite: "Live-Website ansehen",

    // Interaktives Tarot
    eineKarte: "Eine Karte ziehen",
    eineTriade: "Eine Triade ziehen",
    tarotInstrucciones: "Anweisungen:",
    tarotInstrucciones2: "1. Formuliere eine Frage <br>2. Ziehe eine Karte oder eine Triade<br>3. Drehe die Karten durch Anklicken um<br>4. Drücke den Button, um das Orakel zu befragen.",
    seleccionaBaraja: "Wähle ein Kartendeck",
    deckSurrealista: "Surrealistisches Deck",
    deckBarroca: "Barockes Deck",
    deckDadaista: "Dadaistisches Deck",
    deckBacon: "Expressionistisches Deck",
    deckGiger: "Postapokalyptisches Deck",
    deckBosch: "Mittelalterliches Deck",
    placeholder: "Schreibe hier deine Frage an das Orakel...",
    preguntarOraculo: "Das Orakel befragen",
    oraculo_primero_tirada: "Ziehe zuerst eine Karte oder eine Triade.",
    oraculo_escribe_pregunta: "Bitte schreibe eine Frage für das Orakel.",
    oraculo_consultando: "Das Orakel wird befragt...",
    oraculo_error_servidor: "Serverfehler: ",
    oraculo_problema: "Das Orakel hat ein Problem gefunden.",
    oraculo_detalles: "\nDetails: ",
    oraculo_silencio: "Das Orakel schweigt im Moment (unerwartete Antwort).",
    oraculo_error_hablar: "Es gab einen Fehler beim Sprechen mit dem Orakel.",

    //Kontakt
    heroTitle: 'KONTAKT',
    chooseUsTitle: "ARBEITEN WIR ZUSAMMEN?",
    chooseUsText: "Sind Sie auf der Suche nach einem engagierten Webentwickler für Ihr Team oder Ihr nächstes Projekt?<br><br>Wenn Sie Unterstützung für Ihr Projekt benötigen oder jemanden suchen, der sich engagiert in neue Aufgaben einarbeitet, freue ich mich über eine Kontaktaufnahme. Gerne bespreche ich mit Ihnen, wie ich Ihr Team und Ihre Ziele bestmöglich unterstützen kann.",
    impressumTitle: 'IMPRESSUM',
    impressumText: "Gesetzliche Vertretung: Wilmer Aderbert Florez Lopez <br>Calle 75 # 58-51 – 111211 Bogotá, Kolumbien<br>wilmerkopernikus@gmail.com<br>Registriert und rechtlich vertreten in Bogotá, Kolumbien.<br>Umsatzsteuer (MwSt) ist auf internationale Transaktionen nicht anwendbar.",
    formTitle: 'KONTAKTIEREN SIE MICH!',
    formNameLabel: 'Ihr Name:',
    formEmailLabel: 'Ihre E-Mail:',
    formMessageLabel: 'Ihre Nachricht:',
    formSubmit: 'Senden',
  },

  en: {

    //menu
    menuIndex: `Home`,
    menuProjekte: `Projects`,
    menuCV: `Curriculum Vitae`,
    menuKontakt: `Contact`,

    //index
    digitalStrategy: "DIGITAL STRATEGY",
    digitalStrategyMobile: "DIGITAL<br>STRATEGY",
    webTechnologies: "WEB TECHNOLOGIES",
    webTechnologiesMobile: "WEB<br>TECHNOLOGIES",
    coolAnimations: "COOL ANIMATIONS",
    coolAnimationsMobile: "COOL<br>ANIMATIONS",
    graphicDesign: "GRAPHIC DESIGN",
    graphicDesignMobile: "GRAPHIC<br>DESIGN",
    seoReach: "SEO REACH",
    seoReachMobile: "SEO<br>REACH",
    aiImplementation: "AI IMPLEMENTATION",
    aiImplementationMobile: "AI<br>IMPLEMENTATION",
    onlineShops: "ONLINE SHOPS",
    onlineShopsMobile: "ONLINE<br>SHOPS",

    indexSubtitle: `Welcome to my portfolio <br> as a web developer and designer`,
    clickToStart: `Click me to start`,
    homeButton: `Start a Project`,

    wilmerIntroduction: "I am a web developer, graphic designer, and visual artist with international experience in Germany, China, and Colombia. In this portfolio, I present both professional and personal projects that reflect my approach: combining design, technology, and creativity to develop high-quality digital solutions.",
    projectTitle: `PROJECTS`,
    projectContent: `Discover a selection of project examples that show how I have supported clients through impactful web design and development.`,
    projectButton: `View my projects`,
    curriculumTitle: `CURRICULUM VITAE`,
    cvContent: "Explore my resume and learn more about my professional experience, technical skills, and international background.",
    curriculumButton: `View my CV`,
    contactTitle: `CONTACT`,
    contactContent: `Would you like to work with me? Whether you already have a clear vision or want to develop initial ideas together, feel free to get in touch — and let’s set your digital future in motion.`,
    contactButton: `Go to contact`,

    //Projekte
    projekteTitle: "PROJECTS",
    joblabKunde: "<strong>Client</strong><br/>German Academic Exchange Service (DAAD)",
    joblabLeistungen: "<strong>My responsibilities:</strong><br/>Brand Design - Poster Design - Web Development - Website Design",
    joblabUebersicht: `<strong>Overview</strong><br/>In May and June 2024, the DAAD in China, together with the German Embassy, the Goethe-Institut, and other partners, carried out the Job Lab project. Under the motto “Into the Future with German,” the fair offered career opportunities for Chinese students of German studies.`,
    blancecKunde: "<strong>Client</strong><br /> Blancec Laboratories S.A.S.",
    blancecLeistungen: "<strong>My responsibilities:</strong><br /> Web Development & Design - Brand Design - Website maintenance",
    blancecUebersicht: "<strong>Overview</strong><br />BLANCEC S.A.S. is a Colombian testing laboratory specialized in the certification of products for the national defense industry. The laboratory tests equipment and materials to ensure they comply with the technical standards and safety regulations required by the Colombian Ministry of Defense (including NTS and MINDEN standards).",
    banderasTitle: "BANDERAS NILA LOPEZ",
    banderasKunde: "<strong>Client:</strong><br /> Banderas Nila Lopez",
    banderasLeistungen: "<strong>My responsibilities:</strong><br /> Web Development & Design - Brand Development - Website Maintenance",
    banderasUebersicht: "<strong>Overview:</strong><br />Banderas Nila Lopez is a Colombian company specializing in the production and distribution of high-quality textile products. The project involves developing a modern website that strengthens the brand image and improves the company's online presence.",
    tarotTitle: "INTERACTIVE TAROT",
    tarotKunde: "<strong>Project:</strong><br /> Personal Project in Development",
    tarotLeistungen: "<strong>Tech Stack:</strong><br /> JavaScript · OpenAI API · HTML/CSS · Vercel · Node.js",
    tarotUebersicht: "<strong>Overview:</strong><br />A personal project in development: an interactive tarot web application that uses the ChatGPT API to generate personalized card interpretations. The project combines modern frontend design with serverless backend architecture, demonstrating the use of AI for creating dynamic, multilingual content.",
    stopdesertTitle: "STOP THE DESERT",
    stopdesertKunde: "<strong>Project:</strong><br /> Volunteer Work",
    stopdesertLeistungen: "<strong>Tech Stack:</strong><br /> WordPress · Kadence · HTML/CSS · JavaScript · Donation System",
    stopdesertUebersicht: "<strong>Overview:</strong><br />Stop the Desert is an NGO fighting desertification worldwide. The project involves managing the WordPress website with Kadence and implementing a donation system that directly supports farmers.",
    vollstaendigeFallstudie: "View Full Case Study",

    //Joblab
    joblabTitle1: "PROJECT OVERVIEW & PURPOSE",
    joblabContent1: "<strong>Introducing the Job Lab:</strong><br><br>Job Lab is a project commissioned by the DAAD (German Academic Exchange Service), China, and developed in close collaboration with the German Embassy in Beijing and the German Consulates in Shanghai and Guangzhou. Its core mission: to inform Chinese students of the German language about job market opportunities in Germany, offering them practical guidance and resources through a dedicated digital platform and on-site events.",
    joblabTitle2: "KEY STAKEHOLDERS & COLLABORATIONS",
    joblabContent2: "<strong>A Network of International Partners:</strong><br><br>The Job Lab brought together key players in international education and cultural exchange. Working alongside the DAAD, German foreign representations in Guangzhou, Shanghai, and Beijing, the German Centre Shanghai, the German Centre Beijing, the AHK Greater China, Advantage Austria, the OeAD, and the Goethe-Institut Beijing, we created a truly collaborative environment. DAAD lecturers from across China supported workshops, ensuring a comprehensive and expert-led program.",
    joblabTitle3: "WEB DEVELOPMENT & MULTILINGUAL FOCUS",
    joblabContent3: "<strong>A Network of International Partners:</strong><br><br>We designed and developed a fully bilingual website in German and Chinese. This platform served as an information hub, hosting job market details, event updates, and relevant resources. From managing web hosting and domains to continuously updating site content, we ensured the platform remained current and valuable to its diverse audience.",
    joblabTitle4: "MOBILE & WECHAT OPTIMIZATION",
    joblabContent4: "<strong>Perfect performance for mobile users::</strong><br><br>Our target audience relied heavily on mobile devices and WeChat. We built the site to perform seamlessly on mobile browsers, including special JavaScript detection for WeChat. This focus ensured that users could conveniently access the information right where they spend most of their time, resulting in a tailored and engaging user experience.",
    joblabTitle5: "BRANDING & PRINT MATERIALS",
    joblabContent5: "<strong>A Cohesive Visual Identity:</strong><br><br>Beyond the digital sphere, we developed a strong brand identity. This included designing the project's logo, creating eye-catching web graphics, and producing over 20 informative posters for exhibition events. These posters, displayed at the Job Lab events, provided visitors with clear, structured information about job markets, ultimately enhancing the educational impact of the project.",
    joblabTitle6: "EVENT SUCCESS & RECEPTION",
    joblabContent6: "<strong>High Engagement & Positive Feedback:</strong><br><br>The Job Lab events in Guangzhou, Shanghai, and Beijing attracted around 300 visitors. Attendees engaged in lively discussions, asked thoughtful questions, and remained present throughout the day's program. This enthusiastic reception underscored the project's value and set a strong precedent for annual repetition, turning the Job Lab into a potential ongoing tradition.",

    //Blancec
    blancecTitle1: "PROJECT OVERVIEW",
    blancecContent1: "Full redesign and redevelopment of the official website for Laboratorio Blancec, an ONAC-accredited industrial testing laboratory in Bogotá, Colombia. The previous site had structural errors and poor design. I rebuilt it from scratch, delivering a clean, functional, and professional digital presence aligned with the company's standards.",
    blancecTitle2: "TECH STACK",
    blancecContent2: "Built on CodeIgniter 4 (PHP) with a MySQL database and explicit MVC routing. Frontend uses Bootstrap 4, AOS scroll animations, CountUp.js, and jQuery plugins. Custom CSS covers typography (Raleway), responsive tables, and layout. Legacy URLs return 410 Gone to preserve SEO integrity from the old site.",
    blancecTitle3: "SEO & STRUCTURED DATA",
    blancecContent3: "Each page generates dynamic meta tags: canonical URLs, Open Graph tags for social sharing, Twitter Cards, and JSON-LD structured data (Organization + WebPage schemas). This ensures proper indexing, rich search results, and consistent social media previews across all sections of the site.",
    blancecTitle4: "FEATURES & FUNCTIONALITY",
    blancecContent4: "The site presents the company's five laboratory service areas, quality policies, accreditation information, and a complaints process. A contact form handles multiple request types with server-side validation, CSRF protection, and SMTP email delivery. An embedded Google Map and direct contact details complete the communication section.",
    blancecTitle5: "DESIGN & UX",
    blancecContent5: "Designed every UI element from scratch: sticky navigation, hero sections per page, mobile hamburger menu, smooth-scroll anchors, and a preloader animation. All layouts are fully responsive. The visual identity uses consistent typography, structured card grids, and a professional color palette appropriate for an industrial laboratory.",
    blancecTitle6: "ROLE & MAINTENANCE",
    blancecContent6: "I was the sole developer and designer — responsible for architecture, UI/UX, backend logic, SEO metadata (Open Graph, JSON-LD structured data), and deployment. The project is live and complete. I continue providing ongoing maintenance, content updates, and technical support under a service agreement with the client.",


    // Banderas Nila López
    banderasSubtitle: "Company Website <br>Live Project (in Development) <br>Solo Developer & Designer",
    banderasTitle1: "PROJECT OVERVIEW",
    banderasContent1: "Development of a modern, high-performance website for a Colombian flag company specializing in the production of national, corporate, international, and institutional flags. The platform serves as both a digital showroom and a customer acquisition channel.",
    banderasTitle2: "TECHNICAL IMPLEMENTATION",
    banderasContentBullet1: "Development of a Vue.js 3 website with component-based architecture, lazy loading, and performance optimization.",
    banderasContentBullet2: "Implementation of a dynamic product gallery with more than 450 images using a Masonry.js layout, the Intersection Observer API, and batch rendering for optimal performance.",
    banderasContentBullet3: "Design and development of 8 modular components with responsive mobile-first design for a seamless user experience across all devices.",
    banderasContentBullet4: "Development of a progressive loading system to reduce loading time through staggered component loading and asynchronous image loading.",
    banderasTitle3: "MY ROLE",
    banderasContent3: "Full-stack developer & UI/UX designer – Sole responsibility for:",
    banderasContentBullet5: "Complete frontend development and architecture",
    banderasContentBullet6: "UI/UX design and responsive layouts",
    banderasContentBullet7: "Performance optimization strategies",
    banderasContentBullet8: "Component architecture and state management",
    banderasContentBullet9: "Image management and optimization",
    banderasTitle4: "TECHNOLOGIES USED",
    banderasContent4: "Vue.js 3 (Composition API) • JavaScript (ES6+) • HTML5 • CSS3 • Masonry.js • Intersection Observer API • LocalStorage API • Responsive Web Design",
    liveWebsite: "Visit the Website",

    // Interactive Tarot
    eineKarte: "Draw one card",
    eineTriade: "Draw a triad",
    tarotInstrucciones: "Instructions:",
    tarotInstrucciones2: "1. Formulate a question <br>2. Draw one card or a triad<br>3. Flip the cards by clicking on them<br>4. Press the button to consult the oracle.",
    seleccionaBaraja: "Choose a deck",
    deckSurrealista: "Surrealist Deck",
    deckBarroca: "Baroque Deck",
    deckDadaista: "Dadaist Deck",
    deckBacon: "Expressionist Deck",
    deckGiger: "Postapocalyptic Deck",
    deckBosch: "Medieval Deck",
    placeholder: "Write your question to the oracle here...",
    preguntarOraculo: "Ask the oracle",
    oraculo_primero_tirada: "First perform a draw (one card or triad).",
    oraculo_escribe_pregunta: "Please write a question for the oracle.",
    oraculo_consultando: "Consulting the oracle...",
    oraculo_error_servidor: "Server error: ",
    oraculo_problema: "The oracle encountered a problem.",
    oraculo_detalles: "\nDetails: ",
    oraculo_silencio: "The oracle remains silent for now (unexpected response).",
    oraculo_error_hablar: "There was an error communicating with the oracle.",

    //Kontakt
    heroTitle: 'CONTACT',
    chooseUsTitle: "LET'S WORK TOGETHER!",
    chooseUsText: "Are you looking for a dedicated web developer for your team or your next project?<br><br>If you need support for your project or are looking for someone who quickly and proactively takes on new tasks, I would be happy to hear from you, and would gladly discuss how I can best support your team and help you achieve your goals.",
    impressumTitle: 'LEGAL NOTICE',
    impressumText: "Legal representative: Wilmer Aderbert Florez Lopez <br>Calle 75 # 58-51 – 111211 Bogotá, Colombia<br>wilmerkopernikus@gmail.com<br>Registered and legally represented in Bogotá, Colombia.<br>VAT is not applicable to international transactions.",
    formTitle: 'CONTACT ME',
    formNameLabel: 'Your name:',
    formEmailLabel: 'Your email:',
    formMessageLabel: 'Your message:',
    formSubmit: 'Send',
  },

  es: {
    //Menu
    menuIndex: 'Inicio',
    menuProjekte: 'Proyectos',
    menuCV: 'Currículum Vitae',
    menuKontakt: 'Contacto',

    //Index
    digitalStrategy: "ESTRATEGIA DIGITAL",
    digitalStrategyMobile: "ESTRATEGIA<br>DIGITAL",
    webTechnologies: "TECNOLOGÍAS WEB",
    webTechnologiesMobile: "TECNOLOGÍAS<br>WEB",
    coolAnimations: "ANIMACIONES GENIALES",
    coolAnimationsMobile: "ANIMACIONES<br>GENIALES",
    graphicDesign: "DISEÑO GRÁFICO",
    graphicDesignMobile: "DISEÑO<br>GRÁFICO",
    seoReach: "ALCANCE SEO",
    seoReachMobile: "ALCANCE<br>SEO",
    aiImplementation: "IMPLEMENTACIÓN DE IA",
    aiImplementationMobile: "APLICACIÓN<br> DE IA",
    onlineShops: "TIENDAS ONLINE",
    onlineShopsMobile: "TIENDAS<br>ONLINE",

    indexSubtitle: 'Bienvenido a mi portafolio <br> como desarrollador web y diseñador',
    clickToStart: `Toca para comenzar`,
    homeButton: `Iniciar un proyecto`,
    wilmerIntroduction: "Soy desarrollador web, diseñador gráfico y artista visual con experiencia internacional en Alemania, China y Colombia. En este portafolio presento tanto proyectos profesionales como personales que reflejan mi enfoque: combinar diseño, tecnología y creatividad para desarrollar soluciones digitales de alta calidad.",
    projectTitle: 'PROYECTOS',
    projectContent: 'Descubre una selección de ejemplos de proyectos que muestran cómo he apoyado a los clientes a través de un diseño y desarrollo web impactantes.',
    projectButton: 'Ver mis proyectos',
    curriculumTitle: 'CURRÍCULUM VITAE',
    cvContent: 'Explora mi currículum y conoce más sobre mi experiencia profesional, habilidades técnicas y trayectoria internacional.',
    curriculumButton: 'Ver mi CV',
    contactTitle: 'CONTACTO',
    contactContent: '¿Te gustaría trabajar conmigo? Ya sea que ya tengas una visión clara o quieras desarrollar ideas iniciales juntos, no dudes en ponerte en contacto conmigo y pongamos en marcha tu futuro digital.',
    contactButton: 'Ir al contacto',

    //Projekte
    projekteTitle: 'PROYECTOS',
    joblabKunde: '<strong>Cliente:</strong><br/>Servicio Alemán de Intercambio Académico (DAAD)',
    joblabLeistungen: '<strong>Qué hicimos:</strong><br/>Diseño de marca - Diseño de carteles - Desarrollo web - Diseño de sitios web',
    joblabUebersicht: '<strong>Resumen:</strong><br/>En mayo y junio de 2024, el DAAD en China, junto con la Embajada de Alemania, el Goethe-Institut y otros socios, llevó a cabo el proyecto Job Lab. Bajo el lema "Hacia el futuro con alemán", la feria ofreció oportunidades profesionales para estudiantes chinos de estudios alemanes.',
    blancecKunde: '<strong>Cliente:</strong><br/>Laboratorios Blancec S.A.S.',
    blancecLeistungen: '<strong>Qué hicimos:</strong><br/>Desarrollo y diseño web - Diseño de marca - Mantenimiento del sitio web',
    blancecUebersicht: '<strong>Resumen:</strong><br/>BLANCEC S.A.S. es un laboratorio de pruebas colombiano especializado en la certificación de productos para la industria de defensa nacional. El laboratorio prueba equipos y materiales para garantizar que cumplan con las normas técnicas y regulaciones de seguridad requeridas por el Ministerio de Defensa de Colombia (incluidas las normas NTS y MINDEN).',
    banderasTitle: "BANDERAS NILA LOPEZ",
    banderasKunde: "<strong>Cliente:</strong><br /> Banderas Nila Lopez",
    banderasLeistungen: "<strong>Mis Responsabilidades:</strong><br /> Desarrollo & Diseño web - Desarrollo de marca - Mantenimiento del sitio web",
    banderasUebersicht: "<strong>Resumen:</strong><br />Banderas Nila López es una empresa colombiana especializada en la producción y distribución de productos textiles de alta calidad. El proyecto consiste en desarrollar un sitio web moderno que fortalezca la imagen de marca y mejore la presencia online de la empresa.",
    tarotTitle: "TAROT INTERACTIVO",
    tarotKunde: '<strong>Proyecto:</strong><br/>Proyecto Personal en Desarrollo',
    tarotLeistungen: '<strong>Tech Stack:</strong><br/>JavaScript · OpenAI API · HTML/CSS · Vercel · Node.js',
    tarotUebersicht: '<strong>Resumen:</strong><br/>Un proyecto personal en desarrollo: una aplicación web interactiva de tarot que utiliza la API de ChatGPT para generar interpretaciones personalizadas de cartas. El proyecto combina diseño frontend moderno con arquitectura backend sin servidor, demostrando el uso de IA para crear contenido dinámico y multilingüe.',
    stopdesertTitle: "STOP THE DESERT",
    stopdesertKunde: '<strong>Proyecto:</strong><br/>Trabajo Voluntario',
    stopdesertLeistungen: '<strong>Tech Stack:</strong><br/>WordPress · Kadence · HTML/CSS · JavaScript · Sistema de Donaciones',
    stopdesertUebersicht: '<strong>Resumen:</strong><br/>Stop the Desert es una ONG que combate la desertificación a nivel mundial. El proyecto incluye la gestión del sitio web WordPress con Kadence y la implementación de un sistema de donaciones que apoya directamente a los agricultores.',
    vollstaendigeFallstudie: 'Ver Caso de Estudio Completo',

    //Joblab
    joblabTitle1: 'RESUMEN Y PROPÓSITO DEL PROYECTO',
    joblabContent1: '<strong>Presentando el Job Lab:</strong><br><br>Job Lab es un proyecto encargado por el DAAD (Servicio Alemán de Intercambio Académico), China, y desarrollado en estrecha colaboración con la Embajada de Alemania en Pekín y los Consulados Alemanes en Shanghái y Cantón. Su misión principal: informar a los estudiantes chinos del idioma alemán sobre las oportunidades del mercado laboral en Alemania, ofreciéndoles orientación práctica y recursos a través de una plataforma digital dedicada y eventos presenciales.',
    joblabTitle2: 'PARTES INTERESADAS CLAVE Y COLABORACIONES',
    joblabContent2: '<strong>Una red de socios internacionales:</strong><br><br>El Job Lab reunió a actores clave en educación internacional e intercambio cultural. Trabajando junto al DAAD, las representaciones extranjeras alemanas en Cantón, Shanghái y Pekín, el German Centre Shanghai, el German Centre Beijing, la AHK Greater China, Advantage Austria, el OeAD y el Goethe-Institut Beijing, creamos un entorno verdaderamente colaborativo. Los profesores del DAAD de toda China apoyaron los talleres, asegurando un programa integral y dirigido por expertos.',
    joblabTitle3: 'DESARROLLO WEB Y ENFOQUE MULTILINGÜE',
    joblabContent3: '<strong>Una red de socios internacionales:</strong><br><br>Diseñamos y desarrollamos un sitio web completamente bilingüe en alemán y chino. Esta plataforma sirvió como un centro de información, alojando detalles del mercado laboral, actualizaciones de eventos y recursos relevantes. Desde la gestión del alojamiento web y los dominios hasta la actualización continua del contenido del sitio, nos aseguramos de que la plataforma se mantuviera actualizada y valiosa para su diversa audiencia.',
    joblabTitle4: 'OPTIMIZACIÓN MÓVIL Y WECHAT',
    joblabContent4: '<strong>Rendimiento perfecto para usuarios móviles:</strong><br><br>Nuestra audiencia objetivo dependía en gran medida de los dispositivos móviles y WeChat. Construimos el sitio para que funcionara sin problemas en navegadores móviles, incluida una detección especial de JavaScript para WeChat. Este enfoque aseguró que los usuarios pudieran acceder cómodamente a la información justo donde pasan la mayor parte de su tiempo, lo que resulta en una experiencia de usuario personalizada y atractiva.',
    joblabTitle5: 'BRANDING Y MATERIALES IMPRESOS',
    joblabContent5: '<strong>Una identidad visual cohesiva:</strong><br><br>Más allá del ámbito digital, desarrollamos una fuerte identidad de marca. Esto incluyó el diseño del logotipo del proyecto, la creación de gráficos web llamativos y la producción de más de 20 carteles informativos para eventos de exhibición. Estos carteles, exhibidos en los eventos de Job Lab, proporcionaron a los visitantes información clara y estructurada sobre los mercados laborales, mejorando en última instancia el impacto educativo del proyecto.',
    joblabTitle6: 'ÉXITO Y RECEPCIÓN DEL EVENTO',
    joblabContent6: '<strong>Alta participación y comentarios positivos:</strong><br><br>Los eventos de Job Lab en Cantón, Shanghái y Pekín atrajeron a alrededor de 300 visitantes. Los asistentes participaron en discusiones animadas, hicieron preguntas reflexivas y permanecieron presentes durante todo el programa del día. Esta recepción entusiasta subrayó el valor del proyecto y sentó un fuerte precedente para la repetición anual, convirtiendo a Job Lab en una posible tradición continua.',

    //Blancec
    // Spanish
    blancecTitle1: "DESCRIPCIÓN DEL PROYECTO",
    blancecContent1: "Rediseño y redearrollo completo del sitio web oficial de Laboratorio Blancec, un laboratorio industrial de ensayos acreditado por ONAC en Bogotá, Colombia. El sitio anterior tenía errores estructurales y un diseño deficiente. Lo reconstruí desde cero, entregando una presencia digital limpia, funcional y profesional, alineada con los estándares de la empresa.",
    blancecTitle2: "STACK TECNOLÓGICO",
    blancecContent2: "Desarrollado con CodeIgniter 4 (PHP), una base de datos MySQL y enrutamiento MVC explícito. El frontend utiliza Bootstrap 4, animaciones de scroll con AOS, CountUp.js y plugins de jQuery. El CSS personalizado cubre la tipografía (Raleway), tablas responsivas y el layout. Las URLs antiguas devuelven un estado 410 Gone para preservar la integridad SEO del sitio anterior.",
    blancecTitle3: "SEO Y DATOS ESTRUCTURADOS",
    blancecContent3: "Cada página genera metaetiquetas dinámicas: URLs canónicas, etiquetas Open Graph para compartir en redes sociales, Twitter Cards y datos estructurados en JSON-LD (esquemas de Organization y WebPage). Esto asegura una indexación correcta, resultados enriquecidos en buscadores y vistas previas consistentes en redes sociales en todas las secciones del sitio.",
    blancecTitle4: "CARACTERÍSTICAS Y FUNCIONALIDAD",
    blancecContent4: "El sitio presenta las cinco áreas de servicio del laboratorio, las políticas de calidad, la información de acreditación y el proceso de quejas. Un formulario de contacto gestiona múltiples tipos de solicitudes con validación del lado del servidor, protección CSRF y envío de correos mediante SMTP. Un mapa de Google incrustado y los datos de contacto directos completan la sección de comunicación.",
    blancecTitle5: "DISEÑO Y UX",
    blancecContent5: "Diseñé cada elemento de la interfaz desde cero: navegación sticky, secciones hero por página, menú hamburguesa para móvil, anclas con smooth scroll y una animación de precarga. Todos los layouts son completamente responsivos. La identidad visual utiliza una tipografía consistente, rejillas de tarjetas estructuradas y una paleta de colores profesional apropiada para un laboratorio industrial.",
    blancecTitle6: "ROL Y MANTENIMIENTO",
    blancecContent6: "Fui el único desarrollador y diseñador, responsable de la arquitectura, UI/UX, lógica backend, metadatos SEO (Open Graph, datos estructurados JSON-LD) y despliegue. El proyecto está en línea y terminado. Continúo ofreciendo mantenimiento continuo, actualizaciones de contenido y soporte técnico bajo un acuerdo de servicio con el cliente.",
    // Banderas Nila López
    banderasSubtitle: "Sitio Web Empresarial <br>Proyecto en Vivo (en Desarrollo) <br>Desarrollador y Diseñador Único",
    banderasTitle1: "DESCRIPCIÓN DEL PROYECTO",
    banderasContent1: "Desarrollo de un sitio web moderno y de alto rendimiento para una empresa colombiana de banderas especializada en la producción de banderas nacionales, corporativas, internacionales e institucionales. La plataforma funciona tanto como catálogo digital como canal de adquisición de clientes.",
    banderasTitle2: "IMPLEMENTACIÓN TÉCNICA",
    banderasContentBullet1: "Desarrollo de un sitio web en Vue.js 3 con arquitectura basada en componentes, lazy loading y optimización del rendimiento.",
    banderasContentBullet2: "Implementación de una galería dinámica de productos con más de 450 imágenes mediante un diseño con Masonry.js, la API Intersection Observer y renderizado por lotes para un rendimiento óptimo.",
    banderasContentBullet3: "Diseño y desarrollo de 8 componentes modulares con diseño responsive mobile-first para una experiencia de usuario fluida en todos los dispositivos.",
    banderasContentBullet4: "Desarrollo de un sistema de carga progresiva para reducir el tiempo de carga mediante la incorporación escalonada de componentes y la carga asíncrona de imágenes.",
    banderasTitle3: "MI ROL",
    banderasContent3: "Desarrollador full-stack y diseñador UI/UX – Responsabilidad total sobre:",
    banderasContentBullet5: "Desarrollo y arquitectura completa del frontend",
    banderasContentBullet6: "Diseño UI/UX y layouts responsive",
    banderasContentBullet7: "Estrategias de optimización del rendimiento",
    banderasContentBullet8: "Arquitectura de componentes y gestión del estado",
    banderasContentBullet9: "Gestión y optimización de imágenes",
    banderasTitle4: "TECNOLOGÍAS UTILIZADAS",
    banderasContent4: "Vue.js 3 (Composition API) • JavaScript (ES6+) • HTML5 • CSS3 • Masonry.js • API Intersection Observer • API LocalStorage • Diseño web responsive",
    liveWebsite: "Sitio web en vivo",

    //Interaktives Tarot
    eineKarte: "Saca una carta",
    eineTriade: "Saca una triada",
    tarotInstrucciones: "Instrucciones:",
    tarotInstrucciones2: "1. Formula una pregunta <br>2. Saca una carta o una triada<br>3. Voltea las cartas dandoles click<br>4. Presiona el botón consultar al oráculo.",
    seleccionaBaraja: "Escoge una baraja",
    deckSurrealista: "Baraja Surrealista",
    deckBarroca: "Baraja Barroca",
    deckDadaista: "Baraja Dada\u00edsta",
    deckBacon: "Baraja Expresionista",
    deckGiger: "Baraja postapocalíptica",
    deckBosch: "Baraja Medieval",
    placeholder: "Escribe aquí tu pregunta al oráculo...",
    preguntarOraculo: "Preguntar al oráculo",
    oraculo_primero_tirada: "Primero realiza una tirada (una carta o triada).",
    oraculo_escribe_pregunta: "Por favor escribe una pregunta para el oráculo.",
    oraculo_consultando: "Consultando al oráculo...",
    oraculo_error_servidor: "Error del servidor: ",
    oraculo_problema: "El oráculo encontró un problema.",
    oraculo_detalles: "\nDetalles: ",
    oraculo_silencio: "El oráculo guarda silencio por ahora (respuesta inesperada).",
    oraculo_error_hablar: "Hubo un error al hablar con el oráculo.",

    //Kontakt
    heroTitle: "Contacto",
    chooseUsTitle: "¡TRABAJEMOS JUNTOS!",
    chooseUsText: "¿Buscas un desarrollador web dedicado para tu equipo o tu próximo proyecto?<br><br>Si necesitas apoyo para tu proyecto o estás buscando a alguien que asuma nuevas tareas de manera rápida y proactiva, estaré encantado de saber de ti y discutir cómo puedo apoyar mejor a tu equipo y ayudarte a alcanzar tus objetivos.",
    impressumTitle: "AVISO LEGAL",
    impressumText: "Representante legal: Wilmer Aderbert Florez Lopez <br>Calle 75 # 58-51 – 111211 Bogotá, Colombia<br>wilmerkopernikus@gmail.com<br>Registrado y legalmente representado en Bogotá, Colombia.<br>El IVA no es aplicable a las transacciones internacionales.",
    formTitle: "CONTÁCTAME",
    formNameLabel: "Tu nombre:",
    formEmailLabel: "Tu correo electrónico:",
    formMessageLabel: "Tu mensaje:",
    formSubmit: "Enviar",
  }
};

let currentLang = 'de';

function applyLanguage(lang) {
  const dict = languagesContent[lang];
  if (!dict) return;

  // 1) Actualizar textos de la página
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const value = dict[key];
    if (!value) return;

    // Si el elemento es input o textarea y el key sugiere placeholder, usar el atributo placeholder
    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') &&
      key.toLowerCase().includes('placeholder')) {
      el.placeholder = value;
    } else {
      el.innerHTML = value;
    }
  });

  // 2) Guardar idioma actual en la variable
  currentLang = lang;
  if (typeof window !== "undefined") {
    window.currentLang = lang;
  }

  // 3) Guardar idioma en localStorage para futuras páginas
  try {
    localStorage.setItem('preferredLang', lang);
  } catch (e) {
    // Si localStorage no está disponible, simplemente lo ignoramos
  }

  // 4) Actualizar el texto del label "DE ▼"
  const currentLangLabel = document.querySelector('.language-selector .current-lang');
  if (currentLangLabel) {
    currentLangLabel.textContent = lang.toUpperCase() + ' ▼';
  }

  // 5) Ocultar el idioma actual de la lista de opciones
  document.querySelectorAll('.language-selector .lang-button[data-lang]').forEach((btn) => {
    const btnLang = btn.dataset.lang;
    if (btnLang === lang) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'block';
    }
  });
}


// Función para detectar el idioma del navegador
function detectBrowserLanguage() {
  try {
    // navigator.language devuelve códigos como "de-DE", "en-US", "es-ES"
    const browserLang = navigator.language || navigator.userLanguage;
    // Extraer solo el código principal (ej: "de" de "de-DE")
    const langCode = browserLang.split('-')[0].toLowerCase();

    // Verificar si tenemos ese idioma disponible
    if (languagesContent[langCode]) {
      return langCode;
    }

    // Si no tenemos el idioma, usar inglés como fallback
    return 'en';
  } catch (e) {
    // En caso de error, devolver inglés
    return 'en';
  }
}

// Al cargar cada página
document.addEventListener('DOMContentLoaded', () => {
  // 1) Intentar leer el idioma guardado
  let savedLang = null;
  try {
    savedLang = localStorage.getItem('preferredLang');
  } catch (e) {
    savedLang = null;
  }

  // 2) Si hay un idioma guardado y existe en languagesContent, úsalo
  if (savedLang && languagesContent[savedLang]) {
    currentLang = savedLang;
  } else {
    // Si no hay idioma guardado, detectar el idioma del navegador
    currentLang = detectBrowserLanguage();
  }

  // 3) Aplicar idioma al cargar
  applyLanguage(currentLang);

  // 4) Listeners para los botones de idioma
  document.querySelectorAll('.lang-button[data-lang]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.dataset.lang;
      applyLanguage(lang);
      // Ocultar el menú de idiomas tras seleccionar
      const langToggle = document.getElementById('langToggle');
      if (langToggle) langToggle.checked = false;
    });
  });
});


