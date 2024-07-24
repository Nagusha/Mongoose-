"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prerequisite = exports.Course = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
const CourseSchema = new mongoose_1.Schema({
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
const PrerequisiteSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course', required: true },
    prerequisite: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course', required: true }
});
exports.Prerequisite = mongoose_1.default.model('Prerequisite', PrerequisiteSchema);
