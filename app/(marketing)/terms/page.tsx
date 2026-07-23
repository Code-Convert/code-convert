import InteractiveCursor from '@/components/InteractiveCursor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Code & Convert',
  description: 'Terms and conditions for using Code & Convert services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <InteractiveCursor />
      
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-400 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Code & Convert's services, you accept and agree to be bound by 
              these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
            <p className="mb-4">
              Code & Convert provides web design, e-commerce development, and digital marketing services. 
              Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Custom website design and development</li>
              <li>E-commerce platform development</li>
              <li>Website maintenance and support</li>
              <li>Digital marketing and SEO services</li>
              <li>Consulting and strategy services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Client Responsibilities</h2>
            <p className="mb-4">
              As a client, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Respond to requests for information in a timely manner</li>
              <li>Provide necessary content, images, and materials</li>
              <li>Review and approve deliverables within agreed timeframes</li>
              <li>Make payments according to the agreed schedule</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            <p className="mb-4">
              Payment terms are established in individual project agreements. Generally:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A deposit is required before work begins</li>
              <li>Milestone payments may be required for larger projects</li>
              <li>Final payment is due upon project completion</li>
              <li>Late payments may incur additional fees</li>
              <li>All prices are in USD unless otherwise specified</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              Upon full payment:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You own the final deliverables and content you provided</li>
              <li>We retain rights to pre-existing materials and tools</li>
              <li>We may showcase your project in our portfolio</li>
              <li>Third-party assets are subject to their respective licenses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Revisions and Changes</h2>
            <p>
              Each project includes a specified number of revision rounds. Additional revisions beyond 
              the agreed scope may incur extra charges. Major scope changes will require a new agreement 
              and additional fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Project Timeline</h2>
            <p>
              We strive to meet all agreed deadlines. However, timelines may be affected by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Delays in receiving client feedback or materials</li>
              <li>Scope changes or additional requests</li>
              <li>Technical issues beyond our control</li>
              <li>Force majeure events</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Warranties and Disclaimers</h2>
            <p>
              We warrant that our services will be performed professionally and competently. However, 
              we do not guarantee specific results or outcomes. Our services are provided "as is" 
              without warranties of any kind, express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p>
              Our liability is limited to the amount paid for the specific service in question. We are 
              not liable for indirect, incidental, or consequential damages arising from our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
            <p>
              Either party may terminate a project with written notice. Upon termination:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Client pays for work completed to date</li>
              <li>We deliver work completed up to termination date</li>
              <li>Deposits are non-refundable</li>
              <li>Outstanding invoices remain due</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Confidentiality</h2>
            <p>
              We respect the confidentiality of your business information and will not disclose it to 
              third parties without your consent, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which Code & Convert operates. 
              Any disputes will be resolved through binding arbitration or in the courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting. Continued use of our services constitutes acceptance of 
              modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> <a href="mailto:hello@codeandconvert.co.za" className="text-[#FF1E1E] hover:underline">hello@codeandconvert.co.za</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
