import React, { useEffect, useState } from 'react'
import { useAuth } from './UseAuth';

const Can = ({children, permissions} : {children:React.ReactNode, permissions: Permission}) => {
  const [match, setMatch]: [boolean, any] = useState(false);
  const auth = useAuth();
  useEffect(() => {
    checkMatch();
  }, [auth.user]);

  /**
   * Check if the user have the permission
   */
  const checkMatch = () => {
    // If the user is the administrator, always sets match to true.
    console.log(auth.user);
    if (auth?.user?.role?.name == "Admin") {
      setMatch(true);
      return;
    }
    // The connected user's permissions
    let conectedUserPermissions: string[] = [];
    // Transforms the permission of the connected user into an array of strings only.
    if (auth?.user?.role?.permissions?.length > 0) {
      conectedUserPermissions = auth.user.role.permissions.map(
        (permission: { id: any; name: string }) => {
          return permission.name;
        }
      );
    }
    // Check if the props permissions are an array.
    if (Array.isArray(permissions)) {
      // If the props permissions is an array
      // Matches the permissions and checks if the connected user has this permission and sets the match to true.
      const match = permissions.some((permission) => {
        return conectedUserPermissions.includes(permission);
      });
      setMatch(match);
      return;
    } else {
      // If the props permissions are a string
      // Check if the connected user has permission and set the match to true.
      const match = conectedUserPermissions.includes(permissions);
      if (match) {
        setMatch(true);
        return;
      }
    }
    // Set match to false if none of the condition abosve is true
    setMatch(false);
  };

  // Returns children if the connected user has permission.
  if (match) {
    return <>{children}</>;
  }
  return null;
}

type Permission = string | string[];
export default Can