"use client"

// Experience.js
import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const experienceData = [
  {
    title: 'Software Engineer',
    company: 'Company A',
    date: 'Jan 2021 - Present',
    description: 'Developing web applications using React and Node.js.',
    icon: '💻', // You can replace this with an image or a different icon
  },
  {
    title: 'Web Developer',
    company: 'Company B',
    date: 'Jun 2019 - Dec 2020',
    description: 'Worked on front-end development using HTML, CSS, and JavaScript.',
    icon: '🌐',
  },
  {
    title: 'Intern',
    company: 'Company C',
    date: 'Jan 2019 - May 2019',
    description: 'Assisted in web development projects and learned the basics of full-stack development.',
    icon: '🛠️',
  },
];

const Experience = () => {
  return (
    <div className="experience-section">
      <h2>Experience</h2>
      <VerticalTimeline>
        {experienceData.map((exp, index) => (
          <VerticalTimelineElement
            visible={true}
            key={index}
            date={exp.date}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<span style={{ fontSize: '24px' }}>{exp.icon}</span>}
          >
            <h3 className="vertical-timeline-element-title">{exp.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{exp.company}</h4>
            <p>{exp.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;
