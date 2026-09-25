import Prose from '../../../../usx-react/src/components/prose/Prose.tsx';
import config from '../../../../usx-react/src/components/prose/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Prose',
  component: Prose,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const BigHTMLString = `
    <h1>Page Heading</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur
        ligula. Donec a semper <a href="#">dui</a> lorem <a class="usx-no-visited" href="#somethingelse">another link</a>, and <a class="usa-link usx-link usa-link--external" href="https://google.com">a third link</a>.
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


export const storyDefs = {
  Default: { content: BigHTMLString, containerElement: 'div' },
  ProseWithDiv: { content: SmallHTMLString, containerElement: 'div' },
  ProseWithArticle: { content: SmallHTMLString, containerElement: 'article' },
  ProseWithSection: { content: SmallHTMLString, containerElement: 'section' },
  ProseWithMain: { content: SmallHTMLString, containerElement: 'main' },
};

export const Default = { args: storyDefs.Default };
export const ProseWithDiv = { args: storyDefs.ProseWithDiv };
export const ProseWithArticle = { args: storyDefs.ProseWithArticle };
export const ProseWithSection = { args: storyDefs.ProseWithSection };
export const ProseWithMain = { args: storyDefs.ProseWithMain };
