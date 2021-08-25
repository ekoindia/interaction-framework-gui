const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "parameters",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      parameter_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "parameter_types",
          key: "id",
        },
      },
      type_metadata: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment:
          "Extra info about some parameter types.\nDateTime format (eg: ddMMyyyy), Currency code (eg: INR) etc.\nDateTime format specified as Java SimpleDateFormat specifiers (http://developer.android.com/reference/java/text/SimpleDateFormat.html).",
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
        comment:
          "Parameter name to be sent as name/value pair to the server. If blank, the parameter is not sent to the server.",
      },
      value: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      value_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      label: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      label_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      label_response: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      label_response_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pattern: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      pattern_keypress: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      pattern_error: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment:
          "Error message in case the user entry does not match the valid regex pattern",
      },
      pattern_format: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      min: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "0",
        comment:
          "Minimum value for validation of Numeric/Money/DateTime types.\nFor DateTime: specify range in D=Days (default), W=Weeks, M=Months, Y=Years, etc.\nEg: Min=-3 and Max=0 means from 3 days ago to Today (0)",
      },
      max: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "0",
        comment:
          "Maximum value for validation of Numeric/Money/DateTime types.\nFor DateTime: specify range in D=Days (default), W=Weeks, M=Months, Y=Years, etc.\nEg: Min=-3 and Max=0 means from 3 days ago to Today (0)",
      },
      length_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      length_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 250,
      },
      lines_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "For multi-line text input field",
      },
      lines_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "For multi-line text input field",
      },
      mime_types: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: "Accepted mime-types for RAW data (file upload)",
      },
      is_masked: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Mask field with * (eg: for Password field) ",
      },
      is_secure: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Handle data securely. Do not cache.",
      },
      allow_multiple_selection: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Allow multi-select in a LIST type parameter",
      },
      multiple_selection_separator: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: "To separate multiple items when (for multi-select list)",
      },
      text_case_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0:default, 1:upper, 2:lower, 3:camel, 4:sentence",
        references: {
          model: "text_case_types",
          key: "id",
        },
      },
      autocomplete: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: "",
        comment:
          "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
      },
      link: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment:
          "Any external URL to show with the parameter. Eg: Show link for Aadhaar/Voter-card Verification sites.\nValue in <label>|<url> format. Eg: Verify|https://eaadhaar.uidai.gov.in",
      },
      link_label: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      link_label_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      description_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      _context: {
        type: DataTypes.STRING(250),
        allowNull: true,
        comment: "Any comment for internal development usage",
      },
    },
    {
      sequelize,
      tableName: "parameters",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_parameter_type_id_index",
          using: "BTREE",
          fields: [{ name: "parameter_type_id" }],
        },
        {
          name: "fk_parameters_text_case_type_id_idx",
          using: "BTREE",
          fields: [{ name: "text_case_type_id" }],
        },
      ],
    }
  );
