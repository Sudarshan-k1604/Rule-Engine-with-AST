const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

router.post('/create_rule', ruleController.createRule);
router.post('/combine_rules', ruleController.combineRules);
router.post('/evaluate_rule', ruleController.evaluateRule);
router.get('/history', ruleController.getRuleHistory);
router.put('/update_rule', ruleController.updateRule);
module.exports = router;