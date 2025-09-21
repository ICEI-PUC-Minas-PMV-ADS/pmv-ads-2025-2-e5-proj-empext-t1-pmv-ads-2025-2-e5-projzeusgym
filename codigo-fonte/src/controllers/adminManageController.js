const { Users } = require('../models/index');
const bcrypt = require('bcrypt');

exports.createProfessor = async (req, res) => {
  try {
    const { name, birthdate, gender, cpf, cref_mg, email, password } = req.body;

    if (!name || !email || !password || !cpf || !cref_mg) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios (name, email, password, cpf, cref_mg) são requeridos para professor.' });
    }

    const existingUserByCpf = await Users.findOne({ where: { cpf } });
    if (existingUserByCpf) {
      return res.status(400).json({ error: 'CPF já cadastrado.' });
    }

    const existingUserByEmail = await Users.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    const professor = await Users.create({
      name,
      birthdate,
      gender,
      cpf,
      cref_mg,
      email,
      password: await bcrypt.hash(password, 10), 
      role: 'professor',
    });

    return res.status(201).json({ message: 'Professor cadastrado com sucesso!', professor });
  } catch (error) {
    console.error('Erro ao cadastrar professor:', error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar professor.' });
  }
};

exports.createAluno = async (req, res) => {
  try {
    const { name, birthdate, gender, cpf, cellphone, restriction, email, password } = req.body;

    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios (name, email, password, cpf) são requeridos para aluno.' });
    }

    const existingUserByCpf = await Users.findOne({ where: { cpf } });
    if (existingUserByCpf) {
      return res.status(400).json({ error: 'CPF já cadastrado.' });
    }

    const existingUserByEmail = await Users.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    const aluno = await Users.create({
      name,
      birthdate,
      gender,
      cpf,
      cellphone,
      restriction,
      email,
      password: await bcrypt.hash(password, 10), 
      role: 'aluno',
    });

    return res.status(201).json({ message: 'Aluno cadastrado com sucesso!', aluno });
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar aluno.' });
  }
};