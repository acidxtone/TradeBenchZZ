import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, GraduationCap } from "lucide-react";
import { useAuth } from '@/lib/AuthContext';
import { getSectionsForTradeYear, getTradeLabel } from '@/lib/trade-config';
import { SiteNavLinks } from '@/components/SiteNavLinks';

const COLOR_CLASSES = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  red: 'bg-red-100 text-red-700 border-red-200',
};

function getStoredTrade() {
  try {
    const t = localStorage.getItem('selected_trade');
    return t != null && t !== '' ? t : 'SF';
  } catch {
    return 'SF';
  }
}

function getStoredYear() {
  try {
    const y = localStorage.getItem('selected_year');
    if (y == null || y === '') return null;
    const n = parseInt(y, 10);
    return Number.isNaN(n) ? null : n;
  } catch {
    return null;
  }
}

export default function Curriculum() {
  const { user } = useAuth();
  // Use localStorage as source of truth so curriculum always matches current trade/year selection
  const trade = user?.selected_trade || getStoredTrade();
  const year = (user?.selected_year != null ? Number(user.selected_year) : null) ?? getStoredYear();

  const sectionInfo = getSectionsForTradeYear(trade, year);
  const sectionEntries = Object.entries(sectionInfo).sort((a, b) => Number(a[0]) - Number(b[0]));
  const sections = sectionEntries.map(([numStr, info]) => ({
    id: Number(numStr),
    name: info.name,
    percentage: info.target,
    color: COLOR_CLASSES[info.color] || COLOR_CLASSES.blue,
  }));

  const tradeLabel = getTradeLabel(trade);

  const officialLinks = [
    {
      title: "Alberta Apprenticeship and Industry Training",
      description: "Official AIT website for apprenticeship information and resources",
      url: "https://tradesecrets.alberta.ca/",
      external: true
    },
    {
      title: "Complete First Year Field Reference — SKILLED TRADES",
      description: "Free first-year field reference: geometry, pressure, flow, offsets, gas laws, electrical formulas for steamfitter/pipefitter and skilled trades.",
      url: "/complete-first-year-field-reference.html",
      external: false
    }
  ];

  if (year == null || Number.isNaN(year)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-2">
            <Link to={createPageUrl('Dashboard')} className="inline-flex items-center text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <SiteNavLinks />
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4 text-center">Curriculum by Trade and Year</h1>
          <p className="text-slate-600 mb-4 max-w-2xl mx-auto text-center">
            The apprenticeship exam is split into sections — each with a name and a percentage of the total exam. Knowing the breakdown helps you focus your study time on the areas that carry the most weight.
          </p>
          <p className="text-slate-600 mb-4 max-w-2xl mx-auto text-center">
            TradeBenchPrep shows the exact section names and weightings for your trade and year. Once you select your trade and year below, you’ll see the full curriculum and can use it to plan study sessions and quizzes.
          </p>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-center">
            Choose your trade and year to view the curriculum and see how the exam is structured for your period.
          </p>
          <div className="text-center">
            <Link to={createPageUrl('TradeSelection')}>
              <span className="text-blue-600 hover:text-blue-700 font-medium">Choose trade and year</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-2">
          <Link to={createPageUrl('Dashboard')} className="inline-flex items-center text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <SiteNavLinks />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Year {year} Curriculum
          </h1>
          <p className="text-slate-600">
            {tradeLabel} — Year {year} exam sections and weighting
          </p>
          <p className="text-sm text-slate-500 mt-1">
            100 Questions • 3 Hours • Pass mark 70%
          </p>
          {sections.length > 0 && (
            <p className="text-sm text-slate-500 mt-1">
              This year covers {sections.length} exam sections: {sections.slice(0, 3).map(s => s.name).join(', ')}{sections.length > 3 ? ' and more.' : '.'}
            </p>
          )}
        </div>

        {/* Curriculum Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section) => (
            <Card key={section.id} className="border-2 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={section.color}>
                        Section {section.id}
                      </Badge>
                      <Badge variant="outline" className="text-slate-600">
                        {section.percentage}% of Exam
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{section.name}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">Topics and skills covered in this section of the exam.</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Helpful Resource Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Helpful Resource Links</h2>
          <p className="text-slate-600 mb-6">
            Access official Alberta AIT resources and program information in the Curriculums page for every trade{' '}
            <a href="https://www.tradebenchprep.org/Curriculum" className="text-blue-600 hover:underline">https://www.tradebenchprep.org/Curriculum</a>
            {' '}alongside the following resources.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {officialLinks.map((link, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1">{link.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{link.description}</p>
                      {link.external ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Visit Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <a
                          href={link.url}
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Open Field Reference
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Exam Information */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Entrance Examination Format</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-1">100</div>
                <div className="text-slate-300 text-sm">Multiple Choice Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-1">3 Hours</div>
                <div className="text-slate-300 text-sm">Time Limit</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-1">70%</div>
                <div className="text-slate-300 text-sm">Passing Score Required</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
