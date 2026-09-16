// Case-study copy derived from the current source trees for each application.
// Claims intentionally describe shipped scope rather than invented metrics.
const launchUrl = (publicUrl) => publicUrl

export const projectCaseStudies = {
  eyebrow: 'Four products. Four different problems.',
  title: 'Selected systems',
  intro:
    'RabbitHole is the central body of work. The other three projects reveal how the same way of thinking moves between medicine, media, learning, and commerce.',
  tabs: [
    {
      id: 'rabbithole',
      glyph: 'R',
      color: '#b7ff5e',
      label: 'RabbitHole · MCTOSH',
      index: '01',
      category: 'Flagship · MCTOSH clinical reasoning infrastructure',
      heading: 'RabbitHole',
      tagline: 'Where my medical experience and systems thinking become one body of work.',
      summary:
        'RabbitHole is my main project and highest goal. MCTOSH is its underlying technical and conceptual architecture: a clinical reasoning environment that separates source evidence from interpretation and organizes patient reality through a formal ontology. It brings document forensics, semantic decomposition, reasoning graphs, patient intake, simulation, and multimodal study into one evolving system.',
      thesis:
        'Clinical software should model how knowledge is formed—not merely store notes, labels, and generated answers.',
      ontology: {
        essence: 'A reasoning environment, not a record system',
        entities: ['Patient reality', 'Source evidence', 'Clinical schema', 'Interpretation'],
        relation: 'Evidence is preserved; interpretation remains traceable.',
      },
      role: 'Original clinical ontology, product architecture, UX systems, full-stack and AI engineering',
      audience: 'Clinicians, medical learners, researchers, and patients contributing structured history',
      surfaces: 'Clinical workspace, patient app, PDF laboratory, ontology registry, reasoning tools',
      capabilities: [
        ['Ontology-led reasoning', 'A canonical concept registry distinguishes independent patient reality from clinician-dependent schema, then maps entities, traces, relations, and change into inspectable reasoning structures.'],
        ['Audit-grade document reading', 'The PDF workspace preserves immutable source evidence while reconstructing glyphs, lines, physical blocks, semantic meaning blocks, abbreviations, entities, and narratives through separately testable stages.'],
        ['Clinical simulation', 'Patient instantiation, body mapping, clinical vignette generation, exam tooling, and LiveKit voice conversations connect abstract knowledge to patient-specific encounters.'],
        ['Multimodal knowledge work', 'PDFs, YouTube sources, podcasts, speech recognition, text-to-speech, voice analysis, 3D schemata, and freeform boards become coordinated modes of studying the same material.'],
      ],
      architecture: [
        ['Experience', 'React 19 workspaces for PDF evidence, ontology, reasoning, patients, simulation, and media'],
        ['Core platform', 'Node/Express APIs and a broad MongoDB domain model for clinical and learning state'],
        ['Document pipeline', 'PDF.js evidence, PyMuPDF/page structure, OCR and deterministic reconstruction checks'],
        ['Language pipeline', 'LLM orchestration, terminology evidence, coreference, semantic extraction, and validation'],
        ['Voice + presence', 'LiveKit agents, Whisper speech recognition, TTS/voice cloning, and voice analysis services'],
      ],
      value: [
        'Makes the provenance of clinical interpretation visible instead of hiding it behind an AI answer.',
        'Unifies reading, reasoning, simulation, and patient-derived information around one conceptual model.',
        'Connects medical experience with the product, media, language, and infrastructure lessons developed across the wider portfolio.',
      ],
      tags: ['React 19', 'Node.js', 'MongoDB', 'Python', 'LLM pipelines', 'PDF forensics', 'LiveKit', 'Clinical ontology'],
      publicUrl: 'https://mctoshs.ca/',
      launchUrl: launchUrl('https://mctoshs.ca/'),
      featured: true,
    },
    {
      id: 'dj-khalil',
      glyph: 'K',
      color: '#ff714b',
      label: 'DJ Khalil',
      index: '02',
      category: 'Artist commerce platform',
      heading: 'DJ Khalil',
      tagline: 'A performance website that keeps working after the booking inquiry.',
      summary:
        'DJ Khalil combines artist presentation, service discovery, booking, live broadcasting, and audience song requests in one commercial system. The public experience sells the performance; the operational side carries each request through review, pricing, payment, and delivery.',
      thesis:
        'Turn a DJ website from a passive brochure into the operating surface for the entire client and live-event journey.',
      ontology: {
        essence: 'A performance business as one continuous system',
        entities: ['Artist', 'Client', 'Audience', 'Live set'],
        relation: 'Interest becomes a request; a request becomes an event.',
      },
      role: 'Product strategy, interface design, full-stack engineering, AI workflow design',
      audience: 'Event organizers, private clients, live audiences, and the artist team',
      surfaces: 'Public site, client dashboard, audience request flow, admin workspace',
      capabilities: [
        ['Service-to-quote workflow', 'Authenticated clients can select event services, submit structured requirements, receive an itemized quote, and follow the request instead of losing the conversation in email.'],
        ['Live audience participation', 'Guests can submit one or several song requests, attach source links, pay through Stripe, receive confirmation codes, and enter an artist-controlled review queue.'],
        ['AI-assisted music triage', 'The request agent consolidates metadata such as artist, genre, mood, energy, BPM, key, language, and duplication signals to suggest where a track belongs in the live set.'],
        ['Broadcast and operations', 'LiveKit/WebRTC viewing, live-session management, service pricing, transactions, and audience-request moderation give the artist one backstage control surface.'],
      ],
      architecture: [
        ['Experience', 'React 19 + Vite, responsive public pages, dashboards, booking and live-request interfaces'],
        ['Application', 'Express APIs with validated request contracts, authenticated client and admin roles'],
        ['Commerce', 'Stripe Checkout and signed webhooks, with Brevo notifications and receipts'],
        ['Media + intelligence', 'LiveKit/WebRTC, YouTube audio tooling, and structured request analysis'],
        ['Persistence', 'MongoDB/Mongoose models for users, services, prices, sessions, requests, and transactions'],
      ],
      value: [
        'Converts interest into a structured, trackable service request.',
        'Creates a paid participation channel during live events.',
        'Keeps pricing, audience requests, sessions, and customer communication in one system.',
      ],
      tags: ['React 19', 'Node.js', 'MongoDB', 'Stripe', 'LiveKit', 'WebRTC', 'AI analysis'],
      publicUrl: 'https://khalil.mctoshs.ca/',
      launchUrl: launchUrl('https://khalil.mctoshs.ca/', 'https://djkhalilnahhat.onrender.com/'),
    },
    {
      id: 'noga-planner',
      glyph: 'N',
      color: '#65b8ff',
      label: 'Noga Planner',
      index: '03',
      category: 'Adaptive study operating system',
      heading: 'Noga Planner',
      tagline: 'Planning that connects the curriculum, the evidence, and the work actually done.',
      summary:
        'Noga Planner is a deep academic planning environment inside the broader PhenoMed application. It models programs, intervals, courses, lectures, exams, study sessions, documents, and achievement history so a learner can move from a curriculum plan to daily execution without breaking context.',
      thesis:
        'A study plan becomes useful when it adapts to progress and keeps every learning artifact attached to the work it supports.',
      ontology: {
        essence: 'Curriculum transformed into an adaptive daily practice',
        entities: ['Program', 'Material', 'Study session', 'Outcome'],
        relation: 'Planned work is revised by evidence of work done.',
      },
      role: 'Product modeling, workflow design, full-stack engineering, learning-tool integration',
      audience: 'Students managing long, assessment-heavy academic programs',
      surfaces: 'Study-plan dashboard, exam board, lectures, documents, AI helper, Telegram controls',
      capabilities: [
        ['Program-to-session planning', 'Academic years, terms, intervals, subjects, courses, assessments, passing rules, and study sessions form a navigable hierarchy rather than disconnected calendar events.'],
        ['Progress-aware workflow', 'Session achievements, missed connections, countdown state, predicted work, and exam status keep the active plan responsive to what has actually happened.'],
        ['Learning material workspace', 'A PDF reader, staged documents, lecture tables, saved courses, YouTube-to-text tooling, and AI assistance keep source material adjacent to planning decisions.'],
        ['Connected study environment', 'Telegram control, shared music playback, video compression, voice/video calls, multilingual interfaces, and ECG/phenotype tools extend the planner beyond a to-do list.'],
      ],
      architecture: [
        ['Experience', 'A large React application with modular planner panels and English/Arabic routes'],
        ['Application', 'Express services coordinate planning, content, communication, and user state'],
        ['Persistence', 'MongoDB stores the nested academic model, saved materials, sessions, and preferences'],
        ['Intelligence + media', 'OpenAI-assisted workflows, PDF/OCR tooling, FFmpeg media processing, and LiveKit'],
        ['Specialized services', 'Python ECG analysis and phenotype data capabilities sit beside the study platform'],
      ],
      value: [
        'Replaces fragmented planners, files, messages, and media tools with one academic context.',
        'Preserves the relationship between a task, its source material, its assessment, and its outcome.',
        'Shows how a highly personal workflow can become a durable full-stack product model.',
      ],
      tags: ['React', 'Node.js', 'MongoDB', 'PDF/OCR', 'OpenAI', 'LiveKit', 'FFmpeg', 'Arabic UI'],
      publicUrl: 'https://noga.mctoshs.ca/',
      launchUrl: launchUrl('https://noga.mctoshs.ca/'),
    },
    {
      id: 'rh-iptv',
      glyph: '▻',
      color: '#ffd45e',
      label: 'RH IPTV',
      index: '04',
      category: 'Cross-device streaming platform',
      heading: 'RH IPTV Player',
      tagline: 'One media library, rebuilt for browser, Android, and the living room.',
      summary:
        'RH IPTV Player is a self-hosted streaming platform spanning a browser application, a native Android client, and a Roku SceneGraph channel. It normalizes provider catalogs and gives every screen the same account library, profiles, favorites, playback history, and HLS-only playback contract.',
      thesis:
        'Make inconsistent provider media behave like one coherent, personal streaming service across very different devices.',
      ontology: {
        essence: 'A personal media service independent of device',
        entities: ['Provider media', 'Account library', 'Playback state', 'Device'],
        relation: 'One identity carries one library across every surface.',
      },
      role: 'Platform architecture, streaming pipeline, multi-client UX, backend and device engineering',
      audience: 'Households using private IPTV providers across web, mobile, and television',
      surfaces: 'Browser, native Android, Roku, account portal, connected-device operations',
      capabilities: [
        ['Unified provider library', 'Xtream and M3U sources are normalized into live TV, films, series, episodes, categories, search, EPG, favorites, and continue-watching experiences.'],
        ['Profile-owned continuity', 'Profiles preserve their own favorites, history, resume positions, weather, provider selections, and discovery rails while devices remain linked to one account.'],
        ['HLS playback infrastructure', 'FFmpeg-backed HLS packaging, quality variants, capability-aware Roku playback, absolute seeking, stream leases, and recovery logic turn varied upstream media into a controlled transport.'],
        ['Television-grade localization', 'Custom Roku navigation, Arabic shaping, mirrored catalog rails, bilingual search keyboards, stable focus restoration, and LTR transport controls handle constraints browsers normally solve for free.'],
      ],
      architecture: [
        ['Clients', 'React browser app, native Java/ExoPlayer Android app, and BrightScript/SceneGraph Roku channel'],
        ['Catalog API', 'Node services ingest and cache provider catalogs, categories, metadata, EPG, and account state'],
        ['Streaming plane', 'Dedicated FFmpeg/HLS backend with quality ladders, seek restarts, leases, and capacity controls'],
        ['Identity', 'Account-level device pairing with profile-specific content ownership and continuity'],
        ['Operations', 'Connected-device status, stream visibility, health telemetry, and private-network deployment controls'],
      ],
      value: [
        'Delivers a consistent service where provider portals and device capabilities disagree.',
        'Keeps household identity and viewing state coherent across three client platforms.',
        'Pairs consumer-facing polish with the operational controls required to run streaming infrastructure.',
      ],
      tags: ['React', 'Java', 'BrightScript', 'Node.js', 'MongoDB', 'FFmpeg', 'HLS', 'Roku SceneGraph'],
      publicUrl: 'https://iptv.mctoshs.ca/',
      launchUrl: launchUrl('https://iptv.mctoshs.ca/'),
      android: {
        liveUrl: '',
        apkUrl: '/downloads/app-debug.apk',
      },
    },
  ],
}
