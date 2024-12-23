import React from "react";
import { Link } from "react-router-dom";
function About() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-200 py-16 mt-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Empowering possibilities and creating innovative solutions since our inception.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                At{" "}
                <span className="font-semibold text-pink-500">
                  NextWave Innovations
                </span>
                , our mission is to deliver cutting-edge solutions that help
                businesses grow, innovate, and succeed. We strive to create an
                impact that empowers individuals and organizations to achieve
                their goals effortlessly.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What We Offer
              </h2>
              <ul className="list-disc pl-5 text-gray-700 text-lg mt-4 space-y-2">
                <li>Customized solutions tailored to your needs</li>
                <li>Comprehensive support and maintenance services</li>
                <li>Innovative technologies to simplify complex problems</li>
                <li>Scalable systems for businesses of all sizes</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Why Choose Us
              </h2>
              <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                With a dedicated team of experts, state-of-the-art technology,
                and a customer-first approach, we ensure your satisfaction and
                success. Join us on our journey to redefine excellence.
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center">
            <img
              src="https://i.pinimg.com/736x/a3/24/fc/a324fc78b051a18ba0c4129d0bf04b72.jpg"
              alt="About Us"
              className="rounded-2xl shadow-lg w-full max-w-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Harsh Singh Baghel", role: "CEO", img: "CEO.jpeg" },
              { name: "Hitendra Panwar", role: "CTO", img: "Hit.jpeg" },
              { name: "Kushal Sahu", role: "Lead Designer", img: "KUs.jpeg" },
              { name: "Dipendra Kushwaha", role: "Marketing Head", img: "Dip.jpeg" },
              { name: "Harshdeep Pawar", role: "Developer", img: "ha.jpeg" },
              { name: "Kritagya Jaiswal", role: "Product Manager", img: "Kit.jpeg" },
            ].map((teamMember) => (
              <div
                key={teamMember.name}
                className="text-center bg-white p-6 rounded-2xl shadow-md transform hover:-translate-y-2 transition-transform duration-300"
              >
                <img
                  src={teamMember.img}
                  alt={teamMember.name}
                  className="w-32 h-32 mx-auto rounded-full mb-6"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {teamMember.name}
                </h3>
                <p className="text-blue-600 font-semibold">{teamMember.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 rounded-2xl shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Let us help you take your business to the next level. Contact us today to get started.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300">
            <Link to='/request'>
              Get in Touch
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;
