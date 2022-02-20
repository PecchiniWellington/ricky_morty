import { AxiosError } from "axios";
import { IAlert } from "../common/alert/alert.interfaces";

const ErrorHandler = (error: AxiosError): IAlert => {
  const res = error?.response;
  switch (res?.status) {
    case 404:
      return { open: true, message: 'no character found' }
    case 500:
      return { open: true, message: 'problem with server' }

    default:
      return { open: true, message: 'generic error' }
  }
}

export default ErrorHandler;