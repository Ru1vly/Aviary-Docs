import { Activity, Layers, Shield, Cpu, Code2, GitBranch, Github, Box, Settings2, Fingerprint, Lock, Terminal, Wind, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function DocSection({ title, id, children }: { title: string, id: string, children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <h2 className="font-serif text-3xl text-[#2C2E33] mb-6 pb-4 border-b border-[#EAE8E1]">{title}</h2>
      {children}
    </section>
  );
}

function MatrixItem({ icon: Icon, title, description, badge, badgeColor = "bg-[#0EA5E9]/10 text-[#0EA5E9]" }: { icon: any, title: string, description: string, badge?: string, badgeColor?: string }) {
  return (
    <div className="group flex flex-col gap-4 p-6 rounded-2xl bg-white border border-[#EAE8E1] hover:border-[#0EA5E9]/30 hover:shadow-[0_8px_24px_-8px_rgba(14,165,233,0.15)] transition-all duration-500">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-[#FAF9F6] rounded-xl">
          <Icon className="h-5 w-5 text-[#2C2E33]" />
        </div>
        {badge && <span className={`font-mono text-[10px] px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>}
      </div>
      <div>
        <h4 className="font-serif text-lg text-[#2C2E33] mb-2">{title}</h4>
        <p className="text-[13px] text-[#5A5C63] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2E33] font-sans selection:bg-[#0EA5E9] selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#EAE8E1] p-6 sm:px-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[#5A5C63] hover:text-[#2C2E33] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8] flex items-center justify-center">
               <Wind className="w-3 h-3 text-white" />
            </div>
            <span className="font-serif text-lg font-medium tracking-tight">Aviary Docs</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[13px] font-medium text-[#5A5C63]">
          <span className="hidden sm:inline">v1.4.2</span>
          <a href="#" className="flex items-center gap-2 hover:text-[#2C2E33] transition-colors">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-16 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
          <div className="sticky top-32">
            <h3 className="font-serif text-lg text-[#2C2E33] mb-4">On this page</h3>
            <ul className="flex flex-col gap-3 text-[14px] text-[#5A5C63]">
              <li><a href="#validation-checkers" className="hover:text-[#0EA5E9] transition-colors">Validation Checkers</a></li>
              <li><a href="#ci-cd-integration" className="hover:text-[#0EA5E9] transition-colors">CI/CD Integration</a></li>
              <li><a href="#core-engine" className="hover:text-[#0EA5E9] transition-colors">Core Engine</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-[800px] order-1 lg:order-2">
          <div className="mb-16">
            <h1 className="font-serif text-5xl font-medium text-[#2C2E33] mb-6 tracking-tight">Documentation</h1>
            <p className="text-xl text-[#5A5C63] font-light leading-relaxed">
              Comprehensive guide to Aviary's high-concurrency architecture, validation checkers, and CI/CD integrations.
            </p>
          </div>

          <DocSection id="validation-checkers" title="Validation Checkers">
            <p className="text-[#5A5C63] mb-8 leading-relaxed">
              Granular TypeScript validation checkers covering every aspect of technical SEO, performance, and semantic structure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MatrixItem 
                icon={Activity} 
                title="Performance" 
                description="Core Web Vitals approximation and critical rendering path analysis." 
                badge="coreWebVitals.ts"
                badgeColor="bg-[#EAB308]/10 text-[#D97706]"
              />
              <MatrixItem 
                icon={Code2} 
                title="Semantic" 
                description="Strict JSON-LD and Microdata parsing against Schema.org definitions." 
                badge="schemaValidation.ts" 
                badgeColor="bg-[#0EA5E9]/10 text-[#0284C7]"
              />
              <MatrixItem 
                icon={GitBranch} 
                title="Architecture" 
                description="Deep crawl resolution of redirect chains and canonical loops." 
                badge="architecture.ts" 
                badgeColor="bg-[#10B981]/10 text-[#059669]"
              />
              <MatrixItem 
                icon={Shield} 
                title="Security" 
                description="Mixed content, SSL enforcement, and spam heuristic analysis." 
                badge="security.ts" 
                badgeColor="bg-[#E11D48]/10 text-[#BE123C]"
              />
            </div>
          </DocSection>

          <DocSection id="ci-cd-integration" title="CI/CD Integration">
            <p className="text-[#5A5C63] mb-8 leading-relaxed">
              Automate audits in your deployment process. Ships with robust configurations for Docker, Kubernetes CronJobs, and GitHub Actions.
            </p>
            <div className="bg-[#2C2E33] rounded-2xl p-6 font-mono text-[13px] text-[#A0A0A5] overflow-x-auto shadow-inner">
              <div className="text-[#808088] mb-4"># .github/workflows/seo.yml</div>
              <span className="text-[#E11D48]">name:</span> <span className="text-[#E0E0E0]">SEO Audit</span><br />
              <br />
              <span className="text-[#E11D48]">on:</span><br />
              &nbsp;&nbsp;<span className="text-[#E11D48]">push:</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">branches:</span> <span className="text-[#E0E0E0]">[ main ]</span><br />
              <br />
              <span className="text-[#E11D48]">jobs:</span><br />
              &nbsp;&nbsp;<span className="text-[#E0E0E0]">audit:</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">runs-on:</span> <span className="text-[#E0E0E0]">ubuntu-latest</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">steps:</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">- uses:</span> <span className="text-[#E0E0E0]">actions/checkout@v4</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">- name:</span> <span className="text-[#E0E0E0]">Run Aviary strict audit</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">uses:</span> <span className="text-[#E0E0E0]">e2e-seo/action@v1</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">with:</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E11D48]">config:</span> <span className="text-[#A0A0A5]">'.e2e-seo.strict.yaml'</span>
            </div>
          </DocSection>
          
          <DocSection id="core-engine" title="Core Engine">
            <p className="text-[#5A5C63] mb-8 leading-relaxed">
              Built on Rust's <code className="font-mono text-[12px] bg-[#EAE8E1] px-1.5 py-0.5 rounded text-[#2C2E33]">html5ever</code> for 99.9% browser DOM accuracy, bypassing generic regex failures. Includes a Model Context Protocol server for immediate LLM agent integration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="p-6 bg-white border border-[#EAE8E1] rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-4xl font-serif text-[#2C2E33] mb-2">0.8<span className="text-xl text-[#8A8C93]">ms</span></span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A8C93]">Avg Parse Speed</span>
               </div>
               <div className="p-6 bg-white border border-[#EAE8E1] rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-4xl font-serif text-[#0EA5E9] mb-2">256</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A8C93]">Concurrent Workers</span>
               </div>
               <div className="p-6 bg-white border border-[#EAE8E1] rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-4xl font-serif text-[#10B981] mb-2">Ready</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A8C93]">MCP Server</span>
               </div>
            </div>
          </DocSection>

        </main>
      </div>
    </div>
  );
}
