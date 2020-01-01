import proxy from "http-proxy-middleware";

export default function(app) {
  app.use(proxy("/api/*", { target: "http://192.168.1.30:6000" }));
}
