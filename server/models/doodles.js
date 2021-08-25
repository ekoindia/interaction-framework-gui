const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "doodles",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment:
          "Filename/URL of doodle. If it contains only filename, the doodle should be stored in the default location in Connect (images/doodle) otherwise a complete URL may be provided.\nDoodle must be 256px x 54px with proper padding. If background is transparent, image must be left-aligned.",
      },
      msg: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "",
        comment: 'An optional short message. Eg: "Happy independence day!"',
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "Date from which to start showing this doodle",
        unique: "unique_from_date",
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "Last date of showing this doodle",
        unique: "unique_to_date",
      },
      repeat_yearly: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Ignore the year part of start/end_date and repeat yearly?",
      },
      disabled: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Is the entry disabled?",
      },
    },
    {
      sequelize,
      tableName: "doodles",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "unique_from_date",
          unique: true,
          using: "BTREE",
          fields: [{ name: "start_date" }],
        },
        {
          name: "unique_to_date",
          unique: true,
          using: "BTREE",
          fields: [{ name: "end_date" }],
        },
      ],
    }
  );
