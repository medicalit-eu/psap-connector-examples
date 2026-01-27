# PSAP Connector (Node.js)

## Requirements

- Node.js 18+ (uses built-in `fetch`)

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Server listens on port `3000` by default. Override with `PORT`:

```bash
PORT=8080 npm start
```

## Authentication

All endpoints require a bearer token issued by `https://identity.ng-sos.com/`.

Example header:

```text
Authorization: Bearer <jwt>
```
