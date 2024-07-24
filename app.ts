import mongoose, { Schema, Document } from 'mongoose';
import * as csvtojson from 'csvtojson';
import * as path from 'path';
import config from './config/config';
import * as fs from 'fs';
import { Course, Prerequisite } from './models/schema';

// Function to check if a file exists
function checkFileExists(filePath: string) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        console.log(`${filePath} exists.`);
    } catch (err) {
        console.error(`${filePath} does not exist.`);
    }
}

function logFileContent(filePath: string) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
        } else {
            console.log(`Content of ${filePath}:`, data);
        }
    });
}

async function importCourses(): Promise<void> {
    try {
        const coursesPath = path.resolve(__dirname, 'CSV', 'courses.csv');
        console.log('Courses Path:', coursesPath);
        checkFileExists(coursesPath);
        logFileContent(coursesPath);

        const courses = await csvtojson().fromFile(coursesPath);
        console.log('Courses Data:', courses); // Log imported data

        if (courses.length > 0) {
            // Ensure all fields match the schema
            const formattedCourses = courses.map((course: any) => ({
                name: course.name,
                level: course.level,
                prerequisite_name: course.prerequisite_name || null
            }));
            await Course.insertMany(formattedCourses);
            console.log('Courses imported successfully');
        } else {
            console.log('No courses data found');
        }
    } catch (error) {
        console.error('Error importing courses:', error);
    }
}

async function importPrerequisites(): Promise<void> {
    try {
        const prerequisitesPath = path.resolve(__dirname, 'CSV', 'prerequisites.csv');
        console.log('Prerequisites Path:', prerequisitesPath);
        checkFileExists(prerequisitesPath);
        logFileContent(prerequisitesPath);

        const prerequisites = await csvtojson().fromFile(prerequisitesPath);
        console.log('Prerequisites Data:', prerequisites); // Log imported data

        if (prerequisites.length > 0) {
            for (const item of prerequisites) {
                const { course_name, prerequisite_name } = item;

                // Find course and prerequisite by name
                const course = await Course.findOne({ name: course_name });
                const prerequisite = await Course.findOne({ name: prerequisite_name });

                if (course && prerequisite) {
                    await Prerequisite.create({
                        course: course._id,
                        prerequisite: prerequisite._id,
                    });
                }
            }
            console.log('Prerequisites imported successfully');
        } else {
            console.log('No prerequisites data found');
        }
    } catch (error) {
        console.error('Error importing prerequisites:', error);
    }
}

async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.mongoURI);
        console.log('Connected with the database');

        // Import data
        await importCourses();
        await importPrerequisites();
    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

main();
