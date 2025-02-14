import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4">
                    <h1 className="text-3xl font-bold mb-4 md:mb-0">SynergyStackCRM</h1>
                    <nav className="mb-4 md:mb-0">
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:underline">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:underline">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex space-x-4">
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 border border-white text-white font-semibold rounded hover:bg-white hover:text-blue-600"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Welcome to SynergyStackCRM
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Manage your customer relationships effortlessly with our cutting-edge CRM solution built on a modern tech stack.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/login"
                            className="mr-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-600 hover:text-white"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        About Us
                    </h3>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        SynergyStackCRM is a state-of-the-art Customer Relationship Management solution that integrates modern technologies to streamline your customer interactions. Our platform is designed for efficiency, scalability, and simplicity.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="bg-gray-100 py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Our Services
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
                            <h4 className="text-xl font-semibold mb-2">Lead Management</h4>
                            <p className="text-gray-600">
                                Efficiently track and manage your leads to optimize your sales funnel.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
                            <h4 className="text-xl font-semibold mb-2">Analytics</h4>
                            <p className="text-gray-600">
                                Gain insights into your customer data with robust analytics tools.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
                            <h4 className="text-xl font-semibold mb-2">Customer Engagement</h4>
                            <p className="text-gray-600">
                                Enhance your interactions and build strong customer relationships.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Contact Us
                    </h3>
                    <div className="max-w-xl mx-auto">
                        <form className="bg-white p-8 rounded shadow">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-semibold mb-2"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-semibold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Email"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-semibold mb-2"
                                    htmlFor="message"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Message"
                                    rows={4}
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} SynergyStackCRM. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
