import {
  about,
  method,
  profile,
  projects,
  services,
  skills,
} from './src/data.js'
import { projectCaseStudies } from './src/projectCaseStudies.js'

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()
const bounded = (value, limit = 360) => {
  const text = clean(value)
  return text.length <= limit ? text : `${text.slice(0, limit).replace(/\s+\S*$/, '')}…`
}

const lines = (items, render) => items.map(render).filter(Boolean).join('\n')

function caseStudyText(study) {
  const sections = [
    `PROJECT: ${clean(study.heading)}`,
    `Category: ${clean(study.category)}`,
    `Tagline: ${clean(study.tagline)}`,
    `Summary: ${clean(study.summary)}`,
    `Design thesis: ${clean(study.thesis)}`,
    `Rudy's role: ${clean(study.role)}`,
    `Audience: ${clean(study.audience)}`,
    `Product surfaces: ${clean(study.surfaces)}`,
    'Capabilities:',
    lines(study.capabilities || [], ([title, body]) => `- ${clean(title)}: ${clean(body)}`),
    'Architecture:',
    lines(study.architecture || [], ([title, body]) => `- ${clean(title)}: ${clean(body)}`),
    'Delivered value:',
    lines(study.value || [], (value) => `- ${clean(value)}`),
    `Technologies: ${(study.tags || []).map(clean).join(', ')}`,
  ]
  return sections.filter(Boolean).join('\n')
}

function corePortfolioKnowledge() {
  const realProjects = projects.filter((project) => !/^example\b/i.test(clean(project.name)))
  return [
    'PROFILE',
    `Name: ${clean(profile.name)}`,
    `Professional identity: ${clean(profile.title)}`,
    `Positioning: ${clean(profile.tagline)}`,
    `Location: ${clean(profile.location)}`,
    `Contact: ${clean(profile.email)}`,
    '',
    'BIOGRAPHY',
    lines(about, (paragraph) => `- ${clean(paragraph)}`),
    '',
    'VERIFIED SKILLS',
    skills.map(clean).join(', '),
    '',
    'CLIENT SERVICES',
    lines(services, (service) => `- ${clean(service.title)}: ${clean(service.body)}`),
    '',
    'WORKING METHOD',
    lines(method, (item) => `- ${clean(item.title)}: ${clean(item.body)}`),
    '',
    'CASE STUDY INDEX',
    lines(projectCaseStudies.tabs || [], (study) =>
      `- ${clean(study.heading)} (${clean(study.category)}): ${clean(study.tagline)}`),
    '',
    'PROJECT INDEX',
    lines(realProjects, (project) => [
      `- ${clean(project.name)} (${clean(project.domain)}): ${bounded(project.blurb)}`,
      `  Technologies: ${(project.tags || []).map(clean).join(', ')}`,
    ].join('\n')),
  ].join('\n')
}

export function buildPortfolioKnowledge() {
  return [
    corePortfolioKnowledge(),
    '',
    'DETAILED CASE STUDIES',
    (projectCaseStudies.tabs || []).map(caseStudyText).join('\n\n'),
  ].join('\n')
}

const SEARCH_STOP_WORDS = new Set([
  'a', 'about', 'all', 'an', 'and', 'are', 'can', 'did', 'does', 'for', 'from',
  'has', 'have', 'he', 'his', 'how', 'i', 'in', 'is', 'it', 'me', 'of', 'on',
  'or', 'rudy', 'that', 'the', 'this', 'to', 'what', 'which', 'with', 'you',
])

function searchTerms(query) {
  return clean(query)
    .toLocaleLowerCase()
    .split(/[^\p{L}\p{N}+#.]+/u)
    .filter((word) => word.length > 1 && !SEARCH_STOP_WORDS.has(word))
}

export function buildPortfolioContext(query, detailCount = 2) {
  const terms = searchTerms(query)
  const ranked = (projectCaseStudies.tabs || [])
    .map((study, index) => {
      const text = caseStudyText(study).toLocaleLowerCase()
      const heading = clean(study.heading).toLocaleLowerCase()
      const words = searchTerms(text)
      const score = terms.reduce((total, term) => {
        const occurrences = words.filter((word) => word === term).length
        return total + Math.min(occurrences, 5) + (heading.includes(term) ? 8 : 0)
      }, 0)
      return { study, index, score }
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, Math.max(1, detailCount))

  return [
    corePortfolioKnowledge(),
    '',
    'MOST RELEVANT DETAILED CASE STUDIES',
    ranked.map(({ study }) => caseStudyText(study)).join('\n\n'),
  ].join('\n')
}

export const portfolioKnowledge = buildPortfolioKnowledge()
