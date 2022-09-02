const core = require('@actions/core');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3();

async function run() {
  console.log('beginning action');

  try {
    console.log('setup client');

    const params = {
      Bucket: core.getInput('bucket'),
      Key: core.getInput('object_key')
    };

    console.log(JSON.stringify(params));

    const object = await s3.headObject(params).promise();

    console.log(object);

    core.setOutput('version_id', object.VersionId);
  } catch (error) {
    console.error(error)
    core.setFailed(error.message);
  }
}

run();
