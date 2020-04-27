const Employee = require("./Employee");

// Importing the parent class "Employee".
// Defining and exporting the Intern class wich will inherit from Employee.
// Creating a subclass Intern based on the parent "Employee".
class Intern extends Employee {

    // Creating a new constructor with paramaters.
    // Super links and sets the values of the parent constructor.
    // Methods used to retrieve the school and role values.
    
    constructor(name, email, id, school) {
        super(name, email, id) ;
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
}

module.exports = Intern;