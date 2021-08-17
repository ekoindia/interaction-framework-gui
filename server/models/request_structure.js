const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "request_structure",
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
      parameter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "parameters",
          key: "id",
        },
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:
          "Order number in which the request parameters should be displayed",
      },
      is_required: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 1,
        comment: "Is it mandatory to provide a value for this field?",
      },
      is_visible: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 1,
        comment:
          "Is the item visible (active) by default? The value is submitted (sent to the server) only if it is visible (active). ",
      },
      enc_pub_key: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_ignored_if_empty: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Do not send the parameter in HTTP request if the value is empty",
      },
      validate: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment:
          "Custom validation expression. Use {} for current field's value. Use {param-name} to use another parameter's value.\nSupports LISP like notation in JSON ARRAY format. First item in array is function name and next items are the operands.\nEg: (this-field>amount && this-field<=max_amount) will be written as: ['&&',  ['>',{},{amount}], ['<=',{},{max_amount}]]",
      },
      validate_err_msg: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "Error message to show when the validation fails",
      },
      visible_on_param_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "id of PARAMETER on which the visibility of this PARAMETER depends",
      },
      visible_on_param_value: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment:
          "value of PARAMETER on which the visibility of this PARAMETER depends",
      },
      required_on_param_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "id of PARAMETER on which the optionality of this PARAMETER depends",
      },
      required_on_param_value: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment:
          "value of PARAMETER on which the optionality of this PARAMETER depends",
      },
      disabled_on_param_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "id of PARAMETER based on which this PARAMETER is enabled/disabled",
      },
      disabled_on_param_value: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
        comment:
          "value of PARAMETER based on which this PARAMETER is enabled/disabled",
      },
      api_uri: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "",
      },
      api_uri_root_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: "uri_root_master",
          key: "id",
        },
      },
      api_interaction_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "interaction_type_id for making a API call to modify this field in real time",
      },
      api_on_param_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "id of PARAMETER on which the API call depends. API is called every time that parameter changes",
      },
      api_dependent_params: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: "",
        comment:
          'Structure to define dependent parameters, map current parameter name with API parameter name and define constraints. Eg:\n{\n  "utility_acc_no": {                                            // Call this API if utility_acc_no changes\n        "api_param_name":"mobile_number",        // Send value of utility_acc_no as mobile_number to the API (map utility_acc_no to mobile_number)\n        "length_max":4,                                         // Do not call API if length of utility_acc_no > 4\n        "length_min":4                                           // Do not call API if length of utility_acc_no < 4\n  },\n\n  "service_type":{}                                             // Also call API if service_type changes. No mapping or constraints\n}',
      },
      api_response_config: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: "",
        comment:
          'Structure to define response data: Pass param from response datastructure as a metadata (value, etc) of another parameter.\nEg: [{"name":"data.minimum_length","targetName":"amount","property":"length_min"},{"name":"data.split_msg"}]\n"property" defaults to "value" and "targetName" defaults to the leaf node of "name". Eg: for "data.split_msg", targetName = split_msg',
      },
      api_cache_timeout_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "If API response is cached, new API request will not be made for the duration of cache-timeout.\nZero or negetive number: No Cache\nPositive number: Cache in minutes",
      },
      autofill: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment:
          'Comma separated list of values to show as autofill. Eg: "1000,2000,5000" for amount field.',
      },
      type_again: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Type the number/text input again to confirm?",
      },
      force_submit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "0 = Default / Ignore this flag\n1 = Yes. Force submit even the hidden fields\n2 = No. Don't submit even visible / chained parameters",
      },
      auto_update: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Automatically update this request-parameter if a data by the same name is sent by server ",
      },
      is_local: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Local parameter. Do not send to server in API calls.",
      },
      highlight: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Should the parameter be highlighted? Show/hide in preview?\n0: Default, 1: Yes (High Priority), 2: No (Low Priority)",
      },
    },
    {
      sequelize,
      tableName: "request_structure",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_request_parameter_interaction_id_index",
          using: "BTREE",
          fields: [{ name: "interaction_id" }],
        },
        {
          name: "fk_request_parameter_id_index",
          using: "BTREE",
          fields: [{ name: "parameter_id" }],
        },
        {
          name: "fk_api_uri_root_id",
          using: "BTREE",
          fields: [{ name: "api_uri_root_id" }],
        },
      ],
    }
  );
