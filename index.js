const core = require('@actions/core');
// const github = require('@actions/github');
// const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  accessKeyId: core.getInput('aws_access_key'),
  secretAccessKey: core.getInput('aws_secret_key')
});

async function run() {
  console.log('beginning action');
  try {
    // const client = new S3Client({
    //   region: core.getInput('region'),
    //   credentials: {
        // accessKeyId: core.getInput('aws_access_key'),
        // secretAccessKey: core.getInput('aws_secret_key')
    //   }
    // });

    console.log('setup client');

    const params = {
      Bucket: core.getInput('bucket'),
      Key: core.getInput('object_key')
    };

    console.log(JSON.stringify(params));

    const object = await s3.headObject(params).promise();

    // const command = new HeadObjectCommand(params);
    // const response = await client.send(command);

    console.log(object);

    core.setOutput('version_id', object.VersionId);
  } catch (error) {
    console.error(error)
    core.setFailed(error.message);
  }
}

run();
