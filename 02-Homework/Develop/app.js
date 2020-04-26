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
            name: "office",
            when: function (response) {
                return response.role === "Manager"
            }
        }

    ]).then((response) => {
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
                        const completedRoster = render(roster);
                        fs.writeFile(outputPath, completedRoster, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("roster generated in output folder");
                            }
                        });
                    }
                });
        }
        if (response.role === "Intern") {
            const newIntern = new Intern(response.name, response.id, response.email, response.school);
            roster.push(newIntern);
            addMembers();
        } else if (response.role === "Engineer") {
            const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
            roster.push(newEngineer);
            addMembers();
        } else {
            const newManager = new Manager(response.name, response.id, response.email, response.office);
            roster.push(newManager);
            addMembers();
        }

    })
        .catch((err) => console.log(err));

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
