import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { api } from '@/lib/api-client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from '@/lib/AuthContext';
import { getYearsForTrade } from '@/lib/trade-config';
import { SiteNavLinks } from '@/components/SiteNavLinks';

const YEAR_LABELS = { 1: "First Year", 2: "Second Year", 3: "Third Year", 4: "Fourth Year" };
const YEAR_DESC = { 1: "Foundation and basics", 2: "Building on fundamentals", 3: "Advanced techniques", 4: "Mastery and specialization" };

export default function YearSelection() {
  const { user, updateMe } = useAuth();
  const [selectedYear, setSelectedYear] = useState(user?.selected_year || null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const yearNumbers = getYearsForTrade(user?.selected_trade || 'SF');
  const years = yearNumbers.map(year => ({ year, label: YEAR_LABELS[year], description: YEAR_DESC[year] }));

  const handleContinue = async () => {
    if (!selectedYear) {
      console.log('🔧 YearSelection: No year selected');
      return;
    }

    setSaving(true);
    try {
      console.log('🔧 YearSelection: Selected year:', selectedYear);
      console.log('🔧 YearSelection: User object:', user);
      
      // Always save to localStorage first (immediate)
      localStorage.setItem('selected_year', selectedYear.toString());
      console.log('🔧 YearSelection: Saved to localStorage');
      
      // Then try to save to user object if authenticated
      if (user && user.id) {
        console.log('🔧 YearSelection: Saving year for authenticated user:', user.id);
        await updateMe({ selected_year: selectedYear });
        console.log('🔧 YearSelection: Saved to user object');
      } else {
        console.log('🔧 YearSelection: User not authenticated, using localStorage only');
      }
      
      // Small delay to ensure localStorage is set before navigation
      setTimeout(() => {
        console.log('🔧 YearSelection: Navigating to Dashboard');
        navigate(createPageUrl('Dashboard'));
      }, 100);
      
    } catch (error) {
      console.error('YearSelection: Failed to save year selection:', error);
      console.log('🔧 YearSelection: Fallback - localStorage already set, navigating anyway');
      // Even if auth fails, localStorage is already set, so navigate
      setTimeout(() => {
        navigate(createPageUrl('Dashboard'));
      }, 100);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4">
      <nav className="bg-white/5 border-b border-white/10 mb-4">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-white/90">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">TradeBenchPrep</span>
          </Link>
          <SiteNavLinks linkClassName="text-sm text-white/80 hover:text-white transition-colors" />
        </div>
      </nav>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center"
      >
        <div className="w-full text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-4">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Which year are you currently studying for?
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Select your apprenticeship year to access the right study materials and track your progress
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full">
            {years.map((item) => (
              <motion.div
                key={item.year}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedYear === item.year
                      ? 'ring-4 ring-white bg-white'
                      : 'bg-white/90 hover:bg-white'
                  }`}
                  onClick={() => setSelectedYear(item.year)}
                >
                  <CardContent className="p-6 relative">
                    {selectedYear === item.year && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    )}
                    <div className="text-5xl font-bold text-slate-800 mb-2">
                      {item.year}
                    </div>
                    <div className="text-xl font-semibold text-slate-800 mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-slate-600">
                      {item.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedYear || saving}
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 px-12 py-6 text-lg font-semibold"
            >
              {saving ? 'Saving...' : 'Start Studying'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
