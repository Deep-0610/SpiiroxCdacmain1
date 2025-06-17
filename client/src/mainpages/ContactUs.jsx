import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm, resetContactState } from '../redux/slices/contactSlice';
import logo from '../assets/logo.svg';

const ContactUs = () => {
  const [data, setData] = useState({
    name: '', email: '', phone: '', role: '', message: ''
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.contact);

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(submitContactForm(data));
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetContactState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="md:w-1/2 relative p-8 flex flex-col justify-center">
        <img src="/logo.svg" alt="SPIRO Logo" className="w-28 mb-6" />

        <h1 className="text-3xl font-bold text-blue-600 mb-4">SPIRO</h1>
        <p className="text-lg text-gray-700 mb-6">
          Reach out to us and we’ll get back in a flash!
        </p>
        <div className="text-gray-600">
          <p>📍 Mumbai</p>
          <p>✉️ spiroedu9@gmail.com</p>
          <p>📞 +91 8452976481</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-40 md:h-64 bg-blue-600 rounded-tr-full z-0" />
      </div>

      <div className="md:w-1/2 p-8 md:p-16 bg-white rounded-xl shadow-lg z-10 mx-4 md:mx-0 -mt-20 md:mt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="name" value={data.name} onChange={handleChange}
            className="w-full border px-4 py-3 rounded" placeholder="Name*" required />
          <input name="email" value={data.email} onChange={handleChange}
            type="email" className="w-full border px-4 py-3 rounded" placeholder="Email*" required />
          <input name="phone" value={data.phone} onChange={handleChange}
            className="w-full border px-4 py-3 rounded" placeholder="Phone no.*" required />
          <div>
            <label className="block font-medium mb-1">Role*</label>
            <div className="flex gap-8">
              <label><input type="radio" name="role" value="Teacher" onChange={handleChange} required /> Teacher</label>
              <label><input type="radio" name="role" value="Student" onChange={handleChange} /> Student</label>
            </div>
          </div>
          <textarea name="message" value={data.message} onChange={handleChange}
            className="w-full border px-4 py-3 h-32 rounded" placeholder="Your message..." />
          <button type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            {loading ? "Submitting..." : "SUBMIT →"}
          </button>
          {success && <p className="text-green-600">✅ Submitted successfully!</p>}
          {error && <p className="text-red-600">❌ {error}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
