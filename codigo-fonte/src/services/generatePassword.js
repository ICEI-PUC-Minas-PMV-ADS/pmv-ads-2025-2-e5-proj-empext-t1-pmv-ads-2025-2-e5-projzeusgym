function generateRandomPassword(length = 10) {
    const chars = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '01234456789',
    };


    const allChars = chars.lower + chars.upper + chars.numbers + chars.symbols;
    
    let password = '';

    password += chars.lower[Math.floor(Math.random() * chars.lower.length)];
    password += chars.upper[Math.floor(Math.random() * chars.upper.length)];
    password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];

    // Preenche o restante da senha com caracteres aleatórios
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    return password.slice(0, length);
}

module.exports = {
    generateRandomPassword
};
    