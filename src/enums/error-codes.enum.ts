export enum StatusCode {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
  }
  
  export enum ErrorMessage {
    BAD_REQUEST = 'Bad Request',
    INTERNAL_SERVER_ERROR = 'An error occurred while processing the request.',
    RETRIEVING_DATA_ERROR = 'An error occurred while retrieving the data.',
    INVALID_LATITUDE_LONGITUDE = 'Invalid latitude or longitude range'
  }
  