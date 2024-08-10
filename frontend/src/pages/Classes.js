// src/pages/Classes.js
import React, { useEffect, useState } from 'react';
import { getAllClasses, getClassById } from '../api/classService';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../assets/styles/styles.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClasses();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleEventClick = async (eventInfo) => {
    try {
      const classData = await getClassById(eventInfo.event.id);
      setSelectedClass(classData);
    } catch (error) {
      console.error('Error fetching class details:', error);
    }
  };

  const events = classes.map((classItem) => ({
    id: classItem._id,
    title: `${classItem.name} - ${classItem.instructor}`,
    start: classItem.date,
  }));

  return (
    <div className="classes-page">
      <h1 className="page-title">Our Classes</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
      />
      {selectedClass && (
        <div className="class-details-modal">
          <h2>{selectedClass.name}</h2>
          <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
          <p><strong>Date:</strong> {new Date(selectedClass.date).toLocaleString()}</p>
          <p><strong>Description:</strong> {selectedClass.description}</p>
          <button onClick={() => setSelectedClass(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Classes;
