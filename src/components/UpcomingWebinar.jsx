// 'use client';

// import { useState } from 'react';
// import { FaCalendarAlt, FaClock, FaUser, FaChalkboardTeacher } from 'react-icons/fa';

// const UpcomingWebinar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: ''
//   });

//   // Mock webinar data - in a real application this would come from an API or CMS
//   const webinar = {
//     title: "Master the Art of Technical Analysis",
//     description: "Join our expert traders for an in-depth session on how to use technical indicators and chart patterns to make better trading decisions in volatile markets.",
//     date: "June 15, 2023",
//     time: "6:00 PM - 7:30 PM IST",
//     host: "Rajiv Sharma",
//     hostDesignation: "Senior Market Analyst"
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the data to your backend
//     alert(`Thank you for registering, ${formData.name}! We'll send confirmation details to ${formData.email}.`);
//     setShowModal(false);
//     setFormData({ name: '', email: '', phone: '' });
//   };

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-800">Upcoming Webinar</h2>
//           <div className="w-24 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Enhance your trading knowledge with our free educational webinars hosted by industry experts.
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="md:flex">
//             {/* Left side - Webinar date display with gradient background */}
//             <div className="md:w-2/5 relative h-64 md:h-auto">
//               <div className="h-full w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800">
//                 <div className="absolute inset-0 flex items-center justify-center p-6">
//                   <div className="text-white text-center">
//                     <div className="text-5xl font-bold mb-2">{webinar.date.split(' ')[1]}</div>
//                     <div className="text-2xl uppercase">{webinar.date.split(' ')[0]}</div>
//                     <div className="mt-4 text-xl">{webinar.time}</div>
//                     <div className="mt-8 bg-white text-blue-600 py-2 px-4 rounded-lg inline-block font-semibold">
//                       FREE WEBINAR
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right side - Webinar details */}
//             <div className="md:w-3/5 p-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">{webinar.title}</h3>
//               <p className="text-gray-600 mb-6">{webinar.description}</p>
              
//               <div className="space-y-3 mb-8">
//                 <div className="flex items-center">
//                   <FaCalendarAlt className="text-blue-600 mr-3" />
//                   <span className="text-gray-700">{webinar.date}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaClock className="text-blue-600 mr-3" />
//                   <span className="text-gray-700">{webinar.time}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaChalkboardTeacher className="text-blue-600 mr-3" />
//                   <span className="text-gray-700">Speaker: {webinar.host}, {webinar.hostDesignation}</span>
//                 </div>
//               </div>

//               <button 
//                 onClick={() => setShowModal(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-300"
//               >
//                 Register Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Registration modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
//               <button 
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
              
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Register for the Webinar</h3>
//               <p className="text-gray-600 mb-6">Fill out the form below to reserve your spot for "{webinar.title}"</p>
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300"
//                 >
//                   Confirm Registration
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default UpcomingWebinar; 


'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaChalkboardTeacher } from 'react-icons/fa';

const UpcomingWebinar = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const webinar = {
    title: "Master the Art of Technical Analysis",
    description: "Join our expert traders for an in-depth session on how to use technical indicators and chart patterns to make better trading decisions in volatile markets.",
    date: "June 15, 2023",
    time: "6:00 PM - 7:30 PM IST",
    host: "Rajiv Sharma",
    hostDesignation: "Senior Market Analyst"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for registering, ${formData.name}! We'll send confirmation details to ${formData.email}.`);
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Upcoming Webinar</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enhance your trading knowledge with our free educational webinars hosted by industry experts.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left side - Webinar date display with IMAGE BACKGROUND */}
            <div className="md:w-2/5 relative h-64 md:h-auto">
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50">
                  <div className="text-white text-center">
                    <div className="text-5xl font-bold mb-2">{webinar.date.split(' ')[1]}</div>
                    <div className="text-2xl uppercase">{webinar.date.split(' ')[0]}</div>
                    <div className="mt-4 text-xl">{webinar.time}</div>
                    <div className="mt-8 bg-white text-blue-600 py-2 px-4 rounded-lg inline-block font-semibold">
                      FREE WEBINAR
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Webinar details */}
            <div className="md:w-3/5 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{webinar.title}</h3>
              <p className="text-gray-600 mb-6">{webinar.description}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-600 mr-3" />
                  <span className="text-gray-700">{webinar.date}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-blue-600 mr-3" />
                  <span className="text-gray-700">{webinar.time}</span>
                </div>
                <div className="flex items-center">
                  <FaChalkboardTeacher className="text-blue-600 mr-3" />
                  <span className="text-gray-700">Speaker: {webinar.host}, {webinar.hostDesignation}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-300"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Registration modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">Register for the Webinar</h3>
              <p className="text-gray-600 mb-6">Fill out the form below to reserve your spot for "{webinar.title}"</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300"
                >
                  Confirm Registration
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingWebinar;


 


