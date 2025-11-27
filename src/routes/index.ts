import { readUsers, writeUsers } from "../healpers/fileDB";
import parseBody from "../healpers/parseBody";
import addRoutes from "../healpers/RouteHandler";
import sendJson from "../healpers/sendjson";


addRoutes("GET", "/", (req, res) => {
    sendJson(res, 200, {
        message: "Hello From Node JS With Typescript...",
        path: req.url,
    });
});


addRoutes("GET", "/api", (req, res) => {
    sendJson(res, 200, {
        message: "Health status OK",
        path: req.url,
    })
});


addRoutes("POST", "/api/users", async (req, res) => {
    const body = await parseBody(req);

    const users = readUsers();

    const newUser = {
        ...body,
    };

    users?.push(newUser);

    writeUsers(users);

    sendJson(res, 201, { success: true, body: body });
});