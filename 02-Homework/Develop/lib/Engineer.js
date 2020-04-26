const fs = require("fs");
const axios = require("axios");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//imports the parent class "Employee"
const Employee = require("./Employee");
// creating a subclass based on the parent "Employee"

const api = {
    getUserName() {

        const queryUrl = `https://api.github.com/users/${username}`;
        //?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
        //CLIENT_ID= needs to be in env file in utils
        //CLIENT_SECRET= needs to be in env file in utils

        return axios.get(queryUrl)
    }
};

class Engineer extends Employee {
    //creating a new constructor with paramaters
    constructor(name, email, role, id, username) {
        // super links and sets the values of the parent constructor
        super(name, email, role, id) //super enables the connection to the parent constructor
        this.api = username
    }
    getUserName() { // method to retrieve the username value
        return this.username
    }
}

let engineer = new Engineer("employee", "email", "role", "id", "username")
// console.log(engineer.getEmail())

module.exports = Engineer;
