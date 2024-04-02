import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAsync } from './dataSlice'; // Import the async thunk action

const MyComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    // Fetch data when component mounts
    dispatch(fetchDataAsync({ method: 'GET', endpoint: 'exampleEndpoint' }));
  }, [dispatch]);

  // Other handlers and JSX rendering...
};

export default MyComponent;
