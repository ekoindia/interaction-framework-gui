const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "interaction_behaviors",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment:
          "For describing the interaction behavior like normal, chain or local",
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "interaction_behaviors",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
