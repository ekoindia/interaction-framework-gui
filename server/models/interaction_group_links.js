const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "interaction_group_links",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      group_interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Source interaction_id",
        references: {
          model: "interactions",
          key: "id",
        },
      },
      link_interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Destination link interaction_id",
        references: {
          model: "interactions",
          key: "id",
        },
      },
      chained_parameter_list: {
        type: DataTypes.STRING(250),
        allowNull: true,
        comment:
          'Array of parameter objects to chain on link-click\nEg: [{"name":"mobile", "value":"5464564564", "is_frozen":1}]',
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      label: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Force alternate label",
      },
      label_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      disabled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      _context: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "interaction_group_links",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_interaction_group_links_gr_idx",
          using: "BTREE",
          fields: [{ name: "group_interaction_id" }],
        },
        {
          name: "fk_interaction_group_links_ln_idx",
          using: "BTREE",
          fields: [{ name: "link_interaction_id" }],
        },
      ],
    }
  );
