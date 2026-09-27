export const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("You are not logged in!");

  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("An error happened!", error.message);
  }
};
