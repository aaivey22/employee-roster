// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
var Employee = require("./Employee");
// creating a subclass based on the parent "Employee"
class Manager extends Employee {
    //creating a new constructor with paramaters
    constructor(name, email, id, officeNumber) {
        // super links and sets the values of the parent constructor
        super(name, email, id) //super enables the connection to the parent constructor
        this.officeNumber = officeNumber
    }
    getOfficeNumber() { // method to retrieve the username value
        return this.officeNumber
    }
    getRole() {
        return "Manager";
    }
}

// console.log(manager.getEmail())

module.exports = Manager;