export const BACKEND_URL = "http://10.0.2.2:7781";

export async function getLoggedInUserDetails(id) {
  try {
    let res = await fetch(`${BACKEND_URL}/users/auth/${id}`);
    let data = await res.json();
    return data;
  } catch (error) {
    return { error: "Server Error, Please Try Later" };
  }
}

export async function updateLikes(updatedLikes, blogId) {
  try {
    let res = await fetch(`${BACKEND_URL}/blogs/updateLikes/${blogId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLikes),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    return { error: "Server Error, Please Try Later" };
  }
}

export async function deleteBlog(id) {
  try {
    let res = await fetch(`${BACKEND_URL}/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    return data;
  } catch (error) {
    return { error: "Server Error, Please Try Lter!" };
  }
}

export async function updateBookmark(updatedList, userId) {
  try {
    const updateList = {
      blogs: updatedList,
      userId,
    };
    // console.log(updateList);
    let res = await fetch(`${BACKEND_URL}/users/bookmarks`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateList),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    return { error: error.error };
  }
}
