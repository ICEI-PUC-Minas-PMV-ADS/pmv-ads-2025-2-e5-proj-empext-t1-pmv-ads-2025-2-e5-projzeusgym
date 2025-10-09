const bcrypt = require('bcrypt');

const plainPassword = 'admin123';
const storedHash = '$2b$10$J43DLPeHmcNmJhrh/Z1ov.nXoA0sG0AzrNuET7mnQiLoZLJmgv3we';

(async () => {
  try {
    const result = await bcrypt.compare(plainPassword, storedHash);
    console.log('Senha confere?', result);
  } catch (err) {
    console.error('Erro ao comparar senha:', err);
  }
})();
