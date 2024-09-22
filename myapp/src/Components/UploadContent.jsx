import React, { useState } from 'react';
import axios from 'axios';

const UploadContent = () => {
    const [subject, setSubject] = useState('physicalChemistry');
    const [section, setSection] = useState('videoLectures');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contentData = {
            subject,
            section,
            title,
            description,
            link: link,
        };

        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post('https://teaching-app-back-end.onrender.com/api/content/upload', contentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            // console.log('Response:', response);
            setSuccess('Content uploaded successfully!');
            setError('');
        } catch (error) {
            console.error('Error uploading content link:', error.response ? error.response.data : error.message);
            setError('Failed to upload content');
            setSuccess('');
        }
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Upload Content</h1>
                    </div>
                    <div style={{ margin: "5%" }}>
                        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                            <option value="physicalChemistry">Physical Chemistry</option>
                            <option value="inorganicChemistry">Inorganic Chemistry</option>
                            <option value="organicChemistry">Organic Chemistry</option>
                        </select>
                    </div>
                    <div style={{ margin: "5%" }}>
                        <select value={section} onChange={(e) => setSection(e.target.value)}>
                            <option value="videoLectures">Video Lectures</option>
                            <option value="testSeries">Test Series</option>
                        </select>
                    </div>
                    <div style={{ margin: "5%" }}>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                    </div>
                    <div style={{ margin: "5%" }}>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                    </div>

                    <div style={{ margin: "5%" }}>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter the link to content"
                            required
                        />
                    </div>

                    <button style={{ margin: "5%" }} type="submit">Upload</button>
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </>
    );
};

export default UploadContent;
