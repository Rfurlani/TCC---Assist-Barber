import { REQ_PORT } from "../constants";

const corsOptions = {
    origin: REQ_PORT,
    credentials: true,
    allowedHeaders: "Content-Type,X-Requested-With,Accept,Authorization,Origin," +
    "Access-Control-Request-Method,Access-Control-Request-Headers",
    methods: "GET, POST, PUT, PATCH, DELETE"
};

export default corsOptions;