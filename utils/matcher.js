const fs = require("fs");
const path = require("path");

function loadRules() {
    const rulesDir = path.join(__dirname, "../rules");
    const files = fs.readdirSync(rulesDir);

    let rules = [];
    for (const file of files) {
        const content = fs.readFileSync(path.join(rulesDir, file), "utf-8");
        rules = rules.concat(JSON.parse(content));
    }
    return rules;
}

function matchError(input) {
    const rules = loadRules();
    const lowerInput = input.toLowerCase();

    let bestMatch = null;
    let highestScore = 0;

    for (const rule of rules) {
        const pattern = rule.pattern.toLowerCase();

        // Exact match
        if (lowerInput.includes(pattern)) {
            const score = pattern.length / lowerInput.length;

            let confidence = 70;

            if (score > 0.5) confidence = 95;
            else if (score > 0.3) confidence = 85;
            else if (score > 0.15) confidence = 75;

            if (confidence > highestScore) {
                highestScore = confidence;
                bestMatch = {
                    matched: true,
                    confidence,
                    ...rule
                };
            }
        }
    }

    if (bestMatch) return bestMatch;

    return {
        matched: false,
        confidence: 0
    };
}


function getAllRules() {
    return loadRules();
}


module.exports = { matchError, getAllRules };
