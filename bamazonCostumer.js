var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "valeria",
    password:"#Cali2016Lhs",
    database: "bamazon",

})

connection.connect(function (err) {
    if (err){
        console.log (err)
        return;
    }
    console.log("connected as id: " + connection.threadId);
 
    table();
 
 })
 
 
 /* function ask () {
 
    inquirer.prompt ([
        {
            type: "list",
            name:"do",
            message: "What do you want to do?",
            choices: [
                "See products",
                "Buy item"
            ]
        }
    ]).then (function(answers){
 
        switch (answers.do) {
 
            case "See products":
                table();
                break;
 
            case "Buy item":
                buyItem();
                break;
        }
    })
 } */
 
 var itemsArr = [];
 function table(){
     connection.query("SELECT * FROM  bamazon.products", function (err,res){
         if (err){
             console.log (err)
             return;
         }
 
         console.table (res);
 
         for (var i = 0; i < res.length; i ++) {
             itemsArr.push(res[i]);
         }
     })
 
 }
 
 function buyItem(){
 
    inquirer.prompt([
        {
            type: "input",
            name:"chosenItem",
            message:"What's the id number of the item you want to buy?"
        },
        {
            type: "input",
            name:"quantity",
            message:"How many units of the product would you like to buy?"
        }
    ]).then (function(answers){
        buyStuff(answers.chosenItem, answers.quantity);
 
    });
 }
 
 
 function buyStuff (id,quantity){
    connection.query("SELECT*FROM products WHERE ?",
    [{
        item_id: id
    }],
    function (err,res) {
        if(parseInt(res[0].stock_quantity) >= parseInt (quantity)){
            var total= parseInt(res[0].price) * quantity;
            updateItems(id,res[0].stock_quantity,quantity);
            console.log("You paid: $" + total +"and removed" + quantity + "Units from" + res[0].products_name + "\n");
 
        } else {
            console,log("Insufficient quantity!!!");
            /* ask(); */
        }
 
    });
 }
 
 function updateItems(id, originalStock, amountReduced) {
     console.log("Updating bamazon Database");
     var remaining = parseInt (originalStock) - parseInt (amountReduced);
     var query = connection.query (
         "Update products SET ? WHERE ?",
 
        [
             {
                 stock_quantity:remaining
             },
             {
                 item_id: id
             }
        ],
        function (err,res) {
            /* ask(); */
        }
     )
 }
