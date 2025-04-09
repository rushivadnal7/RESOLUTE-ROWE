import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ShopContextProvider from './context/ShopContext.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import { HelmetProvider } from 'react-helmet-async';


const Main = () => {
  const [loading, setLoading] = useState(true);

  return (
    <StrictMode>
      <HelmetProvider>
        <ShopContextProvider>
          {loading ? <LoadingScreen onComplete={() => setLoading(false)} /> : <App />}
        </ShopContextProvider>
      </HelmetProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);
