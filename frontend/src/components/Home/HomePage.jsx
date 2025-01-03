import React from "react";
import {
  FaMoneyBillWave,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaQuoteLeft,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import ContactForm from "../Contact/ContactForm";

function Home() {
  return (
    <>
      <div className="bg-[#0F172A] text-white">
        {/* Hero Section */}
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-16">
            <div className="flex flex-col items-center text-center">
              <div className="space-y-6 max-w-3xl">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]">
                    Smart Finance
                  </span>
                  <span className="block mt-2 text-white">
                    Tracking Made Simple
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Take control of your financial future with our intelligent
                  expense tracking platform. Built for modern life, designed for
                  you.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">
                {[
                  {
                    icon: FaMoneyBillWave,
                    title: "Smart Tracking",
                    desc: "Automated expense categorization",
                  },
                  {
                    icon: IoIosStats,
                    title: "Real-time Insights",
                    desc: "Instant financial analytics",
                  },
                  {
                    icon: FaFilter,
                    title: "Custom Filters",
                    desc: "Personalized expense management",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="group p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <feature.icon className="text-3xl text-[#60A5FA] group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/register" className="mt-12">
                <button className="group relative px-8 py-4 bg-[#60A5FA] rounded-lg font-medium transition-all duration-300 hover:bg-[#3B82F6] focus:ring-2 focus:ring-[#60A5FA] focus:ring-offset-2 focus:ring-offset-[#0F172A]">
                  Start Free Trial
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 rounded-lg opacity-0 group-hover:opacity-20 bg-white"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* How it Works - Updated Design */}
        <div className="relative py-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#39248f] to-black text-gray-300"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#37f7c4] to-[#978db4]">
                Your Journey to Financial Freedom
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Three simple steps to transform your financial management
                experience
              </p>
            </div>

            <div className="relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] transform -translate-y-1/2"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {[
                  {
                    icon: FaSignInAlt,
                    title: "Create Account",
                    desc: "Sign up in seconds with our streamlined onboarding process",
                    step: "01",
                  },
                  {
                    icon: FaList,
                    title: "Connect & Track",
                    desc: "Link your accounts and start monitoring expenses automatically",
                    step: "02",
                  },
                  {
                    icon: FaChartPie,
                    title: "Gain Insights",
                    desc: "Access powerful analytics and personalized recommendations",
                    step: "03",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/20 to-[#A78BFA]/20 rounded-3xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="relative p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="absolute -top-6 left-8 bg-[#1E293B] px-4 py-2 rounded-xl border border-white/10">
                        <span className="text-sm font-bold text-[#60A5FA]">
                          {step.step}
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#60A5FA] to-[#A78BFA] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          <step.icon className="text-2xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="text-gray-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 px-4 bg-gradient-to-r from-[#0F172A] via-[#152f5a] to-[#0F172A] text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              User Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Freelancer",
                  quote:
                    "This app transformed how I manage my business expenses. The real-time insights are invaluable.",
                },
                {
                  name: "Michael Chen",
                  role: "Small Business Owner",
                  quote:
                    "Finally, an expense tracker that's both powerful and easy to use. It's become essential for my business.",
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] rounded-full flex items-center justify-center">
                      <FaQuoteLeft className="text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA - Updated Design */}
        <div className="relative py-32 px-4">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4229a7] to-black text-gray-400"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 text-center">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e1e3e4] to-[#717173]">
                  Start Your Financial Journey
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Join thousands of users who've already transformed their
                financial management. Your path to better finances starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] rounded-xl font-medium transition-all duration-300 hover:opacity-90 focus:ring-2 focus:ring-[#60A5FA] focus:ring-offset-2 focus:ring-offset-[#0F172A]">
                    Create Free Account
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 rounded-xl opacity-0 group-hover:opacity-20 bg-white"></span>
                  </button>
                </Link>
                <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  <button className="group px-8 py-4 bg-white/5 backdrop-blur-lg rounded-xl font-medium border border-white/10 hover:border-white/20 transition-all duration-300 focus:ring-2 focus:ring-[#60A5FA] focus:ring-offset-2 focus:ring-offset-[#0F172A]">
                    Watch Demo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </>
  );
}

export default Home;
