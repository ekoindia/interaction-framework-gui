const express = require('express');
const transaction_framework = require('../database');

const router = express.Router();

router.route('/get-all-interaction').get(async (req, res, next) => {
    const data = await transaction_framework.interactions.findAll();
    res.json({
        success: true,
        data,
    });
});
router.route('/get-interaction/:id').get(async (req, res, next) => {
    const data = await transaction_framework.interactions.findAll({
        where: {
            id: req.params.id,
        },
    });
    res.json({
        success: true,
        data,
    });
});
router.route('/get-all-card-interaction').get(async (req, res, next) => {
    const cardInteraction = await transaction_framework.interactions.findAll({
        attributes: ['id', 'label', 'is_customer_visible', ['_context', 'context']],
        where: {
            is_visible: 1,
        },
    });
    res.json({
        success: true,
        data: cardInteraction,
    });
});

module.exports = router;
