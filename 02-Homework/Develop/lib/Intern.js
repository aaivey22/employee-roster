// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// creating a subclass based on the parent "Employee"
class Intern extends Employee {
    //creating a new constructor with paramaters
    constructor(name, email, id, school) {
        // super links and sets the values of the parent constructor
        super(name, email, id) ;//super enables the connection to the parent constructor
        this.school = school;
    }
    getSchool() { // method to retrieve the school value
        return this.school;
    }
    getRole() {
        return "Intern";
    }
}
// console.log(intern.getEmail())

module.exports = Intern;