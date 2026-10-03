# StudyFlow

## 1. Project Overview

StudyFlow is a mobile academic planner for university students. It gives students one place to review their tasks, monitor course progress and attendance, and see a simple summary of their academic workload. The aim is to reduce the difficulty of remembering deadlines and tracking progress across several courses.

## 2. Main Features

### Home/Dashboard

- Displays the StudyFlow header, student greeting, and a compact academic overview.
- Shows counts for pending and completed tasks.
- Shows up to three upcoming pending tasks.
- Shows progress summaries for three courses.
- Includes a top horizontal control for switching between Home, Tasks, Courses, and Analytics without a side drawer or bottom tab navigator.

### Task Management

- Displays tasks from a local JavaScript array.
- Each task has an ID, title, course, due date, priority, and completed status.
- Tasks display their course, due date, and priority badge.
- Tapping a task toggles it between completed and pending.
- Completed tasks are shown with a check mark and crossed-out title.

### Task Filtering

The Tasks view supports three filters:

- All
- Pending
- Completed

The selected filter is applied to the task array and the visible list updates immediately.

### Add Task Form and Validation

- Provides a text input for a new task title.
- Allows selecting one of the available courses.
- Allows selecting Low, Medium, or High priority.
- Rejects an empty or whitespace-only title and displays feedback.
- Adds a valid task to the pending task list immediately.
- New tasks use `"No date"` as their due date because the current form does not include a date picker or date input.
- Shows an empty state when no task matches the selected filter.

### Courses

- Displays four local courses with course codes.
- Shows each course's attendance percentage and progress percentage.
- Shows a progress bar for the selected course.
- Selecting a course displays its code, name, progress, attendance status, and next academic item.
- Attendance is conditionally presented as either “On track” or “Needs attention,” with different colors for attendance levels.

### Analytics Dashboard

The Analytics view uses `react-native-chart-kit` and displays two charts generated from the current application data:

1. A **BarChart** comparing course progress percentages for the four courses.
2. A **PieChart** showing the current split between completed and pending tasks.

The charts update when task completion changes or a new task is added.

## 3. Technologies Used

- Expo SDK 57
- React 19
- React Native 0.86
- JavaScript
- Expo Router for the application entry point
- `react-native-chart-kit` for the bar and pie charts
- `react-native-svg`, required by the chart library
- React Native built-in components such as `View`, `Text`, `Pressable`, `ScrollView`, `TextInput`, `SafeAreaView`, and `StyleSheet`
- ESLint with the Expo ESLint configuration

The project does not use a backend, database, authentication, Firebase, or external API.

## 4. React and JavaScript Concepts Demonstrated

- **Components:** The app is divided into components including `Card`, `SectionTitle`, `PriorityBadge`, `ProgressBar`, `TaskRow`, `CourseSummary`, and the four view components.
- **Props:** Reusable components receive values and callbacks through props, such as task data, course data, styles, and event handlers.
- **State/useState:** State stores the active view, current task list, task filter, form values, validation feedback, and selected course.
- **Events/event handlers:** `Pressable` controls handle view switching, task completion, filter changes, course selection, priority selection, and form submission. `TextInput` uses `onChangeText`.
- **Conditional rendering:** The app conditionally displays completed task styling, validation feedback, empty states, selected controls, and attendance status.
- **Arrays and objects:** Tasks, courses, filters, priorities, chart data, and style values are represented with JavaScript arrays and objects.
- **`map()`:** Arrays are mapped to render task rows, course rows, filter buttons, priority choices, navigation controls, and chart labels/data.
- **`filter()`:** Tasks are filtered for pending/completed counts, the selected task filter, and analytics totals.
- **Data-driven UI:** The task cards, course cards, progress bars, attendance colors, and charts are produced from the local data arrays rather than repeated hardcoded task/course markup.
- **Forms/input:** The Add Task form uses a controlled `TextInput` and selectable course and priority controls.
- **Validation:** The form checks `title.trim()` and displays an error message when the task title is empty.
- **Reusable components:** Common visual patterns such as cards, progress bars, task rows, badges, and section headings are implemented once and reused.

## 5. Application Structure

Important project files and folders include:

```text
StudyFlow/
├── src/
│   └── app/
│       ├── _layout.js    # Expo Router stack with the header hidden
│       └── index.js      # Main StudyFlow app, data, components, views, and styles
├── app.json              # Expo app configuration
├── package.json          # Dependencies and run scripts
├── package-lock.json     # Locked npm dependency versions
└── eslint.config.js      # Expo ESLint configuration
```

The application logic is currently kept in `src/app/index.js` to keep the assignment implementation simple. There are no separate screen files or data modules.

## 6. How to Run

Install dependencies from the project directory:

```powershell
cd C:\Users\D\StudyFlow
npm install
```

Start the Expo development server:

```powershell
npx expo start
```

To run a specific target, use:

```powershell
npm run android
npm run ios
npm run web
```

The project uses npm and the Expo Router entry configured in `package.json`. The `npx expo start` command is the general command for opening the Expo development server and selecting a device or platform.

## 7. Data

The current application uses local JavaScript arrays and objects for demonstration data:

- `initialTasks` contains the starting task list.
- `courses` contains course names, codes, attendance values, progress values, colors, and next items.
- `filters` and `priorities` contain the available form/filter choices.

Task changes are stored in React state while the app is running. There is no database or persistent storage, so added tasks and completion changes reset when the application reloads.

## 8. Screenshots / Demonstration

Screenshots added in the ZIP file.

## 9. AI-Assisted Development

AI coding assistance was used during development. The generated code was reviewed, tested, and adapted to match the assignment requirements and the current StudyFlow implementation.
