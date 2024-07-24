"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prerequisite = exports.Course = void 0;
var mongoose_1 = require("mongoose");
// Define the CourseLevel enum
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["Beginner"] = "Beginner";
    CourseLevel["Intermediate"] = "Intermediate";
    CourseLevel["Advanced"] = "Advanced";
    CourseLevel["SSC"] = "SSC";
    CourseLevel["Diploma"] = "Diploma";
    CourseLevel["Inter"] = "Inter";
    CourseLevel["Degree"] = "Degree";
    CourseLevel["BTech"] = "BTech";
    CourseLevel["LLB"] = "LLB";
    CourseLevel["MBBS"] = "MBBS";
})(CourseLevel || (CourseLevel = {}));
var CourseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: Object.values(CourseLevel),
        required: true
    },
    prerequisite_name: {
        type: String
    }
});
exports.Course = mongoose_1.default.model('Course', CourseSchema);
var PrerequisiteSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course', required: true },
    prerequisite: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course', required: true }
});
exports.Prerequisite = mongoose_1.default.model('Prerequisite', PrerequisiteSchema);
