import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'react-js-loader';
import '../style/container.css';
import Navigation from './Navigation';

const API_URL = process.env.REACT_APP_API_URL;

export default function ContainerManager() {
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState('');
  const [newName, setNewName] = useState('');
  const [containers, setContainers] = useState([]);
  const [error, setError] = useState(null);

  const fetchContainers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/list`);
      const fetchedContainers = res.data || [];
      setContainers(fetchedContainers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching containers:', error);
      setError(error.message || 'Failed to fetch containers');
      setLoading(false);
    }
  };

  const createContainer = async () => {
    try {
      const res = await axios.post(`${API_URL}/create`, {
        image: newImage,
        name: newName,
      });
      alert(`Container created: ${res.data.containerId}`);
      fetchContainers();
    } catch (error) {
      console.error('Error creating container:', error);
    }
  };

  const startContainer = async (containerId) => {
    try {
      await axios.post(`${API_URL}/start/${containerId}`);
      alert('Container started');
      fetchContainers();
    } catch (error) {
      console.error('Error starting container:', error);
    }
  };

  const stopContainer = async (containerId) => {
    try {
      await axios.post(`${API_URL}/stop/${containerId}`);
      alert('Container stopped');
      fetchContainers();
    } catch (error) {
      console.error('Error stopping container:', error);
    }
  };

  const removeContainer = async (containerId) => {
    try {
      await axios.delete(`${API_URL}/remove/${containerId}`);
      alert('Container removed');
      fetchContainers();
    } catch (error) {
      console.error('Error removing container:', error);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  return loading ? (
    <div className="Loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Loader type="spinner-default" bgColor="white" />
    </div>
  ) : (
    <>
      <Navigation />
      <div className="container-manager">
        <h2>Docker Container Manager</h2>

        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '40px', 
          borderRadius: '15px', 
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: 'bold' }}>
            🔧 Under Scheduled Maintenance
          </h3>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            The Docker Container Management service is currently undergoing scheduled maintenance.
            <br />
            We'll be back soon with improved performance and features!
          </p>
          <p style={{ fontSize: '14px', marginTop: '20px', opacity: '0.9' }}>
            Thank you for your patience.
          </p>
        </div>

        {error && (
          <div style={{ 
            background: '#ff6b6b', 
            color: 'white', 
            padding: '15px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            textAlign: 'center',
            display: 'none'
          }}>
            <strong>Error:</strong> {error}
            <br />
            <small>API URL: {API_URL || 'Not set'}</small>
          </div>
        )}

        <div className="container-actions" style={{ opacity: '0.5', pointerEvents: 'none' }}>
          <h3>Create Container</h3>
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Enter image name"
            disabled
          />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter container name (optional)"
            disabled
          />
          <button onClick={createContainer} disabled>Create Container</button>
        </div>

        <div className="container-list" style={{ opacity: '0.5' }}>
          <h3>Manage Containers</h3>
          {containers.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
              No containers available during maintenance.
            </p>
          ) : (
            <table id="info">
              <thead>
                <tr>
                  <th>Container ID</th>
                  <th>Image</th>
                  <th>State</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {containers.map((container, index) => (
                  <tr key={index}>
                    <td>{container.Id}</td>
                    <td>{container.Image}</td>
                    <td>{container.State}</td>
                    <td>{container.Status}</td>
                    <td>
                      <button onClick={() => startContainer(container.Id)} disabled>Start</button>
                      <button onClick={() => stopContainer(container.Id)} disabled>Stop</button>
                      <button onClick={() => removeContainer(container.Id)} disabled>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
