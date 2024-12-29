import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserLogin, VerifyLoginOTP, UserRegister } from '../api';
import { toast } from 'react-hot-toast';

// Add the cookie utility function at the top
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

// Add the localStorage utility function at the top
const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

interface Profile {
  name: string;
  slug: string;
  avatar: string | null;
}

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onRegister }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isOtpVisible, setIsOtpVisible] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [showProfileSelector, setShowProfileSelector] = useState<boolean>(false);
  const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
  const [userData, setUserData] = useState<{ name: string, phone: string } | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      const userProfiles = localStorage.getItem('userProfiles');
      const userData = localStorage.getItem('userData');

      if (userProfiles && userData) {
        const profiles = JSON.parse(userProfiles);
        const user = JSON.parse(userData);

        if (profiles.length === 1) {
          router.push(`/profile/${profiles[0].slug}`);
          onClose();
        } else if (profiles.length > 1) {
          setUserProfiles(profiles);
          setUserData(user);
          setShowProfileSelector(true);
        }
      }
    }
  }, [isOpen, router, onClose]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numericValue);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    setError('');
    if (phoneNumber.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setIsLoading(true);
      if (isRegistering) {
        await UserRegister({ name, phone: phoneNumber });
      } else {
        await UserLogin({ phone: phoneNumber });
      }
      setIsOtpVisible(true);
      toast.success('OTP sent successfully!');
      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError('');
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setIsLoading(true);
      const response = await VerifyLoginOTP({
        phone: phoneNumber,
        otp: otpValue
      });

      // Save token in cookie
      setCookie('token', response.data.token, 7);

      const profiles = response.data.user.profiles;

      // Save profiles in localStorage
      setLocalStorage('userProfiles', profiles);
      setLocalStorage('userData', {
        name: response.data.user.name,
        phone: response.data.user.phone
      });

      if (profiles.length === 0) {
        router.push('/signup');
      } else if (profiles.length === 1) {
        router.push(`/profile/${profiles[0].slug}`);
        onClose();
      } else {
        setUserProfiles(profiles);
        setUserData({
          name: response.data.user.name,
          phone: response.data.user.phone
        });
        setShowProfileSelector(true);
      }

      toast.success('Login successful!');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add profile selection handler
  const handleProfileSelect = (slug: string) => {
    router.push(`/profile/${slug}`);
    setShowProfileSelector(false);
    onClose();
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
            <h2 className="text-2xl text-black font-bold">{isRegistering ? 'Register' : 'Verify your number'}</h2>
            <p className="text-gray-400 mb-4">
              {isRegistering ? 'Please enter your name and WhatsApp number to register.' : 'Please enter your WhatsApp number for verification to proceed.'}
            </p>
            <div className="w-full space-y-3 sm:space-y-4">
              {isRegistering && (
                <input
                  type="text"
                  className="w-full text-black border border-gray-300 rounded-full px-3 sm:px-5 py-2 sm:py-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              )}
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
              {error && (
                <p className="text-red-500 text-sm font-medium text-center">
                  {error}
                </p>
              )}
              <button
                className="bg-green-500 text-white rounded-full px-6 py-4 w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-lg disabled:opacity-50"
                onClick={handleSendOtp}
                disabled={isLoading || phoneNumber.length !== 10 || (isRegistering && !name)}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
              <div className="text-center mt-4">
                <span className="text-gray-600">{isRegistering ? 'Already have an account? ' : 'Don&apos;t have an account? '}</span>
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-green-600 hover:underline font-semibold"
                >
                  {isRegistering ? 'Login' : 'Create now'}
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
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}
            <button
              className="bg-green-500 text-white rounded-full px-6 py-4 w-full mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-lg disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading || otp.join('').length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
            <div className="text-center mt-4">
              <span className="text-gray-600">Didn&apos;t receive code? </span>
              {resendTimer > 0 ? (
                <span className="text-gray-500">Resend in {resendTimer}s</span>
              ) : (
                <button
                  onClick={handleSendOtp}
                  className="text-green-600 hover:underline font-semibold disabled:opacity-50"
                  disabled={isLoading}
                >
                  Resend
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {/* Add the profile selector popup */}
      {showProfileSelector && userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-[400px] p-6 relative">
            <button
              onClick={() => setShowProfileSelector(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-center">Select Profile</h2>
              <div className="text-gray-600 text-center mt-2">
                {/* <p>{userData.name}</p> */}
                <h2 className="text-2xl text-black font-bold">Hi <span className='text-green-600'> {userData.name} </span> </h2>
                <h2 className="text-xl text-black font-bold"> choose your profile </h2>
              </div>
            </div>

            <div className="space-y-3">
              {userProfiles.map((profile) => (
                <button
                  key={profile.slug}
                  onClick={() => handleProfileSelect(profile.slug)}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:bg-green-500 transition-colors flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xl text-gray-600">
                        {profile.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{profile.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default LoginPopup;
