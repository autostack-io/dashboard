import axios from "axios";

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("access_token")) {
      axios.get("/api/user/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }
      }).then((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    } else {
      reject();
    }
  });
}

export {
  isAuthenticated,
}