import React from 'react';
import { Users, MessageSquare, Lightbulb, Award, BookOpen, Share2 } from 'lucide-react';

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

export function CommunitySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Join Our Injector Community?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect, learn, and grow with the largest community of aesthetic nursing professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

        <div className="text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join the Conversation?
            </h3>
            <p className="text-gray-600 mb-6">
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
        </div>
      </div>
    </section>
  );
}