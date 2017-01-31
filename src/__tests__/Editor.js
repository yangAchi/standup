
import Editor from '../Editor';
let ed = new Editor;
it('detect URL ', () => {
  expect(ed.detectURL("my www.devpools.kr ")).toEqual("www.devpools.kr");
});