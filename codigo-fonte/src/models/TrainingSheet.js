module.exports = (sequelize, DataTypes) => {
  const TrainingSheet = sequelize.define('TrainingSheet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'training_sheets',
    timestamps: true
  });

  TrainingSheet.associate = (models) => {
    TrainingSheet.belongsTo(models.Users, { as: 'professor', foreignKey: 'professorId' });
    TrainingSheet.belongsTo(models.Users, { as: 'aluno', foreignKey: 'alunoId' });
    TrainingSheet.belongsToMany(models.Exercises, { through: 'TrainingSheetExercises', foreignKey: 'sheetId', otherKey: 'exerciseId' });
  };

  return TrainingSheet;
};
