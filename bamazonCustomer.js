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
    displayInventory();
    purchase();
});  

// function to display inventory
function displayInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  };

function purchase() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
  inquirer
    .prompt([{
      name: "inventory",
      type: "input",
      message: "What would you like to purchase from Bamazon? Enter the item's name."    
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?"
    }])
    .then(function(answer) {
      var chosenItem = answer.inventory;
      var stock = 0;
      var newStock = 0;

    for (var i = 0; i < res.length; i++) {
      

      if (chosenItem === res[i].product_name) {
        chosenItem = res[i].product_name;
        stock = res[i].stock_quantity;
        newStock = stock - answer.quantity;
      }
      // console.log(chosenItem);
        
    }
    if (stock > answer.quantity) {
      connection.query(
        "UPDATE products SET stock_quantity = ? WHERE product_name= ? ",
        [newStock, chosenItem], function(error) {
          if (error) throw err;
        
          console.log("You have successfully made a purchase!");
          purchase();
        }
      );
    } else {
      console.log("We don't have enough in stock. Try again...");
      purchase();
    }
  });
});

}


