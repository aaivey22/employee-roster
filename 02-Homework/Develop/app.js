const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// const PORT = process.env.PORT || 7000;
const render = require("./lib/htmlRenderer");
const roster = [];

function buildRoster() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the team member name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter the team member email address:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter the team member ID number:",
            name: "id"
        },
        {
            type: "list",
            message: "Select the team member role:",
            choices: ["Intern", "Engineer", "Manager"],
            name: "role"
        },
        {
            type: "input",
            message: "What is the Intern's school name?",
            name: "school",
            when: function (response) {
                return response.role === "Intern"
            }
        },
        {
            type: "input",
            message: "What is the Engineer's GitHub name?",
            name: "github",
            when: function (response) {
                return response.role === "Engineer"
            }
        },
        {
            type: "input",
            message: "What is the Manager's office number?",
            name: "officeNumber",
            when: function (response) {
                return response.role === "Manager"
            }
        }

    ]).then((response) => {
        console.log("new member created in roster");
        const addMembers = () => {
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "What next?",
                        choices: ["Add more members to roster", "Generate Roster"],
                        name: "addMembers"
                    }
                ]).then((response) => {
                    if (response.addMembers === "Add more members to roster") {
                        console.log("ok, let's add some more members..");
                        buildRoster();
                    } else {
                        render(roster);
                        fs.writeFile(outputPath, roster, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("roster generated in output folder");
                                console.log(render (roster));

                            }
                        });
                    }
                });
        }
        //creating a new instance of the intern class with the values which will then become the paramters inside of the constructor
        if (response.role === "Intern") {
            let intern = new Intern(response.name, response.id, response.email, response.school);
            roster.push(intern);
            addMembers();
        } else if (response.role === "Engineer") {
            let engineer = new Engineer(response.name, response.id, response.email, response.github);
            roster.push(engineer);
            addMembers();
        } else {
            let manager = new Manager(response.name, response.id, response.email, response.officeNumber);
            roster.push(manager);
            addMembers();
        }

    }).catch((err) => console.log(err));

};

buildRoster();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you"re now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
