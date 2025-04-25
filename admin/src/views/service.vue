<template>
    <div class="min-h-screen bg-white">
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-white shadow-sm">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-green-600">Gigwork</div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="toggleLanguage" class="text-sm font-medium text-gray-600 hover:text-green-600">
              {{ language === 'en' ? 'മലയാളം' : 'English' }}
            </button>
            <button class="hidden md:block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              {{ translations.signIn }}
            </button>
          </div>
        </div>
      </header>
  
      <!-- Hero Section -->
      <section class="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {{ translations.heroTitle }}
          </h1>
          <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {{ translations.heroSubtitle }}
          </p>
          
          <!-- Search Bar -->
          <div class="relative max-w-md mx-auto mb-12">
            <input 
              type="text" 
              :placeholder="translations.searchPlaceholder" 
              class="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <!-- WhatsApp Button (Mobile) -->
          <div class="md:hidden">
            <a href="https://wa.me/+919876543210" class="inline-flex items-center px-5 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              {{ translations.whatsappCTA }}
            </a>
          </div>
        </div>
      </section>
  
      <!-- Categories Section -->
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            {{ translations.categoriesTitle }}
          </h2>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="(category, index) in categories" :key="index" class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 text-center cursor-pointer">
              <div class="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-3">
                <template v-if="category.icon === 'home'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </template>
                <template v-else-if="category.icon === 'book'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </template>
                <template v-else-if="category.icon === 'tool'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </template>
                <template v-else-if="category.icon === 'briefcase'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </template>
                <template v-else-if="category.icon === 'calendar'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </template>
                <template v-else-if="category.icon === 'heart'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </template>
                <template v-else-if="category.icon === 'users'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </template>
                <template v-else-if="category.icon === 'truck'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-green-600">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </template>
              </div>
              <h3 class="font-medium text-gray-800">{{ language === 'en' ? category.name : category.nameMl }}</h3>
            </div>
          </div>
        </div>
      </section>
  
      <!-- How It Works Section -->
      <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            {{ translations.howItWorksTitle }}
          </h2>
          
          <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div v-for="(step, index) in steps" :key="index" class="bg-white rounded-lg shadow-md p-6 text-center relative">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
              <div class="mb-4 flex justify-center">
                <template v-if="step.icon === 'search'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 text-green-600">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </template>
                <template v-else-if="step.icon === 'message'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 text-green-600">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </template>
                <template v-else-if="step.icon === 'users'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 text-green-600">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </template>
              </div>
              <h3 class="font-bold text-lg mb-2 text-gray-800">{{ language === 'en' ? step.title : step.titleMl }}</h3>
              <p class="text-gray-600">{{ language === 'en' ? step.description : step.descriptionMl }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            {{ translations.testimonialsTitle }}
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div class="flex items-start mb-4">
                <div class="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-gray-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800">{{ testimonial.name }}</h3>
                  <p class="text-sm text-gray-500">{{ testimonial.location }}</p>
                </div>
              </div>
              <p class="text-gray-600 italic">{{ language === 'en' ? testimonial.text : testimonial.textMl }}</p>
              <div class="mt-3 flex">
                <template v-for="i in 5" :key="i">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="py-12 bg-green-600 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-6">{{ translations.ctaTitle }}</h2>
          <p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">{{ translations.ctaSubtitle }}</p>
          <a href="https://wa.me/+919876543210" class="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-full hover:bg-gray-100 transition shadow-md font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            {{ translations.startWhatsapp }}
          </a>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-10">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">Gigwork</h3>
              <p class="text-gray-400">{{ translations.footerTagline }}</p>
            </div>
            <div>
              <h3 class="text-lg font-bold mb-4">{{ translations.quickLinks }}</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">{{ translations.aboutUs }}</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">{{ translations.services }}</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">{{ translations.contactUs }}</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-bold mb-4">{{ translations.contact }}</h3>
              <ul class="space-y-2 text-gray-400">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Kochi, Kerala, India
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  +91 9876 543 210
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  info@gigwork.in
                </li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Gigwork. {{ translations.allRightsReserved }}</p>
          </div>
        </div>
      </footer>
  
      <!-- Fixed WhatsApp Button -->
      <a href="https://wa.me/+919876543210" class="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition z-50 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const language = ref('en');
  
  const toggleLanguage = () => {
    language.value = language.value === 'en' ? 'ml' : 'en';
  };
  
  const translations = computed(() => {
    return {
      // Translations based on current language
      heroTitle: language.value === 'en' ? 'Find Trusted Experts Near You' : 'നിങ്ങൾക്ക് അടുത്തുള്ള വിശ്വസനീയരായ വിദഗ്ധരെ കണ്ടെത്തുക',
      heroSubtitle: language.value === 'en' ? 'Connect with skilled professionals in Kerala via WhatsApp for all your service needs' : 'നിങ്ങളുടെ എല്ലാ സേവന ആവശ്യങ്ങൾക്കും വാട്സ്ആപ്പ് വഴി കേരളത്തിലെ വിദഗ്ധ പ്രൊഫഷണലുകളുമായി ബന്ധപ്പെടുക',
      searchPlaceholder: language.value === 'en' ? 'Search for a service...' : 'ഒരു സേവനം തിരയുക...',
      whatsappCTA: language.value === 'en' ? 'Chat on WhatsApp' : 'വാട്സ്ആപ്പിൽ ചാറ്റ് ചെയ്യുക',
      categoriesTitle: language.value === 'en' ? 'Browse Services by Category' : 'വിഭാഗം അനുസരിച്ച് സേവനങ്ങൾ ബ്രൗസ് ചെയ്യുക',
      howItWorksTitle: language.value === 'en' ? 'How It Works' : 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
      testimonialsTitle: language.value === 'en' ? 'What Our Users Say' : 'ഞങ്ങളുടെ ഉപയോക്താക്കൾ പറയുന്നത്',
      ctaTitle: language.value === 'en' ? 'Ready to Find Your Service Provider?' : 'നിങ്ങളുടെ സേവന ദാതാവിനെ കണ്ടെത്താൻ തയ്യാറാണോ?',
      ctaSubtitle: language.value === 'en' ? 'Start a conversation on WhatsApp and get connected with the best professionals in Kerala' : 'വാട്സ്ആപ്പിൽ ഒരു സംഭാഷണം ആരംഭിക്കുകയും കേരളത്തിലെ മികച്ച പ്രൊഫഷണലുകളുമായി ബന്ധപ്പെടുകയും ചെയ്യുക',
      startWhatsapp: language.value === 'en' ? 'Start on WhatsApp' : 'വാട്സ്ആപ്പിൽ ആരംഭിക്കുക',
      footerTagline: language.value === 'en' ? 'Connecting Kerala with trusted local service providers' : 'കേരളത്തെ വിശ്വസനീയമായ പ്രാദേശിക സേവന ദാതാക്കളുമായി ബന്ധിപ്പിക്കുന്നു',
      quickLinks: language.value === 'en' ? 'Quick Links' : 'ക്വിക്ക് ലിങ്കുകൾ',
      aboutUs: language.value === 'en' ? 'About Us' : 'ഞങ്ങളെക്കുറിച്ച്',
      services: language.value === 'en' ? 'Services' : 'സേവനങ്ങൾ',
      contactUs: language.value === 'en' ? 'Contact Us' : 'ഞങ്ങളെ സമീപിക്കുക',
      contact: language.value === 'en' ? 'Contact' : 'ബന്ധപ്പെടുക',
      allRightsReserved: language.value === 'en' ? 'All Rights Reserved' : 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം',
      signIn: language.value === 'en' ? 'Sign In' : 'സൈൻ ഇൻ',
    };
  });
  
  const categories = [
    { 
      name: 'Home Services', 
      nameMl: 'ഹോം സർവീസസ്',
      icon: 'home' 
    },
    { 
      name: 'Education', 
      nameMl: 'വിദ്യാഭ്യാസം',
      icon: 'book' 
    },
    { 
      name: 'Repairs', 
      nameMl: 'റിപ്പയറുകൾ',
      icon: 'tool' 
    },
    { 
      name: 'Professional', 
      nameMl: 'പ്രൊഫഷണൽ',
      icon: 'briefcase' 
    },
    { 
      name: 'Events', 
      nameMl: 'ഇവന്റുകൾ',
      icon: 'calendar' 
    },
    { 
      name: 'Healthcare', 
      nameMl: 'ആരോഗ്യ പരിരക്ഷ',
      icon: 'heart' 
    },
    { 
      name: 'Beauty', 
      nameMl: 'സൗന്ദര്യം',
      icon: 'users' 
    },
    { 
      name: 'Delivery', 
      nameMl: 'ഡെലിവറി',
      icon: 'truck' 
    }
  ];
  
  const steps = [
    {
      title: 'Search or Choose a Category',
      titleMl: 'തിരയുക അല്ലെങ്കിൽ ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക',
      description: 'Find the service you need from our wide range of categories',
      descriptionMl: 'ഞങ്ങളുടെ വിപുലമായ വിഭാഗങ്ങളിൽ നിന്ന് നിങ്ങൾക്ക് ആവശ്യമായ സേവനം കണ്ടെത്തുക',
      icon: 'search'
    },
    {
      title: 'Chat on WhatsApp',
      titleMl: 'വാട്സ്ആപ്പിൽ ചാറ്റ് ചെയ്യുക',
      description: 'Connect directly with service providers via WhatsApp',
      descriptionMl: 'വാട്സ്ആപ്പ് വഴി സേവന ദാതാക്കളുമായി നേരിട്ട് ബന്ധപ്പെടുക',
      icon: 'message'
    },
    {
      title: 'Get the Service',
      titleMl: 'സേവനം നേടുക',
      description: 'Receive quality service from trusted local professionals',
      descriptionMl: 'വിശ്വസനീയമായ പ്രാദേശിക പ്രൊഫഷണലുകളിൽ നിന്ന് ഗുണനിലവാരമുള്ള സേവനം ലഭിക്കുക',
      icon: 'users'
    }
  ];
  
  const testimonials = [
    {
      name: 'Priya Thomas',
      location: 'Kochi',
      text: 'Found an excellent electrician through Gigwork. He fixed all the issues in my new apartment within hours. The WhatsApp connection made it so easy!',
      textMl: 'ഗിഗ്‌വർക്ക് വഴി ഒരു മികച്ച ഇലക്ട്രീഷ്യനെ കണ്ടെത്തി. എന്റെ പുതിയ അപ്പാർട്ട്മെന്റിലെ എല്ലാ പ്രശ്നങ്ങളും അദ്ദേഹം മണിക്കൂറുകൾക്കുള്ളിൽ പരിഹരിച്ചു. വാട്സ്ആപ്പ് കണക്ഷൻ അത് വളരെ എളുപ്പമാക്കി!',
      rating: 5
    },
    {
      name: 'Rahul Menon',
      location: 'Trivandrum',
      text: 'Needed a math tutor for my daughter urgently. Gigwork connected me with a qualified teacher in my neighborhood within minutes. Highly recommend!',
      textMl: 'എന്റെ മകൾക്ക് അടിയന്തിരമായി ഒരു മാത്തമാറ്റിക്സ് ട്യൂട്ടർ ആവശ്യമായിരുന്നു. മിനിറ്റുകൾക്കുള്ളിൽ ഗിഗ്‌വർക്ക് എന്നെ എന്റെ അയൽപക്കത്തെ ഒരു യോഗ്യതയുള്ള അധ്യാപകനുമായി ബന്ധിപ്പിച്ചു. ശക്തമായി ശുപാർശ ചെയ്യുന്നു!',
      rating: 5
    },
    {
      name: 'Anoop Krishnan',
      location: 'Calicut',
      text: 'Used Gigwork to find a plumber on a Sunday. Not only did they respond quickly, but the service was professional and affordable. This app is a game-changer!',
      textMl: 'ഞായറാഴ്ച ഒരു പ്ലംബറെ കണ്ടെത്താൻ ഗിഗ്‌വർക്ക് ഉപയോഗിച്ചു. അവർ വേഗത്തിൽ പ്രതികരിച്ചു മാത്രമല്ല, സേവനം പ്രൊഫഷണലും താങ്ങാനാവുന്നതുമായിരുന്നു. ഈ ആപ്പ് ഒരു ഗെയിം ചേഞ്ചർ ആണ്!',
      rating: 4
    }
  ];
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  :root {
    --primary: #25D366;
    --primary-dark: #128C7E;
    --secondary: #34B7F1;
    --text-dark: #333333;
    --text-light: #666666;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
  }
  
  .bg-green-600 {
    background-color: var(--primary);
  }
  
  .bg-green-700 {
    background-color: var(--primary-dark);
  }
  
  .text-green-600 {
    color: var(--primary);
  }
  
  .border-green-500 {
    border-color: var(--primary);
  }
  
  .bg-green-100 {
    background-color: rgba(37, 211, 102, 0.1);
  }
  
  .bg-green-50 {
    background-color: rgba(37, 211, 102, 0.05);
  }
  </style>

