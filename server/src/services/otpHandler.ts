

// Generate OTP
export const generateOTP = async (phone: string, env: any) => {
    try {
        if (!env || !env.KV_STORE || typeof env.KV_STORE.put !== 'function') {
            return "KV_STORE not available";
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await env.KV_STORE.put(phone, JSON.stringify({
            otp,
            expires: Date.now() + 300000
        }));

        return otp;
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw error;
    }
}
