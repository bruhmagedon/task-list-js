import { useCallback, useState, useEffect } from "react";

const Service = () => {
  const _apiBase = "http://localhost:80/";

  //   const { url, setUrl } = useState("");
  //   const { method, setMethod } = useState("");

  useEffect(() => {
    // request(url, method);
  });

  const request = useCallback(
    async (
      url,
      method,
      body = null,
      headers = {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      }
    ) => {
      console.log(url, method, body);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (e) {
        throw e;
      }
    },
    []
  );

  //! ERR
  const getTask = (id) => {
    const method = "GET";
    const url = `${_apiBase}task/${id}`;
    return request(url, method);
  };

  const getTasks = () => {
    const method = "GET";
    const url = `${_apiBase}tasks`;
    return request(url, method);
  };

  const createTask = (json) => {
    const method = "POST";
    const url = `${_apiBase}save`;
    const body = json;
    return request(url, method, body);
  };

  //! ERR
  const updateTask = (json) => {
    const method = "POST";
    const url = `${_apiBase}update`;
    // const url = "https://jsonplaceholder.typicode.com/todos";
    const body = json;
    return request(url, method, body);
  };

  //! ERR
  const deleteTask = (id) => {
    const method = "DELETE";
    const url = `${_apiBase}delete/${id}`;
    // const url = "https://jsonplaceholder.typicode.com/todos/3";
    return request(url, method);
  };

  return {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default Service;
