import React, { useState } from 'react';
import { FaSearch, FaBookOpen, FaQuestionCircle } from 'react-icons/fa';

const glossary = [
    { term: 'BMI', definition: 'Body Mass Index, a measure of body fat based on height and weight.' },
    { term: 'Hypertension', definition: 'A condition in which the force of the blood against the artery walls is too high.' },
    { term: 'Cholesterol', definition: 'A type of fat found in your blood that is necessary for building cells, but high levels can increase heart disease risk.' },
    { term: 'Diabetes', definition: 'A chronic condition that affects how your body processes blood sugar (glucose).' },
    { term: 'Insulin', definition: 'A hormone that regulates blood sugar levels in the body.' },
    { term: 'Metabolism', definition: 'The process by which your body converts food into energy.' },
];

const articles = [
  { title: 'Benefits of a Balanced Diet', content: 'Eating a balanced diet helps maintain a healthy weight, improves mental health, and boosts your immune system.' },
  { title: 'Importance of Regular Exercise', content: 'Regular exercise helps prevent chronic diseases, improves mood, and increases energy levels.' },
];

const faqs = [
  { question: 'What is a balanced diet?', answer: 'A balanced diet includes a variety of foods from all the food groups: fruits, vegetables, proteins, grains, and dairy.' },
  { question: 'How much exercise do I need?', answer: 'It is recommended to get at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity each week.' },
];

const HealthGlossary = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(glossary);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearch(query);
    setResults(
      glossary.filter((item) => item.term.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaSearch /> Health Glossary</h2>
      <input
        type="text"
        placeholder="Search health terms..."
        value={search}
        onChange={handleSearch}
        className="border p-3 rounded w-full shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-4 space-y-2">
        {results.map((item, index) => (
          <li key={index} className="p-3 bg-gray-100 rounded shadow-sm">
            <strong>{item.term}:</strong> {item.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Articles = () => (
  <div className="p-6 bg-white shadow-md rounded-xl mt-6">
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaBookOpen /> Educational Articles</h2>
    {articles.map((article, index) => (
      <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow-sm">
        <h3 className="text-xl font-semibold">{article.title}</h3>
        <p>{article.content}</p>
      </div>
    ))}
  </div>
);

const FAQ = () => (
  <div className="p-6 bg-white shadow-md rounded-xl mt-6">
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaQuestionCircle /> Frequently Asked Questions</h2>
    {faqs.map((faq, index) => (
      <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow-sm">
        <h3 className="text-xl font-semibold">{faq.question}</h3>
        <p>{faq.answer}</p>
      </div>
    ))}
  </div>
);

const HealthEducation = () => {
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <header className="bg-blue-600 p-6 rounded-xl text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">Health Education</h1>
        <nav className="mt-3">
          <a href="#glossary" className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md mr-2 hover:bg-gray-100">Glossary</a>
          <a href="#articles" className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md mr-2 hover:bg-gray-100">Articles</a>
          <a href="#faq" className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100">FAQs</a>
        </nav>
      </header>
      <main>
        <section id="glossary"><HealthGlossary /></section>
        <section id="articles"><Articles /></section>
        <section id="faq"><FAQ /></section>
      </main>
    </div>
  );
};

export default HealthEducation;