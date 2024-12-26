import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onRegister }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isOtpVisible, setIsOtpVisible] = useState<boolean>(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input for phone number
    const numericValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numericValue);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Ensure only numeric input
    if (/^\d*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Automatically move to next input if value is entered
      if (value && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace to delete and move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = () => {
    // Basic phone number validation
    if (phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    console.log('Sending OTP to:', phoneNumber);
    setIsOtpVisible(true);
  };

  const handleSubmit = () => {
    // Validate OTP is fully filled
    if (otp.some(digit => digit === '')) {
      alert('Please enter the complete OTP');
      return;
    }
    console.log('Verifying OTP:', otp.join(''));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-xl w-full max-w-[500px] flex flex-col items-center text-center space-y-4 sm:space-y-6 relative shadow-none">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-black transition"
        >
          <X size={28} />
        </button>
        {!isOtpVisible ? (
          <>
            <Image 
              src="https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/gigworksblk.svg" 
              alt="Gigworks Logo" 
              width={306}
              height={336}
              className="mx-auto mb-2 sm:mb-4 w-48 sm:w-auto"
            />
            <h2 className="text-2xl text-black font-bold">Verify your number</h2>
            <p className="text-gray-400  mb-4">
              Please enter your WhatsApp number for verification to proceed.
            </p>
            <div className="w-full space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="bg-gray-100 rounded-full px-3 sm:px-4 py-2 sm:py-3 text-gray-600 text-base sm:text-lg">
                  +91
                </div>
                <input
                  type="tel"
                  className="flex-1 text-black border border-gray-300 rounded-full px-3 sm:px-5 py-2 sm:py-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="WhatsApp number"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <button
                className="bg-green-500 text-white rounded-full px-6 py-4 w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-lg"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
              <div className="text-center mt-4">
                <span className="text-gray-600">Don&apos;t have an account? </span>
                <button
                  onClick={() => router.push("/signup/1")}
                  className="text-green-600 hover:underline font-semibold"
                >
                  Create now
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Image 
              src="https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/gigworksblk.svg" 
              alt="Gigworks Logo" 
              width={306}
              height={336}
              className="mx-auto mb-2 sm:mb-4 w-48 sm:w-auto"
            />
            <h2 className="text-2xl sm:text-4xl text-black font-bold">Enter OTP</h2>
            <p className="text-gray-500 mb-4">
              Please enter the 6-digit OTP sent to your WhatsApp number.
            </p>
            <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full px-2 sm:px-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) {
                      otpInputRefs.current[index] = el;
                    }
                  }}
                  type="tel"
                  className="border border-gray-300 rounded-md text-black px-1 sm:px-3 py-2 sm:py-4 focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-center text-lg sm:text-2xl"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />
              ))}
            </div>
            <button
              className="bg-green-500 text-white rounded-full px-6 py-4 w-full mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-lg"
              onClick={handleSubmit}
            >
              Verify
            </button>
            <div className="text-center mt-4">
                <span className="text-gray-600">Didn&apos;t receive code? </span>
                <button
                  // onClick={() => router.push("/signup/1")}
                  className="text-green-600 hover:underline font-semibold"
                >
                  Resend 
                </button>
              </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;