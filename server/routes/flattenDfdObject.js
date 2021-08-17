const uniqid = require('uniqid');

// Paramter Node Object - Black
const parameterNodeFunc = (paramObjId, posX, posY, label) => ({
    id: paramObjId,
    type: 'default',
    position: { x: posX, y: posY },
    targetPosition: 'left',
    data: { label },
    style: { padding: 10, backgroundColor: 'black', color: '#FFF', borderRadius: '25px' },
});

// Response Node Object - Blue
const responseNodeFunc = (id, posX, posY, label) => ({
    id,
    type: 'default',
    position: { x: posX, y: posY },
    targetPosition: 'left',
    sourcePosition: 'right',
    data: { label },
    style: { padding: 10, backgroundColor: '#2F80ED', color: '#FFF', borderRadius: '25px' },
});
// Interaction Node - Green
const interactionNodeFunc = (ObjId, posX, posY, label) => ({
    id: ObjId,
    type: 'default',
    position: { x: posX, y: posY },
    data: { label },
    style: { padding: 10, backgroundColor: '#00D563', color: '#FFF', borderRadius: '25px' },
});
// Edege Between Interaction & Paramter
const egdeInteractionToParameter = (interactionNode, parameterNode) => ({
    id: `e${interactionNode.id}-${parameterNode.id}`,
    source: interactionNode.id.toString(),
    target: parameterNode.id,
    style: { stroke: '#FFF', strokeDasharray: 5 },
});
// Function To link all paramters from thier particualr interaction
const linkParameters = (interactionNode, parametersList) => {
    // Array to store all parameters
    const paramNodesArr = [];
    // Array to store edges between Interaction & Paramters
    const edgeInteractionToParametersArr = [];
    // Consts to store interaction position in a 2d plot
    const interactionNodeX = interactionNode.position.x;
    const interactionNodeY = interactionNode.position.y;
    // maxobj to store maximum x-axis & y-axis value among all the parameters
    const maxObj = { x: -1, y: -1 };
    // looping through each parameter
    parametersList !== undefined &&
        parametersList.forEach((element, index) => {
            // Following computes y-axis value for a single parameter obj
            // Gap between each parameter is 75 points
            const paramterCompHeight = interactionNodeY + (index + 1) * 75;
            // Computes  unique id for each parameter
            const paramObjId = `p${interactionNode.id.toString()}${index}`;
            // Creates parameter node, 250 points away from it's interaction node on x-axis
            const paramNode = parameterNodeFunc(paramObjId, interactionNodeX + 250, paramterCompHeight, element.name);
            // Creates Edge between newley created parameter and it's interaction
            const edge = egdeInteractionToParameter(interactionNode, paramNode);
            // Pushing parameter & it's edge  into thier arrays
            paramNodesArr.push(paramNode);
            edgeInteractionToParametersArr.push(edge);
            // Recomputing maxobj values
            maxObj.x = Math.max(maxObj.x, paramNode.position.x);
            maxObj.y = Math.max(maxObj.y, paramNode.position.y);
        });
    return { paramNodesArr, edgeInteractionToParametersArr, maxObj };
};
// Function To link a interaction to it's responses
const egdeInteractionToResponse = (interactionNode, responseNode) => ({
    id: `e${interactionNode.id}-${responseNode.id}`,
    source: interactionNode.id.toString(),
    target: responseNode.id,
    animated: true,
    style: { stroke: '#4ECB71', margin: '100px' },
});
// Function To link response to it's next interaction
const edgeResponseToInteraction = (responseNode, interactionNode) => ({
    id: `e${responseNode.id}-${interactionNode.id}`,
    target: interactionNode.id.toString(),
    source: responseNode.id,
    animated: true,
    style: { stroke: '#4ECB71', margin: '100px' },
});
// Function To link response to it's next interaction
const linkResponses = (interactionNode, responsesList, parameterMaxObj) => {
    // Array to store all responses
    const responseNodesArr = [];
    // Array to store edges between Interaction & Responses
    const edgeInteractionToResponseArr = [];
    // responseMaxObj to store first response position in a 2d plane
    // first response will always be 200 points away(right) from it's parent-interaction paramters position
    // first response will always be 50 points away(down) from it's interaction on y-axis
    const responseMaxObj = { x: parameterMaxObj.x + 200, y: interactionNode.position.y + 50 };
    // looping through each responses
    responsesList !== undefined &&
        responsesList.forEach((element, index) => {
            // Will update responseMaxObj y-value as each response will have same distance from it's
            // interacton/parent-interaction paramters on x-axis(i.e. 500 points)
            // But it will move down 100 ponts on y-axis each time.
            responseMaxObj.y += index * 100;
            // Creates response node
            const responseNode = responseNodeFunc(
                uniqid(),
                interactionNode.position.x + 500,
                responseMaxObj.y,
                element.response_label,
            );
            // Create edge between Response & Interaction Node
            const edge = egdeInteractionToResponse(interactionNode, responseNode);
            // Pushing responses & it's edge  into thier arrays
            responseNodesArr.push(responseNode);
            edgeInteractionToResponseArr.push(edge);
            // Re-calculating the max values of responseMaxObj
            responseMaxObj.x = Math.max(responseMaxObj.x, responseNode.position.x);
            responseMaxObj.y = Math.max(responseMaxObj.y, responseNode.position.y);
            // Iterating through next interaction from a response
            element.next_interactions !== undefined &&
                element.next_interactions.forEach((interactionItem, i) => {
                    // Computing x & y axis values for further next-interactions based on current response & responseMaxObj
                    const computePosY = responseMaxObj.y + i * 100;
                    const computePosX = responseMaxObj.x;
                    // Recursive function to render next interactions
                    const {
                        // interactionNode - master interaction node for next interaction all it's child further down
                        interactionNode: masterInteractionNode,
                        // nodesArr - array of all the node further deep down
                        nodesArr: childNodesArr,
                        // edgeArr - array of all the edges further deep down
                        edgeArr: childEdgesArr,
                        //  nodeMaxObj - contains max-x & max-y value for all the child components deep down
                        nodeMaxObj: childNodesMaxObj,
                    } = flattenDataObj(interactionItem, computePosX, computePosY, responseMaxObj);
                    // edge between current response and it's next-interaction
                    const edgeRespToInter = edgeResponseToInteraction(responseNode, masterInteractionNode);
                    responseNodesArr.push(...childNodesArr);
                    edgeInteractionToResponseArr.push(...childEdgesArr);
                    edgeInteractionToResponseArr.push(edgeRespToInter);
                    // updating response max obj values
                    responseMaxObj.x = Math.max(responseMaxObj.x, childNodesMaxObj.x);
                    responseMaxObj.y = Math.max(responseMaxObj.y, childNodesMaxObj.y);
                });
        });
    return { responseNodesArr, edgeInteractionToResponseArr, responseMaxObj };
};
const flattenDataObj = (data, posX, posY, nodeMaxObj) => {
    // Array to store nodes
    const nodesArr = [];
    // Array to store edges
    const edgeArr = [];
    // master interaction node for all the child components
    const interactionNode = interactionNodeFunc(uniqid(), posX + 200, posY, data.label);
    // pushing master interaction node in nodes Array
    nodesArr.push(interactionNode);
    // Creating & linking all the paramters for this interaction
    const {
        // contains nodes
        paramNodesArr,
        // contains edges
        edgeInteractionToParametersArr,
        //  maxObj - contains max-x & max-y value for all the child parameters
        maxObj: parameterMaxObj,
    } = linkParameters(interactionNode, data.parameters);
    // pushing paramters data
    nodesArr.push(...paramNodesArr);
    edgeArr.push(...edgeInteractionToParametersArr);
    // updating  max obj values according to the paramters nodes & current value
    nodeMaxObj.x = Math.max(nodeMaxObj.x, parameterMaxObj.x);
    nodeMaxObj.y = Math.max(nodeMaxObj.y, parameterMaxObj.y);
    // Calling linkResponses again which will call flattenDataObj again recursiveley
    const { responseNodesArr, edgeInteractionToResponseArr, responseMaxObj } = linkResponses(
        interactionNode,
        data.responses,
        parameterMaxObj,
    );
    nodesArr.push(...responseNodesArr);
    edgeArr.push(...edgeInteractionToResponseArr);
    // updating  max obj values according to the child nodes further deep down
    nodeMaxObj.x = Math.max(nodeMaxObj.x, responseMaxObj.x);
    nodeMaxObj.y = Math.max(nodeMaxObj.y, responseMaxObj.y);
    return { interactionNode, nodesArr, edgeArr, nodeMaxObj };
};

module.exports = flattenDataObj;
