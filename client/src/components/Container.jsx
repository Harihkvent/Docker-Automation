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
      setNewImage('');
      setNewName('');
    } catch (error) {
      console.error('Error creating container:', error);
      alert('Failed to create container');
    }
  };

  const startContainer = async (containerId) => {
    try {
      await axios.post(`${API_URL}/start/${containerId}`);
      alert('Container started');
      fetchContainers();
    } catch (error) {
      console.error('Error starting container:', error);
      alert('Failed to start container');
    }
  };

  const stopContainer = async (containerId) => {
    try {
      await axios.post(`${API_URL}/stop/${containerId}`);
      alert('Container stopped');
      fetchContainers();
    } catch (error) {
      console.error('Error stopping container:', error);
      alert('Failed to stop container');
    }
  };

  const removeContainer = async (containerId) => {
    try {
      await axios.delete(`${API_URL}/remove/${containerId}`);
      alert('Container removed');
      fetchContainers();
    } catch (error) {
      console.error('Error removing container:', error);
      alert('Failed to remove container');
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  const getStatusBadge = (state) => {
    const statusMap = {
      running: 'status-running',
      exited: 'status-stopped',
      created: 'status-created',
      paused: 'status-paused',
    };
    return statusMap[state?.toLowerCase()] || 'status-default';
  };

  return loading ? (
    <div className="loader-container">
      <Loader type="spinner-default" bgColor="#00d4ff" size={100} />
      <p className="loading-text">Loading containers...</p>
    </div>
  ) : (
    <>
      <Navigation />
      <div className="container-manager">
        <div className="page-header">
          <h1 className="page-title gradient-text">Container Management</h1>
          <p className="page-subtitle">Orchestrate your Docker ecosystem</p>
        </div>

        {error && (
          <div className="error-banner">
            <div className="error-icon">⚠</div>
            <div className="error-content">
              <strong>Error:</strong> {error}
              <br />
              <small>API URL: {API_URL || 'Not set'}</small>
            </div>
          </div>
        )}

        <div className="create-section glass-card">
          <h2 className="section-title">
            <span className="title-icon">➕</span>
            Create New Container
          </h2>
          <div className="input-group">
            <div className="input-wrapper">
              <label>Image Name</label>
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="e.g., nginx:latest"
                className="futuristic-input"
              />
            </div>
            <div className="input-wrapper">
              <label>Container Name <span className="optional">(optional)</span></label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., my-web-server"
                className="futuristic-input"
              />
            </div>
          </div>
          <button onClick={createContainer} className="create-btn" disabled={!newImage}>
            <span className="btn-icon">🚀</span>
            Create Container
          </button>
        </div>

        <div className="containers-section">
          <h2 className="section-title">
            <span className="title-icon">📦</span>
            Active Containers
            <span className="container-count">{containers.length}</span>
          </h2>
          
          {containers.length === 0 ? (
            <div className="empty-state glass-card">
              <div className="empty-icon">🐳</div>
              <h3>No containers found</h3>
              <p>Create your first container above to get started</p>
            </div>
          ) : (
            <div className="container-grid">
              {containers.map((container, index) => (
                <div key={index} className="container-card glass-card">
                  <div className="card-header">
                    <div className="container-id">
                      <span className="id-label">ID:</span>
                      <code>{container.Id.substring(0, 12)}</code>
                    </div>
                    <span className={`status-badge ${getStatusBadge(container.State)}`}>
                      {container.State}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <div className="info-row">
                      <span className="info-label">Image</span>
                      <span className="info-value">{container.Image}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status</span>
                      <span className="info-value">{container.Status}</span>
                    </div>
                  </div>
                  
                  <div className="card-actions">
                    <button 
                      onClick={() => startContainer(container.Id)} 
                      className="action-btn start-btn"
                      disabled={container.State === 'running'}
                    >
                      ▶ Start
                    </button>
                    <button 
                      onClick={() => stopContainer(container.Id)} 
                      className="action-btn stop-btn"
                      disabled={container.State !== 'running'}
                    >
                      ⏸ Stop
                    </button>
                    <button 
                      onClick={() => removeContainer(container.Id)} 
                      className="action-btn remove-btn"
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
