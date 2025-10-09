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
      // Associação com o Professor
      TrainingSheet.belongsTo(models.Users, { as: 'professor', foreignKey: 'professorId' });
      
      // Associação com o Aluno
      TrainingSheet.belongsTo(models.Users, { as: 'aluno', foreignKey: 'alunoId' });
      
      // Associação com Exercícios (belongsToMany)
      // 🛑 CORREÇÃO CHAVE: Adicionado 'as: exercises'
      TrainingSheet.belongsToMany(models.Exercises, { 
        through: 'TrainingSheetExercises', 
        foreignKey: 'sheetId', 
        otherKey: 'exerciseId',
        as: 'exercises' // << O alias precisa ser definido aqui para funcionar no Controller
      });
    };
  
    return TrainingSheet;
  };