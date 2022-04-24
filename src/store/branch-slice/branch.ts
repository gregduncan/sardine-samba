import type { RepositoryDoc } from 'http-client';

export type BranchSummary = RepositoryDoc['item']['branchSummaries'][string];

export default interface Branch extends BranchSummary {
  dateCreated: string;
  details: string;
}
