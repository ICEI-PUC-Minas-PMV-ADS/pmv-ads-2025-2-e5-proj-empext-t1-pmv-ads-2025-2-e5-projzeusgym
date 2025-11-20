const bcrypt = require('bcrypt');
const { Users } = require('./src/models/index');

async function fixExistingPasswords() {
    try {
        console.log('🔍 Verificando usuários com senhas não hasheadas...');
        
        // Buscar todos os usuários
        const users = await Users.findAll();
        
        let fixedCount = 0;
        
        for (const user of users) {
            // Verificar se a senha já está hasheada (senhas bcrypt começam com $2b$)
            if (!user.password.startsWith('$2b$')) {
                console.log(`🔧 Corrigindo senha para usuário: ${user.email} (ID: ${user.id})`);
                
                // Hash da senha atual
                const hashedPassword = await bcrypt.hash(user.password, 10);
                
                // Atualizar no banco
                await Users.update(
                    { password: hashedPassword },
                    { where: { id: user.id } }
                );
                
                fixedCount++;
            } else {
                console.log(`✅ Senha já hasheada para: ${user.email}`);
            }
        }
        
        console.log(`\n🎉 Processo concluído! ${fixedCount} senhas foram corrigidas.`);
        
    } catch (error) {
        console.error('❌ Erro ao corrigir senhas:', error);
    } finally {
        process.exit(0);
    }
}

// Executar o script
fixExistingPasswords();