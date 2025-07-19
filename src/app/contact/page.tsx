'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Background image (reusing hero background)
  const backgroundImage = '/hero-bg.jpg';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'info@talaatstudio.com',
      href: 'mailto:info@talaatstudio.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Phone',
      value: '(123) 456-7890',
      href: 'tel:+1234567890',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      label: 'Office',
      value: '123 Architecture Lane\nDesign District, NY 10001',
      href: 'https://maps.google.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Contact background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-3">
        {/* Left Panel - Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-1 flex items-center justify-center p-4 lg:p-8"
        >
          <div className="bg-black/50 backdrop-blur-[4px] p-6 lg:p-8 w-full lg:max-w-sm rounded-md border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wider mb-2">
                CONTACT
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wider mb-4">
                STUDIO
              </h2>
              <div className="w-16 h-px bg-white/40 mx-auto mb-6"></div>
              <p className="text-white/80 text-sm lg:text-base font-light leading-relaxed">
                Ready to begin your architectural journey? Let&apos;s create something extraordinary together.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white/60 text-xs uppercase tracking-wide font-light mb-1">
                      {item.label}
                    </h3>
                    <a
                      href={item.href}
                      className="text-white/90 hover:text-white text-sm lg:text-base font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.value.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 pt-6 border-t border-white/20"
            >
              <h3 className="text-white/60 text-xs uppercase tracking-wide font-light mb-3">
                Office Hours
              </h3>
              <div className="text-white/80 text-sm font-light space-y-1">
                <div>Monday - Friday: 9AM - 6PM</div>
                <div>Saturday: 10AM - 4PM</div>
                <div>Sunday: By Appointment</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-2 p-4 lg:p-8 h-full flex"
        >
          <div className="w-full max-w-2xl mx-auto">
            {/* Form Container */}
            <div className="bg-black/40 backdrop-blur-[4px] h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)] w-full overflow-y-auto hide-scrollbar p-6 lg:p-8 relative rounded-md border border-white/10 shadow-2xl">
              
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-light text-white tracking-wider mb-4">
                  Let&apos;s Discuss Your Project
                </h2>
                <p className="text-white/70 text-sm lg:text-base font-light leading-relaxed">
                  Tell us about your vision, and we&apos;ll help bring it to life with thoughtful, innovative design.
                </p>
              </div>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md"
                  >
                    <p className="text-white text-sm">
                      Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-md"
                  >
                    <p className="text-white text-sm">
                      Sorry, there was an error sending your message. Please try again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/70 text-sm font-light mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-md text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-500/50' : 'border-white/20'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-400 text-xs">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/70 text-sm font-light mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-md text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500/50' : 'border-white/20'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-white/70 text-sm font-light mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-white/70 text-sm font-light mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="bg-gray-800">Select project type</option>
                      <option value="residential" className="bg-gray-800">Residential</option>
                      <option value="commercial" className="bg-gray-800">Commercial</option>
                      <option value="renovation" className="bg-gray-800">Renovation</option>
                      <option value="consultation" className="bg-gray-800">Consultation</option>
                      <option value="other" className="bg-gray-800">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-white/70 text-sm font-light mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="bg-gray-800">Select budget range</option>
                      <option value="50k-100k" className="bg-gray-800">$50K - $100K</option>
                      <option value="100k-250k" className="bg-gray-800">$100K - $250K</option>
                      <option value="250k-500k" className="bg-gray-800">$250K - $500K</option>
                      <option value="500k+" className="bg-gray-800">$500K+</option>
                      <option value="tbd" className="bg-gray-800">To be determined</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-white/70 text-sm font-light mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="bg-gray-800">Select timeline</option>
                      <option value="asap" className="bg-gray-800">ASAP</option>
                      <option value="3-6months" className="bg-gray-800">3-6 months</option>
                      <option value="6-12months" className="bg-gray-800">6-12 months</option>
                      <option value="1year+" className="bg-gray-800">1+ years</option>
                      <option value="planning" className="bg-gray-800">Just planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/70 text-sm font-light mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-md text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-white/20'
                    }`}
                    placeholder="Tell us about your project vision, goals, and any specific requirements..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-400 text-xs">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-3 px-4 lg:py-4 lg:px-6 font-light text-xs lg:text-sm tracking-wide uppercase backdrop-blur-[2px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent ${
                    isSubmitting
                      ? 'bg-black/20 text-white/50 cursor-not-allowed border border-white/10'
                      : 'bg-black/40 hover:bg-black/50 text-white border border-white/10'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}