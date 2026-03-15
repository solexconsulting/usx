export default {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  refs: {
    react: {
      title: 'React',
      url: process.env.STORYBOOK_REACT_URL || 'http://192.168.86.60:7007'
    },
    html: {
      title: 'HTML',
      url: process.env.STORYBOOK_HTML_URL || 'http://192.168.86.60:7008'
    },
    django: {
      title: 'Django',
      url: process.env.STORYBOOK_DJANGO_URL || 'http://192.168.86.60:7010'
    }
  },
  docs: {
    autodocs: 'tag'
  }
};
