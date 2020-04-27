var Employee = require("./Employee");

// Importing the parent class "Employee".
// Defining and exporting the Manager class wich will inherit from Employee.
// Creating a subclass Manager based on the parent "Employee".
class Manager extends Employee {

    // Creating a new constructor with paramaters.
    // Super links and sets the values of the parent constructor.
    // Methods used to retrieve the office and role values.

    constructor(name, email, id, officeNumber) {
        super(name, email, id)
        this.officeNumber = officeNumber
    }
    getOfficeNumber() {
        return this.officeNumber
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;