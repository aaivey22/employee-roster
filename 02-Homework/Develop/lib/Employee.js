// A parent-class named Employee that extends to Intern, Engineer, and Manager.
// Get-methods used to retrieve the obj-properties listed in the constructor parameters.

class Employee {
    constructor(name, email, id) {
        this.name = name; // 'this.' is a js keyword that binds the value to the constructor.
        this.email = email;
        this.id = id;
    }
    getName() { // Method that retrieves the value of 'this.name' based on the construcotr parameter.
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getId() {
        return this.id;
    }
    getRole() {
        return "Employee";
    }
};

module.exports = Employee;