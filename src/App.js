import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Draggable from 'react-draggable';

function App() {
  const [imageURL, setImageURL] = useState('');
  const [text, setText] = useState('');
  const [draggableText, setDraggableText] = useState('');
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            client_id: 'xBX6E9ZawRNsV2J0WFwe8lnYzSAdsNwZV9bSEPpy4cU',
            count: 1,
            query: 'mountains',
          },
        }
      );
      const imageUrl = response.data[0].urls.regular;
      setImageURL(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleDrag = (ui) => {
    const { x, y } = ui;
    setInputPosition({ x, y });
  };

  const handleAddText = () => {
    setDraggableText(text);
    setText(''); 
  };

  return (
    <div className="App">
      <div className="image-container">
        <img src={imageURL} alt="Fetched" />
        <Draggable
          position={inputPosition}
          onDrag={handleDrag}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: '8px',
              zIndex: 1000,
              cursor: 'move',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                
              }}
            >
              {draggableText}
            </div>
          </div>
        </Draggable>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter custom text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddText}>Add Text</button>
      </div>
    </div>
  );
}

export default App;
