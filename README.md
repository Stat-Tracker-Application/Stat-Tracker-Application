# GameStats tracker (named stat-tracker-application internally)

## Project Overview

GameStats Tracker is a Node.js microservices application designed to allow users to track their game statistics. Users can manually add their stats and share them with coaches, team members, and fans. The application is built using microservices architecture with a MongoDB database.

## Implemented Features:

- User authentication and signup
- Manually add stats
- Kubernetes deployment (Minikube)
- GDPR-compliant (but this can be improved)

## Missing Features:

- Complete Frontend
- Messaging between microservices
- Team member and coach management
- Privacy settings for stats
- Training routine management

## Technologies Used:

- Node.js
- MongoDB
- Kubernetes
- Minikube
- Docker
- Prometheus
- Grafana
- RabbitMQ

## Deployment

The application is currently deployed in a Kubernetes cluster using Minikube. To start the application, run the following commands after navigating to the kubernetes folder in the root project folder:

```bash
minikube start (make sure Docker is already running)

kubectl apply -f stat-api-hpa.yaml
kubectl create configmap prometheus-config --from-file=prometheus-config.yaml -n default --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -f prometheus-deployment.yaml
minikube addons enable metrics-server
kubectl apply -f authdb-config.yaml
kubectl apply -f gateway-config.yaml
kubectl apply -f statdb-config.yaml
kubectl apply -f userdb-config.yaml
kubectl apply -f authdb.yaml
kubectl apply -f statdb.yaml
kubectl apply -f userdb.yaml
kubectl apply -f auth-api-deployment.yaml
kubectl apply -f gateway-deployment.yaml
kubectl apply -f stat-api-deployment.yaml
kubectl apply -f user-api-deployment.yaml

kubectl get all (to make sure everything is running)

kubectl apply -f rabbitmq-config.yaml
helm install helm-rabbitmq bitnami/rabbitmq -f rabbitmq-config.yaml

(on a separate terminal) minikube tunnel
(on another separate terminal) kubectl port-forward service/prometheus-deployment 9090:9090 (this will allow you to reach Prometheus on localhost:9090)
(on yet another separate terminal in the same directory) docker run --rm -p 3000:3000 `
  -e GF_AUTH_DISABLE_LOGIN_FORM=true `
  -e GF_AUTH_ANONYMOUS_ENABLED=true `
  -e GF_AUTH_ANONYMOUS_ORG_ROLE=Admin `
  -v ${PWD}/datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml `
  grafana/grafana:7.1.5
(on another terminal) kubectl port-forward service/rabbitmq 15672:15672
```

## Contact Information

For any inquiries or assistance, please contact:

Bart Hagoort: </br>
Email: barthagoort2000@outlook.com </br>
Phone: +31 6 57113787 </br>

More information on the microservices themselves can be found in the READMEs for the respective microservice.

## License:

This project is licensed under the [MIT License](LICENSE).
