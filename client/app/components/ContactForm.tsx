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
      <h3 className="text-4xl text-black font-bold my-4">Feedback and Suggestions</h3>
      <p className='text-black'>We value your feedback! If you have any suggestions on how we can improve our services, please let us know. Your input helps us serve you better</p>
      <div className="flex space-x-4 py-5">
        <div className='w-full'>
        <label htmlFor="firstName" className="text-black text-start ">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder=""
          className="w-full bg-transparent border-b border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
          />
        </div>
        
        <div className='w-full'>
        <label htmlFor="lastName" className="text-black text-start ">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder=""
          className="w-full bg-transparent border-b border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
        />
        </div>
      </div>


      <div className='flex space-x-4 py-5'>
      <div className='w-full flex-col flex'>
      <label htmlFor="email" className="text-black text-start ">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder=""
        className="w-full bg-transparent border-b border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="w-full">
      <label htmlFor="phone" className="text-black text-start relative">Phone Number</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder=""
        className="w-full bg-transparent border-b border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
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
        className="w-full bg-transparent border-b border-gray-700 text-gray-800 px-3 py-2 focus:outline-none"
        rows={1}
      ></textarea>
      </div>


      <div className='w-full flex justify-end'>
      <button type="submit" className=" bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition duration-300">
        Send Message
      </button>
      </div>
    </form>
  )
}   