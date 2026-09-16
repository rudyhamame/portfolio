// Edit this file to update the site content.

export const profile = {
  name: 'Rudy Hamame',
  title: 'Physician & Vibe Coder',
  tagline:
    'I build medical and non-medical systems through structured thinking, rapid experimentation, and AI-assisted development. I trust my reasoning, my concepts, and my art—and AI gives me the leverage to turn them into something real.',
  location: 'Remote',
  email: 'rudyhamameca@gmail.com',
  // TODO: replace with your real profile URLs
  github: 'https://github.com/rudyhamame',
  linkedin: 'https://www.linkedin.com/in/your-handle',
  // Drop a file at public/resume.pdf
  resume: '/resume.pdf',
  // Drop your headshot at public/profile.png
  photo: '/profile.png',
}

export const education = {
  degree: 'Doctor of Medicine (MD)',
  faculty: 'Faculty of Medicine',
  university: 'Latakia University',
  formerName: 'formerly Tishreen University',
  location: 'Latakia, Syria',
  dates: 'September 2013 – December 2025',
  logo: 'https://al-raaei.com/sites/alraaei-7.dd/files/styles/768_x_550/public/latakia2.jpg?itok=ovBUemWk',
}

export const about = [
  `I'm a physician and a vibe coder. My clinical training shapes how I
   build: RabbitHole, my main project, is a clinical reasoning model with an
   original ontology for how a patient instance should be conceptualized,
   implemented as a full-stack app backed by a fleet of AI and language
   microservices.`,
  `On the engineering side I work across the whole stack — React and native
   clients, Node/Express and MongoDB services, transcoding and streaming
   pipelines, and Python microservices for OCR, coreference, speech, and voice
   analysis. Recent work also includes an HLS streaming platform with a
   cross-process lease system, a Roku channel, and a native Android client.`,
]

// What I build for clients and collaborators.
export const services = [
  {
    title: 'Responsive static websites & web apps',
    body: `Fast, accessible interfaces that hold up across many browsers and
      screen sizes — from marketing sites to full single-page applications.`,
  },
  {
    title: 'Android apps',
    body: `Native Android clients in Java — media playback, real-time device
      sync, and integration with self-hosted backends.`,
  },
]

// How clinical reasoning carries over into how I build software.
export const method = [
  {
    title: 'Differential diagnosis → debugging',
    body: `I approach a failing system the way I approach a patient: enumerate the
      plausible causes, rank them by likelihood and severity, then run the
      cheapest test that best splits the list. No shotgun fixes.`,
  },
  {
    title: 'Evidence and interpretation are separate',
    body: `A patient's raw findings are not the clinician's mental model of them.
      RabbitHole's analysis pipeline enforces the same rule in code — immutable
      source evidence in, AI interpretation on top, and the model is never
      allowed to overwrite the evidence.`,
  },
  {
    title: 'Define the entity before the schema',
    body: `Before any database design I settle what a patient instance actually
      is — identity versus state, what is independent of the observer and what
      depends on them. The data model follows the ontology, not the other way
      around.`,
  },
  {
    title: 'Name the uncertainty',
    body: `Clinically you flag what you don't know rather than quietly assume it.
      My systems do the same: explicit "uncertain" states, safe fallbacks, and
      failures that surface instead of silently resolving.`,
  },
]

export const skills = [
  'Clinical medicine',
  'Medical ontology design',
  'JavaScript / Node.js',
  'React',
  'Python microservices',
  'LLM / AI pipelines',
  'Java (Android)',
  'BrightScript (Roku)',
  'FFmpeg / HLS',
  'MongoDB',
  'Tailscale / Networking',
  'Linux',
]

