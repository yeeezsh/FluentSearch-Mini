import { join } from 'path';

export default (hostname: string, port: number, others?: string[]): string => {
  const right = others === undefined ? [] : others;
  return join(`http://${hostname}${port ? `:${port}` : undefined}/`, ...right);
};
