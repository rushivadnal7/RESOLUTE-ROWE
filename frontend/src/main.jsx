import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ShopContextProvider from './context/ShopContext.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const Main = () => {
  const [loading, setLoading] = useState(true);

  return (
    <StrictMode>
      <ShopContextProvider>
        {loading ? <LoadingScreen onComplete={() => setLoading(false)} /> : <App />}
      </ShopContextProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);
