'use client';

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const SharesFormModal = ({ isOpen, onClose, share, actionType }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when modal opens with new share
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        mobile: '',
        email: '',
        amount: '',
      });
      setErrors({});
      setSubmitSuccess(false);
    }
  }, [isOpen, share, actionType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Investment amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // In a real application, you would send this data to your backend API
        // For now, we'll simulate a successful submission with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Form submitted:', {
          ...formData,
          shareName: share?.name,
          sharePrice: share?.price,
          action: actionType
        });
        
        setSubmitSuccess(true);
        
        // Close modal after 2 seconds of showing success message
        setTimeout(() => {
          onClose();
        }, 2000);
        
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ form: 'An error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          disabled={isSubmitting}
        >
          <FaTimes size={24} />
        </button>
        
        {/* Header */}
        <div className={`p-6 ${
          actionType === 'buy' 
            ? 'bg-yellow-500' 
            : actionType === 'sell' 
              ? 'bg-yellow-700' 
              : 'bg-blue-600'
        } text-white`}>
          <h3 className="text-xl font-bold">
            {actionType === 'buy' 
              ? 'Buy' 
              : actionType === 'sell' 
                ? 'Sell' 
                : 'Apply for'} {share?.name}
            {actionType === 'apply' ? ' IPO' : ' Shares'}
          </h3>
          <p className="mt-1">
            {actionType === 'apply' 
              ? `Price Range: ₹${share?.price}` 
              : `Current Price: ₹${share?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
          </p>
        </div>
        
        {submitSuccess ? (
          <div className="p-6">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
              <p className="font-medium">Request submitted successfully!</p>
              <p className="text-sm mt-2">Our team will contact you shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* IPO details when apply */}
              {actionType === 'apply' && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Lot Size</p>
                      <p className="font-medium">{share?.lotSize?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Min. Investment</p>
                      <p className="font-medium">₹{share?.minInvestment}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              {/* Mobile Number field */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10-digit mobile number"
                  disabled={isSubmitting}
                />
                {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              {/* Amount field */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to {actionType === 'buy' ? 'Invest' : actionType === 'sell' ? 'Sell' : 'Apply'} (₹) *
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount in ₹"
                  disabled={isSubmitting}
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>
              
              {/* General form error */}
              {errors.form && (
                <div className="bg-red-100 text-red-800 p-3 rounded-md text-sm">
                  {errors.form}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                  actionType === 'buy' 
                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                    : actionType === 'sell' 
                      ? 'bg-yellow-700 hover:bg-yellow-800' 
                      : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transition-colors`}
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : `Submit ${actionType === 'buy' ? 'Buy' : actionType === 'sell' ? 'Sell' : 'Apply'} Request`}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Our team will contact you shortly after receiving your request.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SharesFormModal; 