const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "connect_agreement",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "ind_role_id",
      },
      agreement_doc_url: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: "Full URL for help document (usually a public Google doc)",
      },
    },
    {
      sequelize,
      tableName: "connect_agreement",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "ind_role_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user_type" }],
        },
      ],
    }
  );
