import React, {useEffect, useState} from "react";
import axios from "axios";
const useFetchUsers = (apiUrl) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const {data} = await axios.get(`${apiUrl}/users`);
        const fetchedUsers = data;
        setUsers(fetchedUsers.data);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [apiUrl]);
  return {users, isLoading, error};
};

export default useFetchUsers;
