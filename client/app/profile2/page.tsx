import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import Image from 'next/image';

const DevMorphixWebsite = () => {
  const images = [
    '/path-to-image1.jpg',
    '/path-to-image2.jpg',
    '/path-to-image3.jpg',
    // Add all your office images here
  ];

  const services = [
    'App Development',
    'Web Development',
    'Software Services',
    'Graphic Designing',
    'UI/UX Designing'
  ];

  const workingHours = {
    Sunday: 'Closed',
    Monday: '9am-6pm',
    Tuesday: '9am-6pm',
    Wednesday: '9am-6pm',
    Thursday: '9am-6pm',
    Friday: '9am-6pm',
    Saturday: '9am-6pm',
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="relative text-center mb-8">
        <div className="relative w-full h-48 overflow-hidden">
          <img src="/path-to-hero-image.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative -mt-24">
          <div className="w-48 h-48 bg-black rounded-full mx-auto flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">DEV.X</h1>
          </div>
          
          <h2 className="text-3xl font-bold mt-4">DEVMORPHIX</h2>
          <p className="text-gray-600 mb-4">IT Consultancy and Solutions</p>
          
          <div className="flex gap-2 justify-center">
            <button className="px-4 py-1 border rounded-full text-sm">⚲ Direction</button>
            <button className="px-4 py-1 border rounded-full text-sm">↗ Share</button>
            <button className="px-4 py-1 border rounded-full text-sm">WhatsApp</button>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="grid grid-cols-3 gap-2 mb-8">
        {images.map((src, index) => (
          <div key={index} className="aspect-square relative">
            <Image src={src} alt="" fill className="object-cover rounded-lg" />
          </div>
        ))}
      </section>

      {/* Services Section */}
      <section className="mb-8">
        <h3 className="text-center mb-4">Services Provides</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {services.map((service, index) => (
            <span key={index} className="px-4 py-1 bg-black text-white rounded-full text-sm">
              {service}
            </span>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section className="mb-8">
        <div className="flex gap-4">
          <div className="w-1/2">
            <img src="/path-to-map.jpg" alt="Map" className="w-full rounded-lg" />
          </div>
          <div className="w-1/2">
            <h3 className="font-bold mb-2">DevMorphix</h3>
            <p className="text-sm mb-4">Located at: Amity Joint College of Management and Technology</p>
            <p className="text-sm mb-2">Address: Chittaranjan Avenue, Kolkata 700073</p>
            
            <h4 className="font-bold mt-4 mb-2">Working Hours</h4>
            {Object.entries(workingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm">
                <span>{day}</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="text-center mb-8">
        <h3 className="mb-2">Contact Info</h3>
        <div className="text-2xl font-bold relative">
          +91 12345 46834
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-green-500"></div>
        </div>
      </section>

      {/* Company Description */}
      <section className="mb-8">
        <p className="text-sm text-gray-600">
          A Software Development Company specializes in creating custom software, applications, and
          web solutions tailored to meet unique business needs. By leveraging the latest technologies
          and best practices...
        </p>
      </section>

      {/* Social Media */}
      <section className="text-center mb-8">
        <h3 className="mb-4">Our Social Media Connects</h3>
        <div className="flex justify-center gap-4">
          {/* Add your social media icons here */}
        </div>
      </section>

      {/* Business Registration */}
      <section className="mb-8">
        <h3 className="text-center mb-4">Business Registration</h3>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">GST</span>
          <span className="text-sm">Shop & Establishment license</span>
          <button className="text-sm text-blue-600">View License</button>
        </div>
      </section>

      {/* QR Code */}
      <section className="mb-8 text-center">
        <img src="/path-to-qr.png" alt="QR Code" className="mx-auto w-32 h-32" />
        <p className="text-sm text-gray-600">gigwork.co.in/devmorphix</p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white p-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-green-500 mb-4">Gigwork</h4>
            {/* Add footer links */}
          </div>
          <div>
            <h4 className="mb-4">Quick Links</h4>
            {/* Add quick links */}
          </div>
          <div>
            <h4 className="mb-4">Follow Us</h4>
            {/* Add social media links */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevMorphixWebsite;