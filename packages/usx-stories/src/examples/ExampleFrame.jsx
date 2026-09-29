import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

export default function ExampleFrame({ children, target = 'example-content' }) {
  return (
    <>
      <Skipnav target={target} />
      <Banner id={`${target}-banner`} ariaLabel="Example banner" />
      <Header id={`${target}-header`} {...headerArgs} />
      {children}
      <Footer
        {...footerArgs}
        signUp={{ ...footerArgs.signUp, emailId: `${target}-footer-email` }}
      />
      <Identifier {...identifierArgs} />
    </>
  );
}
