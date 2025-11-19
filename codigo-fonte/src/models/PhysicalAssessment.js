const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhysicalAssessment = sequelize.define('PhysicalAssessment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    assessmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    assessmentType: {
      type: DataTypes.ENUM('inicial', 'trimestral', 'semestral', 'anual'),
      allowNull: false,
      defaultValue: 'inicial'
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Caminho local (deprecated - usar fileUrl)'
    },
    fileUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'URL do arquivo no Azure Blob Storage'
    },
    blobName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Nome do blob no Azure Storage'
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    bodyFat: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    muscleMass: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    chest: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    waist: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    hip: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    arm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    thigh: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    calf: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    neck: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'physical_assessments',
    timestamps: true
});

// Associações serão definidas no index.js

module.exports = PhysicalAssessment;
