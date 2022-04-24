import { HALLink } from 'http-client';
import { BranchSummary } from '../branch-slice/branch';

export default interface Repository {
  branchSummaries: Record<string, BranchSummary>;
  id: string;
  links: HALLink[];
  name: string;
  readonly readonly: boolean;
}
