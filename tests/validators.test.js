const { validateAssignment } = require("../src/validators");

describe("Assignment Validation Tests", () => {

  test("Accepts an assignment with all required fields", () => {
    // Arrange
    const assignment = {
      course: "CS445",
      title: "Software Engineering Project",
      dueDate: "2026-11-15"
    };

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(true);
  });

  test("Rejects an assignment with a missing course", () => {
    // Arrange
    const assignment = {
      title: "Software Engineering Project",
      dueDate: "2026-11-15"
    };

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(false);
  });

  test("Rejects an assignment with a missing title", () => {
    // Arrange
    const assignment = {
      course: "CS445",
      dueDate: "2026-11-15"
    };

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(false);
  });

  test("Rejects an assignment with a missing due date", () => {
    // Arrange
    const assignment = {
      course: "CS445",
      title: "Software Engineering Project"
    };

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(false);
  });

  test("Rejects an assignment with an empty course", () => {
    // Arrange
    const assignment = {
      course: "",
      title: "Software Engineering Project",
      dueDate: "2026-11-15"
    };

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(false);
  });

  test("Rejects an assignment with whitespace-only title", () => {
    // Arrange
    const assignment = {
      course: "CS445",
      title: "   ",
      dueDate: "2026-11-15"
    };

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(false);
  });

  test("Rejects null assignment input", () => {
    // Arrange
    const assignment = null;

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(false);
  });

  test("Rejects a non-string due date", () => {
    // Arrange
    const assignment = {
      course: "CS445",
      title: "Software Engineering Project",
      dueDate: 20261115
    };

    // Act
    const result = validateAssignment(assignment);

    // Assert
    expect(result).toBe(false);
  });

  // Table-driven boundary tests for the course field
  test.each([
    ["empty course", "", false],
    ["whitespace-only course", "   ", false],
    ["one-character course", "A", true],
    ["two-character course", "AB", true]
  ])(
    "TC-05: Course boundary test - %s",
    (description, course, expected) => {
      // Arrange
      const assignment = {
        course,
        title: "Testing Milestone",
        dueDate: "2026-11-22"
      };

      // Act
      const result = validateAssignment(assignment);

      // Assert
      expect(result).toBe(expected);
    }
  );

});
