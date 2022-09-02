# Get S3 Object Version

A GitHub action to get the latest version of a object in S3.

Requires an AWS role to be assumed before performing this action.

## Inputs

### `bucket`

**Required** The name of the bucket the object lives in

### `object_key`

**Required** The name of the object you wish to get the version of

## Outputs

### `version_id`

The latest version ID of the object requested

## Example usage

```
uses: spokeldn/get-s3-object-version@v1
with:
  bucket: my-bucket-name
  object_key: my-object
```
