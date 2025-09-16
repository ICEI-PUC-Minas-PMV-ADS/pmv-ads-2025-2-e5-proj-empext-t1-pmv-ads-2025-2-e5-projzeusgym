require('dotenv').config();
const { Users } = require('../src/models'); 
const bcrypt = require('bcrypt');

async function initAdmin() {
  try {
    const adminLogin = process.env.ADMIN_LOGIN;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminLogin || !adminPassword) {
      throw new Error('ADMIN_LOGIN ou ADMIN_PASSWORD não estão definidos no .env');
    }

    const admin = await Users.findOne({ where: { name: adminLogin } });

    if (!admin) {
      await Users.create({
        name: adminLogin,
        email: `${adminLogin}@zeusgym.com`,
        password: adminPassword, 
        role: 'admin',
      });

      console.log('✅ Admin inicial criado com sucesso!');
    } else {
      console.log('Admin já existe no banco.');
    }
  } catch (err) {
    console.error('Erro ao criar admin inicial:', err);
  }
}

initAdmin().then(() => process.exit(0));