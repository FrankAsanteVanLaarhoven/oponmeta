import React from 'react';

const testimonials = [
  {
    quote: 'OponMeta transformed my career. The mentorship and hands-on labs were game changers!',
    name: 'Amina Bello',
    role: 'Software Engineer, Nigeria',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    quote: 'The courses are practical and industry-aligned. I landed my dream job after completing the programme.',
    name: 'James Mensah',
    role: 'Data Analyst, Ghana',
    img: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    quote: 'As a mentor, I love the global community and the impact we make together.',
    name: 'Dr. Laila Said',
    role: 'Mentor & University Lecturer, Egypt',
    img: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    quote: 'OponMeta’s workshops are the best way to learn new skills fast!',
    name: 'Samuel Okoro',
    role: 'Entrepreneur, Kenya',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

const Testimonials = () => (
  <section className="w-full bg-white py-16 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0a174e] mb-2">What Our Learners & Mentors Say</h2>
      <div className="w-16 h-1 bg-indigo-400 mx-auto mb-8 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center">
            <img src={t.img} alt={t.name} className="h-16 w-16 rounded-full mb-4 object-cover" />
            <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
            <span className="font-bold text-[#0a174e]">{t.name}</span>
            <span className="text-xs text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials; 