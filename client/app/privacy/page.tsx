"use client";

import React from 'react'
import { FooterSection } from '../components/FooterSection';
import Navbar from '../components/navSection';

function privacy() {
  return (
    <div>
      <Navbar/>
      <div className='mx-auto px-44 pt-5 pb-16 '>
        <h1 className='text-center py-8 font-bold text-4xl'>Privacy Policy</h1>
        <p className='text-justify text-xl'>At  <span className='font-bold'>GigWork</span>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our website and services. By using our website and services, you consent to the practices described in this policy.</p>
        <p className='text-xl font-bold py-4'>1. Information we collect</p>
        <p className='text-xl'>We collect the following types of information:</p>
        <ul className='px-4 list-disc'>
            <li className='py-2 text-xl'><span className='font-bold'>Personal Information:</span> When you register your business on our platform or interact with our services, we may collect personal information such as your name, email address, phone number, business details, location, and social media handles.
            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Business Information:</span> This includes information related to your business, such as business name, address, category, services offered, images, logos, and any other details you choose to provide.
            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Usage Information:</span> We collect information about ho  w you use our website, including your IP address, browser type, device information, pages viewed, and the time spent on our site.

            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Communications:</span> If you contact us through WhatsApp, email, or other channels, we may collect the content of your communications and any other information you choose to provide.
            </li>
        </ul>

        <p className='text-xl font-bold py-4'>2. How We Use Your Information</p>
        <p className='text-xl'>We use the information we collect to:</p>
        <ul className='px-4 list-disc'>
            <li className='py-2 text-xl'><span className='font-bold'>Provide and Improve Our Services:</span> To operate, maintain, and enhance our directory, including personalizing your experience and improving our website’s functionality.
            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Communication:</span> To send you information about our services, respond to your inquiries, and provide customer support.
            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Business Listings:</span> To display your business information in our directory, making it accessible to users searching for businesses in your category.
            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Marketing:</span> To send you promotional materials and updates about our services, if you have opted to receive such communications.
            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Analytics:</span>  To analyze usage patterns and trends to improve our services and enhance user experience.
            </li>
            <li className='py-2 text-xl'><span className='font-bold'>Compliance:</span> To comply with legal obligations, resolve disputes, and enforce our agreements.
            </li>
        </ul>
        
      </div>
      <FooterSection/>
    </div>
  )
}

export default privacy
