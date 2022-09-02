const core = require('@actions/core');
const github = require('@actions/github');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');

async function run() {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  const client = new S3Client({});

  try {
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
