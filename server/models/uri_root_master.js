const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "uri_root_master",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      uri_root_path: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      uri_root_path_uat: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "uri_root_master",
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
