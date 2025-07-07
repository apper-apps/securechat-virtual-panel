import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import ChatList from '@/components/pages/ChatList';
import ChatView from '@/components/pages/ChatView';
import ContactList from '@/components/pages/ContactList';
import Settings from '@/components/pages/Settings';
import Login from '@/components/pages/Login';
import TwoFactorSetup from '@/components/pages/TwoFactorSetup';
import { AuthProvider, useAuth } from '@/services/auth/AuthContext';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Login />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-background text-text-primary">
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/2fa-setup" element={<TwoFactorSetup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<ChatList />} />
            <Route path="/chat/:chatId" element={<ChatView />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/2fa-setup" element={<TwoFactorSetup />} />
          </Routes>
        </Layout>
      )}
<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;