# Develop Node Applications directly in Kubernetes with Okteto

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a Node Sample App directly in Kubernetes. 

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a more empowered experience, follow this [guide](https://okteto.com/docs/samples/golang/) to deploy the Node Sample App in [Okteto Cloud](https://cloud.okteto.com), a free Kubernetes cluster for developers.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).

## Step 2: Deploy the Node Sample App

Get a local version of the Node Sample App by executing the following commands in your local terminal:

```console
$ git clone https://github.com/okteto/node-getting-started
```

The k8s.yml file contains the Kubernetes manifests to deploy the Node Sample App. Run the application by executing:

```console
$ kubectl apply -f k8s.yml
```

```console
deployment.apps "hello-world" created
service "hello-world" created
```

> If you don't have `kubectl` installed, follow this [guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).


## Step 3: Create your Okteto Environment

With the app deployed, you can start your Okteto Environment by running the following command:

```console
$ okteto up
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Namespace: cindy
    Name:      hello-world
    Forward:   3000 -> 3000

okteto>
```

The `okteto up` command will automatically start an Okteto Environment, which means:

- The Node Sample App container is updated with the docker image `okteto/node:10`. This image contains the required dev tools to build, test and run a Node application.
- A bidirectional file synchronization service is started to keep your changes up to date between your local filesystem and your Okteto Environment.

Once the Okteto Environment is ready, start your application by executing the following command in your Okteto Terminal:

```console
okteto> node app.js
Server running at http://0.0.0.0:3000/
```

You can now access the Node Sample App at http://localhost:3000.

## Step 4: Develop directly in the cloud

Now things get more exciting. Edit the file `app.js` and replace  `Hello from the cluster` with `Hello from Okteto` on line 13.

```javascript
const http = require('http');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 3000;

const namespaceFile = "/var/run/secrets/kubernetes.io/serviceaccount/namespace"
const namespace = fs.readFileSync(namespaceFile);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello from Okteto, namespace ${namespace}\n`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Save your changes. Cancel the execution of `node app.js` from your Okteto Terminal by pressing `ctrl + c` and restart your application:

```console
okteto> node app.js
```

Go back to the browser and reload the page. Notice how your changes are instantly applied. No commit, build or push required 😎! 


## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` + `exit` and run the following commands to remove the resources created by this guide: 

```console
$ okteto down
 ✓  Okteto Environment deactivated
 
```

```console
$ kubectl delete -f k8s.yml
deployment.apps "hello-world" deleted
service "hello-world" deleted
```
