// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//imports the parent class "Employee"
const Employee = require("./Employee");
// creating a subclass based on the parent "Employee"

class Engineer extends Employee {
    //creating a new constructor with paramaters
    constructor(name, email, id, github) {
        // super links and sets the values of the parent constructor
        super(name, email, id); //super enables the connection to the parent constructor
        this.github = github;
    }
    getGithub() { // method to retrieve the username value
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}

// let engineer = new Engineer("employee", "email", "role", "id", "github")
// console.log(engineer.getEmail())

module.exports = Engineer;
