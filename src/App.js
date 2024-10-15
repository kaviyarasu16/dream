import React from "react";
import { Route, Routes } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import AdminDashboard from './components/AdminDashboard';
import VideoList from './components/VideoList';
import UserGroupCheck from './components/UserGroupCheck';
import '@aws-amplify/ui-react/styles.css';

const App = () => {
  return (
    <Authenticator>
      {({ signOut }) => (
        <div>
          <h1>DreamStream</h1>

          {/* This component will check the user group and route accordingly */}
          <UserGroupCheck />

          {/* Define the routes */}
          <Routes>
            <Route path="/admin" element={<AdminDashboard onLogout={signOut} />} />
            <Route path="/client" element={<VideoList onLogout={signOut} />} />
          </Routes>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
