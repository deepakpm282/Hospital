import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Deptlist from './pages/Lists/Deptlist';
import DoctorList from './pages/Lists/Doctorlist';
import Adddoctor from './components/Doctor/Adddoctor';
import Doctorprofile from './components/Doctor/Doctorprofile';
import AddDept from './components/Hospital/AddDept';
import Appoint from './components/Tables/Appoint';
import DeptProfile from './components/Hospital/DeptProfile';
import EditDept from './components/Hospital/EditDept';
import EditDoctor from './components/Doctor/EditDoctor';

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
              <PageTitle title="NillQ Dashboard" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/pages/Dashboard/ECommerce"
          element={
            <>
              <ECommerce />
            </>
          }
        />
        <Route
        path="/components/Hospital/EditDept"
        element={
          <>
          <EditDept/>
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
          path="/Lists/Deptlist"
          element={
            <>
              <Deptlist />
            </>
          }
        />
                <Route
          path="/Lists/Doctorlist"
          element={
            <>
              <DoctorList />
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
          path="/components/Doctor/Adddoctor"
          element={
            <>
              <Adddoctor />
            </>
          }
        />
        <Route
          path="/components/Doctor/EditDoctor"
          element={
            <>
              <EditDoctor />
            </>
          }
        />
        <Route
          path="/components/Doctor/Doctorprofile"
          element={
            <>
              <Doctorprofile />
            </>
          }
        />
        <Route
        path='/components/Hospital/DeptProfile'
        element={
          <>
          <DeptProfile/>
          </>
        }
        />
        <Route
          path="/components/Hospital/AddDept"
          element={
            <>
              <AddDept />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route
          path="/components/Tables/Appoint"
          element={
            <>
              <Appoint />
            </>
          }
        />
      </Routes>
      
      
    </>
  );
}

export default App;