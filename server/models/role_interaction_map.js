const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "role_interaction_map",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Do not load/show transaction, if disabled",
      },
      release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      important: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Is the transaction important?",
      },
      trxn_label: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "role_interaction_map",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "indx_role_interaction_map_unique_roles",
          unique: true,
          using: "BTREE",
          fields: [{ name: "role_id" }, { name: "interaction_id" }],
        },
        {
          name: "fk_role_interaction_map_interaction_id_idx",
          using: "BTREE",
          fields: [{ name: "interaction_id" }],
        },
      ],
    }
  );
