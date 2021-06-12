import { Router } from "express";

class AgendaRouter {

    constructor(){
        this.router = Router();
        this.loadRoutes();
    }

    loadRoutes(){

    }

}

export default new AgendaRouter().router;