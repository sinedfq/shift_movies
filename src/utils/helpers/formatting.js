export const formatCardNumber = (value) => {
    const v = value.replace(/[^\d\s]/g, '');
    const digitsOnly = v.replace(/\s/g, '');

    let formatted = '';
    for (let i = 0; i < digitsOnly.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += digitsOnly[i];
        if (formatted.length >= 19) break;
    }

    return formatted;
};

export const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    return v;
};

export const handleCvcChange = (e, setCvc) => {
    setCvc(e.target.value.replace(/[^0-9]/g, ''));
};