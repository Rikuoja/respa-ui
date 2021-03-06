import { expect } from 'chai';
import React from 'react';
import sd from 'skin-deep';

import Footer from 'components/layout/Footer';

describe('Component: layout/Footer', () => {
  const props = {};
  const tree = sd.shallowRender(<Footer {...props} />);

  it('should render a footer element', () => {
    const footerTrees = tree.everySubTree('footer');
    expect(footerTrees.length).to.equal(1);
  });
});
