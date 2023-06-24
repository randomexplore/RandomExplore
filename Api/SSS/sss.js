const { S3Client} = require('@aws-sdk/client-s3');
const SSS = new S3Client({
    region:process.env.RNEXAW_RE,
    credentials: {
      accessKeyId:process.env.RNEXAW_ACK,
      secretAccessKey:process.env.RNEXAW_SRK,
    },
  });
  
  module.exports = SSS