import React, { useEffect, useState, useCallback } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Hub } from 'aws-amplify/utils';

const UserGroupCheck = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUserGroup = useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      if (!session?.tokens?.accessToken) {
        console.log('User is not authenticated');
        return;
      }

      const groups = session.tokens.accessToken.payload["cognito:groups"] || [];
      console.log('User Groups:', groups);

      // Check for admin group
      if (groups.includes('admin')) {
        navigate('/admin'); // Redirect to admin page
      } else {
        navigate('/client'); // Redirect to client page
      }
    } catch (error) {
      console.error('Error fetching user session:', error);
    } finally {
      setLoading(false); // Stop the loading state
    }
  }, [navigate]); // Add navigate to the dependency array

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async (data) => {
      console.log('Auth Event:', data.payload.event);
      if (data.payload.event === 'signIn') {
        await checkUserGroup();
      }

      if (data.payload.event === 'signOut') {
        // Optionally handle sign out
      }
    });

    // Check the user group on component mount
    checkUserGroup();

    return () => unsubscribe(); // Clean up the Hub listener
  }, [checkUserGroup]); // Include checkUserGroup in the dependency array

  if (loading) {
    return <p>Loading...</p>; // You can show a loading spinner here
  }

  return null; // No UI is necessary, as this component handles redirection only
};

export default UserGroupCheck;
