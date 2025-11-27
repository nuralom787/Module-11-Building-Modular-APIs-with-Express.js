import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { RouteHandler, routes } from "./healpers/RouteHandler";
import "./routes";

function findDynamicRoute(method: string, url: string) {
    const methodMap = routes.get(method);
    if (!methodMap) return null;

    // for()
};


const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log("Server Is Running: ");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
        handler(req, res);
    }
    else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: "Not Found!!",
            path
        }))
    };

    // if (req.url == "/" && req.method == "GET") {
    //     res.writeHead(200, { "content-type": "application/json" });
    //     res.end(JSON.stringify({
    //         message: "Hello From Node JS With Typescript...",
    //         path: req.url,
    //     }))
    // };

    // if (req.url == "/api" && req.method == "GET") {
    //     res.writeHead(200, { "content-type": "application/json" });
    //     res.end(JSON.stringify({
    //         message: "Health status OK",
    //         path: req.url,
    //     }))
    // };

    // if (req.url == "/api/user" && req.method == "POST") {
    //     // const user = {
    //     //     id: 1,
    //     //     name: "Alice"
    //     // };
    //     // res.writeHead(200, { "content-type": "application/json" });
    //     // res.end(JSON.stringify(user));

    //     let body = "";
    //     // * listen for data chunk.
    //     req.on("data", chunk => {
    //         body += chunk.toString();
    //     });

    //     req.on("end", () => {
    //         try {
    //             const parseBody = JSON.parse(body);
    //             console.log(parseBody);
    //             console.log("New Changes");
    //             res.end(body);
    //         } catch (err: any) {
    //             console.log(err?.message);
    //         }
    //     });

    // };
});


server.listen(config.port, () => {
    console.log(`server is Running on port: ${config.port}`);
});