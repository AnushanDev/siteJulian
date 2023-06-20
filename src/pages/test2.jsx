import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

function ImageList() {
  const [imageUrls, setImageUrls] = useState([]);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const folderRef = ref(storage, 'ministre'); // change 'your-folder-name' to the name of your folder
      listAll(folderRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            // And finally display them
            getDownloadURL(itemRef).then((url) => {
              setImageUrls((prevUrls) => [...prevUrls, url]);
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };
    fetchImages();
  }, []);

  const openLightbox = (index) => {
    setSelectedImage(imageUrls[index]);
    setLightboxVisible(true);
  };
  
  const closeLightbox = () => {
    setLightboxVisible(false);
  };

  return (

    <div className='grid grid-rows-6 grid-flow-col gap-4'>
      {imageUrls.map((image, index) => (
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
}

export default ImageList;
