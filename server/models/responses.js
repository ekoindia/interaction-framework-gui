const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "responses",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      response_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      response_status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
          model: "response_status",
          key: "id",
        },
      },
      pre_msg_template: {
        type: DataTypes.STRING(600),
        allowNull: false,
        defaultValue: "",
      },
      pre_msg_template_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      post_msg_template: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "",
      },
      post_msg_template_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      disable_redo: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Do not allow user to jump back to this response card by clicking on it (when it is in preview mode)",
      },
      logo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
        comment:
          "LOGO / Branding image absolute URI to show on top-right side of response cards. MAX-HEIGHT: 50px",
      },
      _context: {
        type: DataTypes.STRING(250),
        allowNull: true,
        comment: "more info about this response for internal usage",
      },
    },
    {
      sequelize,
      tableName: "responses",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_response_status_id_index",
          using: "BTREE",
          fields: [{ name: "response_status_id" }],
        },
        {
          name: "fk_response_type_id_index",
          using: "BTREE",
          fields: [{ name: "response_type_id" }],
        },
      ],
    }
  );
