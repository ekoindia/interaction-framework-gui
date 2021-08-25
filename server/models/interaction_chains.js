const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "interaction_chains",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      response_interaction_map_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "response_interaction_map",
          key: "id",
        },
      },
      chain_behavior_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment:
          "chain behavior if this will normal, external url, payment_gateway etc\n1=Normal Chain (Normal Chain for bi-directional linking tf-response with new tf-request)\n2=External URL (For opening external URL like shopping sites, sbi url for H2H etc)\n3=Payment Gatement (For bi-directional linking of tf-request,tf-response and external payment gateway website)",
        references: {
          model: "chain_behaviors",
          key: "id",
        },
      },
      next_interaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "interactions",
          key: "id",
        },
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      label_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_hidden: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Do not show the chain. It is activted automatically (maybe through Customer-Profile-Stub, etc.)",
      },
      is_automatic: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Don't ask/suggest; just goto the chained trxn (if True)",
      },
      is_going_back: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Is the chain meant to go back to an EXISTING/VISIBLE REQUEST CARD (retry) in the interaction flow?",
      },
      go_back_steps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment:
          "Manual number of steps to go-back (replace prev trxn boxes). If is_going_back is 1, ignore next_interaction_id (specially, if not found) and find next interaction card by going back the specified number of steps",
      },
      auto_fire_next_request: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Automatically fire/submit the next chained request (Unless the user is going back to EDIT that request-card)",
      },
      multi_list_items: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
      },
      chain_metadata: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: "",
        comment:
          "Chain multiple items from list (if any parameter chains to a list)? The corresponding list will give option to select multiple rows.",
      },
      chain_all_request_params: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Chain all parameters from request card that match in name with next interaction request.\nis_frozen=0, is_hidden=0",
      },
      chain_all_response_params: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment:
          "Chain all parameters from response card that match in name with next interaction request.\nis_frozen=0, is_hidden=0",
      },
      validate: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment:
          "Use an expression to evaluate the visibility of chain based on other parameters (in response).\nExpression example: ['&&', ['==', '{a}', '{b}'], ['<', '{a}', '{c}']]\n(I.e, Enable this chain when parameters a == b and a < c)",
      },
      icon: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: "go",
        comment: "icon for chain: go/repeat/refresh/back/add/remove/edit/etc.",
      },
      toast: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      toast_i18n: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      _context: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "After a request is loaded due to this chain, auto-fire it.",
      },
    },
    {
      sequelize,
      tableName: "interaction_chains",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_chain_response_id_index",
          using: "BTREE",
          fields: [{ name: "response_interaction_map_id" }],
        },
        {
          name: "fk_chain_next_interaction_id_index",
          using: "BTREE",
          fields: [{ name: "next_interaction_id" }],
        },
        {
          name: "fk_interaction_chains_behavior_id_idx",
          using: "BTREE",
          fields: [{ name: "chain_behavior_id" }],
        },
      ],
    }
  );
