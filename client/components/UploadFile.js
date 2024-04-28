import axios from "axios";
import { ErrorAlert } from "./Commons/Messages/Messages";

export const uploadFilesFun = async (file, token) => {
    let uploadedFile;
    let data = new FormData();
    data.append("file", file);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/upload`, data, {
        headers: {
            "authorization": "Bearer " + token
        }
    }).then(res => {
        if (res.statusText === "OK") {
            uploadedFile = res.data;
        }
        else {
            ErrorAlert(res.data.errorMessage);
        }
    })

    return uploadedFile;
};

export const deleteFilesFun = async (file, token) => {
    let success;
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/delete`, { file }, {
        headers: {
            "authorization": "Bearer " + token
        }
    }).then(res => {
        if (res.statusText === "OK") {
            success = res.data;
        }
        else {
            ErrorMessage(res.data.errorMessage);
        }
    })

    return success;
};