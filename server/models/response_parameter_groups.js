const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "response_parameter_groups",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      group_parameter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "parameters",
          key: "id",
        },
      },
      member_parameter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "parameters",
          key: "id",
        },
      },
      is_visible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      width_ratio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment:
          "width-ratio = 1 ... 12\nIndicates how total width shhould be divided between the parameters of the group.\nEg:If all parameters have width-ratio=1, they get equal space. If one param has width-ratio=2, it gets twice as much space/width as others.",
      },
    },
    {
      sequelize,
      tableName: "response_parameter_groups",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_response_parameter_groups_group_param_id_idx",
          using: "BTREE",
          fields: [{ name: "group_parameter_id" }],
        },
        {
          name: "fk_response_parameter_groups_member_param_id_idx",
          using: "BTREE",
          fields: [{ name: "member_parameter_id" }],
        },
        {
          name: "fk_response_parameter_groups_display_media_id_idx",
          using: "BTREE",
          fields: [{ name: "display_media_id" }],
        },
      ],
    }
  );
