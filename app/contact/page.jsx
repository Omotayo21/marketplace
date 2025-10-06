"use client";
import { useState } from "react";


import Footer from "../_components/Footer";
import Header from "../_components/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800  mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600  max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white  rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800  mb-4">
                  Get in Touch
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      value: "hello@agora.com",
                      href: "mailto:hello@agora.com",
                    },
                    {
                      icon: "📞",
                      label: "Phone",
                      value: "+234 9076930901",
                      href: "tel:+15551234567",
                    },
                    {
                      icon: "📍",
                      label: "Address",
                      value: "Lagos, Nigeria",
                      href: "#",
                    },
                    {
                      icon: "🕒",
                      label: "Hours",
                      value: "24hrs",
                      href: "#",
                    },
                  ].map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50  transition-colors duration-200"
                    >
                      <span className="text-2xl">{contact.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800  text-sm">
                          {contact.label}
                        </p>
                        <p className="text-gray-600  text-sm">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white  rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800  mb-4">
                  Quick Help (coming soon)
                </h3>
                <div className="space-y-2">
                  {[
                    "How to create a seller account?",
                    "What are the payment methods?",
                    "How to report a problem?",
                    "Community guidelines",
                  ].map((faq, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block p-2 text-blue-600  hover:text-blue-800  transition-colors duration-200 text-sm"
                    >
                      {faq}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white  rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700  mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50 "
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700  mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 text-black border border-gray-300  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50  "
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700  mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 text-black border border-gray-300  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50 "
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700  mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 text-black  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50  resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3a1e9d] text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
