import app from "vinext/server/fetch-handler";
import { handleContact, type ContactEnvironment } from "./server/contact";

export default {
  fetch(request: Request, env: ContactEnvironment, ctx: unknown) {
    if (new URL(request.url).pathname === "/api/contact") return handleContact(request, env);
    return app.fetch(request, env, ctx);
  },
};
