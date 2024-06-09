import renderer from 'react-test-renderer';

import App from './app';

it('should correctly render App', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
