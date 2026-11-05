
function validateAssignment(assignment) {
  if (!assignment || typeof assignment !== "object") {
    return false;
  }

  const { course, title, dueDate } = assignment;

  if (typeof course !== "string" || course.trim() === "") {
    return false;
  }

  if (typeof title !== "string" || title.trim() === "") {
    return false;
  }

  if (typeof dueDate !== "string" || dueDate.trim() === "") {
    return false;
  }

  return true;
}

module.exports = { validateAssignment };
