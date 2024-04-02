import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://172.16.16.181:8004';

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (method, endpoint, payload = null, headers = {}) => {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}/${endpoint}`,
        data: payload,
        headers: {
          ...headers,
          'Content-Type': 'application/json', 
        },
      });
      setData(response.data);
      setError(null);
      return response.data;
    } catch (error) {
      setError(error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useApi

// Example usage:
// const MyComponent = () => {
//   const { data, error, loading, fetchData } = useApi();

//   useEffect(() => {
//     // Fetch data when component mounts
//     fetchData('GET', 'exampleEndpoint')
//       .then(data => {
//         // Handle success
//       })
//       .catch(error => {
//         // Handle error
//       });
//   }, []);

//   const handleCreate = async () => {
//     const payload = { / your data for POST request / };
//     try {
//       await fetchData('POST', 'exampleEndpoint', payload);
//       // Handle success
//     } catch (error) {
//       // Handle error
//     }
//   };

//   const handleUpdate = async (id) => {
//     const payload = { / your data for PUT request / };
//     try {
//       await fetchData('PUT', `exampleEndpoint/${id}`, payload);
//       // Handle success
//     } catch (error) {
//       // Handle error
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetchData('DELETE', `exampleEndpoint/${id}`);
//       // Handle success
//     } catch (error) {
//       // Handle error
//     }
//   };

//   const handlePatch = async (id) => {
//     const payload = { / your data for PATCH request / };
//     try {
//       await fetchData('PATCH', `exampleEndpoint/${id}`, payload);
//       // Handle success
//     } catch (error) {
//       // Handle error
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       {/ Render your data /}
//       {data && (
//         <ul>
//           {data.map(item => (
//             <li key={item.id}>
//               {item.name}
//               <button onClick={() => handleUpdate(item.id)}>Update</button>
//               <button onClick={() => handleDelete(item.id)}>Delete</button>
//               <button onClick={() => handlePatch(item.id)}>Patch</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={handleCreate}>Create</button>
//     </div>
//   );
// };

// export default MyComponent;
