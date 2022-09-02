const core = require('@actions/core');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3();

async function run() {
  try {
    const params = {
      Bucket: core.getInput('bucket'),
      Key: core.getInput('object_key')
    };

    const object = await s3.headObject(params).promise();

    core.setOutput('version_id', object.VersionId);
  } catch (error) {
    console.error(error)
    core.setFailed(error.message);
  }
}

run();
