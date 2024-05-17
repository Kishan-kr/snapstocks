import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserDashboardWithAtSymbol from './UserDashboardWithAtSymbol';

function EnsureAtSymbol() {
  const navigate = useNavigate();
  
  // Get the username parameter from the route
  const { username } = useParams();

  useEffect(() => {
    if (!username.startsWith('@')) {
      navigate(`/@${username}`, {replace: true});
    }
    
  }, [])

  return (
    <UserDashboardWithAtSymbol/>
  );
}

export default EnsureAtSymbol