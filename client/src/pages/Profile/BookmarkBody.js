import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function BookmarkBody({ bookmark_id, email, setLoading }) {
  const navigate = useNavigate();
  const [accommData, setAccommData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'getAccommFullDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: bookmark_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAccommData(data.accommodation);
        }
      });

    // Clean up the effect and reset the imageLoaded state when unmounting
    return () => {
      setAccommData(null);
      setImageLoaded(false);
    };
  }, [bookmark_id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {accommData ? (
        <div
          onClick={() => {
            navigate('/accomm?id=' + accommData._id);
          }}
        >
          <div className="img-container">
            <div className="slider-wrapper">
              <div className="images">
                <div className="images" style={{ width: '300px', height: '200px' }}>
                  {accommData.photos.length > 0 ? (
                    <>
                      {accommData.photos.map((photo, index) => {
                        var base64Image = photo;
                        return (
                          <img
                            id={'image-' + index}
                            src={`data:image/*;base64,${base64Image}`}
                            alt=""
                            onLoad={handleImageLoad}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <img id={'image-no-picture'} src={require('../../assets/nopicture.jpg')} alt="" onLoad={handleImageLoad} />
                  )}
                </div>
              </div>
              {/* slider buttons */}
              <div className="slider-btns">
                {accommData.photos.length > 0 &&
                  accommData.photos.map((photo, index) => {
                    return <a href={'#image-' + photo + '-' + index}></a>;
                  })}
              </div>
            </div>
          </div>
          {/* details */}
          <div className="details">
            <h3>{accommData.name}</h3>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    
    </>
  );
}
