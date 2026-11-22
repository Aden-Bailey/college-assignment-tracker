const { validateAssignment } = require("./validators");

class AssignmentManager {
  constructor() {
    this.assignments = [];
  }

  addAssignment(assignment) {
    if (!validateAssignment(assignment)) {
      return false;
    }

    this.assignments.push({
      ...assignment,
      completionStatus: false
    });

    return true;
  }

  getAssignments() {
    return [...this.assignments];
  }
}

module.exports = { AssignmentManager };
