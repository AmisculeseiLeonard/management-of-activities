import axios from 'axios';

const RELEASE_API_BASE_URL = "http://localhost:8082/api/releases";

class ReleaseService {

    getReleases() {
        return axios.get(RELEASE_API_BASE_URL);
    }

    createRelease(release) {
        return axios.post(RELEASE_API_BASE_URL, release);
    }

    getReleasesByProductId(productId) {
        return axios.get(RELEASE_API_BASE_URL + 'ByProductId/' + productId);
    }

    createReleaseForSpecificProduct(release, releaseId) {
        return axios.post(RELEASE_API_BASE_URL + '/' + releaseId, release );
    }

    getReleaseById(releaseId) {
        return axios.get(RELEASE_API_BASE_URL + '/' + releaseId);
    }

    updateRelease(release, releaseId){
        return axios.put(RELEASE_API_BASE_URL + '/' + releaseId, release);
    }

    deleteRelease(releaseId) {
        return axios.delete(RELEASE_API_BASE_URL + '/' + releaseId);
    }

}

export default new ReleaseService()