"use client";

import { useState, useEffect } from "react";
import gigworks from "../../public/assets/media/gigworksblk.svg";
import Image from "next/image";
import { fetchBusinessData } from "../api/index";
import { CategorySkeleton } from "../components/categorySkelton";
import ServiceSearchSection from "../components/ServiceSearchSection";
import Router from "next/navigation";

import {
  Home,
  Book,
  PenToolIcon as Tool,
  Briefcase,
  Calendar,
  Heart,
  Cross,
  Hammer,
  Users,
  Truck,
  Search,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FooterSection } from "../components/FooterSection";
import Link from "next/link";

interface Category {
  id: string;
  title: string;
  src: string;
  name?: string;
}

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetchBusinessData({ hasBusiness: true });

        // Format categories from API response
        const validCategories =
          response.data.categories
            ?.map((cat: any) =>
              cat.businessCount !== 0
                ? {
                    id: cat.id || "",
                    title: cat.name || cat.title || "Untitled",
                    src: cat.src || "/icons/default.svg",
                  }
                : null
            )
            .filter((cat: any) => cat !== null) || [];

        setFetchedCategories(validCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setFetchedCategories([]); // Set empty array on error
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  const translations = {
    // Translations based on current language
    heroTitle:
      language === "en"
        ? "Find Trusted Experts Near You"
        : "നിങ്ങൾക്ക് അടുത്തുള്ള വിശ്വസനീയരായ വിദഗ്ധരെ കണ്ടെത്തുക",
    heroSubtitle:
      language === "en"
        ? "Connect with skilled professionals in Kerala via WhatsApp for all your service needs"
        : "നിങ്ങളുടെ എല്ലാ സേവന ആവശ്യങ്ങൾക്കും വാട്സ്ആപ്പ് വഴി കേരളത്തിലെ വിദഗ്ധ പ്രൊഫഷണലുകളുമായി ബന്ധപ്പെടുക",
    searchPlaceholder:
      language === "en" ? "Search for a service..." : "ഒരു സേവനം തിരയുക...",
    whatsappCTA:
      language === "en" ? "Chat on WhatsApp" : "വാട്സ്ആപ്പിൽ ചാറ്റ് ചെയ്യുക",
    categoriesTitle:
      language === "en"
        ? "Browse Services by Category"
        : "വിഭാഗം അനുസരിച്ച് സേവനങ്ങൾ ബ്രൗസ് ചെയ്യുക",
    howItWorksTitle:
      language === "en" ? "How It Works" : "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    testimonialsTitle:
      language === "en"
        ? "What Our Users Say"
        : "ഞങ്ങളുടെ ഉപയോക്താക്കൾ പറയുന്നത്",
    ctaTitle:
      language === "en"
        ? "Ready to Find Your Service Provider?"
        : "നിങ്ങളുടെ സേവന ദാതാവിനെ കണ്ടെത്താൻ തയ്യാറാണോ?",
    ctaSubtitle:
      language === "en"
        ? "Start a conversation on WhatsApp and get connected with the best professionals in Kerala"
        : "വാട്സ്ആപ്പിൽ ഒരു സംഭാഷണം ആരംഭിക്കുകയും കേരളത്തിലെ മികച്ച പ്രൊഫഷണലുകളുമായി ബന്ധപ്പെടുകയും ചെയ്യുക",
    startWhatsapp:
      language === "en" ? "Start on WhatsApp" : "വാട്സ്ആപ്പിൽ ആരംഭിക്കുക",
    footerTagline:
      language === "en"
        ? "Connecting Kerala with trusted local service providers"
        : "കേരളത്തെ വിശ്വസനീയമായ പ്രാദേശിക സേവന ദാതാക്കളുമായി ബന്ധിപ്പിക്കുന്നു",
    quickLinks: language === "en" ? "Quick Links" : "ക്വിക്ക് ലിങ്കുകൾ",
    aboutUs: language === "en" ? "About Us" : "ഞങ്ങളെക്കുറിച്ച്",
    services: language === "en" ? "Services" : "സേവനങ്ങൾ",
    contactUs: language === "en" ? "Contact Us" : "ഞങ്ങളെ സമീപിക്കുക",
    contact: language === "en" ? "Contact" : "ബന്ധപ്പെടുക",
    allRightsReserved:
      language === "en"
        ? "All Rights Reserved"
        : "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം",
    signIn: language === "en" ? "Chat " : "സൈൻ ഇൻ",
  };

  const categories = [
    {
      name: "Home Services",
      nameMl: "ഹോം സർവീസസ്",
      icon: "home",
    },
    {
      name: "Education",
      nameMl: "വിദ്യാഭ്യാസം",
      icon: "book",
    },
    {
      name: "Repairs",
      nameMl: "റിപ്പയറുകൾ",
      icon: "tool",
    },
    {
      name: "Professional",
      nameMl: "പ്രൊഫഷണൽ",
      icon: "briefcase",
    },
    {
      name: "Events",
      nameMl: "ഇവന്റുകൾ",
      icon: "calendar",
    },
    {
      name: "Healthcare",
      nameMl: "ആരോഗ്യ പരിരക്ഷ",
      icon: "heart",
    },
    {
      name: "Beauty",
      nameMl: "സൗന്ദര്യം",
      icon: "users",
    },
    {
      name: "Delivery",
      nameMl: "ഡെലിവറി",
      icon: "truck",
    },
  ];

  const steps = [
    {
      title: "Search or Choose a Category",
      titleMl: "തിരയുക അല്ലെങ്കിൽ ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക",
      description:
        "Find the service you need from our wide range of categories",
      descriptionMl:
        "ഞങ്ങളുടെ വിപുലമായ വിഭാഗങ്ങളിൽ നിന്ന് നിങ്ങൾക്ക് ആവശ്യമായ സേവനം കണ്ടെത്തുക",
      icon: "search",
    },
    {
      title: "Chat on WhatsApp",
      titleMl: "വാട്സ്ആപ്പിൽ ചാറ്റ് ചെയ്യുക",
      description: "Connect directly with service providers via WhatsApp",
      descriptionMl: "വാട്സ്ആപ്പ് വഴി സേവന ദാതാക്കളുമായി നേരിട്ട് ബന്ധപ്പെടുക",
      icon: "message",
    },
    {
      title: "Get the Service",
      titleMl: "സേവനം നേടുക",
      description: "Receive quality service from trusted local professionals",
      descriptionMl:
        "വിശ്വസനീയമായ പ്രാദേശിക പ്രൊഫഷണലുകളിൽ നിന്ന് ഗുണനിലവാരമുള്ള സേവനം ലഭിക്കുക",
      icon: "users",
    },
  ];

  const testimonials = [
    {
      name: "Priya Thomas",
      location: "Kochi",
      text: "Found an excellent electrician through Gigwork. He fixed all the issues in my new apartment within hours. The WhatsApp connection made it so easy!",
      textMl:
        "ഗിഗ്‌വർക്ക് വഴി ഒരു മികച്ച ഇലക്ട്രീഷ്യനെ കണ്ടെത്തി. എന്റെ പുതിയ അപ്പാർട്ട്മെന്റിലെ എല്ലാ പ്രശ്നങ്ങളും അദ്ദേഹം മണിക്കൂറുകൾക്കുള്ളിൽ പരിഹരിച്ചു. വാട്സ്ആപ്പ് കണക്ഷൻ അത് വളരെ എളുപ്പമാക്കി!",
      rating: 5,
    },
    {
      name: "Rahul Menon",
      location: "Trivandrum",
      text: "Needed a math tutor for my daughter urgently. Gigwork connected me with a qualified teacher in my neighborhood within minutes. Highly recommend!",
      textMl:
        "എന്റെ മകൾക്ക് അടിയന്തിരമായി ഒരു മാത്തമാറ്റിക്സ് ട്യൂട്ടർ ആവശ്യമായിരുന്നു. മിനിറ്റുകൾക്കുള്ളിൽ ഗിഗ്‌വർക്ക് എന്നെ എന്റെ അയൽപക്കത്തെ ഒരു യോഗ്യതയുള്ള അധ്യാപകനുമായി ബന്ധിപ്പിച്ചു. ശക്തമായി ശുപാർശ ചെയ്യുന്നു!",
      rating: 5,
    },
    {
      name: "Anoop Krishnan",
      location: "Calicut",
      text: "Used Gigwork to find a plumber on a Sunday. Not only did they respond quickly, but the service was professional and affordable. This app is a game-changer!",
      textMl:
        "ഞായറാഴ്ച ഒരു പ്ലംബറെ കണ്ടെത്താൻ ഗിഗ്‌വർക്ക് ഉപയോഗിച്ചു. അവർ വേഗത്തിൽ പ്രതികരിച്ചു മാത്രമല്ല, സേവനം പ്രൊഫഷണലും താങ്ങാനാവുന്നതുമായിരുന്നു. ഈ ആപ്പ് ഒരു ഗെയിം ചേഞ്ചർ ആണ്!",
      rating: 4,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Helper function to render category icon
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-6 w-6 text-green-600" />;
      case "book":
        return <Book className="h-6 w-6 text-green-600" />;
      case "tool":
        return <Tool className="h-6 w-6 text-green-600" />;
      case "hammer":
        return <Hammer className="h-6 w-6 text-green-600" />;
      case "briefcase":
        return <Briefcase className="h-6 w-6 text-green-600" />;
      case "calendar":
        return <Calendar className="h-6 w-6 text-green-600" />;
      case "heart":
        return <Heart className="h-6 w-6 text-green-600" />;
      case "users":
        return <Users className="h-6 w-6 text-green-600" />;
      case "truck":
        return <Truck className="h-6 w-6 text-green-600" />;
      default:
        return <Home className="h-6 w-6 text-green-600" />;
    }
  };
  const whatsapp = () => {  
    window.open("https://wa.me/+918590012027", "_blank");
  }

  // Helper function to render step icon
  const renderStepIcon = (iconName: string) => {
    switch (iconName) {
      case "search":
        return <Search className="h-10 w-10 text-green-600" />;
      case "message":
        return <MessageCircle className="h-10 w-10 text-green-600" />;
      case "users":
        return <Users className="h-10 w-10 text-green-600" />;
      default:
        return <Search className="h-10 w-10 text-green-600" />;
    }
  };
  // Add this function to map category titles to appropriate icons
  // Update your getCategoryIcon function to handle specific category names
  const getCategoryIcon = (categoryTitle: string) => {
    // Check for exact category matches first
    const exactMatchMap: Record<string, string> = {
      "Sales & Retail": "briefcase",
      Services: "users",
      "Manufacturing & Production": "hammer",
      "Education & Training": "book",
      "Hospitality & Food Services": "users",
      "Agriculture & Farming": "home",
      "Health & Wellness": "heart",
      Automotive: "truck",
      "Real Estate & Property": "home",
      "Media & Entertainment": "calendar",
      "Technology & Innovation": "tool",
      "Financial & Legal": "briefcase",
      "Non-Profit & NGOs": "users",
      Miscellaneous: "home",
    };

    // Check for exact match
    if (exactMatchMap[categoryTitle]) {
      return exactMatchMap[categoryTitle];
    }

    // If no exact match, fallback to keyword-based matching
    const title = categoryTitle.toLowerCase();

    // Map common category names to icons
    if (
      title.includes("home") ||
      title.includes("house") ||
      title.includes("property") ||
      title.includes("real estate")
    )
      return "home";
    if (
      title.includes("edu") ||
      title.includes("school") ||
      title.includes("tutor") ||
      title.includes("training")
    )
      return "book";
    if (
      title.includes("repair") ||
      title.includes("fix") ||
      title.includes("manufactur") ||
      title.includes("product")
    )
      return "hammer";
    if (
      title.includes("professional") ||
      title.includes("consult") ||
      title.includes("sales") ||
      title.includes("retail") ||
      title.includes("financial")
    )
      return "briefcase";
    if (
      title.includes("event") ||
      title.includes("party") ||
      title.includes("wedding") ||
      title.includes("media") ||
      title.includes("entertainment")
    )
      return "calendar";
    if (
      title.includes("health") ||
      title.includes("medical") ||
      title.includes("care") ||
      title.includes("wellness")
    )
      return "heart";
    if (
      title.includes("beauty") ||
      title.includes("salon") ||
      title.includes("service") ||
      title.includes("hosp") ||
      title.includes("food") ||
      title.includes("ngo")
    )
      return "users";
    if (
      title.includes("delivery") ||
      title.includes("transport") ||
      title.includes("courier") ||
      title.includes("auto")
    )
      return "truck";

    // Default icon for categories that don't match any pattern
    return "home";
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <Image
              src={gigworks}
              alt="GigWork Logo"
              width={40}
              height={40}
              className="w-28 md:w-40"
            />
          </a>
          <div className=" space-x-4">
            {/* <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-gray-600 hover:text-green-600"
            >
              {language === "en" ? "മലയാളം" : "English"}
            </button> */}
            <button onClick={whatsapp} className="inline-flex items-center justify-center hidden md:flex px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              {/* Simplified WhatsApp SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 flex-shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {translations.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {translations.heroSubtitle}
          </p>

          {/* Replace the old search bar with the new component */}
          <div className="max-w-3xl mx-auto mb-12">
            <ServiceSearchSection />
          </div>

          {/* WhatsApp Button (Mobile) */}
          <div className="md:hidden">
            <a
              href="https://wa.me/+918590012027"
              className="inline-flex items-center px-5 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {translations.whatsappCTA}
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section - Original UI with dynamic data */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            {translations.categoriesTitle}
          </h2>

          {isLoadingCategories ? (
            <CategorySkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {fetchedCategories.map((category, index) => (
                <Link
                  href={`/category/${category.id}`}
                  key={index}
                  className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="bg-green-50 p-4 rounded-full">
                    {renderCategoryIcon(getCategoryIcon(category.title))}
                  </div>
                  <span className="text-center font-medium text-gray-800">
                    {language === "en" ? category.title : category.title}{" "}
                    {/* Replace with ML version if available */}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {!isLoadingCategories && fetchedCategories.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No categories available
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            {translations.testimonialsTitle}
          </h2>

          <div className="max-w-2xl mx-auto relative">
            {/* Current Testimonial */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic min-h-[100px]">
                {language === "en"
                  ? testimonials[currentTestimonial].text
                  : testimonials[currentTestimonial].textMl}
              </p>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={
                      star <= testimonials[currentTestimonial].rating
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-5 w-5 ${
                      star <= testimonials[currentTestimonial].rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {/* <button
              onClick={() =>
                setCurrentTestimonial((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md text-green-600 hover:text-green-700 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev + 1) % testimonials.length
                )
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md text-green-600 hover:text-green-700 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button> */}

            {/* Indicator Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentTestimonial === index
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            {translations.howItWorksTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="mb-4 flex justify-center">
                  {renderStepIcon(step.icon)}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {language === "en" ? step.title : step.titleMl}
                </h3>
                <p className="text-gray-600">
                  {language === "en" ? step.description : step.descriptionMl}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {translations.ctaTitle}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {translations.ctaSubtitle}
          </p>
          <a
            href="https://wa.me/+918590012027"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-full hover:bg-gray-100 transition shadow-md font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              className="mr-2"
              height="20"
              viewBox="0,0,256,256"
            >
              <g
                fill="currentColor"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g transform="scale(10.66667,10.66667)">
                  <path d="M12.01172,2c-5.506,0 -9.98823,4.47838 -9.99023,9.98438c-0.001,1.76 0.45998,3.47819 1.33398,4.99219l-1.35547,5.02344l5.23242,-1.23633c1.459,0.796 3.10144,1.21384 4.77344,1.21484h0.00391c5.505,0 9.98528,-4.47937 9.98828,-9.98437c0.002,-2.669 -1.03588,-5.17841 -2.92187,-7.06641c-1.886,-1.887 -4.39245,-2.92673 -7.06445,-2.92773zM12.00977,4c2.136,0.001 4.14334,0.8338 5.65234,2.3418c1.509,1.51 2.33794,3.51639 2.33594,5.65039c-0.002,4.404 -3.58423,7.98633 -7.99023,7.98633c-1.333,-0.001 -2.65341,-0.3357 -3.81641,-0.9707l-0.67383,-0.36719l-0.74414,0.17578l-1.96875,0.46484l0.48047,-1.78516l0.2168,-0.80078l-0.41406,-0.71875c-0.698,-1.208 -1.06741,-2.58919 -1.06641,-3.99219c0.002,-4.402 3.58528,-7.98437 7.98828,-7.98437zM8.47656,7.375c-0.167,0 -0.43702,0.0625 -0.66602,0.3125c-0.229,0.249 -0.875,0.85208 -0.875,2.08008c0,1.228 0.89453,2.41503 1.01953,2.58203c0.124,0.166 1.72667,2.76563 4.26367,3.76563c2.108,0.831 2.53614,0.667 2.99414,0.625c0.458,-0.041 1.47755,-0.60255 1.68555,-1.18555c0.208,-0.583 0.20848,-1.0845 0.14648,-1.1875c-0.062,-0.104 -0.22852,-0.16602 -0.47852,-0.29102c-0.249,-0.125 -1.47608,-0.72755 -1.70508,-0.81055c-0.229,-0.083 -0.3965,-0.125 -0.5625,0.125c-0.166,0.25 -0.64306,0.81056 -0.78906,0.97656c-0.146,0.167 -0.29102,0.18945 -0.54102,0.06445c-0.25,-0.126 -1.05381,-0.39024 -2.00781,-1.24024c-0.742,-0.661 -1.24267,-1.47656 -1.38867,-1.72656c-0.145,-0.249 -0.01367,-0.38577 0.11133,-0.50977c0.112,-0.112 0.24805,-0.2915 0.37305,-0.4375c0.124,-0.146 0.167,-0.25002 0.25,-0.41602c0.083,-0.166 0.04051,-0.3125 -0.02149,-0.4375c-0.062,-0.125 -0.54753,-1.35756 -0.76953,-1.85156c-0.187,-0.415 -0.3845,-0.42464 -0.5625,-0.43164c-0.145,-0.006 -0.31056,-0.00586 -0.47656,-0.00586z"></path>
                </g>
              </g>
            </svg>
            {translations.startWhatsapp}
          </a>
        </div>
      </section>

      {/* Footer */}
      <FooterSection></FooterSection>

      {/* Fixed WhatsApp Button */}
      <a
        href="https://wa.me/+918590012027"
        className="fixed bottom-[3rem] sm:bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition z-50 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0,0,256,256"
        >
          <g
            fill="currentColor"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <g transform="scale(10.66667,10.66667)">
              <path d="M12.01172,2c-5.506,0 -9.98823,4.47838 -9.99023,9.98438c-0.001,1.76 0.45998,3.47819 1.33398,4.99219l-1.35547,5.02344l5.23242,-1.23633c1.459,0.796 3.10144,1.21384 4.77344,1.21484h0.00391c5.505,0 9.98528,-4.47937 9.98828,-9.98437c0.002,-2.669 -1.03588,-5.17841 -2.92187,-7.06641c-1.886,-1.887 -4.39245,-2.92673 -7.06445,-2.92773zM12.00977,4c2.136,0.001 4.14334,0.8338 5.65234,2.3418c1.509,1.51 2.33794,3.51639 2.33594,5.65039c-0.002,4.404 -3.58423,7.98633 -7.99023,7.98633c-1.333,-0.001 -2.65341,-0.3357 -3.81641,-0.9707l-0.67383,-0.36719l-0.74414,0.17578l-1.96875,0.46484l0.48047,-1.78516l0.2168,-0.80078l-0.41406,-0.71875c-0.698,-1.208 -1.06741,-2.58919 -1.06641,-3.99219c0.002,-4.402 3.58528,-7.98437 7.98828,-7.98437zM8.47656,7.375c-0.167,0 -0.43702,0.0625 -0.66602,0.3125c-0.229,0.249 -0.875,0.85208 -0.875,2.08008c0,1.228 0.89453,2.41503 1.01953,2.58203c0.124,0.166 1.72667,2.76563 4.26367,3.76563c2.108,0.831 2.53614,0.667 2.99414,0.625c0.458,-0.041 1.47755,-0.60255 1.68555,-1.18555c0.208,-0.583 0.20848,-1.0845 0.14648,-1.1875c-0.062,-0.104 -0.22852,-0.16602 -0.47852,-0.29102c-0.249,-0.125 -1.47608,-0.72755 -1.70508,-0.81055c-0.229,-0.083 -0.3965,-0.125 -0.5625,0.125c-0.166,0.25 -0.64306,0.81056 -0.78906,0.97656c-0.146,0.167 -0.29102,0.18945 -0.54102,0.06445c-0.25,-0.126 -1.05381,-0.39024 -2.00781,-1.24024c-0.742,-0.661 -1.24267,-1.47656 -1.38867,-1.72656c-0.145,-0.249 -0.01367,-0.38577 0.11133,-0.50977c0.112,-0.112 0.24805,-0.2915 0.37305,-0.4375c0.124,-0.146 0.167,-0.25002 0.25,-0.41602c0.083,-0.166 0.04051,-0.3125 -0.02149,-0.4375c-0.062,-0.125 -0.54753,-1.35756 -0.76953,-1.85156c-0.187,-0.415 -0.3845,-0.42464 -0.5625,-0.43164c-0.145,-0.006 -0.31056,-0.00586 -0.47656,-0.00586z"></path>
            </g>
          </g>
        </svg>
      </a>
    </div>
  );
}
