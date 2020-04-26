// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// creating a subclass based on the parent "Employee"
class Intern extends Employee {
    //creating a new constructor with paramaters
    constructor(name, email, role, id, school) {
        // super links and sets the values of the parent constructor
        super(name, email, role, id) //super enables the connection to the parent constructor
        this.school = school
    }
    getSchool() { // method to retrieve the username value
        return this.school
    }
}
//creating a new instance of the intern class with the values which will then become the paramters inside of the constructor
let intern = new Intern("employee", "email", "role", "id", "school") 
// console.log(intern.getEmail())

module.exports = Intern;