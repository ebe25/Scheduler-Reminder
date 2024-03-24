import React, {useEffect, useState} from "react";
import axios from "axios";
import io from "socket.io-client";

const useFetchUsers = (apiUrl) => {
  const [users, setUsers] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      setIsUserLoading(true);
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
        setIsUserLoading(false);
      }
    };
    fetchUser();
  }, []);
  return {users, isUserLoading, error};
};

export default useFetchUsers;
