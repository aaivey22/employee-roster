// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
var Employee = require("./Employee");
// creating a subclass based on the parent "Employee"
class Manager extends Employee {
    //creating a new constructor with paramaters
    constructor(name, email, role, id, office) {
        // super links and sets the values of the parent constructor
        super(name, email, role, id) //super enables the connection to the parent constructor
        this.office = office
    }
    getOfficeNumber() { // method to retrieve the username value
        return this.office
    }
}

let manager = new Manager("employee", "email", "role", "id", "github")
console.log(manager.getEmail())