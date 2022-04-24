import { createAction } from '@reduxjs/toolkit';

export const setSelectedRepository = createAction<string>('repository/setSelectedRepository');
