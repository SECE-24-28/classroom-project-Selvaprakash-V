import { useState } from 'react';
import { FiMail, FiPhone, FiClock, FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';
import Layout from '../components/Layout';

const Support = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I recharge my mobile?',
      answer: 'Go to Mobile Recharge page, enter your mobile number, select operator and circle, choose a plan, and confirm the payment.',
    },
    {
      id: 2,
      question: 'How long does it take for recharge to reflect?',
      answer: 'Recharges are processed instantly. In rare cases, it may take up to 5 minutes.',
    },
    {
      id: 3,
      question: 'Can I recharge for any operator?',
      answer: 'Yes, we support all major operators including Airtel, Jio, Vi, and BSNL.',
    },
    {
      id: 4,
      question: 'How do I recharge my DTH connection?',
      answer: 'Go to DTH Recharge page, enter your Customer ID, select your DTH provider, choose a plan, and confirm.',
    },
    {
      id: 5,
      question: 'Is my payment information secure?',
      answer: 'Yes, all transactions are encrypted and secure. We follow industry-standard security practices.',
    },
    {
      id: 6,
      question: 'Can I view my recharge history?',
      answer: 'Yes, go to the History page to view all your past transactions.',
    },
    {
      id: 7,
      question: 'What if my recharge fails?',
      answer: 'If a recharge fails, the amount will be refunded to your account within 24-48 hours.',
    },
    {
      id: 8,
      question: 'How do I contact customer support?',
      answer: 'You can reach us at support@rechargex.com or call our helpline at 1800-XXX-XXXX.',
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl mb-4">
            <FiHelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help & Support</h1>
          <p className="text-gray-600 dark:text-gray-400">We're here to help you with any questions</p>
        </div>
        
        {/* Contact Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl mb-8 text-white">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FiMail className="w-5 h-5" />
              <span>support@rechargex.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="w-5 h-5" />
              <span>1800-XXX-XXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <FiClock className="w-5 h-5" />
              <span>Available: 24/7</span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                {openFAQ === faq.id ? (
                  <FiChevronUp className="w-5 h-5 text-orange-600" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Support;
