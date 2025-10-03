const nodemailer = require('nodemailer');
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

async function sendWelcomeEmail(alunoEmail, senhaInicial, tokenTrocaSenha) {
    // 1. Configurar o transportador
    // Se estiver usando o Gmail, você precisa gerar uma "App Password"
    // na sua conta do Google (em Segurança).
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS // Sua senha de app
        }
    });

    // 2. Definir o conteúdo do e-mail
    let mailOptions = {
        from: `"Sua Aplicação" <${EMAIL_USER}>`,
        to: alunoEmail,
        subject: 'Bem-vindo(a) a Zeus Gym! Sua Senha Inicial',
        html: `
            <h1>Boas-vindas à nossa plataforma!</h1>
            <p>Seu cadastro foi realizado com sucesso.</p>
            <p>Sua **senha inicial** é: <strong>${senhaInicial}</strong></p>
            <p>Se você não solicitou este cadastro, por favor, ignore este e-mail.</p>
        `
    };

    // 3. Enviar o e-mail
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return false;
    }
}

module.exports = { sendWelcomeEmail };