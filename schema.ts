import mongoose, { Schema, Document } from 'mongoose';

// Define the CourseLevel enum
enum CourseLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
    SSC = 'SSC',
    Diploma = 'Diploma',
    Inter = 'Inter',
    Degree = 'Degree',
    BTech = 'BTech',
    LLB = 'LLB',
    MBBS = 'MBBS',
}

export interface ICourse extends Document {
    name: string;
    level: CourseLevel;
    prerequisite_name?: string;
}

const CourseSchema: Schema = new Schema({
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

export const Course = mongoose.model<ICourse>('Course', CourseSchema);

export interface IPrerequisite extends Document {
    course: mongoose.Types.ObjectId;
    prerequisite: mongoose.Types.ObjectId;
}

const PrerequisiteSchema: Schema = new Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    prerequisite: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

export const Prerequisite = mongoose.model<IPrerequisite>('Prerequisite', PrerequisiteSchema);
