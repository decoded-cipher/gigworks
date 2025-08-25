"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import  Navigation  from "../components/navSection"
import { FooterSection } from "../components/FooterSection"

interface UserDetails {
  name: string
  phone: string
}

export default function FeedbackPage() {
  const searchParams = useSearchParams()
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [comment, setComment] = useState("")
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [linkId, setLinkId] = useState<string>("")
  const [profileId, setProfileId] = useState<string>("")

  useEffect(() => {
    const linkIdParam = searchParams.get("linkId")
    const profileIdParam = searchParams.get("profileId")

    if (linkIdParam) setLinkId(linkIdParam)
    if (profileIdParam) setProfileId(profileIdParam)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !comment.trim() || !userDetails.name.trim() || !userDetails.phone.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      const feedbackData = {
        linkId,
        profileId,
        userDetails,
        rating: rating.toString(),
        comment: comment.trim(),
      }

      const response = await fetch("https://api.gigwork.co.in/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error("Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md text-center bg-white rounded-lg border border-gray-200 shadow-lg p-6">
            <svg
              className="w-16 h-16 text-emerald-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600">
              Your feedback has been submitted successfully. We appreciate your time and input.
            </p>
          </div>
        </main>
        <FooterSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Share Your Experience</h1>
            <p className="text-gray-600">Your feedback helps us improve our services and support our freelancers</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Client Feedback</h3>
              <p className="text-gray-600 text-sm mt-1">Please rate your experience and share your thoughts</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Rating Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Rate Your Experience</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-colors duration-200"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <svg
                          className={`w-8 h-8 transition-colors duration-200 ${
                            hoverRating >= star || rating >= star
                              ? "fill-emerald-500 text-emerald-500"
                              : "text-gray-300 hover:text-gray-400"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                    {rating > 0 && <span className="ml-2 text-sm text-gray-600">{rating} out of 5 stars</span>}
                  </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm font-medium">
                    Your Feedback
                  </label>
                  <textarea
                    id="comment"
                    placeholder="Share your thoughts about the service, quality of work, communication, or any suggestions for improvement..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  disabled={
                    !rating || !comment.trim() || !userDetails.name.trim() || !userDetails.phone.trim() || isSubmitting
                  }
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
