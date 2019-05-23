var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3360,
    user: "root",
    password:"#Cali2016Lhs",
    database: "bamazon",

});

connection.connect(function (err) {
    if (err)
        throw err;

    runSearch();    
});

function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Find songs by artist",
            "Find all artist who appear more than once",
            "Find data within the specific range",
            "Search for a specific song",
            "Exit",
        ]

    }).then(function(answer){
        switch (answer.action) {
            case "Find song by artist":
            artistSearch();
            break;

            case "Find all artist who appear more than once":
            artistSearch();
            break;

            case "Find data within the specific range":
            artistSearch();
            break;

            case "Search for a specific song":
            artistSearch();
            break;

            case "Exist":
            artistSearch();
            break;
        }
    })
}



function artistSearch() {
    inquirer.prompt([
        name "artist",
        type: "input",
        meassage: "What artist would you like to search?"
    ]).then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE?";

        connection.query(query, { artist: answer.artist }, function (err, res) {
            for (var i = 0; i < res,length; i++) {
                console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year)
            }

            runSearch();
        });

    });
}