import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/hospitalDash';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DoctorsList from './pages/Lists/Doctorlist';
import Adddoctor from './components/Doctor/Adddoctor';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path="/pages/Lists/Doctorlist"
          element={
            <>
              <DoctorsList />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <Buttons />
            </>
          }
        />
        <Route
          path="/pages/Authentication/SignIn"
          element={
            <>
              <SignIn />
            </>
          }
        />

        <Route
          path="/components/Doctor/Adddoctor"
          element={
            <>
              <Adddoctor />
            </>
          }
        />
        <Route
          path="/pages/Authentication/SignUp"
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route
          path="/pages/Dashboard/adminDash"
          element={
            <>
              <Dashboard />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
