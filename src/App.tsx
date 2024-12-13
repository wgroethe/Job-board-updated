import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { JobPage } from './pages/JobPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { EmployersPage } from './pages/EmployersPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CommunityPage } from './pages/CommunityPage';
import { PostJobPage } from './pages/PostJobPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { EmployerDashboardPage } from './pages/EmployerDashboardPage';
import { EmployerSettingsPage } from './pages/EmployerSettingsPage';
import { ActiveJobsPage } from './pages/ActiveJobsPage';
import { AllApplicationsPage } from './pages/AllApplicationsPage';
import { NewApplicationsPage } from './pages/NewApplicationsPage';
import { ShortlistedPage } from './pages/ShortlistedPage';
import { InjectorDashboardPage } from './pages/InjectorDashboardPage';
import { InjectorProfilePage } from './pages/InjectorProfilePage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { InjectorApplicationsPage } from './pages/InjectorApplicationsPage';
import { SavedJobsPage } from './pages/SavedJobsPage';
import { InterviewsPage } from './pages/InterviewsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-rose-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="/jobs/:id/apply" element={<ApplicationPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/employers/dashboard" element={<EmployerDashboardPage />} />
        <Route path="/employers/settings" element={<EmployerSettingsPage />} />
        <Route path="/employers/active-jobs" element={<ActiveJobsPage />} />
        <Route path="/employers/applications" element={<AllApplicationsPage />} />
        <Route path="/employers/new-applications" element={<NewApplicationsPage />} />
        <Route path="/employers/shortlisted" element={<ShortlistedPage />} />
        <Route path="/employers/post-job" element={<PostJobPage />} />
        <Route path="/employers/success" element={<CheckoutSuccessPage />} />
        <Route path="/employers/company-profile" element={<CompanyProfilePage />} />
        <Route path="/injector/dashboard" element={<InjectorDashboardPage />} />
        <Route path="/injector/profile" element={<InjectorProfilePage />} />
        <Route path="/injector/applications" element={<InjectorApplicationsPage />} />
        <Route path="/injector/saved-jobs" element={<SavedJobsPage />} />
        <Route path="/injector/interviews" element={<InterviewsPage />} />
        <Route path="/injector/notifications" element={<NotificationsPage />} />
        <Route path="/injector/settings" element={<AccountSettingsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}