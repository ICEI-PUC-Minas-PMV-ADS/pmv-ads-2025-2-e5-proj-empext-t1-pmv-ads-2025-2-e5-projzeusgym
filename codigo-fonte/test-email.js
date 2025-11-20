// Script para testar o envio de email
require('dotenv').config();
const { sendWelcomeEmail } = require('./src/services/sendEmail');

async function testEmail() {
    console.log('🧪 Testando envio de email...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS está configurado:', process.env.EMAIL_PASS ? 'SIM' : 'NÃO');
    
    const result = await sendWelcomeEmail('seu-email-teste@gmail.com', 'SenhaTestexxy123');
    
    console.log('Resultado do teste:', result ? '✅ SUCESSO' : '❌ FALHOU');
}

testEmail().catch(console.error);