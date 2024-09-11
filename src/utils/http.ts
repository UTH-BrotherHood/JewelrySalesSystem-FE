/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080/jewelry/v1/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  clearToken() {
    delete this.instance.defaults.headers.common["Authorization"];
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
}

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any; 
  };

  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: { message: string; [key: string]: any };
  }) {
    super(`HTTP Error: ${status}`);
    this.status = status;
    this.payload = payload;

    // Set the prototype explicitly to maintain correct instanceof behavior
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class EntityError extends HttpError {
  status: number;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

const http = new Http();

export default http;
