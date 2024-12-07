import React from "react";
import { MapPin, Clock, Phone, Briefcase, Dribbble } from "lucide-react";
import ImageGrid from "../components/imgsec";
import { FooterSection } from "../components/FooterSection";
import { div } from "framer-motion/client";
import DynamicQRCode from "../components/QrSection";
import ScrollToTopButton from "../components/ScrollToTop";
const DevMorphixWebsite = () => {
  return (
    <div className="font-circular">
      <div className="px-4 sm:px-6 lg:px-32">
        <main>
          <ScrollToTopButton isProfilePage={true} />
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
            <p className="sm:text-xl text-sm font-medium mb-8">
              IT Consultancy and Solutions
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button className="bg-white border-2 font-medium border-black rounded-full transition hover:scale-110  sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_462_696)">
                      <path
                        d="M10.0001 2.92919L2.92931 10L10.0001 17.0709L17.071 10L10.0001 2.92919ZM10.5893 1.16086L18.8393 9.41086C18.9955 9.56713 19.0833 9.77906 19.0833 10C19.0833 10.221 18.9955 10.4329 18.8393 10.5892L10.5893 18.8392C10.433 18.9954 10.2211 19.0832 10.0001 19.0832C9.77918 19.0832 9.56726 18.9954 9.41098 18.8392L1.16098 10.5892C1.00476 10.4329 0.916992 10.221 0.916992 10C0.916992 9.77906 1.00476 9.56713 1.16098 9.41086L9.41098 1.16086C9.56726 1.00463 9.77918 0.91687 10.0001 0.91687C10.2211 0.91687 10.433 1.00463 10.5893 1.16086ZM10.8335 8.33336V6.25003L13.7501 9.16669L10.8335 12.0834V10H8.33348V12.5H6.66681V9.16669C6.66681 8.94568 6.75461 8.73372 6.91089 8.57744C7.06717 8.42116 7.27913 8.33336 7.50015 8.33336H10.8335Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_462_696">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Direction</span>
                </div>
              </button>
              <button className="bg-white border-2 font-medium border-black rounded-full transition hover:scale-110 sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.5 10L11.6667 4.16669V7.50002C5.83333 8.33335 3.33333 12.5 2.5 16.6667C4.58333 13.75 7.5 12.4167 11.6667 12.4167V15.8334L17.5 10Z"
                      fill="black"
                    />
                  </svg>
                  <span>Share</span>
                </div>
              </button>
              <button className="bg-white border-2 font-medium border-black rounded-full transition hover:scale-110 sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.8747 4.09167C15.1106 3.32009 14.2005 2.70831 13.1976 2.29197C12.1947 1.87564 11.1189 1.66307 10.033 1.66667C5.48301 1.66667 1.77467 5.37501 1.77467 9.92501C1.77467 11.3833 2.15801 12.8 2.87467 14.05L1.70801 18.3333L6.08301 17.1833C7.29134 17.8417 8.64967 18.1917 10.033 18.1917C14.583 18.1917 18.2913 14.4833 18.2913 9.93334C18.2913 7.72501 17.433 5.65 15.8747 4.09167ZM10.033 16.7917C8.79967 16.7917 7.59134 16.4583 6.53301 15.8333L6.28301 15.6833L3.68301 16.3667L4.37467 13.8333L4.20801 13.575C3.52263 12.4809 3.15878 11.2161 3.15801 9.92501C3.15801 6.14167 6.24134 3.05834 10.0247 3.05834C11.858 3.05834 13.583 3.775 14.8747 5.075C15.5144 5.71156 16.0213 6.46879 16.366 7.30278C16.7108 8.13677 16.8865 9.03091 16.883 9.93334C16.8997 13.7167 13.8163 16.7917 10.033 16.7917ZM13.7997 11.6583C13.5913 11.5583 12.5747 11.0583 12.3913 10.9833C12.1997 10.9167 12.0663 10.8833 11.9247 11.0833C11.783 11.2917 11.3913 11.7583 11.2747 11.8917C11.158 12.0333 11.033 12.05 10.8247 11.9417C10.6163 11.8417 9.94967 11.6167 9.16634 10.9167C8.54967 10.3667 8.14134 9.69167 8.01634 9.48334C7.89967 9.27501 7.99967 9.16667 8.10801 9.05834C8.19967 8.96667 8.31634 8.81667 8.41634 8.70001C8.51634 8.58334 8.55801 8.49167 8.62467 8.35834C8.69134 8.21667 8.65801 8.10001 8.60801 8.00001C8.55801 7.90001 8.14134 6.88334 7.97467 6.46667C7.80801 6.06667 7.63301 6.11667 7.50801 6.10834H7.10801C6.96634 6.10834 6.74967 6.15834 6.55801 6.36667C6.37467 6.575 5.84134 7.07501 5.84134 8.09167C5.84134 9.10834 6.58301 10.0917 6.68301 10.225C6.78301 10.3667 8.14134 12.45 10.208 13.3417C10.6997 13.5583 11.083 13.6833 11.383 13.775C11.8747 13.9333 12.3247 13.9083 12.683 13.8583C13.083 13.8 13.908 13.3583 14.0747 12.875C14.2497 12.3917 14.2497 11.9833 14.1913 11.8917C14.133 11.8 14.008 11.7583 13.7997 11.6583Z"
                      fill="black"
                    />
                  </svg>
                  <span>Whatsapp</span>
                </div>
              </button>
            </div>
          </section>

          {/* <ImageGrid images={galleryItems} /> */}
          {/* <ImageGrid/> */}
          <section className="mt-7">
            <ImageGrid className="bg-white shadow-lg rounded-lg  overflow-hidden border my-2  rounded-3xl" />
          </section>

          <section className="border my-7  rounded-3xl ">
            <section className="bg-white rounded-full p-6 mb-8">
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
                <div className="gap-4 p-6 ">
                  {/* Company Info Card */}
                  <div className="bg-white rounded-lg mt-6 ">
                    <h3 className="text-xl font-light mb-4">DevMorphix</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-light text-md text-black">
                          Located In:{" "}
                          <span>
                            Kristu Jyoti College of Management and Information
                            Technology
                          </span>
                        </span>
                      </div>

                      <div>
                        <span className="font-light text-md text-black">
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
                        <h4 className="font-light text-lg text-black">
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
                <h2 className="text-xl font-medium mb-2">About Us</h2>
              <div className="hidden md:block flex flex-col items-center justify-center">
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
              </div>

              <p className="text-[#111111] text-md text-justify font-medium leading-relaxed">
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
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_462_793)">
                        <mask
                          id="mask0_462_793"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                        >
                          <path d="M0 0H40V40H0V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_462_793)">
                          <path
                            d="M31.5 1.87427H37.6343L24.2343 17.2286L40 38.1257H27.6571L17.9829 25.4543L6.92571 38.1257H0.785714L15.1171 21.6971L0 1.87712H12.6571L21.3886 13.4571L31.5 1.87427ZM29.3429 34.4457H32.7429L10.8 5.36284H7.15429L29.3429 34.4457Z"
                            fill="black"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_462_793">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-400 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M36.6663 20C36.6663 10.8 29.1997 3.33337 19.9997 3.33337C10.7997 3.33337 3.33301 10.8 3.33301 20C3.33301 28.0667 9.06634 34.7834 16.6663 36.3334V25H13.333V20H16.6663V15.8334C16.6663 12.6167 19.283 10 22.4997 10H26.6663V15H23.333C22.4163 15 21.6663 15.75 21.6663 16.6667V20H26.6663V25H21.6663V36.5834C30.083 35.75 36.6663 28.65 36.6663 20Z"
                        fill="black"
                      />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M21.713 3.33337C23.588 3.33837 24.5396 3.34837 25.3613 3.37171L25.6846 3.38337C26.058 3.39671 26.4263 3.41337 26.8713 3.43337C28.6446 3.51671 29.8546 3.79671 30.9163 4.20837C32.0163 4.63171 32.943 5.20504 33.8696 6.13004C34.7175 6.96293 35.3733 7.97083 35.7913 9.08337C36.203 10.145 36.483 11.355 36.5663 13.13C36.5863 13.5734 36.603 13.9417 36.6163 14.3167L36.6263 14.64C36.6513 15.46 36.6613 16.4117 36.6646 18.2867L36.6663 19.53V21.7134C36.6704 22.929 36.6576 24.1447 36.628 25.36L36.618 25.6834C36.6046 26.0584 36.588 26.4267 36.568 26.87C36.4846 28.645 36.2013 29.8534 35.7913 30.9167C35.3733 32.0293 34.7175 33.0372 33.8696 33.87C33.0368 34.7179 32.0289 35.3737 30.9163 35.7917C29.8546 36.2034 28.6446 36.4834 26.8713 36.5667L25.6846 36.6167L25.3613 36.6267C24.5396 36.65 23.588 36.6617 21.713 36.665L20.4696 36.6667H18.288C17.0717 36.671 15.8555 36.6582 14.6396 36.6284L14.3163 36.6184C13.9207 36.6034 13.5251 36.5862 13.1296 36.5667C11.3563 36.4834 10.1463 36.2034 9.08298 35.7917C7.97103 35.3735 6.96372 34.7177 6.13131 33.87C5.28289 33.0373 4.62649 32.0294 4.20798 30.9167C3.79631 29.855 3.51631 28.645 3.43298 26.87L3.38298 25.6834L3.37465 25.36C3.34392 24.1447 3.33003 22.9291 3.33298 21.7134V18.2867C3.32837 17.071 3.34059 15.8554 3.36965 14.64L3.38131 14.3167C3.39465 13.9417 3.41131 13.5734 3.43131 13.13C3.51465 11.355 3.79465 10.1467 4.20631 9.08337C4.6258 7.97037 5.28335 6.96243 6.13298 6.13004C6.9649 5.28262 7.97163 4.62683 9.08298 4.20837C10.1463 3.79671 11.3546 3.51671 13.1296 3.43337C13.573 3.41337 13.943 3.39671 14.3163 3.38337L14.6396 3.37337C15.855 3.34376 17.0706 3.33098 18.2863 3.33504L21.713 3.33337ZM19.9996 11.6667C17.7895 11.6667 15.6699 12.5447 14.1071 14.1075C12.5443 15.6703 11.6663 17.7899 11.6663 20C11.6663 22.2102 12.5443 24.3298 14.1071 25.8926C15.6699 27.4554 17.7895 28.3334 19.9996 28.3334C22.2098 28.3334 24.3294 27.4554 25.8922 25.8926C27.455 24.3298 28.333 22.2102 28.333 20C28.333 17.7899 27.455 15.6703 25.8922 14.1075C24.3294 12.5447 22.2098 11.6667 19.9996 11.6667ZM19.9996 15C20.6563 14.9999 21.3065 15.1292 21.9131 15.3803C22.5198 15.6315 23.0711 15.9997 23.5354 16.4639C23.9998 16.9281 24.3682 17.4793 24.6196 18.0859C24.8709 18.6924 25.0004 19.3426 25.0005 19.9992C25.0006 20.6558 24.8714 21.306 24.6202 21.9127C24.369 22.5194 24.0008 23.0706 23.5366 23.535C23.0724 23.9994 22.5213 24.3677 21.9147 24.6191C21.3081 24.8705 20.6579 24.9999 20.0013 25C18.6752 25 17.4035 24.4733 16.4658 23.5356C15.5281 22.5979 15.0013 21.3261 15.0013 20C15.0013 18.674 15.5281 17.4022 16.4658 16.4645C17.4035 15.5268 18.6752 15 20.0013 15M28.7513 9.16671C28.1988 9.16671 27.6689 9.3862 27.2782 9.7769C26.8875 10.1676 26.668 10.6975 26.668 11.25C26.668 11.8026 26.8875 12.3325 27.2782 12.7232C27.6689 13.1139 28.1988 13.3334 28.7513 13.3334C29.3038 13.3334 29.8337 13.1139 30.2245 12.7232C30.6152 12.3325 30.8346 11.8026 30.8346 11.25C30.8346 10.6975 30.6152 10.1676 30.2245 9.7769C29.8337 9.3862 29.3038 9.16671 28.7513 9.16671Z"
                        fill="black"
                      />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M31.6667 5C32.5507 5 33.3986 5.35119 34.0237 5.97631C34.6488 6.60143 35 7.44928 35 8.33333V31.6667C35 32.5507 34.6488 33.3986 34.0237 34.0237C33.3986 34.6488 32.5507 35 31.6667 35H8.33333C7.44928 35 6.60143 34.6488 5.97631 34.0237C5.35119 33.3986 5 32.5507 5 31.6667V8.33333C5 7.44928 5.35119 6.60143 5.97631 5.97631C6.60143 5.35119 7.44928 5 8.33333 5H31.6667ZM30.8333 30.8333V22C30.8333 20.559 30.2609 19.177 29.2419 18.1581C28.223 17.1391 26.841 16.5667 25.4 16.5667C23.9833 16.5667 22.3333 17.4333 21.5333 18.7333V16.8833H16.8833V30.8333H21.5333V22.6167C21.5333 21.3333 22.5667 20.2833 23.85 20.2833C24.4688 20.2833 25.0623 20.5292 25.4999 20.9668C25.9375 21.4043 26.1833 21.9978 26.1833 22.6167V30.8333H30.8333ZM11.4667 14.2667C12.2093 14.2667 12.9215 13.9717 13.4466 13.4466C13.9717 12.9215 14.2667 12.2093 14.2667 11.4667C14.2667 9.91667 13.0167 8.65 11.4667 8.65C10.7196 8.65 10.0032 8.94675 9.47498 9.47498C8.94675 10.0032 8.65 10.7196 8.65 11.4667C8.65 13.0167 9.91667 14.2667 11.4667 14.2667ZM13.7833 30.8333V16.8833H9.16667V30.8333H13.7833Z"
                        fill="black"
                      />
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
