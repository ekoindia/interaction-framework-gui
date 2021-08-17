const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "request_expressions",
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
      expression: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment:
          "Expression to evaluate. example: \n['&&', ['==', '{a:num}', '{b}'], ['<', '{a}', '{c}']]\n(I.e, (a == b and a < c)) Evaluates to true/false.\nAlso, treat 'a' as a number (without quotes)",
      },
      on_true: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "",
        comment:
          'Dependent parameters to update if the expression value evaluates to true\n[\n\t{"name":"<param_name>", "visibility":1, "value":"{{}}"}\n]\nHere, {{}}, if used,  is replaced by value of the expression',
      },
      on_false: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "",
        comment:
          'Dependent parameters to update if the expression value evaluates to false\n[\n\t{"name":"<param_name>", "visibility":1, "value":"{{}}"}\n]\nHere, {{}}, if used,  is replaced by value of the expression',
      },
      on_value: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "",
        comment:
          'Dependent parameters to update, whatever the expression value evaluates to\n[\n\t{"name":"<param_name>", "visibility":1, "value":"{{}}"}\n]\nHere, {{}}, if used,  is replaced by value of the expression',
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Order of execution of expressions for that interaction.",
      },
    },
    {
      sequelize,
      tableName: "request_expressions",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_request_expressions_interaction_id_idx",
          using: "BTREE",
          fields: [{ name: "interaction_id" }],
        },
      ],
    }
  );
