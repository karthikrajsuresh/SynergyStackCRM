// src/pages/HomePage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    // Contact form state
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    // Handle contact form submission
    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Contact Form Data:", {
            name: contactName,
            email: contactEmail,
            message: contactMessage,
        });
        // Clear form fields after submission
        setContactName("");
        setContactEmail("");
        setContactMessage("");
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4">
                    <h1 className="text-4xl font-extrabold mb-4 md:mb-0">SynergyStackCRM</h1>
                    <div className="flex space-x-4">
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl font-extrabold text-gray-800">
                        Welcome to SynergyStackCRM
                    </h2>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                        Manage your customer relationships effortlessly with our cutting-edge CRM solution—designed for efficiency, scalability, and simplicity.
                    </p>
                    <div className="mt-10 flex justify-center gap-6">
                        <Link
                            to="/login"
                            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-8 py-4 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20">
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        About Us
                    </h3>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto text-lg">
                        SynergyStackCRM is a state-of-the-art Customer Relationship Management solution that integrates modern technologies to streamline your customer interactions. Our platform helps you stay organized, make data-driven decisions, and grow your business with confidence.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="bg-gray-100 py-20">
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        Our Services
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-2xl font-semibold mb-3">Lead Management</h4>
                            <p className="text-gray-600 text-lg">
                                Efficiently track and manage your leads to optimize your sales funnel and drive conversions.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-2xl font-semibold mb-3">Analytics</h4>
                            <p className="text-gray-600 text-lg">
                                Gain valuable insights into your customer data with robust analytics and reporting tools.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-2xl font-semibold mb-3">Customer Engagement</h4>
                            <p className="text-gray-600 text-lg">
                                Enhance interactions and build strong relationships with personalized customer engagement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        Contact Us
                    </h3>
                    <div className="max-w-xl mx-auto">
                        <form onSubmit={handleContactSubmit} className="bg-white p-8 rounded-lg shadow-xl">
                            <div className="mb-6">
                                <label
                                    htmlFor="contactName"
                                    className="block text-gray-700 font-semibold mb-2 text-lg"
                                >
                                    Name
                                </label>
                                <input
                                    id="contactName"
                                    type="text"
                                    placeholder="Your Name"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="contactEmail"
                                    className="block text-gray-700 font-semibold mb-2 text-lg"
                                >
                                    Email
                                </label>
                                <input
                                    id="contactEmail"
                                    type="email"
                                    placeholder="Your Email"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="contactMessage"
                                    className="block text-gray-700 font-semibold mb-2 text-lg"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contactMessage"
                                    placeholder="Your Message"
                                    value={contactMessage}
                                    onChange={(e) => setContactMessage(e.target.value)}
                                    rows={4}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg p-4 text-center mt-auto">
                <p className="text-sm">&copy; {(new Date().getFullYear())} <a href="https://github.com/karthikrajsuresh/SynergyStackCRM" target="_blank"><strong>SynergyStackCRM </strong></a></p>
                <p className="text-sm" >Developed by <a href="https://github.com/karthikrajsuresh" target="_blank"><strong>Karthik Raj</strong></a></p>
            </footer>
        </div>
    );
};

export default HomePage;
