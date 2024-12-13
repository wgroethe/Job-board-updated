import React from 'react';
import { Users, MessageSquare, Lightbulb, Award, BookOpen, Share2, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: <Users className="w-8 h-8 text-rose-500" />,
    title: "Network with Peers",
    description: "Connect with fellow aesthetic nurses and practitioners across the globe"
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-rose-500" />,
    title: "Expert Discussions",
    description: "Engage in meaningful conversations about techniques, patient care, and industry trends"
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-rose-500" />,
    title: "Share Knowledge",
    description: "Learn from experienced professionals and share your own insights"
  },
  {
    icon: <Award className="w-8 h-8 text-rose-500" />,
    title: "Professional Growth",
    description: "Access resources and opportunities for career advancement"
  },
  {
    icon: <BookOpen className="w-8 h-8 text-rose-500" />,
    title: "Educational Content",
    description: "Stay updated with the latest techniques, products, and industry standards"
  },
  {
    icon: <Share2 className="w-8 h-8 text-rose-500" />,
    title: "Collaborative Support",
    description: "Get advice, mentorship, and support from a community that understands your journey"
  }
];

export function CommunityPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Injector Community
          </h1>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Connect with thousands of aesthetic professionals, share knowledge, and grow your career
          </p>
          <a
            href="https://www.discourse.org/index"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn bg-white text-rose-500 hover:bg-rose-50 text-lg px-8 py-3"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">10k+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Daily Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Expert Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Community Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Our Community?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect, learn, and grow with the largest community of aesthetic nursing professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Join the Conversation?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of aesthetic professionals who are already part of our thriving community. Share experiences, ask questions, and grow together.
          </p>
          <a
            href="https://www.discourse.org/index"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 btn btn-primary px-8 py-3 text-lg"
          >
            <Users className="w-5 h-5" />
            Join Our Community
          </a>
        </div>
      </section>
    </>
  );
}