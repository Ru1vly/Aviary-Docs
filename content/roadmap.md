# TODO: Production readiness checklist

This document outlines the remaining tasks to make the aviary checker tool production-ready.

## Known issues / fixes required
- [x] **CLI Testing**: Integration tests time out even with 120s limit (fixed by replacing slow locator auto-waits with page.evaluate).

## Core features enhancement

### SEO checkers
- [x] **Structured Data Validation**
  - [x] JSON-LD schema detection and validation
  - [x] Microdata detection
  - [ ] RDFa support — not implemented
  - [x] Schema.org vocabulary validation — Organization, Person, Product, Article, BreadcrumbList, FAQPage, HowTo, Review, Event, LocalBusiness, WebPage, WebSite, ImageObject
  - [ ] Rich snippets preview — not implemented

- [ ] **Content Analysis** — partial
  - [ ] Keyword density analyzer — not implemented
  - [x] Content readability score (Flesch-Kincaid)
  - [ ] Duplicate content detection — not implemented
  - [x] Word count and content length analysis
  - [x] Internal and external link analysis
  - [ ] Broken link detection — link structure is checked, but nothing crawls links to verify they resolve

- [x] **Technical SEO**
  - [x] Robots.txt validation
  - [x] XML sitemap detection and validation
  - [x] SSL/HTTPS verification
  - [x] Mobile-friendliness test
  - [x] Page speed insights integration
  - [x] Core Web Vitals (LCP, CLS) — real values via `web-vitals`'/`PerformanceObserver`, injected before navigation; plus FCP and TTFB. INP itself isn't reported (it requires a real user interaction this unattended audit never performs) — Total Blocking Time (long-task entries) is the disclosed proxy instead, same as Lighthouse. See docs/ACCURACY_LIMITATIONS.md §3.4
  - [x] Server response time check
  - [x] Redirect chain detection
  - [x] 404 error detection

- [x] **Heatmap & User Experience**
  - [x] Click heatmap generation — predictive, from static DOM position/element-type heuristics, not recorded user interactions
  - [x] Scroll depth tracking
  - [ ] Mouse movement tracking — not implemented
  - [x] Attention heatmap — static heuristic scoring (heading level, above-the-fold, element size), not time-based
  - [x] Visual hierarchy analysis
  - [x] Above-the-fold content detection
      
- [x] **Social Media Optimization**
  - [x] Twitter Card validation
  - [x] Facebook Open Graph validation
  - [ ] LinkedIn meta tags — not implemented
  - [ ] Pinterest rich pins — not implemented
  - [ ] Social share preview generation — not implemented

- [ ] **Accessibility (A11y)** — partial
  - [x] ARIA attributes validation
  - [ ] Color contrast checking — not implemented
  - [x] Keyboard navigation testing (tab order, skip links)
  - [ ] Screen reader compatibility — not implemented
  - [ ] WCAG compliance levels — not implemented

- [x] **Internationalization**
  - [x] hreflang and language declaration validation
  - [x] Character encoding / UTF-8 checks
  - [x] RTL language support detection
  - [x] Geo-targeting signals

- [x] **E-commerce**
  - [x] Product schema, pricing, and review markup validation
  - [x] Checkout and shipping information checks

- [x] **Legal Compliance**
  - [x] Privacy policy, GDPR, and CCPA detection
  - [x] Cookie consent, copyright, and disclaimer checks

## Architecture & code quality

- [x] **Testing**
  - [x] Unit tests for all checkers (Jest/Vitest)
  - [x] Integration tests
  - [x] E2E tests for the tool itself
  - [x] Test coverage > 80%
  - [x] Mock server setup for consistent testing
  - [x] Performance benchmarks

- [x] **Configuration**
  - [x] Configuration file support (JSON, YAML)
  - [x] Custom rule definitions
  - [x] Rule severity levels (error, warning, info)
  - [x] Rule enabling/disabling
  - [x] Preset configurations (basic, advanced, strict)

- [x] **Error Handling**
  - [x] Comprehensive error handling
  - [x] Retry mechanisms for network failures
  - [x] Graceful degradation
  - [x] Detailed error messages
  - [x] Error logging and reporting

- [ ] **Performance**
  - [ ] Parallel checking for multiple URLs
  - [ ] Caching mechanisms
  - [ ] Resource pooling (browser instances)
  - [ ] Memory leak prevention
  - [ ] Optimization for large-scale scanning

## Reporting & output

- [ ] **Report Formats**
  - [x] JSON output
  - [x] HTML report with charts
  - [ ] PDF report generation
  - [ ] CSV export for data analysis
  - [ ] JUnit XML for CI/CD integration
  - [ ] Markdown summary

- [ ] **Visualization**
  - [ ] Interactive dashboard
  - [ ] Charts and graphs (score trends, issue breakdown)
  - [ ] Heatmap visualization overlay
  - [ ] Before/after comparisons
  - [ ] Historical data tracking

- [ ] **Actionable Insights**
  - [ ] Prioritized recommendations
  - [ ] Fix suggestions with code examples
  - [ ] Impact scoring for each issue
  - [ ] Quick wins identification
  - [ ] Competitor comparison

## Developer experience

