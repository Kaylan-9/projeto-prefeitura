import server from "./server";

interface Params{
  method?: string;
  headers?: {} | {
    [key: string]: string
  };
  body?: string;
} 

const request = async (param: string,  method: string = "GET", body: object | boolean = false) => {
  let params: Params = {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};
  params.method = method;
  if(body) params.body = JSON.stringify(body);
  const response = await fetch(`${server}/${param}`, params)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.status);
    });
  return response; 
};

export const requestImport = async (url: string) => {
  let params: Params = {
    method: 'GET',
  };
  delete params.body;
  const response = await fetch(url, params);
  return await response.json(); 
};

export default request;