function generateRandomPassword(length = 10) {
    const chars = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789', // Corrigido: tinha "01234456789"
    };

    console.log('[PASSWORD] Gerando senha de', length, 'caracteres');
    const allChars = chars.lower + chars.upper + chars.numbers; // Removido chars.symbols undefined
    
    let password = '';

    password += chars.lower[Math.floor(Math.random() * chars.lower.length)];
    password += chars.upper[Math.floor(Math.random() * chars.upper.length)];
    password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];

    // Preenche o restante da senha com caracteres aleatórios
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Embaralha os caracteres
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    const finalPassword = password.slice(0, length);
    console.log('[PASSWORD] Senha gerada:', finalPassword);
    
    return finalPassword;
}

module.exports = {
    generateRandomPassword
};
    