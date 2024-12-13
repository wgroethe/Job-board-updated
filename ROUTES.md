# Application Routes

## Public Routes
- `/` - Home page (src/pages/HomePage.tsx)
- `/blog` - Blog listing (src/pages/BlogPage.tsx)
- `/blog/:slug` - Individual blog post (src/pages/BlogPostPage.tsx)
- `/community` - Community page (src/pages/CommunityPage.tsx)
- `/privacy` - Privacy policy (src/pages/PrivacyPolicyPage.tsx)
- `/terms` - Terms of service (src/pages/TermsPage.tsx)

## Authentication Routes
- `/login` - Login page (src/pages/auth/LoginPage.tsx)
- `/signup` - Sign up page (src/pages/auth/SignUpPage.tsx)
- `/forgot-password` - Password reset (src/pages/auth/ForgotPasswordPage.tsx)

## Job Routes
- `/jobs/:id` - Individual job listing (src/pages/JobPage.tsx)
- `/jobs/:id/apply` - Job application form (src/pages/ApplicationPage.tsx)

## Employer Routes
- `/employers` - Employer landing page (src/pages/EmployersPage.tsx)
- `/employers/dashboard` - Employer dashboard (src/pages/EmployerDashboardPage.tsx)
- `/employers/settings` - Account settings (src/pages/EmployerSettingsPage.tsx)
- `/employers/active-jobs` - Active job listings (src/pages/ActiveJobsPage.tsx)
- `/employers/applications` - All applications (src/pages/AllApplicationsPage.tsx)
- `/employers/new-applications` - New applications (src/pages/NewApplicationsPage.tsx)
- `/employers/shortlisted` - Shortlisted candidates (src/pages/ShortlistedPage.tsx)
- `/employers/post-job` - Post new job (src/pages/PostJobPage.tsx)
- `/employers/success` - Checkout success (src/pages/CheckoutSuccessPage.tsx)
- `/employers/company-profile` - Company profile (src/pages/CompanyProfilePage.tsx)

## Injector (Job Seeker) Routes
- `/injector/dashboard` - Injector dashboard (src/pages/InjectorDashboardPage.tsx)
- `/injector/profile` - Profile management (src/pages/InjectorProfilePage.tsx)
- `/injector/applications` - Application history (src/pages/InjectorApplicationsPage.tsx)
- `/injector/saved-jobs` - Saved jobs (src/pages/SavedJobsPage.tsx)
- `/injector/interviews` - Upcoming interviews (src/pages/InterviewsPage.tsx)
- `/injector/notifications` - Notifications (src/pages/NotificationsPage.tsx)
- `/injector/settings` - Account settings (src/pages/AccountSettingsPage.tsx)

## Route Configuration
All routes are defined in `src/App.tsx` using React Router. The application uses the following route structure:

```tsx
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<HomePage />} />
  <Route path="/jobs/:id" element={<JobPage />} />
  <Route path="/jobs/:id/apply" element={<ApplicationPage />} />
  <Route path="/employers" element={<EmployersPage />} />
  
  {/* Employer Routes */}
  <Route path="/employers/dashboard" element={<EmployerDashboardPage />} />
  <Route path="/employers/settings" element={<EmployerSettingsPage />} />
  <Route path="/employers/active-jobs" element={<ActiveJobsPage />} />
  <Route path="/employers/applications" element={<AllApplicationsPage />} />
  <Route path="/employers/new-applications" element={<NewApplicationsPage />} />
  <Route path="/employers/shortlisted" element={<ShortlistedPage />} />
  <Route path="/employers/post-job" element={<PostJobPage />} />
  <Route path="/employers/success" element={<CheckoutSuccessPage />} />
  <Route path="/employers/company-profile" element={<CompanyProfilePage />} />
  
  {/* Injector Routes */}
  <Route path="/injector/dashboard" element={<InjectorDashboardPage />} />
  <Route path="/injector/profile" element={<InjectorProfilePage />} />
  <Route path="/injector/applications" element={<InjectorApplicationsPage />} />
  <Route path="/injector/saved-jobs" element={<SavedJobsPage />} />
  <Route path="/injector/interviews" element={<InterviewsPage />} />
  <Route path="/injector/notifications" element={<NotificationsPage />} />
  <Route path="/injector/settings" element={<AccountSettingsPage />} />
  
  {/* Auth Routes */}
  <Route path="/signup" element={<SignUpPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  
  {/* Content Routes */}
  <Route path="/blog" element={<BlogPage />} />
  <Route path="/blog/:slug" element={<BlogPostPage />} />
  <Route path="/community" element={<CommunityPage />} />
  <Route path="/privacy" element={<PrivacyPolicyPage />} />
  <Route path="/terms" element={<TermsPage />} />
</Routes>
```

## Navigation
The main navigation is handled through the `Header` component (`src/components/Header.tsx`), which shows different navigation options based on user role and authentication status.

## Protected Routes
Protected routes require authentication and appropriate user role (employer/injector). These are managed through the routing configuration and authentication state.