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
    <div className="bg-slate-200">
      <div className="relative w-full h-[90vh] flex justify-center">
        <img src={imageURL} alt="Fetched" className='w-auto h-full object-cover' />
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
                '@media (max-width: 640px)': {
                  fontSize: '20px',
                },
                
              }}
            >
              {draggableText}
            </div>
          </div>
        </Draggable>
      </div>
      <div className="flex justify-center m-2 sm:flex sm:justify-center">
        <input
          type="text"
          placeholder="Enter custom text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 m-2 rounded-lg shadow-md  sm:w-auto"
        />
        <button className="m-2 p-2 bg-blue-500 rounded-lg shadow-md" onClick={handleAddText}>Add Text</button>
      </div>
    </div>
  );
}

export default App;
