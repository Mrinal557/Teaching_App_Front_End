import React, { useState } from 'react';
import axios from 'axios';

const Subscription = () => {
  const [subject, setSubject] = useState('physicalChemistry');
  const [section, setSection] = useState('videoLectures');
  const [message, setMessage] = useState('');

  const handleSubscription = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/subscription/subscribe/${subject}/${section}`, {
        subject,
        section,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMessage(res.data.message);
    } catch (error) {
      setMessage('Subscription failed');
    }
  };

  return (
    <div>
      <h1>Subscribe to Content</h1>
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="physicalChemistry">Physical Chemistry</option>
        <option value="inorganicChemistry">Inorganic Chemistry</option>
        <option value="organicChemistry">Organic Chemistry</option>
      </select>
      <select value={section} onChange={(e) => setSection(e.target.value)}>
        <option value="videoLectures">Video Lectures</option>
        <option value="testSeries">Test Series</option>
      </select>
      <button onClick={handleSubscription}>Subscribe</button>
      {message && <p>{message}</p>}
      <p>Make payment via Google Pay at mrinal.annand@okhdfcbank</p>
    </div>
  );
};

export default Subscription;