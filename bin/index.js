#!/usr/bin/env node
const video = require("../lib/video");
const audio = require("../lib/audio");
const program = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const version = require("../package.json").version;
const projectExist = projectName => fs.existsSync(projectName);

const copy = (targetPath, sourcePath) => {
    if (!projectExist()) {
        fs.mkdirSync(targetPath);
    }
    fs.readdir(sourcePath, (error, files) => {
        if (error) return console.log(error);
        files.forEach(file => {
            const filePath = path.join(sourcePath, file);
            const writePath = path.join(targetPath, file);
            fs.stat(filePath, (error, stats) => {
                if (error) return console.error(error);
                if (stats.isFile()) {
                    fs.readFile(filePath, (error, buffer) => {
                        fs.writeFile(writePath, buffer, error => {
                            if (error) return console.error(error);
                        });
                    });
                } else {
                    copy(writePath, filePath);
                }
            });
        });
    });
};
const initAction = () => {
    inquirer
        .prompt([
            {
                type: "input",
                description: "project name",
                name: "name"
            },
            {
                type: "list",
                description: "project type",
                name: "type",
                choices: ["vue", "react", "dva"]
            },
            {
                type: "list",
                description: "install type",
                name: "install",
                choices: ["npm", "cnpm", "yarn"]
            }
        ])
        .then(answers => {
            const targetPath = path.join(process.cwd(), answers.name);
            const fileName = `./lib/${answers.type}-cli-master`;
            const sourcePath = path.join(__dirname, "..", fileName);
            console.log(targetPath, sourcePath);
            copy(targetPath, sourcePath);
        });
};
program
    .version(version)
    .description("初始化项目")
    .command("init")
    .action(initAction);
program.parse(process.argv);
// video('xuepenglong')
// audio('xpl')
