import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserLogin, VerifyLoginOTP, UserRegister, VerifyRegisterOTP,ASSET_BASE_URL } from '../api';
import { toast } from 'react-hot-toast';
import Loader from './loader';

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

const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  // redirectAfterLogin
}) => {
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
  const [showRoleSelector, setShowRoleSelector] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<'business' | 'partner' | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      const userProfiles = localStorage.getItem('userProfiles');
      const userData = localStorage.getItem('userData');

      if (userProfiles && userData) {
        const profiles = JSON.parse(userProfiles);
        const user = JSON.parse(userData);

        if (profiles.length === 1) {
          router.push(`/${profiles[0].slug}`);
          onClose();
        } else if (profiles.length > 1) {
          setUserProfiles(profiles);
          setUserData(user);
          setShowProfileSelector(true);
        }
      }
    }
  }, [isOpen, router, onClose]);

  // Add useEffect to load data from localStorage when component mounts
  React.useEffect(() => {
    if (isOpen) {
      const savedFormData = getLocalStorage('partnerFormData');
      if (savedFormData) {
        // Autofill name and phone from localStorage if available
        setName(savedFormData.user?.name || '');
        setPhoneNumber(savedFormData.user?.phone || '');
      }
    }
  }, [isOpen]);

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
      if (isRegistering && !selectedRole) {
        setShowRoleSelector(true);
        return;
      }
      
      if (isRegistering) {
        await UserRegister({ 
          name, 
          phone: phoneNumber,
          isPartner: selectedRole === 'partner' // Add this line
        });
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

  // Add reset function
  const resetForm = () => {
    setPhoneNumber('');
    setName('');
    setOtp(['', '', '', '', '', '']);
    setIsOtpVisible(false);
    setIsRegistering(false);
    setError('');
    setResendTimer(0);
    setShowProfileSelector(false);
    setShowRoleSelector(false);
    setUserProfiles([]);
    setUserData(null);
  };

  // Modify onClose to include reset
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Modify handleSubmit to handle token-only response
  const handleSubmit = async () => {
    setError('');
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
  
    try {
      setIsLoading(true);
      setIsVerifying(true);
      
      const response = await (isRegistering 
        ? VerifyRegisterOTP({ name, phone: phoneNumber, otp: otpValue })
        : VerifyLoginOTP({ phone: phoneNumber, otp: otpValue }));
  
      if (response?.status === 200 || response?.status === 201) {
        if (isRegistering) {
          handleRegistrationSuccess();
        } else {
          await handleLoginSuccess(response);
        }
        return;
      }
  
      throw new Error('Unexpected response status');
      
    } catch (error: any) {
      console.error('Error details:', error);
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Invalid OTP. Please try again.'
      );
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  };
  
  const handleRegistrationSuccess = () => {
    toast.success('Registration successful! Please login to continue.');
    setOtp(['', '', '', '', '', '']);
    setIsRegistering(false);
    setIsOtpVisible(false);
  };
  
  const handleLoginSuccess = async (response: any) => {
    const { token, user } = response?.data?.data || {};
    
    if (token) {
      setCookie('token', token, 1);
    }
  
    setLocalStorage('userData', {
      name: user?.name || '',
      phone: phoneNumber
    });
  
    toast.success('Login successful!');
  
    if (user?.partner) {
      console.log('User is a partner:', user);

        router.push('/partnerProfile');
    
      handleClose();
      return;
    }
  
    const profiles = user?.profiles || [];
    
    if (profiles.length > 0) {
      setLocalStorage('userProfiles', profiles);
      
      if (profiles.length === 1) {
        router.push(`/${profiles[0].slug}`);
        handleClose();
      } else {
        setUserProfiles(profiles);
        setUserData({ name: user.name, phone: user.phone });
        setShowProfileSelector(true);
      }
      return;
    }
  
    // No profiles found - redirect to signup
    router.push('/signup');
    handleClose();
  };

  // Update role selection handler to reset form
  const handleRoleSelect = (role: 'business' | 'partner') => {
    if (role === 'business') {
      router.push('/signup');
    } else {
      router.push('/partnerSignup/1');
    }
    handleClose();
  };

  // Update profile selection handler to reset form
  const handleProfileSelect = (slug: string) => {
    router.push(`/${slug}`);
    handleClose();
  };

  // Replace the existing setIsRegistering click handler with this
  const handleCreateAccount = () => {
    setShowRoleSelector(true);
  };

  // Add new role selection handler
  const handleInitialRoleSelect = (role: 'business' | 'partner') => {
    setSelectedRole(role);
    setShowRoleSelector(false);
    setIsRegistering(true);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <>
      {isVerifying && <Loader />}
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white p-4 sm:p-8 rounded-xl w-full max-w-[500px] flex flex-col items-center text-center space-y-4 sm:space-y-6 relative shadow-none">
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-black transition"
          >
            <X size={28} />
          </button>
          {!isOtpVisible ? (
            <>
              <Image
                src="/assets/media/gigworksblk.svg"
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
                  <span className="text-gray-600">{isRegistering ? 'Already have an account? ' : 'Don\'t have an account? '}</span>
                  <button
                    onClick={isRegistering ? () => {
                      setIsRegistering(false);
                      setSelectedRole(null);
                    } : handleCreateAccount}
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
                src="/assets/media/gigworksblk.svg"
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
        {/* Add the role selector popup */}
        {showRoleSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-[400px] p-6 relative">
              <button
                onClick={() => {
                  setShowRoleSelector(false);
                  if (!isRegistering) {
                    setSelectedRole(null);
                  }
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <div className="mb-6 text-center">
                <h2 className="text-2xl text-black font-bold">Choose your role</h2>
                <p className="text-gray-600 mt-2">Select how you want to join Gigworks</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleInitialRoleSelect('business')}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                >
                  <h3 className="text-lg text-black font-semibold">Business Owner</h3>
                  <p className="text-sm text-gray-800">List your business and get more clients</p>
                </button>

                <button
                  onClick={() => handleInitialRoleSelect('partner')}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                >
                  <h3 className="text-lg text-black font-semibold">Partner</h3>
                  <p className="text-sm text-gray-800">Join as a service provider</p>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Add the profile selector popup */}
        {
  showProfileSelector && userData && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-[400px] flex flex-col relative">
        <button
          onClick={() => setShowProfileSelector(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-center">Select Profile</h2>
          <div className="text-gray-600 text-center mt-2">
            <h2 className="text-2xl text-black font-bold">
              Hi <span className="text-green-600">{userData.name}</span>
            </h2>
            <h2 className="text-xl text-black font-bold">choose your profile</h2>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
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
                      src={`${ASSET_BASE_URL}/${profile.avatar}`}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl text-gray-600">{profile.name.charAt(0)}</span>
                  )}
                </div>
                <span className="font-medium text-gray-800">{profile.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

      </div>
    </>
  );
};

export default LoginPopup;
