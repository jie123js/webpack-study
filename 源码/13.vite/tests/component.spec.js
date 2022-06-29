import { mount } from '@vue/test-utils';
const Message = {
  template: '<p>{{msg}}</p>',
  props: ["msg"]
}
test('测试Message', () => {
  const wrapper = mount(Message, {
    props: {
      msg: 'hello'
    }
  });
  expect(wrapper.text()).toContain('hello');
});