import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import proseConfig from '../components/prose/config.json';
import { buildArgTypes, componentTag } from './helper';

const generatedArgTypes = buildArgTypes(proseConfig.props || {});

export default {
  title: 'Django/Prose',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const BigHTMLString = `
    <h1>Page Heading</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur
        ligula. Donec a semper dui.
    </p>
    <h2>Section Heading</h2>
    <h3>Section of the page</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur
        ligula. Donec a semper dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur
        ligula. Donec a semper dui.
    </p>
    <h4>Subsection of the page</h4>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur
        ligula. Donec a semper dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <h5>Subsection of the page</h5>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur ligula.
    </p>
    <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Donec suscipit auctor dui, sed efficitur ligula.</li>
        <li>Donec a semper dui:
            <ol>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Donec suscipit auctor dui, sed efficitur ligula:
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Donec suscipit auctor dui, sed efficitur ligula.</li>
                        <li>Donec a semper dui.</li>
                    </ul>
                </li>
                <li>Donec a semper dui.</li>
            </ol>
        </li>
    </ul>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur
        ligula. Donec a semper dui.
    </p>
    <ol>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Donec suscipit auctor dui, sed efficitur ligula.</li>
        <li>Donec a semper dui:
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Donec suscipit auctor dui, sed efficitur ligula:
                    <ol>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Donec suscipit auctor dui, sed efficitur ligula.</li>
                        <li>Donec a semper dui.</li>
                    </ol>
                </li>
                <li>Donec a semper dui.</li>
            </ul>
        </li>
    </ol>
    <table>
        <caption>
            Table caption
        </caption>
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
                <td>Row 1, Cell 3</td>
            </tr>
            <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td>
                <td>Row 2, Cell 3</td>
            </tr>
            <tr>
                <td>Row 3, Cell 1</td>
                <td>Row 3, Cell 2</td>
                <td>Row 3, Cell 3</td>
            </tr>
        </tbody>
    </table>
`;

const SmallHTMLString = `
    <h1>Page Heading</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <ul>
      <li>Donec a semper dui:
          <ol>
              <li>Donec suscipit auctor dui, sed efficitur ligula:
                  <ul>
                      <li>Donec a semper dui.</li>
                  </ul>
              </li>
          </ol>
      </li>
    </ul>

    <table>
      <thead>
          <tr>
              <th>Column 1</th>
              <th>Column 2</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
          </tr>
          <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
          </tr>
      </tbody>
  </table>
`;



export const Prose = {
  args: {
    content: BigHTMLString,
    containerElement: 'div'
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'prose',
          props: {
            content: BigHTMLString,
            containerElement: 'div'
          }
        })
      }
    }
  },
  render: djangoComponent('prose')
};

export const ProseWithDiv = {
  args: {
    content: SmallHTMLString,
    containerElement: 'div'
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'prose',
          props: {
            content: SmallHTMLString,
            containerElement: 'div'
          }
        })
      }
    }
  },
  render: djangoComponent('prose')
};

export const ProseWithArticle = {
  args: {
    content: SmallHTMLString,
    containerElement: 'article'
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'prose',
          props: {
            content: SmallHTMLString,
            containerElement: 'article'
          }
        })
      }
    }
  },
  render: djangoComponent('prose')
};

export const ProseWithSection = {
  args: {
    content: SmallHTMLString,
    containerElement: 'section'
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'prose',
          props: {
            content: SmallHTMLString,
            containerElement: 'section'
          }
        })
      }
    }
  },
  render: djangoComponent('prose')
};

export const ProseWithMain = {
  args: {
    content: SmallHTMLString,
    containerElement: 'main'
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'prose',
          props: {
            content: SmallHTMLString,
            containerElement: 'main'
          }
        })
      }
    }
  },
  render: djangoComponent('prose')
};
