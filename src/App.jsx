import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SupplierPage from './pages/SupplierPage';
import BuyerPage from './pages/BuyerPage';
import MaterialDetailPage from './pages/MaterialDetailPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/supplier" element={<SupplierPage />} />
            <Route path="/buyer" element={<BuyerPage />} />
            <Route path="/material/:id" element={<MaterialDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={
              <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <div className="text-6xl mb-5">🚧</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-3">Page Not Found</h2>
                <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium inline-block">
                  Go Home
                </a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
