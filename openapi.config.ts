// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateService } = require('@umijs/openapi');

generateService({
  // todo 需要修改为实际的文档地址
  schemaPath: 'http://localhost:8101/api/v2/api-docs',
  serversPath: './servers',
});
