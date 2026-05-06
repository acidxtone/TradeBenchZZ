import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import PerformanceMonitor from '@/lib/PerformanceMonitor'
import SEO from '@/components/SEO'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from '@/lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import React, { useEffect, lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { initPeriodicCleanup } from '@/lib/SessionCleanup';
import YearHeader from '@/components/YearHeader';
import { VALID_TRADE_SLUGS } from '@/pages/trades/tradesContent';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const Study = lazy(() => import('@/pages/Study'));
const Quiz = lazy(() => import('@/pages/Quiz'));
const QuizSetup = lazy(() => import('@/pages/QuizSetup'));
const Settings = lazy(() => import('@/pages/Settings'));
const Curriculum = lazy(() => import('@/pages/Curriculum'));
const YearSelection = lazy(() => import('@/pages/YearSelection'));
const TradeSelection = lazy(() => import('@/pages/TradeSelection'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const DebugQuestions = lazy(() => import('@/components/DebugQuestions'));
const SimpleDebug = lazy(() => import('@/components/SimpleDebug'));
const ConnectionTest = lazy(() => import('@/components/ConnectionTest'));
const TradesHub = lazy(() => import('@/pages/trades/TradesHub'));
const TradeHubPage = lazy(() => import('@/pages/trades/TradeHubPage'));
const TradeYearPage = lazy(() => import('@/pages/trades/TradeYearPage'));

function RouteLoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

const PAGES_WITHOUT_YEAR_HEADER = ['YearSelection', 'TradeSelection', 'Privacy', 'Terms', 'debug', 'test', 'connection'];

const TRADES_ROUTE_PREFIX = '/trades';

const LayoutWrapper = ({ children, currentPageName }) => {
  const showYearHeader = !PAGES_WITHOUT_YEAR_HEADER.includes(currentPageName);
  return (
    <>
      {showYearHeader && <YearHeader />}
      {children}
    </>
  );
};

/**
 * Renders /trades/* by reading pathname directly so we never depend on Route
 * matching (which can fail on direct load/refresh). Everything else goes to
 * AuthenticatedApp via Routes.
 */
function TradesOrRest() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/'; // normalize trailing slash

  if (path === '/trades') {
    return <TradesHub />;
  }
  const yearMatch = path.match(/^\/trades\/([^/]+)\/year-(\d+)$/);
  if (yearMatch) {
    const [, trade, yearStr] = yearMatch;
    if (VALID_TRADE_SLUGS.includes(trade)) {
      return <TradeYearPage trade={trade} year={yearStr} />;
    }
  }
  const tradeMatch = path.match(/^\/trades\/([^/]+)$/);
  if (tradeMatch) {
    const [, trade] = tradeMatch;
    if (VALID_TRADE_SLUGS.includes(trade)) {
      return <TradeHubPage trade={trade} />;
    }
  }

  return (
    <Routes>
      <Route path="*" element={<AuthenticatedApp />} />
    </Routes>
  );
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/" replace />} />
      {/* Root always shows landing; Get Started sends users to TradeSelection */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/Dashboard" element={
        <LayoutWrapper currentPageName="Dashboard">
          <Dashboard />
        </LayoutWrapper>
      } />
      {/* Add explicit routes for all pages */}
      <Route path="/Study" element={
        <LayoutWrapper currentPageName="Study">
          <Study />
        </LayoutWrapper>
      } />
      <Route path="/Quiz" element={
        <LayoutWrapper currentPageName="Quiz">
          <Quiz key={location.search || 'default'} />
        </LayoutWrapper>
      } />
      <Route path="/QuizSetup" element={
        <LayoutWrapper currentPageName="QuizSetup">
          <QuizSetup />
        </LayoutWrapper>
      } />
      <Route path="/Settings" element={
        <LayoutWrapper currentPageName="Settings">
          <Settings />
        </LayoutWrapper>
      } />
      <Route path="/Curriculum" element={
        <LayoutWrapper currentPageName="Curriculum">
          <Curriculum />
        </LayoutWrapper>
      } />
      <Route path="/Privacy" element={
        <LayoutWrapper currentPageName="Privacy">
          <Privacy />
        </LayoutWrapper>
      } />
      <Route path="/Terms" element={
        <LayoutWrapper currentPageName="Terms">
          <Terms />
        </LayoutWrapper>
      } />
      <Route path="/privacy-policy" element={
        <LayoutWrapper currentPageName="Privacy">
          <Privacy />
        </LayoutWrapper>
      } />
      <Route path="/terms-of-service" element={
        <LayoutWrapper currentPageName="Terms">
          <Terms />
        </LayoutWrapper>
      } />
      <Route path="/TradeSelection" element={
        <LayoutWrapper currentPageName="TradeSelection">
          <TradeSelection />
        </LayoutWrapper>
      } />
      <Route path="/YearSelection" element={
        <LayoutWrapper currentPageName="YearSelection">
          <YearSelection />
        </LayoutWrapper>
      } />
      {import.meta.env.DEV && (
        <>
          <Route path="/debug" element={
            <LayoutWrapper currentPageName="debug">
              <DebugQuestions />
            </LayoutWrapper>
          } />
          <Route path="/test" element={
            <LayoutWrapper currentPageName="test">
              <SimpleDebug />
            </LayoutWrapper>
          } />
          <Route path="/connection" element={
            <LayoutWrapper currentPageName="connection">
              <ConnectionTest />
            </LayoutWrapper>
          } />
        </>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  useEffect(() => {
    initPeriodicCleanup();
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <Suspense fallback={<RouteLoadingFallback />}>
              <SEO />
              <NavigationTracker />
              <PerformanceMonitor />
              <div className="pt-12 md:pt-16 lg:mx-32 min-h-screen">
                <TradesOrRest />
              </div>
            </Suspense>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
