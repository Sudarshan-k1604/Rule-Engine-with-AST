
---

# Rule-Engine-with-AST

## Overview

The **Rule Engine** is a 3-tier application designed to determine user eligibility based on dynamic, conditional rules. It utilizes an **Abstract Syntax Tree (AST)** to represent rules, allowing for the creation, modification, and combination of rules dynamically. Users can interact with the application via a web-based UI, and the system uses a MongoDB database to persist rules and user activity.

## Key Features

- **Rule Creation**: Define new rules with custom logic.
- **Rule Evaluation**: Evaluate rules dynamically against input data in JSON format.
- **Rule Combination**: Combine existing rules using logical operators (AND, OR) to create complex conditions.
- **History Tracking**: View a complete history of rule creation, updates, and evaluations.
- **Update Rules**: Modify or update existing rules.
- **Dynamic Management**: AST allows rules to be changed or combined on the fly.

- **Create Rules:** Define rules using a string format that gets converted into an AST.
- - **Create Rules:** Define rules using a string format that gets converted into an AST.
  
  <img width="377" alt="image" src="">


- **Combine Rules:** Combine multiple rules into a single AST for more complex evaluations.
  
  <img width="376" alt="image" src="">

  
- **Evaluate Rules:** Check if the given data meets the criteria defined by the AST.
  
  <img width="375" alt="image" src="">

## Technologies Used

### Frontend:
- **HTML**, **CSS**, and **JavaScript** for the user interface.

### Backend:
- **Node.js** and **Express.js** for server-side logic and routing.
- **MongoDB** for database storage of rules and history.

### Additional Libraries:
- **Body-parser**: To parse incoming request bodies.
- **CORS**: To enable cross-origin requests.
- **Path**: For serving static files and resolving file paths.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd rule-engine-with-ast
   ```

2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```

3. **Start MongoDB**:
   Ensure that MongoDB is running on your local machine:
   ```bash
   mongod
   ```

4. **Start the Backend Server**:
   You can start the server with `nodemon` for automatic restarts during development:
   ```bash
   nodemon server.js
   ```

5. **Access the application**:
   Visit `http://localhost:3000` in your browser.

## API Endpoints

The application provides several API endpoints for interacting with the rule engine:

1. **Create a Rule**
   - **Endpoint:** `/api/rules/create_rule`
   - **Method:** POST
   - **Body**:
     ```json
     {
       "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
       "ruleName": "Rule 1"
     }
     ```
     Use appropriate spaces in rules for correct results. The rule should follow the format:
     ```
     variable operator value
     ```
   - **Response**:
     ```json
     {
       "_id": "6714ec22dd7583d261bfcbc6",
       "rule_name": "Rule 1",
       "rule_ast": { ... }
     }
     ```

2. **Combine Rules**
   - **Endpoint:** `/api/rules/combine_rules`
   - **Method:** POST
   - **Body**:
     ```json
     {
       "ruleIds": ["6714ec22dd7583d261bfcbc6", "6714ecf6dd7583d261bfcbd9"],
       "operators": "op"
     }
     ```
   - **Response**:
     ```json
     {
       "type": "operator",
       "value": "operator",
       "left": { ... },
       "right": { ... }
     }
     ```

3. **Evaluate a Rule**
   - **Endpoint:** `/api/rules/evaluate_rule`
   - **Method:** POST
   - **Body**:
     ```json
     {
       "rule": { ... },
       "data": {
         "age": 35,
         "department": "Sales",
         "salary": 60000,
         "experience": 5
       }
     }
     ```
   - **Response**:
     ```json
     {
       "result": true
     }
     ```
4. **Update Rule**
- **Endpoint:** `/api/rules/update_rule`
   - **Method:** PUT
   - **Body**:
     ```json
     {
       "rule": { ... },
       "data": {
         "age": 31,
         "department": "Marketing",
         "salary": 70000,
         "experience": 5
       }
     }
5. **History Rule**
   - **Endpoint:** `/api/rules/History_rule`
   - **Method:** GET
   - **Body**:
     ```json
     {
       "rule": { ... },
       "data": {
         "age": 35,
         "department": "Sales",
         "salary": 60000,
         "experience": 5
       }
     }
## Running Tests

You can add and run tests to ensure everything is working correctly. 
