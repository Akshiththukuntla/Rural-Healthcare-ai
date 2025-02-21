import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Language Translation', description: 'Translate languages seamlessly', image: 'https://img.freepik.com/free-vector/voice-assistant-concept-illustration_114360-5439.jpg?t=st=1739719854~exp=1739723454~hmac=8b794303a9b7378d772595ee7cab1e87cb4c503e7e62a27e2ce06f7abbe308e4&w=740', link: '/language' },
  { title: 'Image Detection', description: 'Detect images efficiently', image: 'https://img.freepik.com/free-vector/image-upload-concept-illustration_23-2148281796.jpg?t=st=1739719968~exp=1739723568~hmac=0c487666701a875c51aee9a3983d76033a6b6442b9e4129c2f42f2a33cb1f244&w=740', link: '/image-detection' },
  { title: 'Vital Monitoring', description: 'Monitor vital signs continuously', image: 'https://img.freepik.com/free-vector/smartwatch-concept-illustration_114360-3272.jpg?t=st=1739719990~exp=1739723590~hmac=69a1edef68900dc7ddfe39e33fec265de35187c5707544b027d4c35386637c88&w=740', link: '/vital-monitoring' },
  { title: 'Health Education', description: 'Learn about health and wellness', image: 'https://img.freepik.com/free-vector/insurance-concept-illustration_114360-2223.jpg?uid=R108651195&ga=GA1.1.216599315.1739641605&semt=ais_authors_boost', link: '/health-education' },
  { title: 'Emergency Services', description: 'Access emergency services', image: 'https://img.freepik.com/free-vector/modern-emergency-word-concept-with-flat-design_23-2147943315.jpg?t=st=1739720436~exp=1739724036~hmac=a4e8b6c5b9034d3b8bbd0d8f964da061a4b6ab318eef8032ab4064414bbfbc5d&w=740', link: '/emergency-services' },
  { title: 'Community Support', description: 'Engage with the community', image: 'https://img.freepik.com/free-vector/appreciation-concept-illustration_114360-293.jpg?uid=R108651195&ga=GA1.1.216599315.1739641605&semt=ais_authors_boost', link: '/community-support' },
  { title: 'Emotion Detection', description: 'Detect and manage stress', image: 'https://img.freepik.com/free-vector/stress-concept-illustration_114360-2031.jpg?uid=R108651195&ga=GA1.1.216599315.1739641605&semt=ais_authors_boost', link: '/stress-detection' },
  { title: 'diabetes ' , description:'lokgkab ajkbakja abf m',image:'https://img.freepik.com/free-vector/diabetes-flat-composition-medical-with-patient-symptoms-complications-blood-sugar-meter-treatments-medication_1284-28998.jpg?uid=R108651195&ga=GA1.1.216599315.1739641605&semt=ais_hybrid' ,link:'/diabetes'},
  { title: 'Kidney ' , description:'lokgkab ajkbakja abf m',image:'https://image.shutterstock.com/image-vector/kidney-care-kidneys-icon-world-260nw-2436467467.jpg' ,link:'/kidney'},
  {title:'Heart Disease' , description:'ankfnk'  , image:'https://img.freepik.com/free-vector/cardiologist-concept-illustration_114360-6987.jpg?uid=R108651195&ga=GA1.1.216599315.1739641605&semt=ais_hybrid',link:'/heart'
  }
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {services.map((service, index) => (
        <Link to={service.link} key={index}>
          <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105">
            <img className="w-full h-48 object-cover bg-blue-50 mb-4" src={service.image} alt={service.title} />
            <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Services;