- [ ] **CLI Tool**
  - [x] Command-line interface
  - [x] Interactive mode — full-screen TUI dashboard
  - [ ] Progress indicators
  - [ ] Watch mode for development
  - [ ] Glob pattern support for multiple URLs
  - [ ] CI/CD integration examples

- [ ] **API**
  - [x] MCP server (stdio) — `seo_audit`, `seo_score`, `seo_check_category` tools for AI agents
  - [ ] REST API server
  - [ ] WebSocket for real-time updates
  - [ ] API authentication
  - [ ] Rate limiting
  - [ ] API documentation (OpenAPI/Swagger)

- [ ] **Documentation**
  - [ ] Comprehensive README
  - [ ] API reference
  - [ ] Configuration guide
  - [ ] Best practices guide
  - [ ] Troubleshooting guide
  - [ ] Contributing guidelines
  - [ ] Example use cases
  - [ ] Video tutorials

- [ ] **IDE Integration**
  - [ ] VSCode extension
  - [ ] Inline warnings in editor
  - [ ] Quick fix actions

## DevOps & deployment

- [x] **CI/CD**
  - [x] GitHub Actions workflow — lint, type-check, and test on every push/PR
  - [x] Automated testing
  - [x] Automated releases
  - [ ] Semantic versioning
  - [x] Changelog generation — auto-generated from commit history between tags

- [x] **Package Distribution**
  - [x] NPM package publishing
  - [x] Docker image — built and pushed on release
  - [ ] Standalone binary (pkg/nexe)
  - [x] GitHub releases with artifacts

- [ ] **Monitoring & Telemetry**
  - [ ] Anonymous usage analytics (opt-in)
  - [ ] Error tracking (Sentry)
  - [ ] Performance monitoring
  - [ ] Feature usage statistics

## Security & privacy

- [ ] **Security Scanning** — partial
  - [x] Dependency vulnerability scanning — npm/cargo audit, SBOM generation, and CodeQL static analysis in CI
  - [ ] Security headers check
  - [ ] XSS vulnerability detection
  - [ ] CORS configuration check
  - [ ] Content Security Policy validation

- [ ] **Privacy**
  - [ ] No data collection by default
  - [ ] GDPR compliance
  - [ ] Cookie consent detection
  - [ ] Privacy policy detection

## Multi-language & internationalization

- [ ] **i18n Support**
  - [ ] Multi-language reports
  - [ ] Language-specific SEO rules
  - [ ] Character encoding detection
  - [ ] RTL language support

## Integrations

- [ ] **Third-party Tools**
  - [ ] Google Search Console API
  - [ ] Google Analytics integration
  - [ ] Ahrefs/SEMrush API integration
  - [ ] PageSpeed Insights API
  - [ ] Lighthouse integration

- [ ] **CMS Plugins**
  - [ ] WordPress plugin
  - [ ] Shopify app
  - [ ] Contentful integration
  - [ ] Netlify plugin

- [ ] **Version Control**
  - [ ] GitHub App
  - [ ] GitLab integration
  - [ ] Bitbucket integration
  - [ ] Pre-commit hooks

## Platform support

- [ ] **Browser Support**
  - [ ] Firefox support
  - [ ] Safari support
  - [ ] Edge support
  - [ ] Mobile browser testing

- [ ] **Operating Systems**
  - [ ] Windows compatibility testing
  - [ ] macOS compatibility testing
  - [ ] Linux compatibility testing

## Community & ecosystem

- [ ] **Community Building**
  - [ ] GitHub Discussions setup
  - [ ] Discord/Slack community
  - [ ] Contributing guidelines
  - [ ] Code of conduct
  - [ ] Issue templates
  - [ ] PR templates

- [ ] **Marketing**
  - [ ] Project website
  - [ ] Blog posts and tutorials
  - [ ] Social media presence
  - [ ] Demo videos
  - [ ] Case studies

## Advanced features

- [ ] **AI/ML Integration**
  - [ ] Content quality scoring using NLP
  - [ ] Automated keyword suggestions
  - [ ] Competitor analysis using ML
  - [ ] Predictive SEO insights

- [ ] **Continuous Monitoring**
  - [ ] Scheduled scans
  - [ ] Alerting system
  - [ ] Regression detection
  - [ ] Performance tracking over time
  - [ ] SEO ranking correlation

- [ ] **Multi-page Analysis**
  - [ ] Entire website crawling
  - [ ] Site-wide report
  - [ ] Link graph analysis
  - [ ] Duplicate content across pages

## Maintenance

- [ ] **Dependencies**
  - [ ] Regular dependency updates
  - [ ] Security patches
  - [ ] Playwright version compatibility
  - [ ] Node.js version compatibility

- [ ] **Deprecation Policy**
  - [ ] Version support policy
  - [ ] Migration guides
  - [ ] Backward compatibility guarantees

---

## Priority levels

**High priority** — essential for v1.0 production release
**Medium priority** — important but can be added in v1.x
**Low priority** — nice to have, can be added in future versions

## Next steps

1. Start with testing infrastructure (unit tests, integration tests)
2. Implement CLI tool for better usability
3. Add configuration file support
4. Enhance reporting with HTML/PDF output
5. Add heatmap functionality (core feature)
6. Implement content analysis features
7. Add structured data validation
8. Build documentation and examples
9. Set up CI/CD pipeline
10. Publish to NPM
