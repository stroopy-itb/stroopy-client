import axios, { AxiosInstance } from 'axios';
import { WebStorage } from '.';
import { ErrorResponse } from '../../domain/model';
import { ACCESS_TOKEN_KEY } from '../repository/constants';
import { HttpExtraConfig, HttpHeader, HttpClient, HttpRequestBody } from './interface/HttpClient';

export default class AxiosHttp implements Required<HttpClient> {
  private readonly client: AxiosInstance;

  constructor(
    private readonly storage: WebStorage
  ) {
    this.client = axios.create();
    this.client.defaults.baseURL = process.env.REACT_APP_API;
    this.client.interceptors.request.use((config) => {
      const accessToken = storage.getItem(ACCESS_TOKEN_KEY);
      config.headers = {
        Authorization: `Bearer ${accessToken}`
      }

      return config;
    });
  }

  async get<T>(
    url: string,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    return this.client.get(url, { headers, ...extraConfig })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          throw error.response.data as ErrorResponse;
        } else if (error.request) {
          throw { message: "Request Error" };
        } else {
          throw { message: "Error" };
        }
      });
  }

  async post<T>(
    url: string,
    body: HttpRequestBody,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    return this.client.post(url, body, { headers, ...extraConfig })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          throw error.response.data as ErrorResponse;
        } else if (error.request) {
          throw { message: "Request Error" };
        } else {
          throw { message: "Error" };
        }
      });
  }

  async put<T>(
    url: string,
    body: HttpRequestBody,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    return this.client.put(url, body, { headers, ...extraConfig })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          throw error.response.data as ErrorResponse;
        } else if (error.request) {
          throw { message: "Request Error" };
        } else {
          throw { message: "Error" };
        }
      });
  }

  async delete<T>(
    url: string,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<T> {
    return this.client.delete(url, { headers, ...extraConfig })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          throw error.response.data as ErrorResponse;
        } else if (error.request) {
          throw { message: "Request Error" };
        } else {
          throw { message: "Error" };
        }
      });
  }
}