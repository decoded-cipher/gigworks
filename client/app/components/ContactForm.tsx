'use client'

import { useEffect, useRef, useState } from 'react'
import { submitContactForm } from '../api'

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
  
  const [isLoading, setIsLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.turnstile) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (window.turnstile && turnstileRef.current) {
      const widgetId = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          setTurnstileToken(token)
        },
      })
  
      return () => {
        window.turnstile?.remove?.(widgetId)
      }
    }
  }, [turnstileRef.current])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
  
    if (!turnstileToken) {
      console.error('Turnstile token is missing.')
      setIsLoading(false)
      return
    }
  
    submitContactForm({ ...formData, turnstileToken })
      .then(response => {
        console.log('Form submitted successfully:', response)
      }).catch(error => {
        console.error('Error submitting form:', error)
      }).finally(() => {
        window.location.reload()
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-4xl text-black font-bold my-4">Feedback and Suggestions</h3>
      <p className='text-black hidden md:block'>
        We value your feedback! If you have any suggestions on how we can improve our services, please let us know. Your input helps us serve you better
      </p>

      <div className="flex space-x-4 py-5">
        <div className='w-full'>
          <label htmlFor="firstName" className="text-black text-start">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Nithin"
            className="w-full bg-transparent placeholder:font-light border-b border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
          />
        </div>
        
        <div className='w-full'>
          <label htmlFor="lastName" className="text-black text-start ">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Daniel"
            className="w-full bg-transparent border-b placeholder:font-light border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
          />
        </div>
      </div>


      <div className='flex space-x-4 py-5'>
        <div className='w-full flex-col flex'>
          <label htmlFor="email" className="text-black  text-start ">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="w-full bg-transparent border-b placeholder:font-light border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="w-full">
        <label htmlFor="phone" className="text-black text-start relative">Phone Number</label>
        <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 29292 39393"
            className="w-full bg-transparent border-b placeholder:font-light border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className='py-5'>
        <label htmlFor="message" className='text-black my-4'>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          className="w-full bg-transparent border-b placeholder:font-light border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
          rows={1}
        ></textarea>
      </div>

      <div ref={turnstileRef} className="my-4"></div>

      <div className='w-full flex justify-end'>
        <button
          type="submit"
          className={`w-full md:w-auto bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 ${!turnstileToken || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!turnstileToken || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message || isLoading}
        >
          Send Message
        </button>
      </div>
    </form>
  )
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string, callback: (token: string) => void }) => string
      remove?: (widgetId: string) => void
    }
  }
}
