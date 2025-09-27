const { Users, Exercises } = require('../models/index');
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



exports.createExercise = async (req, res) => {
  try {
    const { nome, exerGrupo, comentario } = req.body;

    if (!nome || !exerGrupo) {
      return res.status(400).json({ error: 'Os campos nome e grupo muscular são obrigatórios.' });
    }

    const existingExercise = await Exercises.findOne({ where: { nome } });
    if (existingExercise) {
      return res.status(400).json({ error: 'Exercício já cadastrado.' });
    }

    const exercise = await Exercises.create({ nome, exerGrupo, comentario });

    return res.status(201).json({ message: 'Exercício cadastrado com sucesso!', exercise });
  } catch (error) {
    console.error('Erro ao cadastrar exercício:', error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar exercício.' });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercises.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercício não encontrado.' });
    }

    await exercise.destroy();
    return res.status(200).json({ message: 'Exercício deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar exercício:', error);
    return res.status(500).json({ error: 'Erro interno ao deletar exercício.' });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, exerGrupo, comentario } = req.body;

    const exercise = await Exercises.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercício não encontrado.' });
    }

    // Atualiza apenas os campos enviados
    if (nome) exercise.nome = nome;
    if (exerGrupo) exercise.exerGrupo = exerGrupo;
    if (comentario) exercise.comentario = comentario;

    await exercise.save();

    return res.status(200).json({ message: 'Exercício atualizado com sucesso.', exercise });
  } catch (error) {
    console.error('Erro ao atualizar exercício:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar exercício.' });
  }
};