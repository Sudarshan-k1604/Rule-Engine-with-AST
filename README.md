# Rule-Engine-with-AST
Develop a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine  user eligibility based on attributes like age, department, income, spend etc.The system can use  Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic  creation,combination, and modification of these rules.
# Rule Engine

## Overview

The Rule Engine is a web-based application that allows users to create, combine, evaluate, and manage rules using a simple and intuitive interface. It provides a flexible way to handle rules and their evaluations, making it suitable for various applications where rule-based logic is needed.

## Features

- **Create Rule**: Easily create new rules by specifying a rule name and its corresponding rule string.
- **Combine Rules**: Combine multiple rules using logical operators (AND, OR) to create complex conditions.
- **Evaluate Rules**: Evaluate rules against JSON data to check if the conditions are met.
- **History**: View a history of created and evaluated rules, including timestamps for each action.
- **Update Rule**: Modify existing rules by updating their names and strings.

## Technologies Used

- HTML, CSS, and JavaScript for the frontend.
- A backend server (e.g., Node.js, Express) to handle API requests (ensure to set up appropriate endpoints).
- A database (e.g., MongoDB) for storing rules and history.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB (or any other database you prefer)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rule-engine
