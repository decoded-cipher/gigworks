"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Clock } from "lucide-react"

export default function PaymentStatus() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "success"
const nextUrl = searchParams.get("next") 
    ? searchParams.get("next")?.startsWith('/') 
      ? searchParams.get("next") 
      : `/${searchParams.get("next")}`
    : "/"
  const [timeLeft, setTimeLeft] = useState(5)
  const [redirecting, setRedirecting] = useState(!!searchParams.get("next"))

  useEffect(() => {
    if (searchParams.get("next")) {
            console.log('Redirecting to:', nextUrl) 
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            router.push(nextUrl || "/")
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [nextUrl, router, searchParams])

  const statusConfig = {
    success: {
      icon: <CheckCircle className="h-16 w-16 text-white" />,
      title: "Payment Successful 🎉",
      message: "Your payment has been successfully processed",
      bgColor: "bg-green-500",
      buttonText: "Continue shopping",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    failed: {
      icon: <XCircle className="h-16 w-16 text-white" />,
      title: "Payment Failed",
      message: "We couldn't process your payment. Please check your payment details and try again.",
      bgColor: "bg-red-500",
      buttonText: "Try again",
      buttonColor: "bg-red-500 hover:bg-red-600",
    },
    pending: {
      icon: <Clock className="h-16 w-16 text-white" />,
      title: "Payment Pending",
      message: "Your payment is currently pending.",
      bgColor: "bg-yellow-500",
      buttonText: "Check status",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    },
  }

  const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.success

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentStatus.bgColor} p-4`}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        {/* <button onClick={() => router.push("/")} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          ×
        </button> */}

        <div className="flex flex-col items-center pt-10 pb-8">
          <div className={`${currentStatus.bgColor} p-4 rounded-full mb-6`}>{currentStatus.icon}</div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentStatus.title}</h1>

          <p className="text-gray-600 text-center px-8 mb-6">{currentStatus.message}</p>

          {redirecting && <p className="text-sm text-gray-500 mb-4">Redirecting in {timeLeft} seconds...</p>}

          <button
            onClick={() => router.push(nextUrl || "/")}
            className={`${currentStatus.buttonColor} text-white py-3 px-6 rounded-full w-4/5 transition-colors duration-300 font-medium`}
          >
            {currentStatus.buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
