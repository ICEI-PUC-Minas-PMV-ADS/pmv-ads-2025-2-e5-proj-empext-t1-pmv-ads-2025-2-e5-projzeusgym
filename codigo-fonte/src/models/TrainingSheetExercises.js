module.exports = (sequelize, DataTypes) => {
  const TrainingSheetExercises = sequelize.define('TrainingSheetExercises', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sheetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    series: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    carga: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    descanso: {
      type: DataTypes.STRING, 
      allowNull: true
    }
  }, {
    tableName: 'training_sheet_exercises',
    timestamps: true
  });

  return TrainingSheetExercises;
};
