# gas-line-bot-template.ts

## Architecture

```mermaid
graph LR
  subgraph main
    client
    application
    persistence
  end
  subgraph adaptor
    client-adaptor
    persistence-adaptor
  end

  client -.-> application -.-> persistence
  client --> client-adaptor
  application --> client-adaptor
  application --> persistence-adaptor
  persistence --> persistence-adaptor
```

## Requirement

```bash
clasp -v
2.4.1
```

```bash
node -v
v18.0.0
```

```bash
npm -v
8.6.0
```

## Prepare

### Init

```bash
clasp create --type standalone
```

### Install

```bash
npm ci
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```
