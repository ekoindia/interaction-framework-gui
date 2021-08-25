const uniqid = require('uniqid');
const flattenDataObj = require('./flattenDfdObject');
// Master Node - interaction from where all the flow starts
const masterNodeFunc = (ObjId, posX, posY, label) => ({
    id: ObjId,
    type: 'default',
    position: { x: posX, y: posY },
    data: { label },
    style: { padding: 10, backgroundColor: '#8484D9', color: '#FFF', borderRadius: '25px' },
});
// Edege between master interaction node and it's next interaction nodes
const edgeMasterToChilds = (masterNode, childNode) => ({
    id: `e${masterNode.id}-${childNode.id}`,
    source: masterNode.id.toString(),
    target: childNode.id,
    style: { stroke: '#D9D982', strokeDasharray: 5 },
    animated: true,
});

const constructDfdFunction = (tree) => {
    let maxX = 200;
    let maxY = 100;
    // Array to store all the data including node & edges
    const arr = [];
    // Array to store head nodes of further child interaction in the data flow
    const childTreeHeadArr = [];
    // iterating through 
    tree.data.forEach((interaction) => {
        const { interactionNode, nodesArr, edgeArr, nodeMaxObj } = flattenDataObj(interaction, maxX, maxY, {
            x: 0,
            y: 0,
        });
        childTreeHeadArr.push(interactionNode);
        arr.push(...nodesArr);
        arr.push(...edgeArr);
        maxY = Math.max(maxY, nodeMaxObj.y);
    });
    const mainHead = masterNodeFunc(uniqid(), 100, maxY / 2, tree.label);
    arr.push(mainHead);
    // Creating edges between master interaction node & head nodes of further child interaction in the data flow
    childTreeHeadArr.forEach((subHead) => {
        const edge = edgeMasterToChilds(mainHead, subHead);
        arr.push(edge);
    });
    return arr;
};

module.exports = constructDfdFunction;
