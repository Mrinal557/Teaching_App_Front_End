// src/components/ViewContent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ViewContent = () => {
    const [subject, setSubject] = useState('physicalChemistry');
    const [section, setSection] = useState('videoLectures');
    const [content, setContent] = useState([]);
    const [error, setError] = useState('Select subject and Section');
    var Msg = document.getElementById('content-result');
    const fetchContent = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            // console.log('adminToken: ', token);
            const response = await axios.get(`http://localhost:5000/api/content/admin/${subject}/${section}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setContent(response.data);
            setError("");
        } catch (error) {
            setError('Failed to fetch content');
            if (Msg) {
                Msg.style.color = 'red';
            }
        }
    };

    return (
        <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>View Content</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <p id="content-result" style={{ color: 'blue' }}>{error}</p>
                    <div style={{ display: "flex", columnGap: "2%" }}>
                        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                            <option value="physicalChemistry">Physical Chemistry</option>
                            <option value="inorganicChemistry">Inorganic Chemistry</option>
                            <option value="organicChemistry">Organic Chemistry</option>
                        </select>
                        <select value={section} onChange={(e) => setSection(e.target.value)}>
                            <option value="videoLectures">Video Lectures</option>
                            <option value="testSeries">Test Series</option>
                        </select>
                    </div>
                    <div style={{ marginTop: "15px", display: "flex" }}>
                        <button onClick={fetchContent}>Show</button>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        {content.map((item) => (
                            <div key={item._id} style={{ border: "2px solid black", margin: "4px", backgroundColor: "grey", borderRadius: "10%",height:"fit-content" }}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <h3>{item.title}</h3>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <p>{item.description}</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <a href={item.url}>Link</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div>
    );
};

export default ViewContent;
