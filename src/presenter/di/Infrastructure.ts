import { AxiosHttp, WebStorage } from "../../adapter/infrastructure";
import { Infrastructure } from "./interface";

export default (): Infrastructure => {
  const localStorageInstance = new WebStorage(localStorage);
  const sessionStorageInstance = new WebStorage(sessionStorage);
  const httpInstance = new AxiosHttp(localStorageInstance);

  return {
    localStorage: localStorageInstance,
    sessionStorage: sessionStorageInstance, 
    http: httpInstance, 
  }
}
