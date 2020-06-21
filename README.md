# Continerizing Angular App

This project shows How to run angular app inside a container:

* How to build a Angular app.
* How to run angular app along side nginx server.
* How to mount a volume inside a container that point to local dev environment.
* How to build an image.
* How to run a containerize angular app.

## Explore docker images on docker hub corresponding to repo.
*  https://hub.docker.com/repository/docker/saimsafdar14/nginx-angular



## Running the Application Locally with Node.js

1. Install the latest LTS version of Node.js from https://nodejs.org. *IMPORTANT: The server uses ES2015 features AND the Angular CLI so you need a current version of Node.js.*

1. Install the Angular CLI

    `npm install -g @angular/cli`

1. Run `npm install` to install app dependencies

1. Run `ng build --watch` to build and bundle the code

1. Run `npm start` in a separate terminal window to build the TypeScript, watch for changes and launch the web server

1. Go to http://localhost:8080 in your browser


## Running the Project Using Docker Containers

1. Install the Angular CLI

    `npm install -g @angular/cli`

1. Run `npm install` at the root of this project

1. Build the project

    `ng build`

1. Ensure that you have volumes (file sharing) enabled in the Docker Desktop settings.

1. Note that this build puts the build files directly in the `dist` folder. If your `angular.json` file in your own custom project puts them in a subfolder such as `dist/your-project-folder` then you'll need to update the `docker-compose.yml` file. In that case you'd change:

    ```yaml
    volumes:
      - ./dist:/usr/share/nginx/html
    ```

    To:

    ```yaml
    volumes:
      - ./dist/your-project-folder:/usr/share/nginx/html
    ```


1. Run `docker-compose build`

1. Run `docker-compose up`

1. Visit `http://localhost`

## Running the `Production` Version in Containers

1. Run `docker-compose -f docker-compose.prod.yml [build | up]`. This uses a multi-stage Docker build process to create the nginx image for the Angular app.

    **Note**: This project build puts the Angular build files directly in the `dist` folder. If your `angular.json` file in your own custom project puts them in a subfolder such as `dist/your-project-folder` then you'll need to update `nginx.prod.dockerfile` with the appropriate path. You'd need to update this instruction:

    ```dockerfile
    COPY --from=node /app/dist /usr/share/nginx/html
    ```

    To:

    ```dockerfile
    COPY --from=node /app/dist/your-project-folder /usr/share/nginx/html
    ```

## Running in Kubernetes

1. Install Docker Desktop from https://www.docker.com/get-started
1. Start Docker and enable Kubernetes in the Docker Desktop preferences/settings
1. Run `docker-compose build` to create the images
1. Run `kubectl apply -f .k8s` to start Kubernetes
1. Visit `http://localhost`
1. Stop Kubernetes using `kubectl delete -f .k8s`

## Using Docker Compose

    ```
    docker-compose build
    docker-compose up
    docker-compose down
    ```

 ## Docker Stacks --> Docker Desktop --> Kubernetes

    ```
    docker stack deploy -c docker-compose.yml angular-jumpstart
    docker stack ls
    docker stack rm angular-jumpstart

    ```   


## Running in Kubernetes using Kompose
From Docker-Compose + Kubernetes = Kompose  

    https://kompose.io/

    ```
    kompose convert -h
    kompose convert -f docker-compose.yml -o ./[your-folder-goes-here]
    ```

    Tweak the generated YAML. Then once ready run:

    ```
    kubectl apply -f [your-folder-name]
    ```

## Running with Skaffold

If you'd like to use the [Skaffold tool](https://skaffold.dev/docs/install) to run the project in Kubernetes, install it, and run the following command:

`skaffold dev`

To generate the `skaffold.yaml` file that's included in the project the following command was run and the image context paths it defines were modified:

```
skaffold init -k '.k8s/*.yml' \
  -a '{"builder":"Docker","payload":{"path":".docker/nginx.dev.dockerfile"},"image":"nginx-angular-jumpstart"}' \
  -a '{"builder":"Docker","payload":{"path":".docker/node.dockerfile"},"image":"node-service-jumpstart"}'
```

If you wanted to generate the initial Kubernetes manifest files from an existing docker-compose.yml file you can use the following command.
It uses the [Kompose tool](https://kompose.io) behind the scenes to create the YAML files

```
skaffold init --compose-file docker-compose.yml \
  -a '{"builder":"Docker","payload":{"path":".docker/nginx.dev.dockerfile"},"image":"nginx-angular-jumpstart"}' \
  -a '{"builder":"Docker","payload":{"path":".docker/node.dockerfile"},"image":"node-service-jumpstart"}'
```

