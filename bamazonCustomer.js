var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon. Happy Shopping!");

});

// query the DB to list available products
connection.query("SELECT * FROM products WHERE stock_quantity > 0", function (err, results) {
    if (err) throw err;
    console.log("Here are the items we have for sale:")
    for (var i = 0; i < results.length; i++) {
        console.log(
            "-----------------------------------",
            "\nProduct ID: " + results[i].item_id,
            "\nProduct Name:  " + results[i].product_name,
            "\nProduct Price: " + results[i].price,
            "\n-----------------------------------");
    }
    inquirer.prompt([
        {
            name: "selection",
            type: "input",
            message: "Please enter the Product ID of what you'd like to buy."
        },
        {
            name: "qty",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer) {
        var buyerSelected;
        var orderQty = parseInt(answer.qty);
        for (var x = 0; x < results.length; x++) {
            if (results[x].item_id == answer.selection) {
                buyerSelected = results[x];
            } 
        }
        if (buyerSelected.stock_quantity < orderQty) {
            console.log("Sorry, there is insufficient stock for your order.");
        } else {
            var stockQty = buyerSelected.stock_quantity;
            stockQty -= orderQty;
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: stockQty
            }, {
                item_id: buyerSelected.item_id
            }], function(error) {
                if (error) throw error;
                console.log(
                    "$ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $",
                    "\n\tYour total came to $" + buyerSelected.price + ". Thank you for your order!",
                    "\n$ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $");
            })
        }

});
});
