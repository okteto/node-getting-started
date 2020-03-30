.PHONY: push
push:
	okteto build -t okteto/hello-world:node-dev --target dev .
	okteto build -t okteto/hello-world:node .
