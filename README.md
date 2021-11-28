# PubCG (backend)

## .env

```
ALLOWED_ORIGINS=http://127.0.0.1:3000, http://localhost:3000, https://pubcg.netlify.app, <Your External IP>

AWS_ACCESS_KEY_ID=<AWS Access Key>
AWS_SECRET_ACCESS_KEY=<AWS Secret Access Key>
AWS_REGION=<AWS Region>
AWS_S3_BUCKET=<AWS S3 Bucket Name>

DATABASE_NAME=<AWS RDS Database Name>
DATABASE_USERNAME=<AWS RDS Username>
DATABASE_PASSWORD=<AWS RDS Password>
DATABASE_HOST=<AWS RDS Endpoint>
DATABASE_PORT=<AWS RDS Database Port>

DB_FORCE=false
MOCK=false
MOCK_IS_LOGGING=false

NODE_ENV=DEV
#NODE_ENV=PRD
PORT=8080
PUBLIC_DIR=http://localhost:8080
#PUBLIC_DIR=<AWS S3 Public Object>
```