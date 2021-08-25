const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "list_elements",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      parameter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "parameters",
          key: "id",
        },
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      label_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_disabled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_hidden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      dependent_params: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "[]",
        comment:
          'Change properties of another parameter when this list-element is selected.\\nEg: [{"name":"amount","postfix":100,"pattern":"^[0-9]*100$","pattern_error":"Amount must end with 100"}]',
      },
      icon: {
        type: DataTypes.STRING(35),
        allowNull: false,
        defaultValue: "",
        comment: "Name of an icon as per the Material Design Icons list",
      },
    },
    {
      sequelize,
      tableName: "list_elements",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_list_element_parameter_id_index",
          using: "BTREE",
          fields: [{ name: "parameter_id" }],
        },
      ],
    }
  );
