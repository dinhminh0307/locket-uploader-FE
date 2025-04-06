import './App.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './_forms/Login/LoginForm'
import UploadForm from './components/Upload/Upload'
import { Provider } from 'react-redux'
import { store } from './store'
import { useAppSelector } from './store/hooks'
import Footer from './components/Footer/Footer'

// This component will decide what to show based on auth state
function AppContent() {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  
  return (
    <>
      <Navbar />
      <div className="content-container">
        {isAuthenticated ? <UploadForm /> : <LoginForm />}
      </div>
      <Footer />
    </>
  );
}

// Main App component with Redux Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App