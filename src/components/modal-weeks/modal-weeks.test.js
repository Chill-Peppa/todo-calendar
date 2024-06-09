import renderer from 'react-test-renderer';
import ModalWeeks from './modal-weeks';

it('should correctly render ModalOverlay', () => {
  const tree = renderer.create(<ModalWeeks />).toJSON();
  expect(tree).toMatchSnapshot();
});
