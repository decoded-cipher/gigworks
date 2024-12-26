


// Generate OTP and store it in KV store
export const generateOTP = async (phone: string, env: Env): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        if (!env || !env.KV_STORE || typeof env.KV_STORE.put !== 'function' || typeof env.KV_STORE.delete !== 'function') {
            return reject("KV_STORE not available");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        try {
            const existingValue = await env.KV_STORE.get(phone);
            if (existingValue) {
                await env.KV_STORE.delete(phone);
            }
    
            await env.KV_STORE.put(phone, JSON.stringify({
                otp,
                expires: Date.now() + 300000    // 5 minutes
            }));

            // list all keys for debugging
            const keys = await env.KV_STORE.list();
            console.log('Keys:', keys);

            // list the value for debugging
            const value = await env.KV_STORE.get(phone);
            console.log('Value after put:', value);
    
            resolve(otp);
        } catch (error) {
            reject(error);
        }
    });
};



// Verify OTP from KV store
export const verifyOTP = async (phone: string, otp: string, env: Env): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        if (!env || !env.KV_STORE || typeof env.KV_STORE.get !== 'function' || typeof env.KV_STORE.delete !== 'function') {
            return reject("KV_STORE not available");
        }

        try {
            const value = await env.KV_STORE.get(phone);
            console.log('Value in verifyOTP:', value);

            if (!value) {
                return resolve(null);
            }

            const parsedValue = JSON.parse(value);
            console.log('Parsed value in verifyOTP:', parsedValue);

            if (parsedValue.otp === otp && parsedValue.expires > Date.now()) {
                await env.KV_STORE.delete(phone);
                return resolve(true);
            } else {
                return resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

