export default (hostname: string, fileId: string): string =>
  `http://${hostname}/file/${fileId}`;
