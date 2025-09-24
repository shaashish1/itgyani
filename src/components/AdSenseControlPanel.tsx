import React, { useState } from 'react';
import { getAdSenseConfig } from '@/config/adsense';

/**
 * AdSense Control Panel Component
 * 
 * This component provides a simple interface to view and understand
 * the current AdSense configuration and policy compliance status.
 * 
 * Note: This is for development/admin use only.
 * Remove or secure this component in production.
 */
const AdSenseControlPanel: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);
  const config = getAdSenseConfig();

  // Always hide in production-like environments
  return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      <button
        onClick={() => setShowPanel(!showPanel)}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '18px'
        }}
      >
        📊
      </button>

      {showPanel && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          minWidth: '300px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>AdSense Status</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Master Control:</strong>{' '}
            <span style={{ color: config.enabled ? 'green' : 'red' }}>
              {config.enabled ? '✅ ENABLED' : '❌ DISABLED'}
            </span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Popups:</strong>{' '}
            <span style={{ color: config.popups.enabled ? 'orange' : 'green' }}>
              {config.popups.enabled ? '⚠️ ENABLED' : '✅ DISABLED'}
            </span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Test Mode:</strong>{' '}
            <span style={{ color: config.testMode ? 'orange' : 'blue' }}>
              {config.testMode ? '🧪 TEST ACTIVE' : '🚀 PRODUCTION'}
            </span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Publisher ID:</strong>{' '}
            <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '3px' }}>
              {config.publisherId}
            </code>
          </div>

          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <strong>Policy Compliance:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '12px' }}>
              <li style={{ color: 'green' }}>✅ Popups disabled</li>
              <li style={{ color: 'green' }}>✅ Standard ad sizes</li>
              <li style={{ color: 'green' }}>✅ Mobile optimized</li>
              <li style={{ color: 'green' }}>✅ Content-first approach</li>
            </ul>
          </div>

          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            <p><strong>How to control AdSense:</strong></p>
            <p>Edit <code>/src/config/adsense.ts</code></p>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li><code>enabled: true/false</code> - Master switch</li>
              <li><code>popups.enabled: true/false</code> - Popup control</li>
              <li><code>testMode: true/false</code> - Test vs production</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdSenseControlPanel;