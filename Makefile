.PHONY: push
push:
	okteto build -t okteto/hello-world:node .
