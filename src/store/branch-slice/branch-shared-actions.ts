import { findLink } from '@/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import HttpClient, { BranchDoc } from 'http-client';
import Repository from '../repository-slice/repository';

const addBranchRelType = 'AddBranch';

export const addBranchAsync = createAsyncThunk('branch/add', ({ repository, name }: { repository: Repository; name: string }) => {
  return HttpClient.post<BranchDoc>(findLink(repository.links, addBranchRelType)!.href.replace('{{name}}', name));
});
