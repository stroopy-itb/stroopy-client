export interface HttpClient {
  /**
   * @brief Perform HTTP get request.
   *
   * @param url endpoint URL
   * @param headers request headers
   * @param extraConfig extra configurations fo request
   *
   * @returns response object
   */
  get<ResponseData>(
    url: string,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<ResponseData>;

  /**
   * @brief Perform HTTP post request.
   *
   * @param url endpoint URL
   * @param body request body
   * @param headers request headers
   * @param extraConfig extra configurations fo request
   *
   * @returns response object
   */
  post<ResponseData>(
    url: string,
    body: HttpRequestBody,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<ResponseData>;

  /**
   * @brief Perform HTTP put request.
   *
   * @param url endpoint URL
   * @param body request body
   * @param headers request headers
   * @param extraConfig extra configurations fo request
   *
   * @returns response object
   */
  put<ResponseData>(
    url: string,
    body: HttpRequestBody,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<ResponseData>;

  /**
   *
   * @brief Perform HTTP delete request.
   *
   * @param url endpoint URL
   * @param headers request headers
   * @param extraConfig extra configurations fo request
   *
   * @returns response object
   */
  delete<ResponseData>(
    url: string,
    headers?: HttpHeader,
    extraConfig?: HttpExtraConfig
  ): Promise<ResponseData>;
}

export interface HttpHeader {
  [name: string]: string;
}

export interface HttpRequestBody {
  [name: string]: any;
}

export interface HttpExtraConfig {
  [name: string]: string;
}