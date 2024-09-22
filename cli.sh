#!/bin/bash

if [ -z "${ENV}" ]; then
    ENV="dev"
fi

if [ ! -e node_modules ]
then
  mkdir node_modules
fi

case `uname -s` in
  MINGW*)
    USER_UID=1000
    GROUP_UID=1000
    ;;
  *)
    if [ -z ${USER_UID:+x} ]
    then
      USER_UID=`id -u`
      GROUP_GID=`id -g`
    fi
esac

clear () {
  docker-compose down; 
  sudo rm -rf node_modules;
  sudo rm -rf .pnpm-store;
  sudo rm -rf .next;
  sudo rm -rf coverage;
  docker rmi swarm-console:1.0.0;
}

install () {
  docker-compose -p swarm-console run --rm -u "$USER_UID:$GROUP_GID" app pnpm install
}

installWithNpm() {
  docker-compose -p swarm-console run --rm -u "$USER_UID:$GROUP_GID" app npm install
}

runDev () {
  docker-compose -p swarm-console run -u "$USER_UID:$GROUP_GID" app pnpm run dev
}

build() {
  docker-compose -p swarm-console run --rm -u "$USER_UID:$GROUP_GID" app pnpm run build
}

buildWithNpm() {
  docker-compose -p swarm-console run --rm -u "$USER_UID:$GROUP_GID" app npm run build
}

start() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run start
}

test() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run test
}

testWithNpm() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app npm run test
}

testWatch() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run test:watch
}

testWithNpmWatch() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app npm run test:watch
}

lint() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run lint
}

format() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run format
}

for param in "$@"
do
  case $param in
    clear)
      clear
      ;;
    install)
      install
      ;;
    installWithNpm)
      installWithNpm
      ;;
    runDev)
      runDev
      ;;
    build)
      build
      ;;
    buildWithNpm)
      buildWithNpm
      ;;
    start)
      start
      ;;
    test)
      test
      ;;
    testWithNpm)
      testWithNpm
      ;;
    testWithNpmWatch)
      testWithNpmWatch
      ;;
    testWatch)
      testWatch
      ;;
    lint)
      lint
      ;;
    format)
      format
      ;;
    *)
      echo "Invalid argument : $param"
  esac
  if [ ! $? -eq 0 ]; then
    echo "Usage: $0 <clear|install|runDev|build|start|test|lint|format>"
    exit 1
  fi
done
