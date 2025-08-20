import { useState, useEffect } from "react";
import { getUser } from "../services/CampaignServiceFrontend";
import { User } from "../types/User";

export const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then((user)=> {
        setUser(user)
    })
  }, []);

  return user as User;
};