"use client";

import React from "react";
import { FooterSection } from "../components/FooterSection";
import Navbar from "../components/navSection";

function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              At <span className="font-semibold">GigWork</span>, we are committed to
              protecting your privacy. This Privacy Policy outlines how we collect,
              use, disclose, and protect your personal information when you use our
              website and services. By using our website and services, you consent
              to the practices described in this policy.
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Information We Collect</h2>
              <p className="mb-4">We collect the following types of information:</p>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">Personal Information:</span> When you
                  register your business on our platform or interact with our
                  services, we may collect personal information such as your name,
                  email address, phone number, business details, location, and social
                  media handles.
                </li>
                <li>
                  <span className="font-semibold">Business Information:</span> This
                  includes information related to your business, such as business
                  name, address, category, services offered, images, logos, and any
                  other details you choose to provide.
                </li>
                <li>
                  <span className="font-semibold">Usage Information:</span> We collect
                  information about how you use our website, including your IP
                  address, browser type, device information, pages viewed, and the
                  time spent on our site.
                </li>
                <li>
                  <span className="font-semibold">Communications:</span> If you contact us
                  through WhatsApp, email, or other channels, we may collect the
                  content of your communications and any other information you choose
                  to provide.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">Provide and Improve Our Services:</span> To 
                  operate, maintain, and enhance our directory, including
                  personalizing your experience and improving our website&apos;s
                  functionality.
                </li>
                <li>
                  <span className="font-semibold">Communication:</span> To send you
                  information about our services, respond to your inquiries, and
                  provide customer support.
                </li>
                <li>
                  <span className="font-semibold">Business Listings:</span> To display
                  your business information in our directory, making it accessible to
                  users searching for businesses in your category.
                </li>
                <li>
                  <span className="font-semibold">Marketing:</span> To send you
                  promotional materials and updates about our services, if you have
                  opted to receive such communications.
                </li>
                <li>
                  <span className="font-semibold">Analytics:</span> To analyze usage
                  patterns and trends to improve our services and enhance user
                  experience.
                </li>
                <li>
                  <span className="font-semibold">Compliance:</span> To comply with legal
                  obligations, resolve disputes, and enforce our agreements.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">3. How We Share Your Information</h2>
              <p className="mb-4">We may share your information in the following circumstances:</p>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">With Users:</span> Business information
                  provided by you will be visible to users of our directory when they
                  search for businesses within your category.
                </li>
                <li>
                  <span className="font-semibold">Service Providers:</span> We may share
                  your information with third-party service providers who assist us in
                  operating our website and delivering our services (e.g., hosting
                  providers, payment processors).
                </li>
                <li>
                  <span className="font-semibold">Legal Compliance:</span> We may disclose
                  your information if required by law or in response to legal
                  processes (e.g., a court order or subpoena).
                </li>
                <li>
                  <span className="font-semibold">Business Transfers:</span> In the event
                  of a merger, acquisition, or sale of all or a portion of our assets,
                  your information may be transferred to the acquiring entity.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your
                information from unauthorized access, disclosure, or alteration.
                However, no method of transmission over the internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Your Choices</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>
                  <span className="font-semibold">Access and Update:</span> You can
                  access and update your business information at any time by
                  contacting us or using the relevant features on our website.
                </li>
                <li>
                  <span className="font-semibold">Opt-Out:</span> If you no longer wish to
                  receive marketing communications from us, you can opt out by
                  following the unsubscribe instructions in those communications.
                </li>
                <li>
                  <span className="font-semibold">Data Deletion:</span> You can request
                  the deletion of your personal information by contacting us. We will
                  comply with your request, subject to our legal obligations.
                </li>
                <li>
                  <span className="font-semibold">Third-Party Links:</span> We aren&apos;t
                  responsible for the privacy practices or content of these external
                  sites. We encourage you to review the privacy policies of any
                  third-party sites you visit.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not
                responsible for the privacy practices or content of these external
                sites. We encourage you to review the privacy policies of any
                third-party sites you visit.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will
                be posted on this page, and we will notify you of any significant
                changes by email or through our services.
              </p>
            </section>
            
            <section className="mb-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">8. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our
                privacy practices, please contact us at{" "}
                <a 
                  href="mailto:mail@gigwork.co.in" 
                  className="font-semibold text-green-600 hover:underline"
                >
                  mail@gigwork.co.in
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
}

export default Privacy;