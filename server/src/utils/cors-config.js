import { REQ_PORT } from "../constants";

const corsOptions = {
    origin: REQ_PORT,
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    methods: "GET, POST, PUT, PATCH, DELETE"
};

export default corsOptions;