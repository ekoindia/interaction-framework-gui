const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "brand_products",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      brand_interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_label: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      product_label_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fixed_params: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "brand_products",
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
