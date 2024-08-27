/**
 * @description Asserts that the provided object conforms to the ILesson interface.
 * @param obj - The object to check.
 * @returns boolean - Returns true if the object matches the ILesson shape; otherwise, false.
 */

export default function isLesson(obj: any): obj is ILesson {
  return (
    typeof obj === "object" && // Ensure obj is an object
    obj !== null && // Ensure obj is not null
    typeof obj.title === "string" && // title must be a string
    typeof obj.description === "string" && // description must be a string
    typeof obj.is_published === "boolean" && // is_published must be a boolean
    (obj.id === undefined || typeof obj.id === "number") // id can be undefined or a number
  );
}
