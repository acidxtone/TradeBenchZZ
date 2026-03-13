import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { BannerAd } from '@/components/ads/AdSense';
import { SiteNavLinks } from '@/components/SiteNavLinks';

/**
 * Privacy Policy Page
 * Content from TradeBenchPrep Privacy Policy (Effective February 17, 2026)
 */
const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TradeBenchPrep</span>
          </Link>
          <SiteNavLinks />
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Effective Date: February 17, 2026</p>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              This Privacy Policy describes how TradeBenchPrep ("we", "us", or "our") collects, uses, and handles information when you use our free exam preparation application for skilled trades in Canada (the "App"). By accessing or using the App, you agree to the terms of this Privacy Policy.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">We collect the following types of information in connection with your use of the App:</p>
              <p className="text-gray-600 mb-4"><strong>a) Information Stored on Your Browser:</strong> Certain data, such as your quiz progress, saved answers, and preferences, is stored locally in your browser using cookies, localStorage, or similar browser-based storage technologies. This data remains on your device and is controlled by you. Clearing your browser data will remove this information.</p>
              <p className="text-gray-600 mb-4"><strong>b) Temporarily Stored Backend Data:</strong> When you use the App, certain technical and usage data may be temporarily transmitted to and stored on our backend servers. This may include, but is not limited to, session identifiers, device and browser type, IP address, pages visited, and interaction data. This data is automatically and permanently deleted from our servers within seven (7) days of collection.</p>
              <p className="text-gray-600 mb-4"><strong>c) Account or Profile Information (if applicable):</strong> If you create an account or user profile, we may collect information you voluntarily provide, such as a username or email address.</p>
              <p className="text-gray-600 mb-4"><strong>d) Automatically Collected Data:</strong> We may automatically collect certain technical information, including your IP address, browser type, operating system, referring URLs, and usage statistics, for the purpose of maintaining and improving the App.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>To provide, operate, and maintain the App and its features;</li>
                <li>To monitor and analyze usage and trends to improve user experience;</li>
                <li>To diagnose technical problems and ensure the security of the App;</li>
                <li>To serve relevant advertisements through third-party advertising networks (see Section 5 below);</li>
                <li>To comply with applicable legal obligations.</li>
              </ul>
              <p className="text-gray-600 mt-4">We do not sell your personal information to third parties.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Data Retention</h2>
              <p className="text-gray-600 mb-4"><strong>Backend Data:</strong> Any data temporarily stored on our backend servers is automatically and permanently deleted within seven (7) days of collection. We do not retain personally identifiable backend data beyond this period.</p>
              <p className="text-gray-600"><strong>Browser Data:</strong> Data stored locally in your browser persists until you clear your browser storage or use the deletion feature within the App. We have no control over browser-stored data after it is saved to your device.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Your Right to Delete Your Information</h2>
              <p className="text-gray-600">
                At any time, you may delete your stored information by visiting the Settings page within the App and using the "Delete My Data" option. This will remove data stored in association with your session or account from our backend systems. Note that browser-stored data (e.g., localStorage) may need to be cleared separately through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Advertising</h2>
              <p className="text-gray-600 mb-4">
                The App is free to use and is supported by third-party advertising. We work with advertising partners who may use cookies, web beacons, or similar tracking technologies to serve you ads based on your browsing activity and interests. These third-party advertisers may collect information about your device and online activity in accordance with their own privacy policies.
              </p>
              <p className="text-gray-600">
                We are not responsible for the privacy practices of third-party advertising networks. We encourage you to review the privacy policies of any third parties whose ads are displayed in the App. You may be able to opt out of interest-based advertising through industry tools such as the Digital Advertising Alliance of Canada (DAAC) at youradchoices.ca or by adjusting your browser or device settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-600">
                We and our advertising partners use cookies and similar tracking technologies to operate the App, remember your preferences, analyze usage, and deliver relevant advertisements. You may configure your browser to refuse cookies; however, doing so may affect the functionality of the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Third-Party Content and Exam Information</h2>
              <p className="text-gray-600">
                All exam preparation content, study materials, and practice questions provided within the App are based on publicly available information, publicly published trade standards, government-issued study guides, and other publicly accessible resources. This content is provided for educational and informational purposes only. We make no representations or warranties regarding the accuracy, completeness, or currency of this content. Passing a trade exam is not guaranteed by use of this App, and results may vary.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600">
                The App is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us and we will take steps to delete it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Data Security</h2>
              <p className="text-gray-600">
                We implement reasonable technical and organizational measures to protect the information we hold. However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security, and by using the App, you acknowledge and accept this risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Links to Third-Party Sites</h2>
              <p className="text-gray-600">
                The App may contain links to external websites or services not operated by us. We are not responsible for the content or privacy practices of those sites and encourage you to review their respective privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-600">
                We reserve the right to update or modify this Privacy Policy at any time. When we do, we will revise the Effective Date at the top of this page. Continued use of the App after changes are posted constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">12. Applicable Law</h2>
              <p className="text-gray-600">
                This Privacy Policy is governed by and construed in accordance with the laws of Canada, including the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation. If you are located in a province with its own private-sector privacy legislation (such as Quebec's Law 25 / Bill 64), additional rights and obligations may apply.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">13. Contact Us</h2>
              <p className="text-gray-600 mb-4">If you have any questions or concerns about this Privacy Policy or how your information is handled, please contact us at:</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>TradeBenchPrep</strong><br />
                  Email: support@tradebenchprep.org<br />
                  Website: https://www.tradebenchprep.org/
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                <strong>Effective Date:</strong> February 17, 2026
              </p>
              <section className="mt-8 pt-8 border-t border-gray-200" aria-label="Advertisement">
                <BannerAd position="bottom" />
              </section>
              <div className="flex gap-4 text-sm mt-6">
                <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                <Link to="/Terms" className="text-blue-600 hover:underline">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
