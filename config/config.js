"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongoURI: 'mongodb://localhost:27017/your-database-name',
    csvPaths: {
        courses: 'CSV/courses.csv',
        prerequisites: 'CSV/prerequisites.csv'
    }
};
exports.default = config;
