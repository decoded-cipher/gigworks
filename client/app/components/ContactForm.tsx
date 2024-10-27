'use client'

import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the form data to your server
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Feedback and Suggestions</h3>
      <div className="flex space-x-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-1/2 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-1/2 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
        />
      </div>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Write your message..."
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
        rows={4}
      ></textarea>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300">
        Send Message
      </button>
    </form>
  )
}   