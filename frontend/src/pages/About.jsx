import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-10">
          ABOUT <span className="text-gray-900 font-bold">US</span>
        </h1>

        {/* About Section */}
        <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
          {/* Image */}
          <img
            src={assets.about_img}
            alt="about"
            className="w-full md:w-[300px] rounded"
          />

          {/* Text */}
          <div className="text-medium text-gray-600 space-y-4 leading-relaxed">
            <p>
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>

            <p>
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service.
            </p>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Our Vision</h3>
              <p>
                Our vision at Prescripto is to create a seamless healthcare
                experience for every user. We aim to bridge the gap between
                patients and healthcare providers, making it easier for you to
                access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            WHY CHOOSE US
          </h2>

          <div className="grid md:grid-cols-3 border">
            {/* Box 1 */}
            <div className="p-6 border">
              <h3 className="font-semibold text-gray-800 mb-2">Efficiency</h3>
              <p className="text-sm text-gray-600">
                Streamlined appointment scheduling that fits into your busy
                lifestyle.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 border">
              <h3 className="font-semibold text-gray-800 mb-2">Convenience</h3>
              <p className="text-sm text-gray-600">
                Access to a network of trusted healthcare professionals in your
                area.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 border">
              <h3 className="font-semibold text-gray-800 mb-2">
                Personalization
              </h3>
              <p className="text-sm text-gray-600">
                Tailored recommendations and reminders to help you stay on top
                of your health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
