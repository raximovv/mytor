// Local stand-in for the demo-request endpoint, for testing the form's response handling only.
// Never use it for real requests: it keeps nothing and answers by path.
//   node scripts/form-mock.js            → http://localhost:4400
//   /ok    → 200 {"ok":true}        /fail → 500
//   /slow  → answers after 20 s (the form gives up after 15 s)
//   /reject → 400 (e.g. spam filter or bad payload)
import { createServer } from "node:http";

const port = Number(process.env.MOCK_PORT) || 4400;
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept" };
let received = 0;

createServer((req, res) => {
  if (req.method === "OPTIONS") return res.writeHead(204, cors).end();
  if (req.url === "/count") return res.writeHead(200, { ...cors, "Content-Type": "application/json" }).end(JSON.stringify({ received }));
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    let data = null;
    try { data = JSON.parse(body); } catch {}
    const valid = data && data.name && data.phone && data.city && data.consent === true;
    if (valid) received++;
    console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${valid ? "valid" : "INVALID"} payload: ${body}`);
    const reply = (status) => res.writeHead(status, { ...cors, "Content-Type": "application/json" }).end(JSON.stringify({ ok: status < 300 }));
    if (req.url.startsWith("/slow")) return setTimeout(() => reply(200), 20000);
    if (req.url.startsWith("/fail")) return reply(500);
    if (req.url.startsWith("/reject") || !valid) return reply(400);
    reply(200);
  });
}).listen(port, () => console.log(`Form mock: http://localhost:${port}/ok | /fail | /slow | /reject`));
