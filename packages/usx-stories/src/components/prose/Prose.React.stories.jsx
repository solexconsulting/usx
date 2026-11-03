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
  Default: config.default,
  ProseWithDiv: { content: SmallHTMLString, as: 'div' },
  ProseWithArticle: { content: SmallHTMLString, as: 'article' },
  ProseWithSection: { content: SmallHTMLString, as: 'section' },
  ProseWithMain: { content: SmallHTMLString, as: 'main' },
};

export const Default = { args: storyDefs.Default };
export const ProseWithDiv = { args: storyDefs.ProseWithDiv };
export const ProseWithArticle = { args: storyDefs.ProseWithArticle };
export const ProseWithSection = { args: storyDefs.ProseWithSection };
export const ProseWithMain = { args: storyDefs.ProseWithMain };
