"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessData = preprocessData;
var fs = require("fs");
var path = require("path");
// Function to preprocess data for training
function preprocessData() {
    var _a;
    var dataPath = path.join(process.cwd(), 'data', 'personal_data.json');
    var rawData = fs.readFileSync(dataPath, 'utf-8');
    var data = JSON.parse(rawData);
    // Create training examples from the data
    var trainingExamples = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([
        // Profile information
        {
            prompt: "Tell me about yourself and your professional background.",
            completion: "I am ".concat(data.profile.name, ", a ").concat(data.profile.title, ". ").concat(data.profile.summary)
        },
        {
            prompt: "What languages do you speak?",
            completion: "I am proficient in ".concat(data.profile.languages.map(function (l) {
                return l.proficiency === "Learning" ?
                    "".concat(l.name, " (").concat(l.details, ")") :
                    "".concat(l.name, " (").concat(l.proficiency, ")");
            }).join(', '), ".")
        }
    ], data.skills.flatMap(function (category) { return [
        {
            prompt: "What is your experience with ".concat(category.category, " technologies?"),
            completion: "In ".concat(category.category, ", I have expertise in ").concat(category.items
                .map(function (item) { return "".concat(item.name, " (").concat(item.level, ", ").concat(item.years, " years)"); })
                .join(', '), ".")
        }
    ]; }), true), data.projects.map(function (project) { return ({
        prompt: "Tell me about your ".concat(project.title, " project."),
        completion: "".concat(project.description, " This project uses ").concat(project.technologies.join(', '), ". Key highlights include: ").concat(project.highlights.join(', '), ".")
    }); }), true), data.experience.map(function (exp) { return ({
        prompt: "What did you do at ".concat(exp.company, "?"),
        completion: "At ".concat(exp.company, ", I worked as ").concat(exp.role, " (").concat(exp.duration, ") where I ").concat(exp.description, " Key achievements: ").concat(exp.achievements.join(', '), ".")
    }); }), true), data.education.map(function (edu) { return ({
        prompt: "Tell me about your education at ".concat(edu.institution, "."),
        completion: "I studied ".concat(edu.degree, " with specialization in ").concat(edu.specialization, " at ").concat(edu.institution, " (").concat(edu.duration, "). ").concat(edu.achievements.join(', '), ".")
    }); }), true), [
        // European focus examples
        {
            prompt: "Why are you interested in European opportunities?",
            completion: "I am actively seeking opportunities in the European tech ecosystem, with a particular focus on cross-cultural development teams and international software development. I am currently learning German (".concat((_a = data.profile.languages.find(function (l) { return l.name === "German"; })) === null || _a === void 0 ? void 0 : _a.details, ") to better integrate into the European tech community.")
        }
    ], false);
    // Save the formatted data
    var outputPath = path.join(process.cwd(), 'data', 'training_data.json');
    fs.writeFileSync(outputPath, JSON.stringify(trainingExamples, null, 2));
    console.log('Data preprocessing complete. Training data saved to:', outputPath);
    return trainingExamples;
}
// Run the preprocessing function if this script is executed directly
if (require.main === module) {
    preprocessData();
}
