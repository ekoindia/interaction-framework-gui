const { DataTypes } = require("sequelize");
const _brand_categories = require("./brand_categories");
const _brand_products = require("./brand_products");
const _chain_behaviors = require("./chain_behaviors");
const _confirm_submit_master = require("./confirm_submit_master");
const _connect_agreement = require("./connect_agreement");
const _display_media = require("./display_media");
const _doodles = require("./doodles");
const _highlight_master = require("./highlight_master");
const _i18n_lang_strings = require("./i18n_lang_strings");
const _i18n_lang_strings_app = require("./i18n_lang_strings_app");
const _interaction_behaviors = require("./interaction_behaviors");
const _interaction_categories = require("./interaction_categories");
const _interaction_chain_input_parameters = require("./interaction_chain_input_parameters");
const _interaction_chain_parameter_sources = require("./interaction_chain_parameter_sources");
const _interaction_chains = require("./interaction_chains");
const _interaction_group_links = require("./interaction_group_links");
const _interactions = require("./interactions");
const _list_elements = require("./list_elements");
const _parameter_separator_types_master = require("./parameter_separator_types_master");
const _parameter_types = require("./parameter_types");
const _parameters = require("./parameters");
const _request_expressions = require("./request_expressions");
const _request_structure = require("./request_structure");
const _response_interaction_map = require("./response_interaction_map");
const _response_parameter_groups = require("./response_parameter_groups");
const _response_status = require("./response_status");
const _response_structure = require("./response_structure");
const _responses = require("./responses");
const _role_interaction_map = require("./role_interaction_map");
const _text_case_types = require("./text_case_types");
const _uri_root_master = require("./uri_root_master");

