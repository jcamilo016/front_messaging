import axios from "axios";

export default axios.create({
    baseURL: `http://ec2-35-175-138-59.compute-1.amazonaws.com:8090/`,
});