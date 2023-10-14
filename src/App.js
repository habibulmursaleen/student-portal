import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouteAdmin from "./components/routes/PrivateRouteAdmin";
import PrivateRouteStudent from "./components/routes/PrivateRouteStudent";
import PublicRouteAdmin from "./components/routes/PublicRouteAdmin";
import PublicRouteStudent from "./components/routes/PublicRouteStudent";

import useAuthCheck from "./hooks/useAuthCheck";

import AdminLogin from "./pages/AdminDashboard/AdminLogin";
import Assignment from "./pages/AdminDashboard/Assignment";
import AssignmentMark from "./pages/AdminDashboard/AssignmentMark";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import Quizzes from "./pages/AdminDashboard/Quizzes";
import Videos from "./pages/AdminDashboard/Videos";

import LoadingPage from "./components/LoadingPage";
import CoursePlayer from "./pages/StudentPortal/CoursePlayer";
import Leaderboard from "./pages/StudentPortal/Leaderboard";
import Quiz from "./pages/StudentPortal/Quiz";
import StudentLogin from "./pages/StudentPortal/StudentLogin";
import StudentReistration from "./pages/StudentPortal/StudentReistration";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRouteStudent>
              <LoadingPage />
            </PublicRouteStudent>
          }
        />

        <Route
          path="/student"
          element={
            <PublicRouteStudent>
              <StudentLogin />
            </PublicRouteStudent>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRouteStudent>
              <StudentReistration />
            </PublicRouteStudent>
          }
        />

        <Route
          path="/admin"
          element={
            <PublicRouteAdmin>
              <AdminLogin />
            </PublicRouteAdmin>
          }
        />
        <Route
          path="/videos/:videoId"
          element={
            <PrivateRouteStudent>
              <CoursePlayer />
            </PrivateRouteStudent>
          }
        />
        <Route
          path="/student/leaderboard/:studentid"
          element={
            <PrivateRouteStudent>
              <Leaderboard />
            </PrivateRouteStudent>
          }
        />
        <Route
          path="/videos/:videoId/quiz"
          element={
            <PrivateRouteStudent>
              <Quiz />
            </PrivateRouteStudent>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <PrivateRouteAdmin>
              <Videos />
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/admin/quizzes"
          element={
            <PrivateRouteAdmin>
              <Quizzes />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRouteAdmin>
              <Dashboard />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <PrivateRouteAdmin>
              <Assignment />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/assignmentmark"
          element={
            <PrivateRouteAdmin>
              <AssignmentMark />
            </PrivateRouteAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
