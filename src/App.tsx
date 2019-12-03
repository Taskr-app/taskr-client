import React, { useState, useEffect } from 'react';
import { setAccessToken } from './lib/accessToken';
import Routes from './Routes';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async x => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch(async error => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return <Routes />;
};

export default App;
