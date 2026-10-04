import React from 'react';
import { Routes, Route } from 'react-router-dom';

import KitDetails from './pages/KitDetails';

import AdminKits from './pages/admin/AdminKits';
import AdminKitForm from './pages/admin/AdminKitForm';



import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import ATLLabs from './pages/ATLLabs';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Kits from './pages/Kits';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminImages from './pages/admin/AdminImages';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProjectForm from './pages/admin/AdminProjectForm';
import AdminGallery from './pages/admin/AdminGallery';
// import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminResources from './pages/admin/AdminResources';
import AdminResourceForm from './pages/admin/AdminResourceForm';
import AdminImpact from './pages/admin/AdminImpact';
import AdminLeads from './pages/admin/AdminLeads';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <WhatsAppFloat />
  </>
);

function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
      <Route path="/atl-labs" element={<PublicLayout><ATLLabs /></PublicLayout>} />
      <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
      <Route path="/projects/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
      <Route path="/kits" element={<PublicLayout><Kits /></PublicLayout>} />
      <Route path="/kits/:slug" element={<PublicLayout><KitDetails /></PublicLayout>}/>
      <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
      <Route path="/resources/:slug" element={<PublicLayout><ResourceDetail /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/privacy-policy" element={<PublicLayout><Legal /></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><Legal /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="images" element={<AdminImages />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="projects/new" element={<AdminProjectForm />} />
        <Route path="projects/:id/edit" element={<AdminProjectForm />} />
        <Route path="gallery" element={<AdminGallery />} />
        {/* <Route path="testimonials" element={<AdminTestimonials />} /> */}
        <Route path="resources" element={<AdminResources />} />
        <Route path="resources/new" element={<AdminResourceForm />} />
        <Route path="resources/:id/edit" element={<AdminResourceForm />} />

        <Route path="kits" element={<AdminKits />} />
<Route path="kits/new" element={<AdminKitForm />} />
<Route path="kits/:id/edit" element={<AdminKitForm />} />


        <Route path="impact" element={<AdminImpact />} />
        <Route path="leads" element={<AdminLeads />} />
      </Route>

      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}

export default App;
