import React from 'react';
import { MapPin, Clock, Phone, Briefcase, Dribbble } from 'lucide-react';
import ImageGrid from '../components/imgsec';
const DevMorphixWebsite = () => {
  const galleryItems = [
    { 
      src: "/2 (1).png", 
      alt: "Office Space 1",
      size: 'small'
    },
    { 
      src: "/2 (2).png", 
      alt: "Office Space 2",
      size: 'small'
    },
    { 
      src: "/2 (3).png", 
      alt: "Office Corridor",
      size: 'medium'
    },
    { 
      src: "/2 (4).png", 
      alt: "Lab Entrance",
      size: 'small'
    },
    { 
      src: "/2 (5).png", 
      alt: "Lab Entrance",
      size: 'small'
    },
    // { 
    //   src: "/workspace.mp4", 
    //   alt: "Workspace Video",
    //   isVideo: true,
    //   size: 'large'
    // },
    // Add more images as needed
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-32">
      <main>
        <section className="relative py-16 flex flex-col items-center text-center border mb-2 -mt-2 rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden">
            <img 
              src="/15879.png"
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 w-80 h-80 border border-white border-8 bg-black rounded-full flex items-center justify-center mb-8 mt-20">
            {/* <h1 className="text-white text-4xl font-bold">DEV.X</h1> */}
            <img src="/444.png" alt="Logo" width={200} height={200} />  {/*  if you want to zoom in or zoom out, change the width and height */}
          </div>
          
          <h2 className="text-6xl font-bold mb-4">DEVMORPHIX</h2>
          <p className="text-xl font-bold mb-8">IT Consultancy and Solutions</p>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="bg-white border-2 font-bold border-black rounded-full px-6 py-2 flex items-center gap-2">
              <span>Direction</span>
            </button>
            <button className="bg-white border-2 font-bold border-black rounded-full px-6 py-2 flex items-center gap-2">
              <span>Share</span>
            </button>
            <button className="bg-white border-2 font-bold border-black rounded-full px-6 py-2 flex items-center gap-2">
              <span>Whatsapp</span>
            </button>
          </div>
        </section>

        {/* <ImageGrid images={galleryItems} /> */}
        {/* <ImageGrid/> */}


        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">DevMorphix</h2>
          <p className="mb-4 ">IT Consultancy and Solutions</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <MapPin size={18} className="inline-block mr-2" />
              <span>Chittaranjan Avenue, Kolkata 700073</span>
            </div>
            <div>
              <Clock size={18} className="inline-block mr-2" />
              <span>Monday - Friday: 9am-6pm</span>
            </div>
            <div>
              <Phone size={18} className="inline-block mr-2" />
              <span>+91 12345 66834</span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Briefcase, label: 'App Development' },
            { icon: Dribbble, label: 'Web Development' },
            { icon: Briefcase, label: 'Software Services' },
            { icon: Dribbble, label: 'Graphic Designing' },
            { icon: Briefcase, label: 'UI/UX Designing' },
          ].map(({ icon: Icon, label }, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Icon size={24} className="mr-2" />
                <h3 className="text-lg font-medium">{label}</h3>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Our Location</h2>
          <div className="h-64 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.4985632429584!2d88.34671491498358!3d22.572175985181594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027703ef804be5%3A0xea29c7e2b2efccc3!2sDevMorphix!5e0!3m2!1sen!2sin!4v1624281837702!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Business Registration</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">GST</h3>
              <p>12ABCDE1234Z5</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Other License</h3>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                View License
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Shop & Establishment license</h3>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                View License
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Our Social Media Connects</h2>
          <div className="flex justify-center space-x-4">
            {/* <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaLinkedin size={18} />
            </a> */}
          </div>
        </section>

        <ImageGrid 
          images={galleryItems} 
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        />
      </main>

      <footer className="text-center py-4 text-gray-500">
        © {new Date().getFullYear()} DevMorphix. All rights reserved.
      </footer>
    </div>
  );
};

export default DevMorphixWebsite;