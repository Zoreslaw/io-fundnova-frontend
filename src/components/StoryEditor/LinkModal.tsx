import React from 'react';
import ReactModal from 'react-modal';

interface LinkModalProps {
  url: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onChangeUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveLink: () => void;
  onRemoveLink: () => void;
}

const LinkModal: React.FC<LinkModalProps> = ({
  url,
  isOpen,
  onRequestClose,
  onChangeUrl,
  onSaveLink,
  onRemoveLink,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Link"
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          width: '400px',
          backgroundColor: '#2a2a2a',
          color: '#fff',
          borderRadius: '10px',
          border: '1px solid #444',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#fff' }}>Edit Link</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>URL:</label>
        <input
          type="text"
          value={url}
          onChange={onChangeUrl}
          placeholder="Enter URL"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #666',
            backgroundColor: '#1a1a1a',
            color: '#fff',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={onSaveLink}
          style={{
            padding: '8px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#0056b3',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={onRemoveLink}
          style={{
            padding: '8px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#b30000',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Remove
        </button>
        <button
          onClick={onRequestClose}
          style={{
            padding: '8px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#444',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </ReactModal>
  );
};

export default LinkModal;
