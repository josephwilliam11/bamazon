var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Astros1!",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
});  

function managerChoices() {
    inquirer
      .prompt({
        name: "choices",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Products by Department",
          "Create New Department"
        ]
      })
      .then(function(answer) {
        switch (answer.choices) {
            case "View Products by Department":
                viewProductsDepartment();
                break;

            case "Create New Department":
                createDepartment();
                break;
        }
    });
}