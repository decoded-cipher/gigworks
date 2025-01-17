"use client";

import React from "react";
import { FooterSection } from "../components/FooterSection";
import Navbar from "../components/navSection";

function terms() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto px-44 pt-5 pb-16 ">
        <h1 className="text-center py-8 font-bold text-4xl">
          Terms & Conditions
        </h1>
        <p className="text-justify text-xl">
          Welcome to <span className="font-bold">GigWork</span>.These Terms &
          Conditions (&quot;Terms&quot;) govern your use of our website and
          services. By accessing or using our website, you agree to comply with
          and be bound by these Terms. If you do not agree to these Terms,
          please do not use our website or services.
        </p>

        <p className="text-xl font-bold py-4">1. Acceptance of Terms</p>
        <p className="text-xl">
          By using our website, you agree to these Terms and any additional
          terms and conditions that may apply to specific sections of the
          website or to products and services available through the website. We
          may modify these Terms at any time without prior notice. Your
          continued use of the website after any changes signifies your
          acceptance of the updated Terms.
        </p>

        <p className="text-xl font-bold py-4">2. Use of the Website</p>
        <p className="text-xl">We use the information we collect to:</p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">Eligibility:</span> You must be at least
            18 years old to use our website and services. By using the website,
            you represent that you meet this eligibility requirement.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Account Registration:</span> Some
            features of our website may require you to create an account. You
            agree to provide accurate, current, and complete information during
            registration and to update your information as necessary.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">User Conduct:</span> You agree to use
            the website in a manner that is lawful, respectful, and compliant
            with these Terms. You are prohibited from using the website to:
            <ul className="px-4 list-disc">
              <li>
                Upload or transmit any harmful, offensive, or illegal content.
              </li>
              <li>
                Engage in activities that infringe on the rights of others or
                violate applicable laws.
              </li>
              <li>
                Disrupt or interfere with the operation of the website or
                servers.
              </li>
              <li>Use the website for unauthorized commercial purposes.</li>
            </ul>
          </li>
        </ul>

        <p className="text-xl font-bold py-4">3. Business Listings</p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">Accuracy of Information:</span> If you
            register a business on our platform, you are responsible for
            providing accurate and up-to-date information. You agree not to
            provide false, misleading, or fraudulent information.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Listing Approval:</span> We reserve the
            right to review, approve, or reject any business listing submitted
            to our directory. We may remove or modify any listing at our
            discretion.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Responsibility for Content:</span> You
            are solely responsible for the content you provide in your business
            listing, including images, logos, and descriptions. You warrant that
            you own or have the necessary rights to use all content you submit.
          </li>
        </ul>

        <p className="text-xl font-bold py-4">4. Intellectual Property</p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">Ownership:</span> All content,
            trademarks, logos, and intellectual property displayed on the
            website are the property of{" "}
            <span className="font-bold">GigWork</span> or its licensors. You may
            not use, reproduce, distribute, or create derivative works from any
            content on the website without our prior written consent.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">User-Generated Content:</span> By
            submitting content to the website (e.g., business listings,
            reviews), you grant us a non-exclusive, worldwide, royalty-free
            license to use, display, reproduce, and distribute your content in
            connection with our services.
          </li>
        </ul>

        <p className="text-xl font-bold py-4">5. Limitation of Liability</p>
        <ul className="px-4 list-disc">
          <li className="py-2 text-xl">
            <span className="font-bold">No Warranty:</span> : Our website and
            services are provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We make no warranties, express or implied,
            regarding the website’s operation, accuracy, reliability, or
            availability.
          </li>
          <li className="py-2 text-xl">
            <span className="font-bold">Limitation of Liability:</span> To the
            fullest extent permitted by law, GigWork shall not be liable for any
            direct, indirect, incidental, consequential, or punitive damages
            arising out of or related to your use of the website or services.
          </li>
        </ul>

        <p className="text-xl font-bold py-4">6. Third-Party Links</p>
        <p className="text-xl">
          Our website may contain links to third-party websites that are not
          owned or controlled by <span className="font-bold">GigWork</span>. We
          are not responsible for the content, privacy practices, or terms of
          any third-party sites. You access third-party websites at your own
          risk.
        </p>

        <p className="text-xl font-bold py-4">7. Termination</p>
        <p className="text-xl">
          We reserve the right to suspend or terminate your access to the
          website at any time, with or without cause, and without notice. Upon
          termination, your right to use the website will immediately cease.
        </p>

        <p className="text-xl font-bold py-4">8. Governing Law</p>
        <p className="text-xl">
          These Terms shall be governed by and construed in accordance with the
          laws of India, without regard to its conflict of law principles. Any
          legal action or proceeding arising out of or related to these Terms
          shall be brought exclusively in the courts located in Kerala.
        </p>

        <p className="text-xl font-bold py-4">9. Contact Information</p>
        <p className="text-xl">
          If you have any questions or concerns about these Terms, please
          contact us at{" "}
          <span className="font-bold">
            <a href="mailto:mail@gigwork.co.in" className="hover:underline">
              mail@gigwork.co.in
            </a>
          </span>
          .
        </p>

        <p className="text-xl font-bold py-4 pt-24">
          Cancellation and Refund Policy
        </p>
        <p className="text-xl">
          At <span>GigWork</span>, we strive to provide clear and transparent
          terms regarding our subscription services. Please read the following
          policy carefully before proceeding with your subscription.
        </p>

        <p className="text-xl font-bold py-4">1. Subscription Model</p>
        <p className="text-xl">
          Our directory offers a yearly subscription for businesses to be listed
          on our platform. The subscription process is initiated only after the
          business has provided all necessary details, agreed to our terms and
          conditions, and reviewed the information submitted.
        </p>

        <p className="text-xl font-bold py-4">2. Cancellation Policy</p>
        <p className="text-xl">
          Due to the nature of our service, cancellations are not permitted once
          the subscription process is complete. Payment is processed only after
          you have filled in all required details on our website and agreed to
          the terms. Once payment is made, your business listing is considered
          confirmed, and the subscription is active for one year.
        </p>

        <p className="text-xl font-bold py-4">3. Refund Policy</p>
        <p className="text-xl">
          We do not offer refunds for any reason once a subscription is
          processed. A portion of the payment is allocated to our agents who
          assist in reaching out to businesses on behalf of the company, making
          refunds infeasible.
        </p>

        <p className="text-xl font-bold py-4">4. Non-Refundable Items</p>
        <p className="text-xl">
          There are no specific items or services listed as non-refundable
          because the entire payment made for the subscription is
          non-refundable.
        </p>

        <p className="text-xl font-bold py-4">5. Contact Us</p>
        <p className="text-xl">
          If you have any questions or concerns about this policy, please
          contact us at{" "}
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

export default terms;
