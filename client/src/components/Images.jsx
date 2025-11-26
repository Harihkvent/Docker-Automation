import React, { useEffect, useState } from 'react';
import Loader from "react-js-loader";
import axios from 'axios';
import "../style/image.css";
import Navigation from './Navigation';

const API_URL = process.env.REACT_APP_API_URL;

export default function Images() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`, {
        params: {
          flag: true
        }
      });

      const fetchedImages = res.data.images || [];
      console.log("Fetched Images:", fetchedImages);
      setImages(fetchedImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <>
      <Navigation />

      {loading ? (
        <div className="loader-container">
          <Loader type="spinner-default" bgColor="#00d4ff" size={100} />
          <p className="loading-text">Loading images...</p>
        </div>
      ) : (
        <div className="images-page">
          <div className="page-header">
            <h1 className="page-title gradient-text">Docker Images</h1>
            <p className="page-subtitle">Your container image repository</p>
          </div>

          {images.length === 0 ? (
            <div className="empty-state glass-card">
              <div className="empty-icon">🖼️</div>
              <h3>No images found</h3>
              <p>Pull or build Docker images to see them here</p>
            </div>
          ) : (
            <div className="images-grid">
              {images.map((image, index) => (
                <div key={index} className="image-card glass-card">
                  <div className="image-header">
                    <div className="image-icon">🐳</div>
                    <div className="image-tags">
                      {image.RepoTags && image.RepoTags.length > 0 ? (
                        image.RepoTags.map((tag, idx) => (
                          <span key={idx} className="tag-badge">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="tag-badge untagged">
                          &lt;none&gt;
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="image-body">
                    <div className="info-row">
                      <span className="info-label">Image ID</span>
                      <code className="info-value-code">
                        {image.Id.replace('sha256:', '').substring(0, 12)}
                      </code>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Created</span>
                      <span className="info-value">
                        {formatDate(image.Created)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Size</span>
                      <span className="info-value">
                        {formatSize(image.Size)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
