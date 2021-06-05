import React, { useContext } from "react";
import { useAuth } from "./AuthContext";

export const DBContext = React.createContext();

export const useDB = () => {
  return useContext(DBContext);
};

export function DBProvider({ children }) {
  const { authToken } = useAuth();

  const BACKEND_URL = "http://10.0.2.2:7781";
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  });

  async function getLoggedInUserDetails(id) {
    try {
      let res = await fetch(`${BACKEND_URL}/users/auth/${id}`, { headers });
      let data = await res.json();
      return data;
    } catch (error) {
      return { error: "Server Error, Please Try Later" };
    }
  }

  async function updateLikes(updatedLikes, blogId) {
    try {
      let res = await fetch(`${BACKEND_URL}/blogs/updateLikes/${blogId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(updatedLikes),
      });
      let data = await res.json();
      return data;
    } catch (error) {
      return { error: "Server Error, Please Try Later" };
    }
  }

  async function deleteBlog(id) {
    try {
      let res = await fetch(`${BACKEND_URL}/blogs/delete/${id}`, {
        method: "DELETE",
        headers,
      });
      let data = await res.json();
      return data;
    } catch (error) {
      return { error: "Server Error, Please Try Later!" };
    }
  }

  async function updateBookmark(updatedList, userId) {
    try {
      const updateList = {
        blogs: updatedList,
        userId,
      };
      // console.log(updateList);
      let res = await fetch(`${BACKEND_URL}/users/bookmarks`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(updateList),
      });
      let data = await res.json();
      return data;
    } catch (error) {
      return { error: error.error };
    }
  }

  return (
    <DBContext.Provider
      value={{
        BACKEND_URL,
        getLoggedInUserDetails,
        updateBookmark,
        updateLikes,
        deleteBlog,
        headers,
      }}
    >
      {children}
    </DBContext.Provider>
  );
}
