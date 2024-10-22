const Rule = require('../models/Rule');
const { parseRuleString, combineNodes, evaluate,printTree } = require('../utils/ast');

function generateRandomLetterString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
  }

  return result;
}



exports.createRule = async (req, res) => {
    try {
      const { ruleName, ruleString } = req.body;
      if (!ruleName || !ruleString) {
        return res.status(400).json({ error: 'ruleName and ruleString are required' });
      }
      const rootNode = parseRuleString(ruleString);
      const rule = new Rule({ ruleName, ruleAST: rootNode ,ruleASTString: ruleString});
      await rule.save();
      printTree(rootNode);
      res.status(201).json(rule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


exports.combineRules = async (req, res) => {
    try {
      const { rules, op } = req.body;
  
      // Fetch the rules by ruleName
      const ruleDocs = await Rule.find({ ruleName: { $in: rules } });
      if (ruleDocs.length === 0) {
        return res.status(404).json({ error: 'No matching rules found' });
      }
  
      // Combine the rule ASTs (abstract syntax trees)
      const ruleASTs = ruleDocs.map(rule => rule.ruleAST);
      const combinedRootNode = combineNodes(ruleASTs, op); // Ensure combineNodes function properly handles ASTs
  
      // Generate a random rule name for the combined rule
      const randomString = generateRandomLetterString(4);
      const combinedRuleName = `combined${randomString}`;
      const combinedRuleASTString = `Combined(${rules.join( `${op}` )})`;
  
      // Save the combined rule
      const combinedRule = new Rule({
        ruleName: combinedRuleName,
        ruleAST: combinedRootNode,
        ruleASTString: combinedRuleASTString // Save the string representation
      });
      await combinedRule.save();
  
      // Print the tree for debugging (optional)
      printTree(combinedRootNode);
  
      // Respond with the new combined rule
      res.status(201).json({
        ruleName: combinedRuleName,
        ruleAST: combinedRootNode,
        ruleASTString: combinedRuleASTString,
        message: 'Combined rule created successfully.'
      });
    } catch (error) {
      console.error('Error combining rules:', error);
      res.status(500).json({ error: 'An error occurred while combining the rules.' });
    }
  };
  
exports.getRuleHistory = async (req, res) => {
    try {
        const rules = await Rule.find({})
            .select('ruleName createdAt ruleASTString')
            .sort('-createdAt')
            .limit(10);
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.evaluateRule = async (req, res) => {
  try {
    const { ast, data } = req.body;
    const rule = await Rule.find({ruleName: ast});
    
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }
    const result = evaluate(rule[0].ruleAST, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update an existing rule
exports.updateRule = async (req, res) => {
  try {
      const { ruleName, newRuleName, newRuleString } = req.body;

      // Check for required fields
      if (!ruleName || (!newRuleName && !newRuleString)) {
          return res.status(400).json({ error: 'ruleName is required and at least one of newRuleName or newRuleString must be provided' });
      }

      // Find the rule by its name
      const rule = await Rule.findOne({ ruleName });//await Rule.findOne({ ruleName });
      if (!rule) {
          return res.status(404).json({ error: 'Rule not found' });
      }

      // Update the rule name and/or rule string (AST)
      if (newRuleName) {
          rule.ruleName = newRuleName; // Update the rule name
      }
      if (newRuleString) {
          const rootNode = parseRuleString(newRuleString);
          rule.ruleAST = rootNode; // Update the AST
          rule.ruleASTString = newRuleString; // Update the string representation
      }

      await rule.save(); // Save the changes
      return res.status(200).json({ message: 'Rule updated successfully', updatedRuleName: rule.ruleName });
  } catch (error) {
      console.error('Error updating rule:', error); // Log error for debugging
      return res.status(500).json({ error: error.message });
  }
};
