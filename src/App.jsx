import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import ChatList from '@/components/pages/ChatList';
import ChatView from '@/components/pages/ChatView';
import ContactList from '@/components/pages/ContactList';
import Settings from '@/components/pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text-primary">
        <Layout>
          <Routes>
            <Route path="/" element={<ChatList />} />
            <Route path="/chat/:chatId" element={<ChatView />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
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
    </Router>
  );
}

export default App;