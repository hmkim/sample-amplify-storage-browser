import { defineFunction } from '@aws-amplify/backend';

export const s3TagHandler = defineFunction({
  name: 's3-tag-handler',
  entry: './handler.ts',
  resourceGroupName: 'custom'
});