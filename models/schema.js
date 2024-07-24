"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseLevel = exports.Prerequisite = exports.Course = void 0;
var mongoose_1 = require("mongoose");
// Define the CourseLevel enum
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["SSC"] = "SSC";
    CourseLevel["Diploma"] = "Diploma";
    CourseLevel["Inter"] = "Inter";
    CourseLevel["Degree"] = "Degree";
    CourseLevel["BTech"] = "BTech";
    CourseLevel["LLB"] = "LLB";
    CourseLevel["MBBS"] = "MBBS";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
// Define the Course schema
var CourseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    level: { type: String, enum: Object.values(CourseLevel), required: true },
    prerequisite_name: { type: String, required: false, default: null }
});
// Define the Prerequisite schema
var PrerequisiteSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.default.Types.ObjectId, ref: 'Course', required: true },
    prerequisite: { type: mongoose_1.default.Types.ObjectId, ref: 'Course', required: true }
});
// Create models
var Course = mongoose_1.default.model('Course', CourseSchema);
exports.Course = Course;
var Prerequisite = mongoose_1.default.model('Prerequisite', PrerequisiteSchema);
exports.Prerequisite = Prerequisite;
