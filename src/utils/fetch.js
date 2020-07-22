export default (method, url, bodyData = []) =>
  new Promise(async (resolve, reject) => {
    try {
      const body = Object.keys(bodyData)
        .map((key) => `${key}=${bodyData[key]}`)
        .join("&");
      let response;
      if (method === "GET") {
        response = await fetch(url);
      } else if (method === "POST") {
        response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        });
      }
      const data = await response.json();
      if (data) {
        return resolve(data);
      }
      return reject("Unable to fetch data!");
    } catch (e) {
      return reject(e);
    }
  });
