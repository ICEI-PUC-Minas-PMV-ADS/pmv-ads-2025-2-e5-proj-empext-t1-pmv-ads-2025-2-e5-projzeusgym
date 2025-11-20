const nodemailer = require('nodemailer');
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

async function sendWelcomeEmail(alunoEmail, senhaInicial, tokenTrocaSenha) {
    console.log('[EMAIL] Iniciando envio de email...');
    console.log('[EMAIL] Destinatário:', alunoEmail);
    console.log('[EMAIL] EMAIL_USER configurado:', EMAIL_USER ? 'SIM' : 'NÃO');
    console.log('[EMAIL] EMAIL_PASS configurado:', EMAIL_PASS ? 'SIM' : 'NÃO');
    
    // Verificar se as variáveis de ambiente estão configuradas
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error('[EMAIL] ❌ Variáveis EMAIL_USER ou EMAIL_PASS não configuradas');
        return false;
    }
    
    if (EMAIL_USER === 'seu-email@gmail.com' || EMAIL_PASS === 'sua-senha-app') {
        console.error('[EMAIL] ❌ Usando valores placeholder. Configure EMAIL_USER e EMAIL_PASS com valores reais');
        return false;
    }

    // 1. Configurar o transportador
    // Se estiver usando o Gmail, você precisa gerar uma "App Password"
    // na sua conta do Google (em Segurança).
    let transporter = nodemailer.createTransporter({
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
        console.log('[EMAIL] Tentando enviar email...');
        let info = await transporter.sendMail(mailOptions);
        console.log('[EMAIL] ✅ E-mail enviado com sucesso!');
        console.log('[EMAIL] Message ID:', info.messageId);
        console.log('[EMAIL] Response:', info.response);
        return true;
    } catch (error) {
        console.error('[EMAIL] ❌ Erro ao enviar e-mail:', error.message);
        console.error('[EMAIL] Error code:', error.code);
        console.error('[EMAIL] Error stack:', error.stack);
        
        // Logs específicos para diferentes tipos de erro
        if (error.code === 'EAUTH') {
            console.error('[EMAIL] 🔐 Erro de autenticação: Verifique EMAIL_USER e EMAIL_PASS');
        } else if (error.code === 'ENOTFOUND') {
            console.error('[EMAIL] 🌐 Erro de rede: Não foi possível conectar ao servidor Gmail');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('[EMAIL] ⏰ Timeout: Conexão demorou muito para responder');
        }
        
        return false;
    }
}

module.exports = { sendWelcomeEmail };