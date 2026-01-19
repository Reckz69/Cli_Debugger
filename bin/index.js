#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const fs = require("fs");

const { matchError, getAllRules } = require("../utils/matcher");



const program = new Command();

program
    .name("whyfail")
    .description("Explain why your app failed and how to fix it")
    .option("-l, --list", "List all supported error patterns"
    )
    .argument("[errorText]", "Error text directly from terminal"
    )
    .parse(process.argv);



const options = program.opts();
const errorText = program.args.join(" ");

if (options.list) {
    const rules = getAllRules();

    console.log(chalk.blue("\n📋 Supported Error Patterns:\n"));

    const grouped = {};

    for (const rule of rules) {
        if (!grouped[rule.category]) {
            grouped[rule.category] = [];
        }
        grouped[rule.category].push(rule.pattern);
    }

    for (const category in grouped) {
        console.log(chalk.magenta(category));
        grouped[category].forEach(p =>
            console.log(chalk.gray("  - " + p))
        );
        console.log("");
    }

    process.exit(0);
}


if (!options.file && !errorText) {
    console.log(chalk.yellow("⚠️  Provide error text or use --file <path>\n"));
    program.help();
}

let input = "";

if (options.file) {
    try {
        input = fs.readFileSync(options.file, "utf-8");
    } catch (err) {
        console.error(chalk.red("❌ Could not read file"));
        process.exit(1);
    }
} else {
    input = errorText;
}

console.log(chalk.blue("\n🔍 Analyzing error...\n"));

const result = matchError(input);

if (result.matched) {
    console.log(chalk.magenta(`Category: ${result.category}\n`));

    console.log(chalk.green("✔ Issue identified\n"));
    console.log(chalk.cyan("Cause:"), result.cause);
    console.log(chalk.cyan("Fix:"), result.fix);
    const confidenceColor =
        result.confidence >= 85 ? chalk.green :
            result.confidence >= 70 ? chalk.yellow :
                chalk.red;

    console.log(confidenceColor(`Confidence: ${result.confidence}%`));

} else {
    console.log(chalk.red("❓ No known pattern matched.\n"));
    console.log(chalk.yellow("What you can do:"));
    console.log("- Check the full stack trace");
    console.log("- Search official documentation");
    console.log("- Try simplifying the reproduction");
    console.log(chalk.gray("\n(Planned: AI-assisted guessing for unknown errors)"));
}


