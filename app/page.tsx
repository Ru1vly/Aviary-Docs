import { Terminal, ArrowRight } from 'lucide-react';
import * as motion from "motion/react-client";
import Link from 'next/link';

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#0EA5E9]/10 to-transparent rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#E11D48]/5 to-transparent rounded-full blur-[120px]"
      />
      <svg className="absolute w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M0,50 Q25,30 50,50 T100,50" 
          fill="none" 
          stroke="#2C2E33" 
          strokeWidth="0.2"
          animate={{ d: ["M0,50 Q25,30 50,50 T100,50", "M0,50 Q25,70 50,50 T100,50", "M0,50 Q25,30 50,50 T100,50"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M0,60 Q25,40 50,60 T100,60" 
          fill="none" 
          stroke="#2C2E33" 
          strokeWidth="0.2"
          animate={{ d: ["M0,60 Q25,40 50,60 T100,60", "M0,60 Q25,80 50,60 T100,60", "M0,60 Q25,40 50,60 T100,60"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.path 
          d="M0,40 Q25,20 50,40 T100,40" 
          fill="none" 
          stroke="#2C2E33" 
          strokeWidth="0.2"
          animate={{ d: ["M0,40 Q25,20 50,40 T100,40", "M0,40 Q25,60 50,40 T100,40", "M0,40 Q25,20 50,40 T100,40"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}

export default function AviaryPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F4F2EC] text-[#2C2E33] font-sans selection:bg-[#0EA5E9] selection:text-white pb-24 flex items-center justify-center overflow-hidden">
      <BackgroundAnimation />
      <main className="relative max-w-[1100px] w-full px-6 sm:px-12 py-24 z-10">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto flex flex-col items-center text-center mb-24"
        >
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-[#2C2E33] mb-6 leading-[1.1] tracking-tight">
            Aviary
          </h1>
          <p className="text-lg sm:text-xl text-[#5A5C63] leading-relaxed font-light mb-10 max-w-xl">
            A high-altitude view of your website's health, directly from your terminal.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            <Link href="/docs" className="bg-[#2C2E33] text-white px-8 py-4 rounded-full hover:bg-[#1A1C1F] transition-transform hover:scale-105 duration-300 shadow-[0_8px_20px_-4px_rgba(44,46,51,0.2)] text-[15px] font-medium flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Quick Start
            </Link>
            <Link href="/docs" className="bg-white text-[#2C2E33] px-8 py-4 rounded-full hover:bg-[#FAF9F6] transition-transform hover:scale-105 duration-300 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] text-[15px] font-medium border border-[#EAE8E1] flex items-center gap-2">
              Documentation <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.section>



      </main>
    </div>
  );
}
