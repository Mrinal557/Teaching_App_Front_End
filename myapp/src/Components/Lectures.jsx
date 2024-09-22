import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lectures = ({ subject, section }) => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming token is stored in localStorage
        const response = await axios.get(`https://teaching-app-back-end.onrender.com/api/content/lectures`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            subject,
            section
          }
        });
        setLectures(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lectures');
        setLoading(false);
      }
    };

    fetchLectures();
  }, [subject, section]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{subject} - {section}</h2>
      <ul>
        {lectures.map(lecture => (
          <li key={lecture._id}>
            <h3>{lecture.title}</h3>
            <video width="600" controls>
              <source src={`https://teaching-app-back-end.onrender.com/${lecture.videoPath}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lectures;
