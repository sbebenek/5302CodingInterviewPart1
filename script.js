var employeeData = [];
cardHolder = document.getElementById("memberCardHolder");
//show that information from the database is currently loading
cardHolder.innerHTML = "Loading...";

fetch('http://sandbox.bittsdevelopment.com/code1/fetchemployees.php')
    .then(response =>
        response.json()
    )
    .then(data => {
        cardHolder.innerHTML = "";
        console.log(data);
        printEmployeeCards(data, cardHolder); //duplicate this line to simulate more employees
    })
    .catch(error => {
        console.log(error);
        //show there was an error getting information from the database
        cardHolder.innerHTML = "Error getting information from database.";
    });


/**
 * Prints employee data from the given JSON data to the given html dom element in card form
 * @param {JSON} data 
 * @param {DOMElement} htmlElement 
 */
function printEmployeeCards(data, htmlElement) {
    //iterating over JSON object - source: https://stackoverflow.com/questions/32751411/json-foreach-get-key-and-value

    Object.keys(data).forEach(i => {
        //loop over each employee object and print their card
        var employeeElementString = ""; //the string to hold all the html elements before being printed to the html

        console.log(data[i]);
        employeeElementString += "<div class=\"card\">";
        if (data[i].employeeisfeatured === "1") {
            employeeElementString += "<div class=\"crown\">&#x1F451;</div>";
        }
        employeeElementString += "<div class=\"imageHolder\"><img class=\"employeeImage\" src=\"http://sandbox.bittsdevelopment.com/code1/employeepics/" + data[i].employeeid + ".jpg\" /></div>";
        employeeElementString += "<div class=\"name\">" + data[i].employeefname + " " + data[i].employeelname + "</div>";
        employeeElementString += "<div class=\"bio\">" + data[i].employeebio + "</div>";
        employeeElementString += "<div class=\"rolesHolder\">"; //opening rolesHolder div
        Object.keys(data[i].roles).forEach(j => {
            employeeElementString += "<div class=\"role\" style=\"background: " + data[i].roles[j].rolecolor + "\">" + data[i].roles[j].rolename + "</div>";

        });
        employeeElementString += "</div>"; //closing rolesHolder div
        employeeElementString += "</div>"; //closing card div

        htmlElement.innerHTML += employeeElementString;
    });
}
