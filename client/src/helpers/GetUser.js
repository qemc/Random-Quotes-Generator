import { useState, useEffect } from "react";
import { User } from './types'
import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});
  
const useCurrentUser = () => {

    const [loggedUser, setLoggedUser] = useState(User);
    useEffect(() => {
        try {
            api.get("/@me").then((response) => {
              setLoggedUser((quot) => ({
                username: response.data.username,
                email: response.data.email,
                id: response.data.id,
              }));
            });
          } catch (error) {
            console.log(error);
        }

    }, []);
    return  loggedUser
    
}

export default useCurrentUser;