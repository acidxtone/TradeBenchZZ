import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './page.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageNotFound from '@/lib/PageNotFound'
import { AuthProvider, useAuth } from '@/lib/AuthContext'
import { AdProvider, SideAd, StickyHeaderAd, StickyFooterAd } from '@/components/ads/AdProvider'
import { supabase } from '@/api/supabaseClient'
import React from 'react'
import { Navigate } from 'react-router-dom'
import YearHeader from '@/components/YearHeader'
import UserNotRegisteredError from '@/components/UserNotRegisteredError'
import DebugQuestions from '@/components/DebugQuestions'
import SimpleDebug from '@/components/SimpleDebug'
import ConnectionTest from '@/components/ConnectionTest'
import AuthPage from '@/pages/AuthPage'
import LandingPage from '@/pages/LandingPage'
const { Pages, mainPage } = pagesConfig
const mainPageKey = mainPage ?? Object.keys(Pages)[0]
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>
const PAGES_WITHOUT_YEAR_HEADER = ['YearSelection', 'debug', 'test', 'connection', 'auth']
const LayoutWrapper = ({ children, currentPageName }) => {
  const showYearHeader = !PAGES_WITHOUT_YEAR_HEADER.includes(currentPageName)
  return (
    <>
      {showYearHeader && <YearHeader />}
      {children}
    </>
  )
}
const DebugInfo = () => {
  const [envStatus, setEnvStatus] = React.useState({})
  const [dbStatus, setDbStatus] = React.useState({})
  React.useEffect(() => {
    const envCheck = {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'SET' : 'NOT SET',
      supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    }
    setEnvStatus(envCheck)
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const checkDatabase = async () => {
        try {
          const { data, error } = await supabase.from('questions').select('count')
          const { data: guideData, error: guideError } = await supabase.from('study_guides').select('count')
          setDbStatus({
            questions: error ? 'ERROR' : `${data?.length || 0} questions`,
            studyGuides: guideError ? 'ERROR' : `${guideData?.length || 0} study guides`,
            connection: error || guideError ? 'FAILED' : 'SUCCESS',
          })
        } catch (err) {
          setDbStatus({ connection: 'FAILED', error: err.message })
        }
      }
      checkDatabase()
    } else {
      setDbStatus({ connection: 'SKIPPED', reason: 'Environment variables not set' })
    }
  }, [])
  if (import.meta.env.DEV || dbStatus.connection === 'FAILED') {
    return (
      <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
        <h3 className="font-bold mb-2">Debug Info</h3>
        <div className="mb-3">
          <h4 className="font-semibold">Environment Variables:</h4>
          <div className="text-green-400">{envStatus.supabaseUrl}</div>
          <div className="text-green-400">{envStatus.supabaseKey}</div>
          <div className="text-green-400">{envStatus.googleClientId}</div>
        </div>
        <div>
          <h4 className="font-semibold">Database Status:</h4>
          <div className={dbStatus.connection === 'SUCCESS' ? 'text-green-400' : 'text-red-400'}>
            {dbStatus.connection}
          </div>
          <div className="text-blue-400">{dbStatus.questions}</div>
          <div className="text-blue-400">{dbStatus.studyGuides}</div>
          {dbStatus.error && <div className="text-red-400">{dbStatus.error}</div>}
        </div>
      </div>
    )
  }
  return null
}
const AuthenticatedApp = () => {
  const { isLoadingAuth, isAuthenticated, authError } = useAuth()
  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />
    }
  }
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route key={path} path={`/${path}`} element={
          <LayoutWrapper currentPageName={path}>
            <Page />
          </LayoutWrapper>
        } />
      ))}
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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
function App() {
  return (
    <AdProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <NavigationTracker />
            <SideAd position="left" />
            <SideAd position="right" />
            <StickyHeaderAd />
            <div className="lg:mx-32">
              <AuthenticatedApp />
            </div>
            <StickyFooterAd />
          </Router>
          <Toaster />
          <DebugInfo />
        </QueryClientProvider>
      </AuthProvider>
    </AdProvider>
  )
}
export default App