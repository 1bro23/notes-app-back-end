const UserHandlers = require("./handler");
const routes = require("./routes");

module.exports={
    name:'users',
    version:'1.0.0',
    register:async(server,{service,validator})=>{
        const userHandlers = new UserHandlers(service,validator);
        server.route(routes(userHandlers));
    }
}