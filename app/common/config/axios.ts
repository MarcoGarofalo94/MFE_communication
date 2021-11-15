import Axios from "axios";

export const INTERFACE_TUNERS_STATUS = "/interface/tuners";
export const TUNERS_BITRATE = "/tuners/bitrate";
export const TUNERS_STATUS = "/tuners/status";
export const TUNERS_CONFIGURATIONS = "/tuners/configurations";
export const PROGRAM = "/programs";
export const REMUX_PROGRAM = "/remux/programs";
export const REMUX_CONFIGURATION = "/remux/configuration";
export const LIST_FOLDER = "/api/0.1/list";
export const LIST_VIDEOS = "/api/0.1/list/videos";
export const GET_VIDEO_CONTENT = "/api/0.1/content?fileid="
export const BASE_URL = OC.generateUrl("/apps/corecomdashboard");

const instance = Axios.create({
  baseURL: BASE_URL,
});

export default instance;
