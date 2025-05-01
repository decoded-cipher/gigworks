"use client";

import React from "react";
import { FooterSection } from "../components/FooterSection";
import Navbar from "../components/navSection";

function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Welcome to <span className="font-semibold">GigWork</span>. These Terms &amp;
              Conditions (&quot;Terms&quot;) govern your use of our website and
              services. By accessing or using our website, you agree to comply with
              and be bound by these Terms. If you do not agree to these Terms,
              please do not use our website or services.
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Acceptance of Terms</h2>
              <p>
                By using our website, you agree to these Terms and any additional
                terms and conditions that may apply to specific sections of the
                website or to products and services available through the website. We
                may modify these Terms at any time without prior notice. Your
                continued use of the website after any changes signifies your
                acceptance of the updated Terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Use of the Website</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">Eligibility:</span> You must be at least
                  18 years old to use our website and services. By using the website,
                  you represent that you meet this eligibility requirement.
                </li>
                <li>
                  <span className="font-semibold">Account Registration:</span> Some
                  features of our website may require you to create an account. You
                  agree to provide accurate, current, and complete information during
                  registration and to update your information as necessary.
                </li>
                <li>
                  <span className="font-semibold">User Conduct:</span> You agree to use
                  the website in a manner that is lawful, respectful, and compliant
                  with these Terms. You are prohibited from using the website to:
                  <ul className="mt-2 space-y-1 list-disc pl-6">
                    <li>Upload or transmit any harmful, offensive, or illegal content.</li>
                    <li>Engage in activities that infringe on the rights of others or
                        violate applicable laws.</li>
                    <li>Disrupt or interfere with the operation of the website or
                        servers.</li>
                    <li>Use the website for unauthorized commercial purposes.</li>
                  </ul>
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Business Listings</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">Accuracy of Information:</span> If you
                  register a business on our platform, you are responsible for
                  providing accurate and up-to-date information. You agree not to
                  provide false, misleading, or fraudulent information.
                </li>
                <li>
                  <span className="font-semibold">Listing Approval:</span> We reserve the
                  right to review, approve, or reject any business listing submitted
                  to our directory. We may remove or modify any listing at our
                  discretion.
                </li>
                <li>
                  <span className="font-semibold">Responsibility for Content:</span> You
                  are solely responsible for the content you provide in your business
                  listing, including images, logos, and descriptions. You warrant that
                  you own or have the necessary rights to use all content you submit.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Intellectual Property</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">Ownership:</span> All content,
                  trademarks, logos, and intellectual property displayed on the
                  website are the property of{" "}
                  <span className="font-semibold">GigWork</span> or its licensors. You may
                  not use, reproduce, distribute, or create derivative works from any
                  content on the website without our prior written consent.
                </li>
                <li>
                  <span className="font-semibold">User-Generated Content:</span> By
                  submitting content to the website (e.g., business listings,
                  reviews), you grant us a non-exclusive, worldwide, royalty-free
                  license to use, display, reproduce, and distribute your content in
                  connection with our services.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Limitation of Liability</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">No Warranty:</span> Our website and
                  services are provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis. We make no warranties, express or implied,
                  regarding the website&apos;s operation, accuracy, reliability, or
                  availability.
                </li>
                <li>
                  <span className="font-semibold">Limitation of Liability:</span> To the
                  fullest extent permitted by law, GigWork shall not be liable for any
                  direct, indirect, incidental, consequential, or punitive damages
                  arising out of or related to your use of the website or services.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites that are not
                owned or controlled by <span className="font-semibold">GigWork</span>. We
                are not responsible for the content, privacy practices, or terms of
                any third-party sites. You access third-party websites at your own
                risk.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">7. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the
                website at any time, with or without cause, and without notice. Upon
                termination, your right to use the website will immediately cease.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the
                laws of India, without regard to its conflict of law principles. Any
                legal action or proceeding arising out of or related to these Terms
                shall be brought exclusively in the courts located in Kerala.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">9. Contact Information</h2>
              <p>
                If you have any questions or concerns about these Terms, please
                contact us at{" "}
                <a 
                  href="mailto:mail@gigwork.co.in" 
                  className="font-semibold text-green-600 hover:underline"
                >
                  mail@gigwork.co.in
                </a>.
              </p>
            </section>
            
            <section className="pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Cancellation and Refund Policy</h2>
              <p className="mb-4">
                At <span className="font-semibold">GigWork</span>, we strive to provide clear and transparent
                terms regarding our subscription services. Please read the following
                policy carefully before proceeding with your subscription.
              </p>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">1. Subscription Model</h3>
                  <p>
                    Our directory offers a yearly subscription for businesses to be listed
                    on our platform. The subscription process is initiated only after the
                    business has provided all necessary details, agreed to our terms and
                    conditions, and reviewed the information submitted.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">2. Cancellation Policy</h3>
                  <p>
                    Due to the nature of our service, cancellations are not permitted once
                    the subscription process is complete. Payment is processed only after
                    you have filled in all required details on our website and agreed to
                    the terms. Once payment is made, your business listing is considered
                    confirmed, and the subscription is active for one year.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">3. Refund Policy</h3>
                  <p>
                    We do not offer refunds for any reason once a subscription is
                    processed. A portion of the payment is allocated to our agents who
                    assist in reaching out to businesses on behalf of the company, making
                    refunds infeasible.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">4. Non-Refundable Items</h3>
                  <p>
                    There are no specific items or services listed as non-refundable
                    because the entire payment made for the subscription is
                    non-refundable.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">5. Contact Us</h3>
                  <p>
                    If you have any questions or concerns about this policy, please
                    contact us at{" "}
                    <a 
                      href="mailto:mail@gigwork.co.in" 
                      className="font-semibold text-green-600 hover:underline"
                    >
                      mail@gigwork.co.in
                    </a>.
                  </p>
                </section>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
}

export default Terms;