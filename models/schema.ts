import mongoose, { Schema, Document } from 'mongoose';

// Define the CourseLevel enum
enum CourseLevel {
    SSC = 'SSC',
    Diploma = 'Diploma',
    Inter = 'Inter',
    Degree = 'Degree',
    BTech = 'BTech',
    LLB = 'LLB',
    MBBS = 'MBBS',
}

interface ICourse extends Document {
    name: string;
    level: CourseLevel;
    prerequisite_name: string;
}

// Define the Course schema
const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    level: { type: String, enum: Object.values(CourseLevel), required: true },
    prerequisite_name: { type: String, required: false, default: null }
});

// Define the Prerequisite interface
interface IPrerequisite extends Document {
    course: mongoose.Types.ObjectId;
    prerequisite: mongoose.Types.ObjectId;
}

// Define the Prerequisite schema
const PrerequisiteSchema: Schema = new Schema({
    course: { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
    prerequisite: { type: mongoose.Types.ObjectId, ref: 'Course', required: true }
});

// Create models
const Course = mongoose.model<ICourse>('Course', CourseSchema);
const Prerequisite = mongoose.model<IPrerequisite>('Prerequisite', PrerequisiteSchema);

export { Course, Prerequisite, ICourse, IPrerequisite, CourseLevel };
