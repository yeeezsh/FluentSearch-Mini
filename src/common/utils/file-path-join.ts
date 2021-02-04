export default (hostname: string, fileId: string, port?: number): string =>
  `http://${hostname}${port ? `:${port}` : undefined}/file/${fileId}`;
