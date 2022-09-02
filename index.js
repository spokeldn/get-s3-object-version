const core = require('@actions/core');
// const github = require('@actions/github');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');

async function run() {
  try {
    const client = new S3Client({
      region: core.getInput('region'),
      credentials: {
        accessKeyId: core.getInput('aws_access_key'),
        secretAccessKey: core.getInput('aws_secret_key')
      }
    });

    const params = {
      Bucket: core.getInput('bucket'),
      Key: core.getInput('object_key')
    };

    const command = new HeadObjectCommand(params);
    const response = await client.send(command);

    core.setOutput('version_id', response.VersionId);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
