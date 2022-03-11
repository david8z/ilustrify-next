fbemulator:
	kill -9 $(lsof -t -i tcp:4040); kill -9 $(lsof -t -i tcp:9099); kill -9 $(lsof -t -i tcp:5001); kill -9 $(lsof -t -i tcp:8080);kill -9 $(lsof -t -i tcp:9199);cd firebase-emulator; firebase emulators:start --import=./data --export-on-exit

