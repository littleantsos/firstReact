'use strict'

export default class Configs{


    static getAppServer(){
        return "http://pre.appapi.followme.com:9918";
    }

    static getActionRequestUrl(){
        return Configs.getAppServer() + "/api/Request/Action";
    }

}

