import { axiosInstance } from "../helpers/axios-config";

const getMedias = () => {
    return axiosInstance.get('media', {
        header: {
            'Content-type': 'application/json '
        }
    });
}

const createMedia = (data) => {
    return axiosInstance.post('media', data, {
        header: {
            'Content-type': 'application/json '
        }
    });
}

const updateMedia = (mediaId, data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {
        header: {
            'Content-type': 'application/json '
        }
    });
}

export {
    getMedias,createMedia,updateMedia
}