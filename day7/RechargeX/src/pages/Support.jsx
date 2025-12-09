import { useState } from 'react';

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
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Help & Support</h2>
      
      <div className="max-w-3xl mx-auto mb-10">
        <div className="bg-gray-900 p-6 rounded-lg mb-8 border-l-4 border-orange-600">
          <h3 className="text-xl font-bold text-orange-500 mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-2">Email: support@rechargex.com</p>
          <p className="text-gray-300 mb-2">Phone: 1800-XXX-XXXX</p>
          <p className="text-gray-300">Available: 24/7</p>
        </div>

        <h3 className="text-2xl font-bold text-black mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow border-l-4 border-orange-600">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-black">{faq.question}</span>
                <span className="text-2xl text-orange-600">{openFAQ === faq.id ? '−' : '+'}</span>
              </button>
              {openFAQ === faq.id && (
                <div className="p-4 pt-0 text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
