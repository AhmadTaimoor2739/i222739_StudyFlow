import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

const COLORS = {
  background: "#F5F7FB",
  card: "#FFFFFF",
  ink: "#17213A",
  muted: "#68738A",
  primary: "#5B5CE2",
  primaryLight: "#ECECFF",
  green: "#28A879",
  greenLight: "#E6F7F0",
  orange: "#ED9B3A",
  orangeLight: "#FFF3E1",
  red: "#E46666",
  redLight: "#FDECEC",
  border: "#E5E8F0",
};

const initialTasks = [
  {
    id: 1,
    title: "Finish research proposal",
    course: "Software Engineering",
    dueDate: "Today",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Revise calculus problem set",
    course: "Calculus II",
    dueDate: "Tomorrow",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Read UX design chapter",
    course: "Human Computer Interaction",
    dueDate: "Oct 08",
    priority: "Low",
    completed: false,
  },
  {
    id: 4,
    title: "Submit mobile app wireframes",
    course: "Software Engineering",
    dueDate: "Oct 10",
    priority: "High",
    completed: true,
  },
  {
    id: 5,
    title: "Prepare statistics quiz notes",
    course: "Statistics",
    dueDate: "Oct 12",
    priority: "Medium",
    completed: true,
  },
];

const courses = [
  {
    id: 1,
    name: "Software Engineering",
    code: "SWE 301",
    attendance: 92,
    progress: 76,
    next: "Group demo on Friday",
    color: "#5B5CE2",
  },
  {
    id: 2,
    name: "Calculus II",
    code: "MAT 204",
    attendance: 84,
    progress: 61,
    next: "Problem set 4 due tomorrow",
    color: "#28A879",
  },
  {
    id: 3,
    name: "Human Computer Interaction",
    code: "CSE 315",
    attendance: 72,
    progress: 48,
    next: "Usability lab next week",
    color: "#ED9B3A",
  },
  {
    id: 4,
    name: "Statistics",
    code: "STA 202",
    attendance: 96,
    progress: 83,
    next: "Quiz results available",
    color: "#E46666",
  },
];

