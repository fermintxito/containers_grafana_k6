# docker-k6-grafana-influxdb
Demonstrates how to run load tests with containerised instances of K6, Grafana and InfluxDB.

docker-compose up -d influxdb grafana
docker-compose run --rm k6 run /scripts/k6-script.js

Debug mode
docker-compose run --rm k6 run /scripts/k6-script.js --http-debug=full

# Convert your exported Postman collection to k6 script
Assuming your exported collection is named test-k6.postman_collection, you can run this command to convert it to a k6 script. 
The env.json includes all your environment variables that are exported from Postman.

postman-to-k6 test-k6.postman_collection.json -e env.json -o k6-script.js
postman-to-k6 test-k6.postman_collection.json -o k6-script.js

# Exportar los datos del resumen
Si no está interesado en cada una de las mediciones de las métricas individuales y, en cambio, desea ver sólo los datos agregados, exportar los datos del resumen de fin de la prueba a un archivo JSON puede ser una mejor opción que utilizar la salida JSON descrita en este documento.

k6 run --summary-export=export.json /scripts/k6-script.js

#### Article
This is the accompanying source code for the following article. Please read for a detailed breakdown of the code and how K6, Grafana and InfluxDB work together using Docker Compose:

https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3

#### Dashboards
The dashboard in /dashboards is adapted from the excellent K6 / Grafana dashboard here:
https://grafana.com/grafana/dashboards/2587

There are only two small modifications:
* the data source is configured to use the docker created InfluxDB data source
* the time period is set to now-15m, which I feel is a better view for most tests

#### Scripts
The script here is an example of a low Virtual User (VU) load test of the excellent Star Wars API:
https://swapi.dev/

If you're tinkering with the script, it is just a friendly open source API, be gentle!
