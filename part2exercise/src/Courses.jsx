import { Course } from "./components/Course";

export const Courses = ({ courses }) => {
    return (
        <div>
        {courses.map(course => (
            <Course key={course.id} course={course} />
        ))}
        </div>
    );
    }