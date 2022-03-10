import axios, { AxiosStatic, AxiosRequestHeaders } from 'axios';
import { HttpExtraConfig, HttpHeader, Http, HttpRequestBody } from './interface/Http';

export default class AxiosHttp implements Required<Http> {
  private readonly client: AxiosStatic;

  constructor() {
    this.client = axios;
    this.client.defaults.baseURL = process.env.REACT_APP_API;
  }

  async get<T>(
    url: string, 
    headers?: HttpHeader, 
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    const r = await this.client.get(url, { headers, ...extraConfig });
    return r.data as T;
  }

  async post<T>(
    url: string,
    body: HttpRequestBody,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    const res = await this.client.post(url, body, { headers, ...extraConfig });
    return res.data as T;
  }

  async put<T>(
    url: string,
    body: HttpRequestBody,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    return this.client.put(url, body, { headers, ...extraConfig })
  }

  async delete<T>(
    url: string,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    return this.client.delete(url, { headers, ...extraConfig }).then((response) => {
      return response.data;
    })
  }
}