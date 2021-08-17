const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "interactions",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      interaction_behavior_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment:
          "interaction behavior if this will normal, local etc\n1=Normal Interaction (request SimpliBank)\n2=Flow\n3=Local Interaction (no server request. Use default response set in database)",
        references: {
          model: "interaction_behaviors",
          key: "id",
        },
      },
      meta: {
        type: DataTypes.STRING(128),
        allowNull: true,
        comment:
          'Metadata as JSON formatted String. {    "is_store":1,    // Treat as EkoStore   }',
      },
      interaction_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Code to uniquely identify a transaction for a developer",
      },
      uri: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment:
          "RESTful URI path endpoint for the interaction. May contain parameter_name variables under curly brackets to be replaced by actual parameter values.\nEg: /customers/mobile_number:{customer_id}\n",
      },
      real_uri: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment:
          "Actual Simplibank URI path endpoint. Eg: For gateway, the request first goes to Gateway tnd then to Simplibank. \nThe 'uri' contains Gateway endpoint whereas the 'real_uri' contains the Simplibank endpoint",
      },
      uri_base: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment:
          "URI Base of the API, if other than Simplibank. For example, Gateway or any other external service that we are using directly from Connect",
      },
      uri_base_uat: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment:
          "URI Base of the API for UAT, if other than Simplibank. For example, Gateway or any other external service that we are using directly from Connect",
      },
      uri_root_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          'ID representing a different API URI root path to use. Eg: 1 = "/payment-collection/api/v1"',
        references: {
          model: "uri_root_master",
          key: "id",
        },
      },
      group_interaction_ids: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: "",
        comment:
          "A set of comma-separated interaction_ids that are to be shown in the GROUP (Tab-like interface on Connect). Eg: Manage My Account",
      },
      save_interaction_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "List of interaction_ids if it is an interaction of type GROUP. Show a menu of multiple interactions.",
      },
      fixed_params: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "",
        comment:
          'JSON Object containing fixed parameters to introduce in the transaction request. Mostly useful with transaction flows.\nEg: {"is_kyc_mandetory":1}',
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
      is_visible: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 1,
        comment:
          "Should it be shown directly on main UI? If not, it will only be visible through an Interaction-Chain",
      },
      is_customer_visible: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Is visible in CustaView (to the customer-facing screen)?",
      },
      flow_start_interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:
          "id of the first Interaction to start the work-flow with. (eg: Get-Registered-Recipient's-List in Send-Money)",
        references: {
          model: "interactions",
          key: "id",
        },
      },
      interaction_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:
          "id of a category (from INTERACTION_CATEGORIES table) to which this interaction belongs",
        references: {
          model: "interaction_categories",
          key: "id",
        },
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Sort order for interactions",
      },
      confirm_submit_id: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          'Show a confirmation dialog before submitting request?\n0: No\n1: Yes. "Are You Sure?"\n2: Yes. "I Agree"',
      },
      disable_redo: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Disable the transaction to be edited and retried (after going back to request card)?",
      },
      is_cacheable: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Can the response be cached?",
      },
      cache_timeout: {
        type: DataTypes.STRING(15),
        allowNull: true,
        comment:
          "0=Infinite, D=Day, M=Month, Y=Year. E.g: 0 / 1D / 2M / 4Y etc.",
      },
      http_method: {
        type: DataTypes.STRING(6),
        allowNull: false,
        defaultValue: "POST",
        comment: "GET / POST / PUT / DELETE",
      },
      history_label: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment:
          "How to represent the response of this transaction in History.",
      },
      history_label_i18n: {
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
      tagline: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "",
        comment: "Short tagline/description",
      },
      tagline_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_disabled: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
      },
      brand_category_ids: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
        comment:
          "Comma separated list of IDs (from table brand_categories) that define which Store Category the brand/service belongs to",
      },
      icon: {
        type: DataTypes.STRING(35),
        allowNull: false,
        defaultValue: "",
        comment: "Name of an icon as per the Material Design Icons list",
      },
      ext_icon: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
        comment: "External Icon URI for the Product/Brand",
      },
      logo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
        comment:
          "LOGO / Branding image absolute URI to show on top-right side of request cards. MAX-HEIGHT: 50px",
      },
      help_media_urls: {
        type: DataTypes.STRING(1500),
        allowNull: true,
        comment:
          "Comma separated list of media URLs providing help/walkthrough for this transaction. It could be\n1. image URL\n2. Full URL for help document (usually a public Google doc)\n3. video-ID of a Youtube video",
      },
      help_media_urls_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      earn: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
        comment: "How much a merchant will earn from this product",
      },
      earn_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      beta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "1 = beta feature",
      },
      crm_meta: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment:
          "Metadata for CRM as JSON object: to help capture user journey in product flows",
      },
      _context: {
        type: DataTypes.STRING(250),
        allowNull: true,
        comment: "Comment about interaction for interrnal reference",
      },
    },
    {
      sequelize,
      tableName: "interactions",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_interactions_flow_start_interaction_id_idx",
          using: "BTREE",
          fields: [{ name: "flow_start_interaction_id" }],
        },
        {
          name: "fk_interactions_interaction_category_id_idx",
          using: "BTREE",
          fields: [{ name: "interaction_category_id" }],
        },
        {
          name: "fk_interaction_type_id_idx",
          using: "BTREE",
          fields: [{ name: "interaction_type_id" }],
        },
        {
          name: "fk_interactions_interaction_behavior_id_idx",
          using: "BTREE",
          fields: [{ name: "interaction_behavior_id" }],
        },
        {
          name: "fk_interactions_uri_root_id_idx",
          using: "BTREE",
          fields: [{ name: "uri_root_id" }],
        },
      ],
    }
  );
