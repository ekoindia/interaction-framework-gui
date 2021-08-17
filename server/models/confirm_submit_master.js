const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "confirm_submit_master",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(65),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "confirm_submit_master",
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
