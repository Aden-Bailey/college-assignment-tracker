
const { validateAssignment } = require("../src/validators");

describe("Assignment Validation Tests", () => {

  test("Accepts an assignment with all required fields", () => {
    const assignment = {
      course: "CS445",
      title: "Software Engineering Project",
      dueDate: "2026-11-15"
    };

    expect(validateAssignment(assignment)).toBe(true);
  });

  test("Rejects an assignment with a missing course", () => {
    const assignment = {
      title: "Software Engineering Project",
      dueDate: "2026-11-15"
    };

    expect(validateAssignment(assignment)).toBe(false);
  });

  test("Rejects an assignment with a missing title", () => {
    const assignment = {
      course: "CS445",
      dueDate: "2026-11-15"
    };

    expect(validateAssignment(assignment)).toBe(false);
  });

  test("Rejects an assignment with a missing due date", () => {
    const assignment = {
      course: "CS445",
      title: "Software Engineering Project"
    };

    expect(validateAssignment(assignment)).toBe(false);
  });

  test("Rejects an assignment with an empty course", () => {
    const assignment = {
      course: "",
      title: "Software Engineering Project",
      dueDate: "2026-11-15"
    };

    expect(validateAssignment(assignment)).toBe(false);
  });

  test("Rejects an assignment with whitespace-only title", () => {
    const assignment = {
      course: "CS445",
      title: "   ",
      dueDate: "2026-11-15"
    };

    expect(validateAssignment(assignment)).toBe(false);
  });

  test("Rejects null assignment input", () => {
    expect(validateAssignment(null)).toBe(false);
  });

  test("Rejects a non-string due date", () => {
    const assignment = {
      course: "CS445",
      title: "Software Engineering Project",
      dueDate: 20261115
    };

    expect(validateAssignment(assignment)).toBe(false);
  });

});
