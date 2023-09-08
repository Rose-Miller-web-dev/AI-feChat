import {ResponseModel} from "./responseModel";

export interface SttResponseModel extends ResponseModel{
  start: number;
  end: number;
  asrRes : String;

}
