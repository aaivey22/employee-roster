// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//imports the parent class "Employee"
var Employee = require("./Employee");
// creating a subclass based on the parent "Employee"
class Engineer extends Employee {
    //creating a new constructor with paramaters
    constructor(name, email, role, id, username) {
        // super links and sets the values of the parent constructor
        super(name, email, role, id) //super enables the connection to the parent constructor
        this.username = username
    }
    getUserName() { // method to retrieve the username value
        return this.username
    }
}

let engineer = new Engineer("employee", "email", "role", "id", "github")
console.log(engineer.getEmail())
