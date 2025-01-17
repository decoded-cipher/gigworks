"use client";

import React from "react";
import { FooterSection } from "../components/FooterSection";
import Navbar from "../components/navSection";

function privacy() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto px-44 pt-5 pb-16 ">
        <h1 className="text-center py-8 font-bold text-4xl">Privacy Policy</h1>
        <p className="text-justify text-xl">
          At  <span className="font-bold">GigWork</span>, we are committed to
          protecting your privacy. This Privacy Policy outlines how we collect,
          use, disclose, and protect your personal information when you use our
          website and services. By using our website and services, you consent
          to the practices described in this policy.
        </p>
        <p className="text-xl font-bold py-4">1. Information we collect</p>
        <p className="text-xl">
          We collect the following types of information:
        </p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">Personal Information:</span> When you
            register your business on our platform or interact with our
            services, we may collect personal information such as your name,
            email address, phone number, business details, location, and social
            media handles.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Business Information:</span> This
            includes information related to your business, such as business
            name, address, category, services offered, images, logos, and any
            other details you choose to provide.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Usage Information:</span> We collect
            information about ho w you use our website, including your IP
            address, browser type, device information, pages viewed, and the
            time spent on our site.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Communications:</span> If you contact us
            through WhatsApp, email, or other channels, we may collect the
            content of your communications and any other information you choose
            to provide.
          </li>
        </ul>

        <p className="text-xl font-bold py-4">2. How We Use Your Information</p>
        <p className="text-xl">We use the information we collect to:</p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">Provide and Improve Our Services:</span>{" "}
            To operate, maintain, and enhance our directory, including
            personalizing your experience and improving our website’s
            functionality.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Communication:</span> To send you
            information about our services, respond to your inquiries, and
            provide customer support.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Business Listings:</span> To display
            your business information in our directory, making it accessible to
            users searching for businesses in your category.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Marketing:</span> To send you
            promotional materials and updates about our services, if you have
            opted to receive such communications.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Analytics:</span> To analyze usage
            patterns and trends to improve our services and enhance user
            experience.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Compliance:</span> To comply with legal
            obligations, resolve disputes, and enforce our agreements.
          </li>
        </ul>

        <p className="text-xl font-bold py-4">
          3. How We Share Your Information
        </p>
        <p className="text-xl">
          We may share your information in the following circumstances:
        </p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">With Users: </span> Business information
            provided by you will be visible to users of our directory when they
            search for businesses within your category.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Service Providers:</span> We may share
            your information with third-party service providers who assist us in
            operating our website and delivering our services (e.g., hosting
            providers, payment processors).
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Legal Compliance:</span> We may disclose
            your information if required by law or in response to legal
            processes (e.g., a court order or subpoena).
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Business Transfers:</span> In the event
            of a merger, acquisition, or sale of all or a portion of our assets,
            your information may be transferred to the acquiring entity.
          </li>
        </ul>

        <p className="text-xl font-bold py-4">4. Data Security</p>
        <p className="text-xl">
          We implement industry-standard security measures to protect your
          information from unauthorized access, disclosure, or alteration.
          However, no method of transmission over the internet or electronic
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <p className="text-xl font-bold py-4">6. Your Choices</p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">Access and Update: </span> You can
            access and update your business information at any time by
            contacting us or using the relevant features on our website.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Opt-Out:</span> If you no longer wish to
            receive marketing communications from us, you can opt out by
            following the unsubscribe instructions in those communications.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Data Deletion:</span> You can request
            the deletion of your personal information by contacting us. We will
            comply with your request, subject to our legal obligations.
          </li>
        </ul>

        <p className="text-xl font-bold py-4">6. Third-Party Links</p>
        <p className="text-xl">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these external
          sites. We encourage you to review the privacy policies of any
          third-party sites you visit.
        </p>

        <p className="text-xl font-bold py-4">7. Changes to This Policy</p>
        <p className="text-xl">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and we will notify you of any significant
          changes by email or through our services.
        </p>

        <p className="text-xl font-bold py-4">8. Contact Us</p>
        <p className="text-xl">
          If you have any questions or concerns about this Privacy Policy or our
          privacy practices, please contact us at{" "}
          <span className="font-bold">
            <a href="mailto:mail@gigwork.co.in" className="hover:underline">
              mail@gigwork.co.in
            </a>
          </span>
          .
        </p>
      </div>
      <FooterSection /> 
    </div>
  );
}

export default privacy;