export const projects = [
  {
    name: 'RabbitHole',
    domain: 'medical',
    featured: true,
    blurb:
      'A clinical reasoning model and knowledge system built on an original ontology ("Hylonoesis") that formalizes how a patient instance is conceptualized: Reality = R(Patient, Clinician, Mode of Access), with independent Hyle distinguished from dependent Schema, 3D Reality as Identity + State, and 4D Reality as Identity through Change rather than time. A frozen concept registry with dependency/validation rules drives the ontology UI, AI context, and data-model mapping. Shipped as a full-stack app — React 19 + Vite front end, Node/Express + MongoDB back end (~77 models, ~45 API modules) — plus a fleet of local Python microservices: PDF meaning-block reconstruction (immutable PDF.js evidence → visual AI → semantic AI → deterministic validation), a neural glyph/char OCR layer, PyMuPDF + Docling page structure, fastcoref coreference, Whisper STT, Kokoro/Supertonic/OpenVoice TTS and voice cloning, Praat voice analysis, and a LiveKit patient-intake voice agent.',
    tags: [
      'Ontology design',
      'React 19',
      'Node.js',
      'MongoDB',
      'Python microservices',
      'LLM pipelines',
      'PDF.js',
      'LiveKit',
    ],
    link: '',
  },
  {
    name: 'Streaming Platform',
    domain: 'non-medical',
    blurb:
      'End-to-end streaming service: provider catalog snapshots, an HLS transcoding backend with YouTube-style quality rungs, and a hard one-stream-per-provider lease enforced across processes via MongoDB.',
    tags: ['Node.js', 'FFmpeg', 'HLS', 'MongoDB'],
    link: '',
  },
  {
    name: 'Roku Channel',
    domain: 'non-medical',
    blurb:
      'Native Roku app with unified Live TV, favorites and last-watched overrides, an in-player quality selector, and RTL/Arabic keyboard and layout support.',
    tags: ['BrightScript', 'SceneGraph'],
    link: '',
  },
  {
    name: 'Android Client',
    domain: 'non-medical',
    blurb:
      'Native Java Android app that streams from self-hosted backends over Tailscale, forces an HLS transcode ladder for quality selection, does real VOD seek by restarting the ffmpeg job, and registers device heartbeats.',
    tags: ['Java', 'ExoPlayer', 'Tailscale'],
    link: '',
  },
  {
    name: 'Connected Devices Dashboard',
    domain: 'non-medical',
    blurb:
      'Operations dashboard showing linked devices and live streams — provider, status, now-playing, connection health, and server CPU/RAM.',
    tags: ['Node.js', 'Real-time'],
    link: '',
  },
]

// ── Projects page (/projects) ────────────────────────────────────────────────
// Three tabs, each a grid of `items`. Give each item a name, blurb, tags, and
// (optional) url + screenshot in public/shots/. The Android tab also has the
// live emulator on top.

export const projectsPage = {
  tabs: [
    {
      id: 'website',
      label: 'Website',
      heading: 'Responsive websites',
      blurb:
        'Marketing and content sites that stay fast and readable on any browser or screen.',
      items: [
        {
          name: 'Example marketing site',
          blurb: 'One-line description of what it is and what you built.',
          tags: ['React', 'Vite', 'Responsive'],
          url: '',
          screenshot: '',
        },
      ],
    },
    {
      id: 'web-app',
      label: 'Web app',
      heading: 'Web applications',
      blurb:
        'Single-page applications with real state, auth, and data — React front ends on Node/Express and MongoDB back ends.',
      items: [
        {
          name: 'RH IPTV Library',
          blurb:
            'Browser web app for the streaming platform — HLS playback with quality rungs, watch-with-partner, and a connected-devices dashboard, on a Node/Express + MongoDB backend.',
          tags: ['React', 'Node.js', 'MongoDB', 'HLS'],
          url: '',
          screenshot: '',
        },
      ],
    },
    {
      id: 'android',
      label: 'Android app',
      heading: 'Android apps',
      blurb:
        'Native Java Android clients. Launch the real app right here — it streams a live Android device. You can also download the APK to sideload it.',
      items: [
        {
          name: 'RH IPTV Library',
          blurb:
            'Native Java client for the streaming platform — HLS playback, live device sync, and Cloudflare-hosted service endpoints.',
          tags: ['Java', 'ExoPlayer', 'Cloudflare'],
          url: '',
          screenshot: '',
        },
      ],
      android: {
        // Live ws-scrcpy stream of an Android emulator. Only resolves while
        // ws-scrcpy + the emulator are running on the host serving this site
        // (see README → "Android tab"). Leave '' to show the offline fallback.
        liveUrl: '',
        // Direct download link for the APK (file lives in public/downloads/).
        apkUrl: '/downloads/app-debug.apk',
      },
    },
  ],
}
