import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../src/App';

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

export default ThemeDecorator;
