// Auto-generated by the postman-to-k6 converter

import "./libs/shim/core.js";
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 50 virtual users (VUs) in 5s
      { duration: "10s", target: 50 },

      // Stay at rest on 50 VUs for 10s
      { duration: "10s", target: 50 },

      // Ramp-down from 50 to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "security/token/create",
    id: "2ae91c1c-12fe-4bd5-90f5-253b4eb3fab1",
    method: "POST",
    address: "http://192.168.1.179:8080/api/public/security/token/create",
    headers: {
      username: "userk6@test.com",
      userSecret: "userk6@test.com",
      clientId: "web_app",
      clientSecret: "bf66f6a9-8da0-4217-9767-4bb5e80d8c5f"
    },
    post(response) {
      pm.test("Store access_token test", function() {
        // Assign Autorization header value to Token variable
        var jsonResponseBody = JSON.parse(responseBody);
        var jsonData = jsonResponseBody.token;
        //console.log(jsonData);
        pm.environment.set("access_token", jsonData);
        pm.cookies.clear;
        pm.response.to.have.status(200);
      });

      //Replace X-XSFR-TOKEN with your cookie name
      //var xsrfCookie = postman.getResponseCookie("XSRF-TOKEN");
      //postman.setEnvironmentVariable("x-xsrf-token", xsrfCookie.value);
    }
  });

  const response = postman[Request]({
    name: "Validate document (front & back)",
    id: "fed792bc-4e0c-4a9f-84e5-59d5f794ab0e",
    method: "POST",
    address:
      "http://192.168.1.179:8080/api/public/health/test/createAndIdentifyCloseRevome",
    data:
    post(response) {
      pm.test("Store operation_id test", function() {
        // Assign Autorization header value to Token variable
        var jsonResponseBody = JSON.parse(responseBody);
        var operation_id = jsonResponseBody.data.operationId;
        //console.log(jsonData);
        pm.environment.set("operation_id", operation_id);
        pm.cookies.clear;
        pm.response.to.have.status(200);
      });
    },
    auth(config, Var) {
      config.headers.Authorization = `Bearer ${pm[Var]("access_token")}`;
    }
  });
  check(response, { "status is 200": (r) => r.status === 200 });
  check(response, { "status is 500": (r) => r.status === 500 });
  sleep(.300);
}