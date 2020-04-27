const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// The user data is the user responses from the inquirer-prompts and are pushed into the "roster" array at the end of the buildRoster() beginning.

const roster = [];

// Each question is made up of an object which defines the name of the field, its type, and the displayed "message".
// Validate: is an obj-prop and method used here to make responding with a value a user-requirement.
// When: is an obj-prop and method used to execute a block of code specific to the user's chosen role.

function buildRoster() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the team member name:",
                name: "name",
                validate: function(res) {
                    if (res.trim() === ""){
                        console.log("Name is invalid, try again.")
                    }
                    return res.trim() !=="";
                }
            },
            {
                type: "input",
                message: "Enter the team member email address:",
                name: "email",
                validate: function(res) {
                    if (res.trim() === ""){
                        console.log("Email is invalid, try again.")
                    }
                    return res.trim() !=="";
                }
            },
            {
                type: "input",
                message: "Enter the team member ID number:",
                name: "id",
                validate: function(res) {
                    if (res.trim() === ""){
                        console.log("ID is invalid, try again.")
                    }
                    return res.trim() !=="";
                }
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
                when: function (res) {
                    return res.role === "Intern"
                },
                validate: function(res) {
                    if (res.trim() === ""){
                        console.log("School name is invalid, try again.")
                    }
                    return res.trim() !=="";
                }
            },
            {
                type: "input",
                message: "What is the Engineer's GitHub name?",
                name: "github",
                when: function (res) {
                    return res.role === "Engineer"
                },
                validate: function(res) {
                    if (res.trim() === ""){
                        console.log("GitHub username is invalid, try again.")
                    }
                    return res.trim() !=="";
                }
            },
            {
                type: "input",
                message: "What is the Manager's office number?",
                name: "officeNumber",
                when: function (res) {
                    return res.role === "Manager"
                },
                validate: function(res) {
                    if (res.trim() === ""){
                        console.log("Office number is invalid, try again.")
                    }
                    return res.trim() !=="";
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
                            const generateRoster = render(roster);
                            fs.writeFile(outputPath, generateRoster, function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("roster generated in output folder");
                                    console.log(generateRoster);
                                }
                            });
                        }
                    });
            }

            // If: the user chooses to add more members, the addMembers() above will begin the buildRoster() again.
            // Else: the user chooses to generate roster.
            // The render(roster) function (required above) passes the user-data into the roster[] array containing all member objects.
            // Render() will generate and return a block of HTML including templated divs for each employee.
            // Creating a new instance of the member-class's with the values which will then become the paramters inside of the constructor.

            if (response.role === "Intern") {
                let newIntern = new Intern(response.name, response.email, response.id, response.school);
                roster.push(newIntern);
                addMembers();
            } else if (response.role === "Engineer") {
                let newEngineer = new Engineer(response.name, response.email, response.id, response.github);
                roster.push(newEngineer);
                addMembers();
            } else {
                let newManager = new Manager(response.name, response.email, response.id, response.officeNumber);
                roster.push(newManager);
                addMembers();
            }

        }).catch((err) => console.log(err));

};

buildRoster();

