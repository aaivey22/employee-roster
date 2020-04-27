const Employee = require("./Employee");

// Importing the parent class "Employee".
// Defining and exporting the Engineer class wich will inherit from Employee.
// Creating a subclass Engineer based on the parent "Employee".

class Engineer extends Employee {

    // Creating a new constructor with paramaters.
    // Super links and sets the values of the parent constructor.
    // Methods used to retrieve the github and role values.

    constructor(name, email, id, github) {
        super(name, email, id);
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;
