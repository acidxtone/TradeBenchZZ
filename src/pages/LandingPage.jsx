import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Zap, CheckCircle, ArrowRight, Briefcase } from "lucide-react";
import { BannerAd, InContentAd } from '@/components/ads/AdSense';
import AnonymousSession from '@/lib/AnonymousSession';

export default function LandingPage() {
  const handleGetStarted = () => {
    AnonymousSession.init(null);
    window.location.href = '/TradeSelection';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TradeBenchPrep</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/jobs.html" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Job Board</a>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Master Your Trade,<br />
            <span className="text-blue-600">Ace Your Exams</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate quiz and study platform for apprenticeship training. Practice questions, track your progress, and prepare with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 w-full sm:w-auto" onClick={handleGetStarted}>
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </span>
          </div>
        </div>
      </section>

      {/* Top Banner Ad — below hero so users see content before ads (AdSense policy) */}
      <section className="pt-4 pb-4 px-6" aria-label="Advertisement">
        <div className="max-w-6xl mx-auto">
          <BannerAd position="top" />
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-slate-900 text-center mb-2">
            How It Works
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            TradeBenchPrep supports Steamfitter/Pipefitter, Electrician, Millwright, and Welder apprentices preparing for provincial and interprovincial certification exams.
          </p>
          <div className="text-center mb-10">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              <Link to="/trades" className="inline-flex items-center gap-2">
                Explore exam prep by trade and year
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3">1</div>
              <h3 className="font-semibold text-slate-900 mb-1">Pick your trade & year</h3>
              <p className="text-sm text-slate-600">Select your trade and apprenticeship year to see the right materials.</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3">2</div>
              <h3 className="font-semibold text-slate-900 mb-1">Study & take quizzes</h3>
              <p className="text-sm text-slate-600">Use study guides and practice exams by section and difficulty.</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3">3</div>
              <h3 className="font-semibold text-slate-900 mb-1">Track your progress</h3>
              <p className="text-sm text-slate-600">Monitor accuracy and focus on weak areas before exam day.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
            Built specifically for apprentices preparing for their trade qualifications.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-slate-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Practice Quizzes</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hundreds of questions organized by year and topic. Test your knowledge with realistic exam-style questions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <BookOpen className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Study Guides</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Comprehensive study materials covering all key topics in your apprenticeship curriculum.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Zap className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Track Progress</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Monitor your improvement over time with detailed stats and performance insights.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Job board CTA — same style as exam prep CTA */}
          <div className="mt-16 pt-12 border-t border-slate-200 text-center">
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Also explore current jobs in your trade. Browse Canadian skilled trades postings updated weekly.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              <a href="/jobs.html" className="inline-flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Explore Job Board
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-6 px-6" aria-label="Advertisement">
        <div className="max-w-5xl mx-auto">
          <InContentAd position="middle" />
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-12">
            Why Choose TradeBenchPrep for Canadian Trade Exam Prep?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Comprehensive Trade Exam Preparation</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                TradeBenchPrep helps Steamfitter/Pipefitter, Electrician, Millwright, and Welder apprentices prepare for provincial and interprovincial certification exams. Practice by year and topic, track your progress, and close gaps before exam day.
              </p>
              <p className="text-slate-600 leading-relaxed">
                With hundreds of practice questions organized by year and topic, you can focus on specific areas where you need improvement. Questions are designed to match the format and difficulty of Canadian trade certification exams.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Industry-Standard Study Materials</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Study guides and practice materials are aligned with Canadian apprenticeship curriculum—safety and legislation, codes and standards, trade theory and calculations, and trade-specific systems. Content supports all four trades at every level.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you're in Year 1 or preparing for journeyman certification, TradeBenchPrep adapts to your trade and skill level and provides targeted practice to help you succeed.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-1">Key Topics Covered</h3>
            <p className="text-slate-500 text-sm mb-4">Aligned with apprenticeship curriculum for Steamfitter/Pipefitter, Electrician, Millwright, and Welder.</p>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Year 1 - Foundation</h4>
                <ul className="space-y-1">
                  <li>• Workplace safety, legislation & compliance</li>
                  <li>• Tools, equipment & materials</li>
                  <li>• Trade math & calculations</li>
                  <li>• Drawings & documentation basics</li>
                  <li>• Introduction to trade-specific systems</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Year 2 - Intermediate</h4>
                <ul className="space-y-1">
                  <li>• Codes & standards (CEC, ASME, CSA, etc.)</li>
                  <li>• Trade theory & applications</li>
                  <li>• Installation & assembly practices</li>
                  <li>• Quality and inspection basics</li>
                  <li>• Intermediate systems & procedures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Year 3-4 - Advanced</h4>
                <ul className="space-y-1">
                  <li>• Advanced trade theory & systems</li>
                  <li>• Troubleshooting & maintenance</li>
                  <li>• Project planning & documentation</li>
                  <li>• Interprovincial / certification-level practice</li>
                  <li>• Trade-specific advanced topics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-8 px-6" aria-label="Advertisement">
        <div className="max-w-6xl mx-auto">
          <BannerAd position="bottom" />
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">TradeBenchPrep</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/Privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/Terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <span>&copy; {new Date().getFullYear()} TradeBenchPrep. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
