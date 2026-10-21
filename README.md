Practical 1: Smart Task Counter

A React task counter built for study sessions that tracks completed tasks, task targets, and updates status dynamically using standard React Hooks (useState).

How to Run the Application

Install dependencies:

npm install


Start the development server:

npm run dev


Open your browser at the local URL provided by Vite/React (typically http://localhost:5173).

Completed Requirements

[x] State Initialization: Created count (initial value 0) and target (initial value 5) state variables using useState.

[x] Core Controls: Added Increment, Decrement, and Reset buttons.

count is prevented from dropping below 0.

Reset returns count directly to 0.

[x] Queued Functional Update (+2 Control): Implemented an addTwo button using updater functions:

const addTwo = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};


[x] Derived Status Display: Derived application status ("Not started", "In progress", or "Target reached") directly from existing state during render without adding redundant state variables.

[x] Boundary Disabling: Disabled both Increment and +2 controls automatically when count >= target.

Required Debugging Case Explanation

The Issue:

The original implementation used captured state variables directly across two consecutive setters:

// BROKEN IMPLEMENTATION
const addTwo = () => {
  setCount(count + 1);
  setCount(count + 1);
};


Because state values in React remain constant during the lifecycle of a single render/closure, both calls read the exact same snapshot value of count. Consequently, both calls scheduled an update to count + 1, causing the counter to increment by only 1 instead of 2.

The Fix:

Replaced direct value passing with functional updates (updater functions):

// FIXED IMPLEMENTATION
const addTwo = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
};


React queues updater functions and passes the pending state to each update sequentially, ensuring the second call receives the result of the first call.

Test Steps & Validation Cases

Follow these steps to test and verify all application boundaries:

Initial State (Target 5 & Count 0):

Verify initial state displays Count: 0, Target: 5.

Status should read "Not started".

Lower Boundary (Count 0 + Decrement):

Click Decrement when count is 0.

Verify count remains 0 and does not become negative.

In Progress Status:

Click Increment once (count becomes 1).

Status should immediately change to "In progress".

Queued Functional Update (+2 Control):

Click +2 button (count goes from 1 to 3).

Confirm state increases by exactly 2 in a single click event.

Target Boundary & Disabling Controls:

When count is 4, click +2. count updates to 5.

Status should display "Target reached".

Verify Increment and +2 buttons are disabled.

Reset Behavior:

Click Reset after reaching the target.

Verify count resets to 0, status reverts to "Not started", and increment controls become re-enabled.

Known Limitations

Styling is kept basic to focus on pure React useState logic.

Target value is currently fixed/hardcoded in initial state (can be expanded in future practicals).