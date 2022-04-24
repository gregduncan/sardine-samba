import { HALLink } from 'http-client';

export const findLink = (links: HALLink[], rel: string) => {
  return links.find(l => l.rel === rel);
};
