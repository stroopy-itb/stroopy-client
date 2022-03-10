import { HttpClient, WebStorage } from "../../../adapter/infrastructure";

export default interface Infrastructure {
  http: HttpClient;
  localStorage: WebStorage;
  sessionStorage: WebStorage;
}