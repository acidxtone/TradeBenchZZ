import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { BannerAd } from '@/components/ads/AdSense';
import { SiteNavLinks } from '@/components/SiteNavLinks';

/**
 * Terms of Service Page
 * Content from TradeBenchPrep Terms of Service (Effective February 17, 2026)
 */
const Terms = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-8">Effective Date: February 17, 2026</p>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              Please read these Terms of Service ("Terms") carefully before using TradeBenchPrep (the "App"), operated by TradeBenchPrep ("we", "us", or "our"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the App.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing, browsing, or using the App in any way, you confirm that you are at least 18 years of age (or the age of majority in your jurisdiction), have read and understood these Terms, and agree to be legally bound by them. These Terms constitute a binding agreement between you and us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Description of the App</h2>
              <p className="text-gray-600">
                The App provides free exam preparation resources for individuals pursuing skilled trades certification in Canada. All study materials, practice questions, and content within the App are derived from publicly available information, government-published trade standards, and other publicly accessible educational resources. The App is provided for informational and educational purposes only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. No Guarantee of Exam Success</h2>
              <p className="text-gray-600">
                Use of the App does not guarantee that you will pass any trade certification exam, licensing test, or other assessment. Results may vary depending on individual effort, prior knowledge, and the specific exam requirements of the certifying body. We make no representation that the content in the App is current, complete, or aligned with any specific exam at any given time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Free Access and Advertising</h2>
              <p className="text-gray-600">
                The App is provided free of charge. To sustain operations and keep the App free, we display third-party advertisements within the App. By using the App, you consent to the display of such advertisements. We are not responsible for the content of third-party advertisements, and the display of an advertisement does not constitute our endorsement of the advertiser or its products and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. User Accounts and Data</h2>
              <p className="text-gray-600 mb-4"><strong>a) Browser-Based Storage:</strong> The App stores certain data (such as progress and preferences) in your browser. You are responsible for the security of your device and browser. We are not liable for unauthorized access to data stored on your device.</p>
              <p className="text-gray-600 mb-4"><strong>b) Backend Storage:</strong> Certain usage data may be temporarily stored on our servers for up to seven (7) days and is then permanently deleted. See our Privacy Policy for further details.</p>
              <p className="text-gray-600"><strong>c) User Deletion:</strong> You may delete your stored information at any time through the Settings page within the App. We are not liable for any loss of data resulting from your use of this feature.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Accuracy of Content</h2>
              <p className="text-gray-600">
                All exam preparation content in the App is based on publicly available information. While we strive to provide accurate and up-to-date material, we make no warranties or representations, express or implied, regarding the accuracy, reliability, completeness, suitability, or timeliness of any content. The App is not a substitute for official study materials provided by trade certification authorities, apprenticeship programs, or regulatory bodies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600">
                The App's design, layout, branding, original code, and any proprietary content created by us are protected by applicable intellectual property laws. All publicly sourced educational content used in the App remains the property of its respective owners. Nothing in these Terms transfers any intellectual property rights to you. You may not reproduce, distribute, modify, or create derivative works from any proprietary portion of the App without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Acceptable Use</h2>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Use the App for any unlawful purpose or in violation of any applicable laws or regulations;</li>
                <li>Attempt to gain unauthorized access to any portion of the App or its related systems;</li>
                <li>Interfere with or disrupt the operation of the App or servers;</li>
                <li>Scrape, harvest, or systematically collect data from the App by automated means;</li>
                <li>Reverse engineer, decompile, or disassemble any aspect of the App;</li>
                <li>Use the App in any way that could damage, disable, overburden, or impair it.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-600">
                THE APP IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL TRADEBENCHPREP, ITS OWNERS, OPERATORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE APP, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF REVENUE, OR FAILURE TO PASS AN EXAM, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-gray-600">
                OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM YOUR USE OF THE APP SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO ACCESS THE APP (IF ANY), OR (B) TWENTY CANADIAN DOLLARS ($20 CAD).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Indemnification</h2>
              <p className="text-gray-600">
                You agree to indemnify, defend, and hold harmless TradeBenchPrep and its owners, operators, officers, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising from: (a) your use of the App; (b) your violation of these Terms; or (c) your violation of any third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">12. Third-Party Links and Services</h2>
              <p className="text-gray-600">
                The App may contain links to third-party websites or services. These links are provided for your convenience only. We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party sites. Accessing third-party sites is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">13. Modifications to the App and Terms</h2>
              <p className="text-gray-600">
                We reserve the right, at our sole discretion, to modify or discontinue the App (or any portion thereof) at any time without notice. We also reserve the right to modify these Terms at any time. Changes become effective when posted, and your continued use of the App constitutes acceptance of the revised Terms. It is your responsibility to review these Terms periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">14. Termination</h2>
              <p className="text-gray-600">
                We reserve the right to suspend or terminate your access to the App at any time, for any reason, without notice. Provisions of these Terms that by their nature should survive termination (including but not limited to disclaimers, limitations of liability, and indemnification) shall survive.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">15. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-600">
                These Terms are governed by and construed in accordance with the laws of the Province of Alberta and the federal laws of Canada applicable therein, without regard to conflict of law principles. Any dispute arising from these Terms or your use of the App shall be resolved in the courts located in Alberta, Canada, and you hereby consent to the exclusive jurisdiction of such courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">16. Entire Agreement</h2>
              <p className="text-gray-600">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and us with respect to your use of the App and supersede all prior agreements, understandings, or representations relating to the same subject matter.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">17. Severability</h2>
              <p className="text-gray-600">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">18. Waiver</h2>
              <p className="text-gray-600">
                Our failure to enforce any provision of these Terms shall not be deemed a waiver of that provision or our right to enforce it in the future.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">19. Contact Us</h2>
              <p className="text-gray-600 mb-4">If you have any questions about these Terms of Service, please contact us at:</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>TradeBenchPrep</strong><br />
                  Email: support@tradebenchprep.org<br />
                  Website: https://www.tradebenchprep.org/
                </p>
              </div>
            </section>

            <section className="mt-8 pt-8 border-t border-gray-200" aria-label="Advertisement">
              <BannerAd position="bottom" />
            </section>
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                <strong>Effective Date:</strong> February 17, 2026
              </p>
              <div className="flex gap-4 text-sm">
                <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                <Link to="/Privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
