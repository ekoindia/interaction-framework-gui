const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "interaction_chain_input_parameters",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      interaction_chain_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "interaction_chains",
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
      target_parameter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:
          "Destination parameter to copy the chained value to. If '0', the destination/target parameter should have the same name as source parameter",
        references: {
          model: "parameters",
          key: "id",
        },
      },
      value: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "",
        comment:
          "A default/fixed value for the chain, if parameter_source_id==0",
      },
      source_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment:
          "From interaction_chain_parameter_source table. 1=Response, 2=Request.",
      },
      is_value_frozen: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "If true, parameter value is copied but it is not editable",
      },
      is_value_hidden: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "If true, parameter value is copied but it is not visible on the UI",
      },
    },
    {
      sequelize,
      tableName: "interaction_chain_input_parameters",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_chain_param_interaction_chain_id_index",
          using: "BTREE",
          fields: [{ name: "interaction_chain_id" }],
        },
        {
          name: "fk_chain_param_parameter_id_index",
          using: "BTREE",
          fields: [{ name: "parameter_id" }],
        },
        {
          name: "fk_chain_param_target_parameter_id_idx",
          using: "BTREE",
          fields: [{ name: "target_parameter_id" }],
        },
      ],
    }
  );
