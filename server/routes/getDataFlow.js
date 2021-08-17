/* eslint-disable camelcase */
const express = require('express');
const transaction_framework = require('../database');
const constructDfdFunction = require('./mergeDfdObjects');

const router = express.Router();
let visitedArr = [];
const getLabel = async (id) => {
    const interactionDetails = await transaction_framework.interactions.findAll({
        attributes: ['label'],
        where: {
            id,
        },
    });
    if (interactionDetails.length === 0) {
        return false;
    }
    const { label } = interactionDetails[0].dataValues;
    return label;
};
const getNextInteraction = async (id) => {
    const nextInteractionsArr = await transaction_framework.interaction_chains.findAll({
        attributes: ['next_interaction_id', 'label'],
        where: {
            response_interaction_map_id: id,
        },
    });
    for (let i = 0; i < nextInteractionsArr.length; i += 1) {
        const interaction = nextInteractionsArr[i].dataValues;
        // console.log(interaction);
        if (!visitedArr.includes(interaction.next_interaction_id)) {
            visitedArr.push(interaction.next_interaction_id);
            const { interactionId, label, parameters, responses } = await getParamsResponses(
                interaction.next_interaction_id,
            );
            // nextInteractionsArr[i] = { ...interaction, parameters, responses };
            nextInteractionsArr[i] = { interactionId, label, parameters, responses };
        }
    }
    return nextInteractionsArr;
};
const getParameters = async (id) => {
    const reqStructureList = await transaction_framework.request_structure.findAll({
        attributes: ['parameter_id'],
        where: {
            interaction_id: id,
        },
    });
    reqStructureList.forEach((item, index) => {
        reqStructureList[index] = item.parameter_id;
    });
    const parametersList = await transaction_framework.parameters.findAll({
        attributes: ['id', 'name'],
        where: {
            id: reqStructureList,
        },
    });
    return parametersList;
};
const responseFinderFunc = async (responseId) => {
    const resultArr = await transaction_framework.responses.findAll({
        attributes: ['id', 'pre_msg_template', '_context'],
        where: {
            id: responseId,
        },
    });
    const { id, pre_msg_template, _context } = resultArr[0];
    let header;
    if (pre_msg_template !== '') {
        header = pre_msg_template;
    } else {
        header = _context;
    }
    return header;
};
const getResponses = async (id) => {
    const responseIdsList = await transaction_framework.response_interaction_map.findAll({
        attributes: [['id', 'response_interaction_map_id'], 'response_id'],
        where: {
            interaction_id: id,
        },
    });
    for (let i = 0; i < responseIdsList.length; i += 1) {
        const item = responseIdsList[i];
        const responseLabel = await responseFinderFunc(item.response_id);
        // console.log(item.dataValues.response_interaction_map_id);
        const next_interactions = await getNextInteraction(item.dataValues.response_interaction_map_id);
        item.dataValues.response_label = responseLabel;
        item.dataValues.next_interactions = next_interactions;
        responseIdsList[i] = item.dataValues;
    }

    return responseIdsList;
};
const getParamsResponses = async (interactionId) => {
    const parameters = await getParameters(interactionId);
    const responses = await getResponses(interactionId);
    const label = await getLabel(interactionId);
    return { interactionId, label, parameters, responses };
};
const getDataFlow = async (interactionId) => {
    const interaction = await transaction_framework.interactions.findAll({
        where: {
            id: interactionId,
        },
    });
    const { group_interaction_ids, flow_start_interaction_id } = interaction[0];
    let nextInteractions = [];
    if (flow_start_interaction_id != null) {
        nextInteractions = [flow_start_interaction_id];
    } else if (group_interaction_ids.length != 0) {
        const group_interaction_ids_arr = group_interaction_ids.split(',');
        nextInteractions = group_interaction_ids.split(',');
    } else {
    }
    for (let i = 0; i < nextInteractions.length; i += 1) {
        nextInteractions[i] = await getParamsResponses(nextInteractions[i]);
    }
    return nextInteractions;
};
router.route('/get-data-flow/:id').get(async (req, res, next) => {
    visitedArr = [];
    const interactionId = req.params.id;
    const label = await getLabel(req.params.id);
    if (!label) {
        res.json({
            success: false,
            message: 'Invalid Interaction Id',
        });
    } else {
        const treeData = await getDataFlow(req.params.id);
        const data = constructDfdFunction({ interactionId, label, data: treeData });
        res.json({
            success: true,
            data,
        });
    }
});

module.exports = router;
