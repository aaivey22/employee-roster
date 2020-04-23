const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const PORT = process.env.PORT || 7000;

const render = require("./lib/htmlRenderer");
const roster = [];
// render (roster)

function askCorrectQuestion(response) {
    let question
    if (response.role === "Intern") {
        question = "What is the intern's school name?"
    } else if (response.role === "Engineer") {
        question = "What is the engineer's GitHub username?"
    } else if (response.role === "Manager") {
        question = "What is the manager's office number?"
    }
    inquirer.prompt([
        {
            type: "input",
            message: question,
            name: "uniqueInfo"
        }
    ])
        .then(function (answer) {
            console.log(answer.uniqueInfo)
            if (response.role === "Intern") {
                let intern = new Intern(response.name, response.email, response.role, response.id, answer.uniqueInfo)
                console.log(intern);
                roster.push(intern)
                console.log(roster)
            } else if (response.role === "Engineer") {
                let engineer = new Engineer(response.name, response.email, response.role, response.id, answer.uniqueInfo)
                console.log(engineer)
                roster.push(engineer)

            } else if (response.role === "Manager") {
                let manager = new Manager(response.name, response.email, response.role, response.id, answer.uniqueInfo)
                console.log(manager)
                roster.push(manager)

            }
            newEmployee() // Calling function to ask if user has another employee to add
        })

}

const intake = [
    {
        type: "input",
        message: "Enter the team member name:",
        name: "name"
    },
    {
        type: "list",
        message: "Enter the team member role:",
        choices: ["Intern", "Engineer", "Manager"],
        name: "role"
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
    }
];
const addIntake = [
    {
        type: "confirm",
        message: "Do you have another team member to add?",
        name: "addIntake"
    }
]

function newEmployee() {
    inquirer.prompt(addIntake)
    .then(response => {
        console.log(response)
        if(response.addIntake) {
            generateRoster()
        } else {
            render(roster)
            console.log(render(roster))
        }
    })
}

function generateRoster() {
    inquirer.prompt(intake)
        .then(response => {
            console.log(response)
            askCorrectQuestion(response)
        })
        .catch(error => {
            console.log(error)
        })
};

generateRoster();

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
