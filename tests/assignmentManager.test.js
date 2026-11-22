const { AssignmentManager } = require("../src/assignmentManager");

describe("Assignment Manager Tests", () => {

  test("TC-01: Adds a valid assignment", () => {
    // Arrange
    const manager = new AssignmentManager();
    const assignment = {
      course: "CS445",
      title: "Testing Milestone",
      dueDate: "2026-11-22"
    };

    // Act
    const result = manager.addAssignment(assignment);

    // Assert
    expect(result).toBe(true);
    expect(manager.getAssignments()).toHaveLength(1);
  });

  test("TC-02: Rejects an assignment with missing fields", () => {
    // Arrange
    const manager = new AssignmentManager();
    const assignment = {
      course: "",
      title: "Testing Milestone",
      dueDate: "2026-11-22"
    };

    // Act
    const result = manager.addAssignment(assignment);

    // Assert
    expect(result).toBe(false);
    expect(manager.getAssignments()).toHaveLength(0);
  });

  test("TC-03: New assignments start as incomplete", () => {
    // Arrange
    const manager = new AssignmentManager();
    const assignment = {
      course: "CS445",
      title: "Testing Milestone",
      dueDate: "2026-11-22"
    };

    // Act
    manager.addAssignment(assignment);
    const savedAssignment = manager.getAssignments()[0];

    // Assert
    expect(savedAssignment.completionStatus).toBe(false);
  });

  test("TC-04: Returns an empty list when no assignments exist", () => {
    // Arrange
    const manager = new AssignmentManager();

    // Act
    const assignments = manager.getAssignments();

    // Assert
    expect(assignments).toEqual([]);
  });

  test("NFR-03: Invalid submission preserves saved assignments", () => {
    // Arrange
    const manager = new AssignmentManager();

    manager.addAssignment({
      course: "CS445",
      title: "Testing Milestone",
      dueDate: "2026-11-22"
    });

    const before = manager.getAssignments();

    // Act
    const result = manager.addAssignment({
      course: "",
      title: "Invalid Assignment",
      dueDate: "2026-11-22"
    });

    const after = manager.getAssignments();

    // Assert
    expect(result).toBe(false);
    expect(after).toEqual(before);
    expect(after).toHaveLength(1);
  });

});
