import React, { useState } from 'react';

const Test3 = () => {
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'https://images.unsplash.com/photo-1661956600654-edac218fea67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80',
    'https://images.unsplash.com/photo-1681211657189-ded0fc1c0d87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    // ...
  ];

  const openLightbox = (index) => {
    setSelectedImage(images[index]);
    setLightboxVisible(true);
  };
  
  const closeLightbox = () => {
    setLightboxVisible(false);
  };
  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          onClick={() => openLightbox(index)}
          style={{ width: '100px', cursor: 'pointer' }}
        />
      ))}
      {lightboxVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={closeLightbox}
        >
          <img src={selectedImage} alt="" style={{ maxHeight: '90%', maxWidth: '90%' }} />
        </div>
      )}
    </div>
  );
  
  
};
export default Test3;