const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "response_interaction_map",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "interactions",
          key: "id",
        },
      },
      response_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "responses",
          key: "id",
        },
      },
      _disabled: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Disable this entry",
      },
    },
    {
      sequelize,
      tableName: "response_interaction_map",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "index_unique_map",
          unique: true,
          using: "BTREE",
          fields: [{ name: "interaction_id" }, { name: "response_id" }],
        },
        {
          name: "fk_response_interaction_map_interaction_id_idx",
          using: "BTREE",
          fields: [{ name: "interaction_id" }],
        },
        {
          name: "fk_response_interaction_map_response_id_idx",
          using: "BTREE",
          fields: [{ name: "response_id" }],
        },
      ],
    }
  );
