import { useCallback, useState } from "react";

const Service = () => {
  const _apiBase = "http://localhost:80/";

  const [process, setProcess] = useState("waiting");

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
      try {
        console.log(url, method, body);
        setProcess("loading");

        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status ${response.status}`);
        }
        const data = await response.json();

        setProcess("confirmed");
        return data;
      } catch (e) {
        setProcess("error");
        throw e;
      }
    },
    []
  );

  //! ERR
  const getTask = (id) => {
    // const url = "https://jsonplaceholder.typicode.com/todos/1";
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
    const method = "PUT";
    const url = `${_apiBase}update`;
    // const url = "https://jsonplaceholder.typicode.com/todos";
    const body = json;
    return request(url, method, body);
  };

  //! ERR
  const deleteTask = (id) => {
    // const url = "https://jsonplaceholder.typicode.com/todos/3";
    const method = "DELETE";
    const url = `${_apiBase}delete/${id}`;
    return request(url, method);
  };

  return {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    process,
  };
};

export default Service;
