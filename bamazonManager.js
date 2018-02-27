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
    managerChoices();
}); 

function managerChoices() {
  inquirer
    .prompt({
        name: "choices",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
    })
    .then(function(answer) {
      switch (answer.choices) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;           
        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
      console.log("-----------------------------------");
      managerChoices();
  });
}


function viewLowInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 400) {
        console.log(res[i].product_name + " | " + res[i].stock_quantity);
        console.log("-----------------------------------");
      } 
    } 
      managerChoices();
  });
}

function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
    .prompt([{
      name: "inventory",
      type: "rawlist",
      choices: function(){
        var array = [];
        for (var i = 0; i < res.length; i++){
          array.push(res[i].product_name);
        }
        return array;
      },
        message: "What product would you like to add to?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?"
      }])
        .then(function(answer) {
        var chosenProduct = answer.inventory;
          for (var i = 0; i < res.length; i++) {
            if (chosenProduct === res[i].product_name) {
              var quantity = res[i].stock_quantity;
              var newQuantity = quantity + parseInt(answer.quantity);
              connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?",[newQuantity,chosenProduct],
                function(err, res) {
                  if(err) throw err;
                    console.log(newQuantity);
                    console.log("You have successfully added inventory");
                }
              );       
            }
          }
        }
      );
  });
}

function addProduct(){
  inquirer.prompt([
    {
      type: "input",
      name: "product_id",
      message: "Enter new item_id?"
    },
    {
      type: "input",
      name: "productName",
      message: "Enter product name?"
    },
    {
      type: "input",
      name: "departmentName",
      message: "Enter department name?"
    },
    {
      type: "input",
      name: "price",
      message: "Price?"
    },
    {
      type: "input",
      name: "stockQuantity",
      message: "Enter stock quantity?"
    }
  ])
.then(function(answer) {
  console.log(answer.product_id + " | " + answer.productName + " | " + answer.departmentName + " | " + answer.price + " | " + answer.stockQuantity);
  var insertRecord = 'INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUE(?,?,?,?,?)';
  connection.query(insertRecord, [answer.product_id, answer.productName, answer.departmentName, answer.price, answer.stockQuantity], 
    function(err,res){
    if(err) throw err;
    else {
        console.log('A new product has been added.');
    }
  });
}) 

}

 

