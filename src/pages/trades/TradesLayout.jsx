import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BannerAd, InContentAd } from '@/components/ads/AdSense';
import AnonymousSession from '@/lib/AnonymousSession';

/**
 * Shared layout for all /trades static pages. Matches LandingPage nav and footer styling.
 * Renders: nav (Home + Get Started), optional breadcrumb, children, footer.
 */
export function getGetStartedHandler() {
  return () => {
    AnonymousSession.init(null);
    window.location.href = '/TradeSelection';
  };
}

export default function TradesLayout({ children, breadcrumb }) {
  const handleGetStarted = getGetStartedHandler();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">TradeBenchPrep</span>
            </Link>
            {breadcrumb && (
              <span className="text-slate-400">/</span>
            )}
            {breadcrumb}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/trades" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Trades
            </Link>
            <a href="/jobs.html" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Job Board</a>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        {children}
      </main>

      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">TradeBenchPrep</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <span>&copy; {new Date().getFullYear()} TradeBenchPrep. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function GetStartedButton({ className = '' }) {
  const handleGetStarted = getGetStartedHandler();
  return (
    <Button
      size="lg"
      className={`bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 w-full sm:w-auto ${className}`}
      onClick={handleGetStarted}
    >
      Get Started Free
      <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  );
}

export function TradesAdTop() {
  return (
    <section className="py-4 px-6" aria-label="Advertisement">
      <div className="max-w-6xl mx-auto">
        <BannerAd position="top" />
      </div>
    </section>
  );
}

export function TradesAdMiddle() {
  return (
    <section className="py-6 px-6" aria-label="Advertisement">
      <div className="max-w-5xl mx-auto">
        <InContentAd position="middle" />
      </div>
    </section>
  );
}

export function TradesAdBottom() {
  return (
    <section className="py-8 px-6" aria-label="Advertisement">
      <div className="max-w-6xl mx-auto">
        <BannerAd position="bottom" />
      </div>
    </section>
  );
}
