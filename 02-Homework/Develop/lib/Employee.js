// TODO: Write code to define and export the Employee class
//
class Employee {
    constructor(name, email, role, id) {
        this.name = name //this. is a js keyword that binds the value to the constructor
        this.email = email
        this.role = role
        this.id = id
    }
    getName() { // method that retrieves the value of this.name based on the construcotr parameter
        return this.name
    }
    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getRole() {
        return this.role
    }
}
// creating a new instance of the employee class and sets values for the parameters
let employee = new Employee("employee", "yahoo", "role", "id")
console.log(employee)

module.exports = Employee;