import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Loading from '../../components/Loading';

export default function BookmarkBody({ bookmark_id, email, setLoading }) {
  let navigate = useNavigate();
  const [accommData, setAccommData] = useState(null);
  const [loading, setLoadingState] = useState(true);

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
        setLoadingState(false);
      });

    return () => {
      setAccommData(null);
      setLoadingState(true);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        accommData && (
          <li>
            <div id="bookmark-li-container">
              <h3 id="accomm-name" onClick={() => navigate('/accomm?id=' + accommData._id)}>
                {accommData.name}
              </h3>
              <DeleteButton accommodation={accommData} email={email} setLoading={setLoading} />
            </div>
          </li>
        )
      )}
    </>
  );
}
