const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "parameter_separator_types_master",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      _context: {
        type: DataTypes.STRING(145),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "parameter_separator_types_master",
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
