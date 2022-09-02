const core = require('@actions/core');
const github = require('@actions/github');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');

const client = new S3Client({});

(async () => {
  try {
    const params = {
      Bucket: core.getInput('bucket'),
      Key: core.getInput('object_key')
    };

    const command = new HeadObjectCommand(params);
    const response = await client.send(command);

    core.setOutput('version_id', response.VersionId);

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
