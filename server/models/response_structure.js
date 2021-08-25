const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "response_structure",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      response_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "responses",
          key: "id",
        },
      },
      parameter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "parameters",
          key: "id",
        },
      },
      group_response_template: {
        type: DataTypes.STRING(45),
        allowNull: true,
        comment: "Template to render each repetition of response-group",
      },
      auto_update: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Auto update the value of this parameter whenever a response containing a parameter with the same name is returned anywhere in the interaction-flow.\nEg: Customer balance, wallet-limits, etc.",
      },
      is_visible: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 1,
        comment: "Show response parameter on UI? Use for chaining, if not.",
      },
      is_emphasised: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Emphasise the parameter on UI or show strongly (eg: with bold)",
      },
      display_media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: "display_media",
          key: "id",
        },
      },
      is_customer_visible: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: true,
        comment:
          'Is the field visible to customers (CustaView)? If NULL, the print visibility setting from the field "display_media_id" is used.',
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:
          "Order number in which response parameters should be displayed",
      },
    },
    {
      sequelize,
      tableName: "response_structure",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_response_id_index",
          using: "BTREE",
          fields: [{ name: "response_id" }],
        },
        {
          name: "fk_response_parameter_id_index",
          using: "BTREE",
          fields: [{ name: "parameter_id" }],
        },
        {
          name: "fk_response_display_media_id_idx",
          using: "BTREE",
          fields: [{ name: "display_media_id" }],
        },
      ],
    }
  );
