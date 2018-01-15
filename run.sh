#!/bin/bash

if [ $1 == "dev" ]; then
	cd client/
	npm run dev &
	cd ..
	export SB_ENV=development
	chmod +x server.js
	./server.js
else
	cd client/
	npm run build
	cd ..
	chmod +x server.js
	./server.js
fi