function initModels(sequelize) {
  const brand_categories = _brand_categories(sequelize, DataTypes);
  const brand_products = _brand_products(sequelize, DataTypes);
  const chain_behaviors = _chain_behaviors(sequelize, DataTypes);
  const confirm_submit_master = _confirm_submit_master(sequelize, DataTypes);
  const connect_agreement = _connect_agreement(sequelize, DataTypes);
  const display_media = _display_media(sequelize, DataTypes);
  const doodles = _doodles(sequelize, DataTypes);
  const highlight_master = _highlight_master(sequelize, DataTypes);
  const i18n_lang_strings = _i18n_lang_strings(sequelize, DataTypes);
  const i18n_lang_strings_app = _i18n_lang_strings_app(sequelize, DataTypes);
  const interaction_behaviors = _interaction_behaviors(sequelize, DataTypes);
  const interaction_categories = _interaction_categories(sequelize, DataTypes);
  const interaction_chain_input_parameters =
    _interaction_chain_input_parameters(sequelize, DataTypes);
  const interaction_chain_parameter_sources =
    _interaction_chain_parameter_sources(sequelize, DataTypes);
  const interaction_chains = _interaction_chains(sequelize, DataTypes);
  const interaction_group_links = _interaction_group_links(
    sequelize,
    DataTypes
  );
  const interactions = _interactions(sequelize, DataTypes);
  const list_elements = _list_elements(sequelize, DataTypes);
  const parameter_separator_types_master = _parameter_separator_types_master(
    sequelize,
    DataTypes
  );
  const parameter_types = _parameter_types(sequelize, DataTypes);
  const parameters = _parameters(sequelize, DataTypes);
  const request_expressions = _request_expressions(sequelize, DataTypes);
  const request_structure = _request_structure(sequelize, DataTypes);
  const response_interaction_map = _response_interaction_map(
    sequelize,
    DataTypes
  );
  const response_parameter_groups = _response_parameter_groups(
    sequelize,
    DataTypes
  );
  const response_status = _response_status(sequelize, DataTypes);
  const response_structure = _response_structure(sequelize, DataTypes);
  const responses = _responses(sequelize, DataTypes);
  const role_interaction_map = _role_interaction_map(sequelize, DataTypes);
  const text_case_types = _text_case_types(sequelize, DataTypes);
  const uri_root_master = _uri_root_master(sequelize, DataTypes);

  interaction_chains.belongsTo(chain_behaviors, {
    as: "chain_behavior",
    foreignKey: "chain_behavior_id",
  });
  chain_behaviors.hasMany(interaction_chains, {
    as: "interaction_chains",
    foreignKey: "chain_behavior_id",
  });
  response_parameter_groups.belongsTo(display_media, {
    as: "display_medium",
    foreignKey: "display_media_id",
  });
  display_media.hasMany(response_parameter_groups, {
    as: "response_parameter_groups",
    foreignKey: "display_media_id",
  });
  response_structure.belongsTo(display_media, {
    as: "display_medium",
    foreignKey: "display_media_id",
  });
  display_media.hasMany(response_structure, {
    as: "response_structures",
    foreignKey: "display_media_id",
  });
  brand_categories.belongsTo(i18n_lang_strings, {
    as: "title_i18n_i18n_lang_string",
    foreignKey: "title_i18n",
  });
  i18n_lang_strings.hasMany(brand_categories, {
    as: "brand_categories",
    foreignKey: "title_i18n",
  });
  interactions.belongsTo(interaction_behaviors, {
    as: "interaction_behavior",
    foreignKey: "interaction_behavior_id",
  });
  interaction_behaviors.hasMany(interactions, {
    as: "interactions",
    foreignKey: "interaction_behavior_id",
  });
  interactions.belongsTo(interaction_categories, {
    as: "interaction_category",
    foreignKey: "interaction_category_id",
  });
  interaction_categories.hasMany(interactions, {
    as: "interactions",
    foreignKey: "interaction_category_id",
  });
  interaction_chain_input_parameters.belongsTo(interaction_chains, {
    as: "interaction_chain",
    foreignKey: "interaction_chain_id",
  });
  interaction_chains.hasMany(interaction_chain_input_parameters, {
    as: "interaction_chain_input_parameters",
    foreignKey: "interaction_chain_id",
  });
  interaction_chains.belongsTo(interactions, {
    as: "next_interaction",
    foreignKey: "next_interaction_id",
  });
  interactions.hasMany(interaction_chains, {
    as: "interaction_chains",
    foreignKey: "next_interaction_id",
  });
  interaction_group_links.belongsTo(interactions, {
    as: "group_interaction",
    foreignKey: "group_interaction_id",
  });
  interactions.hasMany(interaction_group_links, {
    as: "interaction_group_links",
    foreignKey: "group_interaction_id",
  });
  interaction_group_links.belongsTo(interactions, {
    as: "link_interaction",
    foreignKey: "link_interaction_id",
  });
  interactions.hasMany(interaction_group_links, {
    as: "link_interaction_interaction_group_links",
    foreignKey: "link_interaction_id",
  });
  interactions.belongsTo(interactions, {
    as: "flow_start_interaction",
    foreignKey: "flow_start_interaction_id",
  });
  interactions.hasMany(interactions, {
    as: "interactions",
    foreignKey: "flow_start_interaction_id",
  });
  request_expressions.belongsTo(interactions, {
    as: "interaction",
    foreignKey: "interaction_id",
  });
  interactions.hasMany(request_expressions, {
    as: "request_expressions",
    foreignKey: "interaction_id",
  });
  request_structure.belongsTo(interactions, {
    as: "interaction",
    foreignKey: "interaction_id",
  });
  interactions.hasMany(request_structure, {
    as: "request_structures",
    foreignKey: "interaction_id",
  });
  response_interaction_map.belongsTo(interactions, {
    as: "interaction",
    foreignKey: "interaction_id",
  });
  interactions.hasMany(response_interaction_map, {
    as: "response_interaction_maps",
    foreignKey: "interaction_id",
  });
  parameters.belongsTo(parameter_types, {
    as: "parameter_type",
    foreignKey: "parameter_type_id",
  });
  parameter_types.hasMany(parameters, {
    as: "parameters",
    foreignKey: "parameter_type_id",
  });
  interaction_chain_input_parameters.belongsTo(parameters, {
    as: "parameter",
    foreignKey: "parameter_id",
  });
  parameters.hasMany(interaction_chain_input_parameters, {
    as: "interaction_chain_input_parameters",
    foreignKey: "parameter_id",
  });
  interaction_chain_input_parameters.belongsTo(parameters, {
    as: "target_parameter",
    foreignKey: "target_parameter_id",
  });
  parameters.hasMany(interaction_chain_input_parameters, {
    as: "target_parameter_interaction_chain_input_parameters",
    foreignKey: "target_parameter_id",
  });
  list_elements.belongsTo(parameters, {
    as: "parameter",
    foreignKey: "parameter_id",
  });
  parameters.hasMany(list_elements, {
    as: "list_elements",
    foreignKey: "parameter_id",
  });
  request_structure.belongsTo(parameters, {
    as: "parameter",
    foreignKey: "parameter_id",
  });
  parameters.hasMany(request_structure, {
    as: "request_structures",
    foreignKey: "parameter_id",
  });
  response_parameter_groups.belongsTo(parameters, {
    as: "group_parameter",
    foreignKey: "group_parameter_id",
  });
  parameters.hasMany(response_parameter_groups, {
    as: "response_parameter_groups",
    foreignKey: "group_parameter_id",
  });
  response_parameter_groups.belongsTo(parameters, {
    as: "member_parameter",
    foreignKey: "member_parameter_id",
  });
  parameters.hasMany(response_parameter_groups, {
    as: "member_parameter_response_parameter_groups",
    foreignKey: "member_parameter_id",
  });
  response_structure.belongsTo(parameters, {
    as: "parameter",
    foreignKey: "parameter_id",
  });
  parameters.hasMany(response_structure, {
    as: "response_structures",
    foreignKey: "parameter_id",
  });
  interaction_chains.belongsTo(response_interaction_map, {
    as: "response_interaction_map",
    foreignKey: "response_interaction_map_id",
  });
  response_interaction_map.hasMany(interaction_chains, {
    as: "interaction_chains",
    foreignKey: "response_interaction_map_id",
  });
  responses.belongsTo(response_status, {
    as: "response_status",
    foreignKey: "response_status_id",
  });
  response_status.hasMany(responses, {
    as: "responses",
    foreignKey: "response_status_id",
  });
  response_interaction_map.belongsTo(responses, {
    as: "response",
    foreignKey: "response_id",
  });
  responses.hasMany(response_interaction_map, {
    as: "response_interaction_maps",
    foreignKey: "response_id",
  });
  response_structure.belongsTo(responses, {
    as: "response",
    foreignKey: "response_id",
  });
  responses.hasMany(response_structure, {
    as: "response_structures",
    foreignKey: "response_id",
  });
  parameters.belongsTo(text_case_types, {
    as: "text_case_type",
    foreignKey: "text_case_type_id",
  });
  text_case_types.hasMany(parameters, {
    as: "parameters",
    foreignKey: "text_case_type_id",
  });
  interactions.belongsTo(uri_root_master, {
    as: "uri_root",
    foreignKey: "uri_root_id",
  });
  uri_root_master.hasMany(interactions, {
    as: "interactions",
    foreignKey: "uri_root_id",
  });
  request_structure.belongsTo(uri_root_master, {
    as: "api_uri_root",
    foreignKey: "api_uri_root_id",
  });
  uri_root_master.hasMany(request_structure, {
    as: "request_structures",
    foreignKey: "api_uri_root_id",
  });

  return {
    brand_categories,
    brand_products,
    chain_behaviors,
    confirm_submit_master,
    connect_agreement,
    display_media,
    doodles,
    highlight_master,
    i18n_lang_strings,
    i18n_lang_strings_app,
    interaction_behaviors,
    interaction_categories,
    interaction_chain_input_parameters,
    interaction_chain_parameter_sources,
    interaction_chains,
    interaction_group_links,
    interactions,
    list_elements,
    parameter_separator_types_master,
    parameter_types,
    parameters,
    request_expressions,
    request_structure,
    response_interaction_map,
    response_parameter_groups,
    response_status,
    response_structure,
    responses,
    role_interaction_map,
    text_case_types,
    uri_root_master,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
