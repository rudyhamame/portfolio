import assert from 'node:assert/strict'
import test from 'node:test'
import { buildPortfolioContext, buildPortfolioKnowledge } from '../portfolio-knowledge.js'

test('portfolio assistant knowledge follows the real portfolio case studies', () => {
  const knowledge = buildPortfolioKnowledge()
  for (const project of ['RabbitHole', 'DJ Khalil', 'Long Distance', 'Noga Planner', 'RH IPTV Player']) {
    assert.match(knowledge, new RegExp(`PROJECT: ${project}`))
  }
  assert.match(knowledge, /Clinical medicine/)
  assert.match(knowledge, /Responsive static websites & web apps/)
  assert.doesNotMatch(knowledge, /Example marketing site/)
})

test('retrieval keeps prompts focused while retaining the complete project index', () => {
  const complete = buildPortfolioKnowledge()
  const context = buildPortfolioContext('cross-device streaming and AI engineering')
  assert.ok(context.length < complete.length)
  assert.match(context, /PROJECT: RH IPTV Player/)
  assert.match(context, /PROJECT: DJ Khalil/)
  assert.match(context, /RabbitHole \(medical\)/)
  assert.match(context, /DJ Khalil/)
  assert.match(context, /Noga Planner/)
})
