<!--toc:start-->
- [DESCRIPTION](#description)
  - [DEVELOPMENT REQUIREMENTS](#development-requirements)
  - [HOW TO STAT](#how-to-stat)
  - [HOW TO STOP](#how-to-stop)
  - [LINK](#link)
    - [ENV](#env)
  - [GATEWAY](#gateway)
    - [ENV](#env)
<!--toc:end-->

# DESCRIPTION

This application implements a one-time link service

## DEVELOPMENT REQUIREMENTS

[Go](https://go.dev/) (version 1.19 or later)

## HOW TO STAT

```sh
npm run docker:up
```

## HOW TO STOP

```sh
npm run docker:down
```

## LINK

### ENV

| ENV NAME          | REQUIRED | DEFAULT VALUE                    |
| ----------------- | -------- | -------------------------------- |
| MONGODB_URL       | ❌       | mongodb://localhost:27017        |
| MONGODB_DATABASE  | ❌       |                                  |
| REDIS_URL         | ❌       | 127.0.0.1:6379                   |
| NATS_URL          | ❌       | nats://127.0.0.1:4222            |
| LOGGER_FORMATTER  | ❌       | console                          |
| LOGGER_LOG_LEVELS | ❌       | log\|error\|warn\|debug\|verbose |

## GATEWAY

### ENV

| ENV NAME          | REQUIRED | DEFAULT VALUE                    |
| ----------------- | -------- | -------------------------------- |
| BACKEND_URL       | ❌       | <http://localhost:3000>          |
| NATS_URL          | ❌       | nats://127.0.0.1:4222            |
| LOGGER_FORMATTER  | ❌       | console                          |
| LOGGER_LOG_LEVELS | ❌       | log\|error\|warn\|debug\|verbose |
