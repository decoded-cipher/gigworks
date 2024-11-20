import React from "react";
import { MapPin, Clock, Phone, Briefcase, Dribbble } from "lucide-react";
import ImageGrid from "../components/imgsec";
import { FooterSection } from "../components/FooterSection";
import { div } from "framer-motion/client";
import DynamicQRCode from "../components/QrSection"
const DevMorphixWebsite = () => {
  const galleryItems = [
    {
      src: "/2 (1).png",
      alt: "Office Space 1",
      size: "small",
    },
    {
      src: "/2 (2).png",
      alt: "Office Space 2",
      size: "small",
    },
    {
      src: "/2 (2).png",
      alt: "Office Space 2",
      size: "small",
    },
    {
      src: "/2 (3).png",
      alt: "Office Corridor",
      size: "medium",
    },
    {
      src: "/2 (4).png",
      alt: "Lab Entrance",
      size: "small",
    },
    {
      src: "/2 (1).png",
      alt: "Office Space 1",
      size: "small",
    },
    {
      src: "/2 (2).png",
      alt: "Office Space 2",
      size: "small",
    },
    {
      src: "/2 (2).png",
      alt: "Office Space 2",
      size: "small",
    },
    {
      src: "/2 (3).png",
      alt: "Office Corridor",
      size: "medium",
    },
    {
      src: "/2 (4).png",
      alt: "Lab Entrance",
      size: "small",
    },
    {
      src: "/2 (1).png",
      alt: "Office Space 1",
      size: "small",
    },
    {
      src: "/2 (2).png",
      alt: "Office Space 2",
      size: "small",
    },
    {
      src: "/2 (2).png",
      alt: "Office Space 2",
      size: "small",
    },
    {
      src: "/2 (3).png",
      alt: "Office Corridor",
      size: "medium",
    },
    {
      src: "/2 (4).png",
      alt: "Lab Entrance",
      size: "small",
    },
    {
      src: "/2 (4).png",
      alt: "Lab Entrance",
      size: "small",
    },
    {
      src: "/2 (5).png",
      alt: "Lab Entrance",
      size: "small",
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
    <div className="font-circular">
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
              <img src="/444.png" alt="Logo" width={200} height={200} />{" "}
              {/*  if you want to zoom in or zoom out, change the width and height */}
            </div>

            <h2 className="sm:text-6xl text-4xl font-bold mb-4">DEVMORPHIX</h2>
            <p className="sm:text-xl text-sm font-bold mb-8">
              IT Consultancy and Solutions
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button className="bg-white border-2 font-bold border-black rounded-full sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2">
                <span>Direction</span>
              </button>
              <button className="bg-white border-2 font-bold border-black rounded-full sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2">
                <span>Share</span>
              </button>
              <button className="bg-white border-2 font-bold border-black rounded-full sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2">
                <span>Whatsapp</span>
              </button>
            </div>
          </section>

          {/* <ImageGrid images={galleryItems} /> */}
          {/* <ImageGrid/> */}
          <section className="mt-7">
          <ImageGrid
            
            className="bg-white shadow-lg rounded-lg  overflow-hidden border my-2  rounded-3xl"
          />
          </section>

          <section className="border my-7  rounded-3xl ">
            <section className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-center mb-6">
                Services Provides
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-6 justify-center">
                  {[
                    "App Development",
                    "Web Development",
                    "Cloud Services",
                    "UI/UX Design",
                    "Digital Marketing",
                  ].map((service, index) => (
                    <button
                      key={index}
                      className="w-[250px] bg-stone-800 border-2 text-white border-stone-800 rounded-full px-6 py-2.5 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      <span className="text-sm sm:text-base whitespace-nowrap">
                        {service}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <hr className="my-4 mx-10 "></hr>

            <section className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Map Section - Left Side */}
              <div className="md:w-1/2">
                <div className="bg-white  rounded-lg p-6 h-full">
                  {/* <h2 className="text-xl font-bold mb-4">Our Location</h2> */}
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.4985632429584!2d88.34671491498358!3d22.572175985181594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027703ef804be5%3A0xea29c7e2b2efccc3!2sDevMorphix!5e0!3m2!1sen!2sin!4v1624281837702!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Services Grid - Right Side */}
              <div className="md:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Info Card */}
                  <div className="bg-white rounded-lg mt-6 ">
                    <h3 className="text-xl font-bold mb-4">DevMorphix</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-lg text-black">
                          Located In:{" "}
                          <span className="text-black text-md">
                            Kristu Jyoti College of Management and Information
                            Technology
                          </span>
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-lg text-black">
                          Address:{" "}
                          <span className="text-black text-md">
                            Chethipuzha Kadavu, Changanassery, Kerala 686104
                          </span>
                        </span>

                        {/* <h4 className="font-medium text-gray-700">Address</h4>
                    <p className="text-gray-600">
                      18, Rabindra Sarani, 
                      <br />
                      Kolkata - 700001
                    </p> */}
                      </div>

                      <div>
                        <h4 className="font-medium text-lg text-black">
                          Working Hours
                        </h4>
                        <p className="text-black text-md">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 2:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-4 mx-10 "></hr>

            <section className="bg-white  rounded-lg p-6 mb-8 text-center">
              <h2 className="text-xl font-medium mb-2">Contact Info</h2>
              <p className="text-4xl font-mediu mb-2">+91 9876543210</p>
              <div className="flex justify-center pb-11">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="538"
                  height="39"
                  viewBox="0 0 538 39"
                  fill="none"
                >
                  <path
                    d="M1 36.9999C90.6667 10.9999 323.3 -25.4001 536.5 36.9999C439.667 17.8332 197 -9.00014 1 36.9999Z"
                    fill="#009A36"
                    stroke="#009A36"
                    stroke-width="4"
                  />
                </svg>
              </div>

              <p className="text-black text-md text-justify font-medium leading-relaxed">
                A Software Development Company specializes in creating custom
                software, applications, and web solutions tailored to meet
                unique business needs. By leveraging the latest technologies and
                best practices, they help businesses streamline their
                operations, optimize workflows, and drive digital growth. Their
                expertise covers everything from developing intuitive mobile
                apps and scalable web platforms to building complex software
                systems that enhance productivity and efficiency. With a focus
                on innovation, they empower businesses to stay ahead in the
                competitive digital landscape, providing robust solutions that
                align with their strategic goals and accelerate their digital
                transformation journey.
              </p>

              <div className="mt-24">
                <h2 className="text-xl font-medium mb-4">
                  Our Social Media Connects
                </h2>
                <div className="flex justify-center space-x-6 ">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-400 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          </section>

          {/* <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
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
                <h3 className="text-lg font-medium mb-2">
                  Shop & Establishment license
                </h3>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  View License
                </a>
              </div>
            </div>
          </section> */}

        <section className="my-7">
          <DynamicQRCode />
        </section>
          
        </main>
      </div>
      <FooterSection />
    </div>
  );
};

export default DevMorphixWebsite;
