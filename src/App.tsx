import React, { useState } from 'react';
import Router from './Router';

import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecoilValue } from 'recoil';

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { isDarkAtom } from './atoms';
import { darkTheme, lightTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  /* reset */ 
  * {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  }
  *:before,
  *:after {
    box-sizing: border-box;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  input,
  textarea,
  select {
    display: block;
    border-radius: 0;
    outline: none;
  }
  body,
  button,
  html,
  input,
  td,
  th {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-font-kerning: auto;
    font-kerning: auto;
  }
  fieldset {
    border: none;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  img {
    vertical-align: middle;
    border: none;
  }
  img,
  video {
    max-width: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }
  address,
  em,
  i {
    font-style: normal;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  /* style */
  #root {
  white-space: pre-line;
  }
  html {
    font-size: 16px;
  }
  body {
    font: 1rem/1.6 'Source Sans Pro', 'Malgun Gothic', sans-serif;
    width: 100vw;
    overflow-x: hidden;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  button {
    cursor: pointer;
    font: 1rem/1.6 'Source Sans Pro', 'Malgun Gothic', sans-serif;
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
  } 
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;
