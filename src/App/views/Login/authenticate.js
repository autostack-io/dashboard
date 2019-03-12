import axios from "axios";

export default async (user, pass) => {
  return await axios.post("/api/auth", {
    user: user,
    pass: pass,
  });
}
