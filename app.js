"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var csvtojson = require("csvtojson");
var path = require("path");
var config_1 = require("./config/config");
var fs = require("fs");
var schema_1 = require("./models/schema");
// Function to check if a file exists
function checkFileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        console.log("".concat(filePath, " exists."));
    }
    catch (err) {
        console.error("".concat(filePath, " does not exist."));
    }
}
function logFileContent(filePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error("Error reading file ".concat(filePath, ":"), err);
        }
        else {
            console.log("Content of ".concat(filePath, ":"), data);
        }
    });
}
function importCourses() {
    return __awaiter(this, void 0, void 0, function () {
        var coursesPath, courses, formattedCourses, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    coursesPath = path.resolve(__dirname, 'CSV', 'courses.csv');
                    console.log('Courses Path:', coursesPath);
                    checkFileExists(coursesPath);
                    logFileContent(coursesPath);
                    return [4 /*yield*/, csvtojson().fromFile(coursesPath)];
                case 1:
                    courses = _a.sent();
                    console.log('Courses Data:', courses); // Log imported data
                    if (!(courses.length > 0)) return [3 /*break*/, 3];
                    formattedCourses = courses.map(function (course) { return ({
                        name: course.name,
                        level: course.level,
                        prerequisite_name: course.prerequisite_name || null
                    }); });
                    return [4 /*yield*/, schema_1.Course.insertMany(formattedCourses)];
                case 2:
                    _a.sent();
                    console.log('Courses imported successfully');
                    return [3 /*break*/, 4];
                case 3:
                    console.log('No courses data found');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error importing courses:', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function importPrerequisites() {
    return __awaiter(this, void 0, void 0, function () {
        var prerequisitesPath, prerequisites, _i, prerequisites_1, item, course_name, prerequisite_name, course, prerequisite, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    prerequisitesPath = path.resolve(__dirname, 'CSV', 'prerequisites.csv');
                    console.log('Prerequisites Path:', prerequisitesPath);
                    checkFileExists(prerequisitesPath);
                    logFileContent(prerequisitesPath);
                    return [4 /*yield*/, csvtojson().fromFile(prerequisitesPath)];
                case 1:
                    prerequisites = _a.sent();
                    console.log('Prerequisites Data:', prerequisites); // Log imported data
                    if (!(prerequisites.length > 0)) return [3 /*break*/, 8];
                    _i = 0, prerequisites_1 = prerequisites;
                    _a.label = 2;
                case 2:
                    if (!(_i < prerequisites_1.length)) return [3 /*break*/, 7];
                    item = prerequisites_1[_i];
                    course_name = item.course_name, prerequisite_name = item.prerequisite_name;
                    return [4 /*yield*/, schema_1.Course.findOne({ name: course_name })];
                case 3:
                    course = _a.sent();
                    return [4 /*yield*/, schema_1.Course.findOne({ name: prerequisite_name })];
                case 4:
                    prerequisite = _a.sent();
                    if (!(course && prerequisite)) return [3 /*break*/, 6];
                    return [4 /*yield*/, schema_1.Prerequisite.create({
                            course: course._id,
                            prerequisite: prerequisite._id,
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    console.log('Prerequisites imported successfully');
                    return [3 /*break*/, 9];
                case 8:
                    console.log('No prerequisites data found');
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_2 = _a.sent();
                    console.error('Error importing prerequisites:', error_2);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    // Connect to MongoDB
                    return [4 /*yield*/, mongoose_1.default.connect(config_1.default.mongoURI)];
                case 1:
                    // Connect to MongoDB
                    _a.sent();
                    console.log('Connected with the database');
                    // Import data
                    return [4 /*yield*/, importCourses()];
                case 2:
                    // Import data
                    _a.sent();
                    return [4 /*yield*/, importPrerequisites()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error('Database connection error:', err_1);
                    return [3 /*break*/, 6];
                case 5:
                    // Close the database connection
                    mongoose_1.default.connection.close();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main();
