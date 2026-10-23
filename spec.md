# College Assignment Tracker · Feature UC-1: Add Assignment

This is the spec from the "From Story to Spec" worksheet for the College Assignment Tracker.
It follows the SwipeFolio `spec.md` example from the lecture.

The spec has two layers:

- **Behavior layer** (AI-assisted, human-reviewed): rules, examples, and acceptance criteria.
- **Technical layer** (AI-drafted, verification pending): the interface the code must follow.

## Traceability

| Source | ID | Text |
|---|---|---|
| User story | S1 | As a college student, I want to add assignments with a course name, assignment name, and due date so that I can organize and keep track of my coursework. |
| SRS | FR-01 | The system shall allow students to add an assignment with a course, name, due date, and completion status. |
| SRS | FR-02 | The system shall reject an assignment missing a required course, name, or due date and identify the missing field. |
| SRS | FR-03 | The system shall show a newly saved assignment in the assignment list. |
| Use case | UC-1 | Add Assignment |

## Rules (decided for the worksheet)

- **R1.** Course, assignment name, and due date are required. A missing field blocks saving and displays an error identifying that field.
- **R2.** Due dates use `YYYY-MM-DD` and must represent a valid calendar date.
- **R3.** Fields containing only spaces are treated as empty and rejected.
- **R4.** Students may enter past due dates, including dates before today.

## Acceptance criteria

| ID | Given | When | Then |
|---|---|---|---|
| AC1 | the assignment form is open with valid information in every required field | the student clicks Save | the assignment is saved and appears in the assignment list |
| AC2 | the assignment form is open with the assignment name empty | the student clicks Save | an error identifies the missing assignment name, and nothing is saved |
| AC3 | the assignment name contains only spaces | the student clicks Save | the name is treated as empty, an error is displayed, and nothing is saved |
| AC4 | the due date is `2026-13-01` | the student clicks Save | an invalid-date error is displayed, and nothing is saved |
| AC5 | all required fields are valid and the due date is `2026-10-22` | the student clicks Save on `2026-10-23` | the assignment is saved even though the due date has passed |

Boundary examples for R1 to R4 and AC2 to AC5:

| Input | Result |
|---|---|
| Course `CS445`, name `Homework 1`, date `2026-10-30` | assignment saved |
| Course `CS445`, name empty (0 characters), date `2026-10-30` | error; not saved |
| Course `CS445`, name `A` (1 character), date `2026-10-30` | accepted |
| Name ` ` (one space) | error; not saved |
| Name `A` (one letter) | accepted |
| Date `2026-10-30` | accepted |
| Date `2026-12-31` (month 12) | accepted |
| Date `2026-13-01` (month 13) | invalid date; not saved |
| Date `2026-10-22` entered on `2026-10-23` | accepted (past date) |
| Date `2026-10-23` entered on `2026-10-23` | accepted (today) |

## Interface (technical layer: AI-drafted, verification pending)

These functions are proposed as pure JavaScript functions: no DOM, no storage, no network,
and no changes to their inputs. Tests can call them directly. Their names have not yet been
checked against the class diagram or source code.

- `isRequiredFieldValid(value) → true | false`
  - Returns `false` for empty or whitespace-only text.
- `isValidDueDate(date) → true | false`
  - Checks `YYYY-MM-DD` format and actual calendar validity.
- `validateAssignment(course, name, dueDate) → "valid" | "invalid"`
  - Checks required fields and due-date validity.
- `createAssignment(course, name, dueDate) → assignment object`
  - Constructs assignment data without saving it or updating the screen.

### Data shapes

```js
// Proposed assignment shape; field names are not verified against the repository.
{ course: "CS445", name: "Homework 1", dueDate: "2026-10-30", completed: false }
```

### Input

- The student enters a course, assignment name, and due date in the Add Assignment form.
- The student selects Save. UI code validates the values, then saves and displays valid assignments.
- The proposed pure functions do not interact with the form or persist data.

## Test cases (Step 9)

| AC ID | Input | Expected result |
|---|---|---|
| AC4 | `isValidDueDate("2026-10-30")` | `true` (ordinary valid date) |
| AC4 | `isValidDueDate("2026-12-31")` | `true` (month 12 is valid) |
| AC4 | `isValidDueDate("2026-13-01")` | `false` (month 13 is invalid) |

## Parked questions (not resolved by this feature spec)

- What are the maximum lengths for course and assignment name? → input limits not decided.
- Where exactly do field errors appear? → UI presentation not specified.
- Which input methods beyond form entry must be supported? → not specified.
- How are assignments ordered in the list? → list-view behavior.
- Are assignments retained after a reload? → persistence behavior.
- The gap analysis proposes incomplete status by default and allows duplicates; neither has a corresponding acceptance criterion in this feature spec.

## Out of scope for UC-1

Editing, deleting, filtering, and changing completion status of existing assignments are separate
features. Framework choice, storage technology, and visual styling are not decided here.