const filters = ["All", "Pending", "Completed"];
const priorities = ["Low", "Medium", "High"];

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function SectionTitle({ title, action, onAction }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <Pressable onPress={onAction}>
          <Text style={styles.link}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

function PriorityBadge({ priority }) {
  const palette =
    priority === "High"
      ? [COLORS.redLight, COLORS.red]
      : priority === "Medium"
        ? [COLORS.orangeLight, COLORS.orange]
        : [COLORS.greenLight, COLORS.green];
  return (
    <Text
      style={[styles.badge, { backgroundColor: palette[0], color: palette[1] }]}
    >
      {priority}
    </Text>
  );
}

function ProgressBar({ value, color = COLORS.primary }) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${value}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

function TaskRow({ task, onToggle }) {
  return (
    <Pressable style={styles.taskRow} onPress={() => onToggle(task.id)}>
      <View style={[styles.check, task.completed && styles.checked]}>
        {task.completed && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <View style={styles.taskDetails}>
        <Text
          style={[styles.taskTitle, task.completed && styles.completedText]}
        >
          {task.title}
        </Text>
        <Text style={styles.taskMeta}>
          {task.course} · Due {task.dueDate}
        </Text>
      </View>
      <PriorityBadge priority={task.priority} />
    </Pressable>
  );
}

function CourseSummary({ course, onSelect }) {
  const attendanceColor =
    course.attendance < 75
      ? COLORS.red
      : course.attendance < 85
        ? COLORS.orange
        : COLORS.green;
  return (
    <Pressable style={styles.courseSummary} onPress={() => onSelect(course)}>
      <View
        style={[styles.courseIcon, { backgroundColor: `${course.color}18` }]}
      >
        <Text style={{ color: course.color, fontWeight: "800" }}>
          {course.name.charAt(0)}
        </Text>
      </View>
      <View style={styles.courseSummaryBody}>
        <Text style={styles.courseName} numberOfLines={1}>
          {course.name}
        </Text>
        <Text style={styles.courseCode}>{course.code}</Text>
        <ProgressBar value={course.progress} color={course.color} />
      </View>
      <Text style={[styles.percent, { color: attendanceColor }]}>
        {course.progress}%
      </Text>
    </Pressable>
  );
}

function HomeView({ tasks, onOpenTasks, onSelectCourse }) {
  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);
  return (
    <View>
      <Text style={styles.eyebrow}>SATURDAY, OCTOBER 03</Text>
      <Text style={styles.greeting}>
        Good afternoon, Ahmed <Text>👋</Text>
      </Text>
      <Text style={styles.subtitle}>Keep your momentum going.</Text>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{pending.length}</Text>
          <Text style={styles.statLabel}>Pending tasks</Text>
          <Text style={styles.statAccent}>Needs attention</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{completed.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={[styles.statAccent, { color: COLORS.green }]}>
            Great progress
          </Text>
        </Card>
      </View>

      <SectionTitle
        title="Upcoming tasks"
        action="View all"
        onAction={onOpenTasks}
      />
      <Card>
        {pending.slice(0, 3).map((task) => (
          <TaskRow key={task.id} task={task} onToggle={() => {}} />
        ))}
      </Card>

      <SectionTitle title="Course progress" />
      <Card>
        {courses.slice(0, 3).map((course) => (
          <CourseSummary
            key={course.id}
            course={course}
            onSelect={onSelectCourse}
          />
        ))}
      </Card>
    </View>
  );
}

function TasksView({ tasks, onToggle }) {
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(courses[0].name);
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");
  const visibleTasks = tasks.filter(
    (task) =>
      filter === "All" ||
      (filter === "Completed" ? task.completed : !task.completed),
  );

  function addTask() {
    if (!title.trim()) {
      setMessage("Please enter a task title before adding it.");
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      course,
      dueDate: "No date",
      priority,
      completed: false,
    };
    // The parent owns the array; this event is passed through the custom event below.
    onToggle(newTask);
    setTitle("");
    setMessage("Task added to your pending list.");
  }

  return (
    <View>
      <Text style={styles.screenTitle}>Tasks</Text>
      <Text style={styles.subtitle}>
        Stay on top of your academic workload.
      </Text>
      <View style={styles.filterRow}>
        {filters.map((item) => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <Card style={styles.formCard}>
        <Text style={styles.formTitle}>Add a task</Text>
        <TextInput
          value={title}
          onChangeText={(value) => {
            setTitle(value);
            setMessage("");
          }}
          placeholder="e.g. Review lecture slides"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Course</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.choiceRow}
        >
          {courses.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setCourse(item.name)}
              style={[
                styles.choice,
                course === item.name && styles.selectedChoice,
              ]}
            >
              <Text
                style={[
                  styles.choiceText,
                  course === item.name && styles.selectedChoiceText,
                ]}
              >
                {item.code}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.inputLabel}>Priority</Text>
        <View style={styles.choiceRow}>
          {priorities.map((item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item)}
              style={[
                styles.choice,
                priority === item && styles.selectedChoice,
              ]}
            >
              <Text
                style={[
                  styles.choiceText,
                  priority === item && styles.selectedChoiceText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.primaryButton} onPress={addTask}>
          <Text style={styles.primaryButtonText}>+ Add task</Text>
        </Pressable>
        {message ? (
          <Text
            style={[
              styles.feedback,
              message.includes("Please") && styles.errorText,
            ]}
          >
            {message}
          </Text>
        ) : null}
      </Card>
      <SectionTitle title={`${filter} tasks`} />
      <Card>
        {visibleTasks.length ? (
          visibleTasks.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={onToggle} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.subtitle}>
              Try another filter or add a new task.
            </Text>
          </View>
        )}
      </Card>
    </View>
  );
}

function CoursesView({ onSelect }) {
  const [selected, setSelected] = useState(courses[0]);
  function selectCourse(course) {
    setSelected(course);
    if (onSelect) onSelect(course);
  }
  return (
    <View>
      <Text style={styles.screenTitle}>Courses</Text>
      <Text style={styles.subtitle}>A quick look at your semester.</Text>
      <Card style={styles.selectedCourse}>
        <View style={styles.selectedCourseHeader}>
          <View>
            <Text style={styles.courseCode}>{selected.code}</Text>
            <Text style={styles.selectedCourseName}>{selected.name}</Text>
          </View>
          <Text style={styles.bigProgress}>{selected.progress}%</Text>
        </View>
        <Text style={styles.inputLabel}>Course progress</Text>
        <ProgressBar value={selected.progress} color={selected.color} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Attendance</Text>
          <Text
            style={[
              styles.detailValue,
              { color: selected.attendance < 75 ? COLORS.red : COLORS.green },
            ]}
          >
            {selected.attendance}% ·{" "}
            {selected.attendance < 75 ? "Needs attention" : "On track"}
          </Text>
        </View>
        <Text style={styles.nextLabel}>Next up</Text>
        <Text style={styles.nextText}>{selected.next}</Text>
      </Card>
      <SectionTitle title="All courses" />
      {courses.map((course) => (
        <Pressable
          key={course.id}
          onPress={() => selectCourse(course)}
          style={[
            styles.courseListItem,
            selected.id === course.id && styles.selectedListItem,
          ]}
        >
          <View style={[styles.courseDot, { backgroundColor: course.color }]} />
          <View style={styles.courseListBody}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseCode}>{course.code}</Text>
          </View>
          <View style={styles.attendanceBox}>
            <Text
              style={{
                color:
                  course.attendance < 75
                    ? COLORS.red
                    : course.attendance < 85
                      ? COLORS.orange
                      : COLORS.green,
                fontWeight: "800",
              }}
            >
              {course.attendance}%
            </Text>
            <Text style={styles.courseCode}>attendance</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

function AnalyticsView({ tasks }) {
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(width - 48, 280);
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const chartConfig = {
    backgroundColor: COLORS.card,
    backgroundGradientFrom: COLORS.card,
    backgroundGradientTo: COLORS.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(91, 92, 226, ${opacity})`,
    labelColor: () => COLORS.muted,
    propsForDots: { r: "5" },
  };
  return (
    <View>
      <Text style={styles.screenTitle}>Analytics</Text>
      <Text style={styles.subtitle}>See where your study effort is going.</Text>
      <Card>
        <Text style={styles.chartTitle}>Progress by course</Text>
        <Text style={styles.chartCaption}>
          Completion percentage across your courses
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: courses.map((course) => course.code),
              datasets: [{ data: courses.map((course) => course.progress) }],
            }}
            width={Math.max(chartWidth, 360)}
            height={220}
            yAxisSuffix="%"
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars
            style={styles.chart}
          />
        </ScrollView>
      </Card>
      <Card>
        <Text style={styles.chartTitle}>Task completion</Text>
        <Text style={styles.chartCaption}>Your current task split</Text>
        <PieChart
          data={[
            {
              name: "Completed",
              population: completedCount,
              color: COLORS.green,
              legendFontColor: COLORS.ink,
              legendFontSize: 13,
            },
            {
              name: "Pending",
              population: pendingCount,
              color: COLORS.orange,
              legendFontColor: COLORS.ink,
              legendFontSize: 13,
            },
          ]}
          width={chartWidth}
          height={190}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      </Card>
    </View>
  );
}

export default function StudyFlowApp() {
  const [activeView, setActiveView] = useState("Home");
  const [tasks, setTasks] = useState(initialTasks);
  const taskHandler = (taskOrId) => {
    if (typeof taskOrId === "object")
      setTasks((current) => [taskOrId, ...current]);
    else
      setTasks((current) =>
        current.map((task) =>
          task.id === taskOrId ? { ...task, completed: !task.completed } : task,
        ),
      );
  };
  const views = useMemo(
    () => ({
      Home: (
        <HomeView
          tasks={tasks}
          onOpenTasks={() => setActiveView("Tasks")}
          onSelectCourse={() => setActiveView("Courses")}
        />
      ),
      Tasks: <TasksView tasks={tasks} onToggle={taskHandler} />,
      Courses: <CoursesView />,
      Analytics: <AnalyticsView tasks={tasks} />,
    }),
    [tasks],
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>
            Study<Text style={{ color: COLORS.primary }}>Flow</Text>
          </Text>
          <Text style={styles.headerSubtitle}>ACADEMIC PLANNER</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>
      <View style={styles.topNav}>
        {["Home", "Tasks", "Courses", "Analytics"].map((view) => (
          <Pressable
            key={view}
            onPress={() => setActiveView(view)}
            style={[styles.navButton, activeView === view && styles.activeNav]}
          >
            <Text
              style={[
                styles.navText,
                activeView === view && styles.activeNavText,
              ]}
            >
              {view}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {views[activeView]}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingBottom: 100 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: COLORS.ink,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -1,
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: COLORS.primary, fontSize: 16, fontWeight: "800" },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  greeting: {
    color: COLORS.ink,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  screenTitle: {
    color: COLORS.ink,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginTop: 6,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 22,
  },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 26 },
  statCard: { flex: 1, padding: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#28304D",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statNumber: { color: COLORS.ink, fontSize: 28, fontWeight: "900" },
  statLabel: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  statAccent: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: COLORS.ink, fontSize: 18, fontWeight: "800" },
  link: { color: COLORS.primary, fontSize: 13, fontWeight: "700" },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 10,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#C9CEDB",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  checkMark: { color: "#FFF", fontSize: 13, fontWeight: "900" },
  taskDetails: { flex: 1 },
  taskTitle: { color: COLORS.ink, fontSize: 14, fontWeight: "700" },
  completedText: { textDecorationLine: "line-through", color: COLORS.muted },
  taskMeta: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "800",
    overflow: "hidden",
  },
  courseSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  courseIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  courseSummaryBody: { flex: 1 },
  courseName: { color: COLORS.ink, fontSize: 13, fontWeight: "700" },
  courseCode: { color: COLORS.muted, fontSize: 11, marginTop: 3 },
  percent: { fontSize: 13, fontWeight: "800" },
  progressTrack: {
    height: 7,
    borderRadius: 5,
    backgroundColor: "#EEF0F5",
    overflow: "hidden",
    marginTop: 8,
  },
  progressFill: { height: "100%", borderRadius: 5 },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 18 },
  filterButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: "#E9ECF3",
  },
  activeFilter: { backgroundColor: COLORS.primary },
  filterText: { color: COLORS.muted, fontSize: 12, fontWeight: "700" },
  activeFilterText: { color: "#FFF" },
  formCard: { padding: 18 },
  formTitle: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    color: COLORS.ink,
    fontSize: 14,
  },
  inputLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 8,
  },
  choiceRow: { flexDirection: "row", gap: 8 },
  choice: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedChoice: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  choiceText: { color: COLORS.muted, fontSize: 11, fontWeight: "700" },
  selectedChoiceText: { color: COLORS.primary },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 13,
    alignItems: "center",
    marginTop: 18,
  },
  primaryButtonText: { color: "#FFF", fontWeight: "800", fontSize: 14 },
  feedback: {
    color: COLORS.green,
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  errorText: { color: COLORS.red },
  emptyState: { alignItems: "center", paddingVertical: 24 },
  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    textAlign: "center",
    paddingTop: 10,
    backgroundColor: COLORS.greenLight,
    color: COLORS.green,
    fontSize: 20,
    fontWeight: "900",
  },
  emptyTitle: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 12,
  },
  selectedCourse: { marginTop: 10 },
  selectedCourseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  selectedCourseName: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: "900",
    maxWidth: 240,
    marginTop: 5,
  },
  bigProgress: { color: COLORS.primary, fontSize: 28, fontWeight: "900" },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 18,
    paddingTop: 14,
  },
  detailLabel: { color: COLORS.muted, fontSize: 12 },
  detailValue: { fontSize: 12, fontWeight: "800" },
  nextLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 18,
  },
  nextText: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  courseListItem: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedListItem: { borderColor: COLORS.primary },
  courseDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  courseListBody: { flex: 1 },
  attendanceBox: { alignItems: "flex-end" },
  chartTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800" },
  chartCaption: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  chart: { marginTop: 14, borderRadius: 12 },
  topNav: {
    marginHorizontal: 16,
    marginBottom: 4,
    padding: 4,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  activeNav: { backgroundColor: COLORS.primaryLight },
  navText: { color: COLORS.muted, fontSize: 11, fontWeight: "700" },
  activeNavText: { color: COLORS.primary },
});
