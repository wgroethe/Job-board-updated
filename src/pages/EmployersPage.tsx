import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Zap, 
  Globe2, 
  CheckCircle2, 
  BarChart3,
  Building2,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { PricingSection } from '../components/PricingSection';

const benefits = [
  {
    icon: <Target className="w-12 h-12 text-rose-500" />,
    title: "Targeted Reach",
    description: "Connect directly with qualified aesthetic nurses and practitioners actively seeking opportunities."
  },
  {
    icon: <Zap className="w-12 h-12 text-rose-500" />,
    title: "Quick Hiring",
    description: "Fill positions faster with our streamlined application process and candidate matching."
  },
  {
    icon: <Globe2 className="w-12 h-12 text-rose-500" />,
    title: "National Exposure",
    description: "Reach aesthetic professionals across the country with featured listings."
  },
  {
    icon: <Building2 className="w-12 h-12 text-rose-500" />,
    title: "Brand Building",
    description: "Showcase your practice culture and values to attract the perfect candidates."
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-rose-500" />,
    title: "Direct Communication",
    description: "Engage with candidates directly through our integrated messaging system."
  },
  {
    icon: <Shield className="w-12 h-12 text-rose-500" />,
    title: "Quality Assurance",
    description: "All candidates are verified for proper licensing and certifications."
  }
];

const stats = [
  { number: "15k+", label: "Active Candidates" },
  { number: "94%", label: "Placement Rate" },
  { number: "48h", label: "Average Response Time" },
  { number: "1000+", label: "Partner Clinics" }
];

export function EmployersPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect Aesthetic Professional
          </h1>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Connect with qualified, passionate aesthetic nurses ready to join your practice
          </p>
          <Link 
            to="/signup" 
            className="btn btn-primary bg-white text-rose-500 hover:bg-rose-50 text-lg px-8 py-3 inline-block"
          >
            Post a Job Now
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose InjectorJobs?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The leading platform for aesthetic practices to find and hire top talent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-8 rounded-xl shadow-md">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Aesthetic Practices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop"
                  alt="Sarah Johnson"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-600 mb-4">
                    "InjectorJobs has transformed our hiring process. We found an exceptional lead injector within weeks of posting."
                  </p>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Director, Elite Medical Spa</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop"
                  alt="David Chen"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-600 mb-4">
                    "The quality of candidates we receive through InjectorJobs is consistently outstanding. Worth every penny."
                  </p>
                  <p className="font-semibold text-gray-900">David Chen</p>
                  <p className="text-sm text-gray-500">Owner, Radiance Aesthetics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <div className="bg-rose-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Candidate?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Join hundreds of aesthetic practices hiring through InjectorJobs
          </p>
          <Link 
            to="/signup" 
            className="btn bg-white text-rose-500 hover:bg-rose-50 text-lg px-8 py-3 inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </>
  );
}