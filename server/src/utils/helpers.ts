


// Remove fields from object
export const removeFields = (obj: any, fields: string[]) => {
    if (Array.isArray(obj)) {
        return obj.map(item => removeFields(item, fields));
    } else if (obj && typeof obj === 'object') {
        return Object.keys(obj).reduce((newObj, key) => {
            if (!fields.includes(key)) {
                newObj[key] = removeFields(obj[key], fields);
            }
            return newObj;
        }, {} as any);
    }
    return obj;
};



// Secure text by replacing characters with *
export const secureText = (text: string, start: number) => {
    const end = text.length - 4;    
    return text.split('').map((char, index) => {
        if (index >= start && index < end) {
            return '*';
        }
        return char;
    }).join('');
};


