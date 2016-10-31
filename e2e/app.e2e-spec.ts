import { FireStoragePage } from './app.po';

describe('fire-storage App', function() {
  let page: FireStoragePage;

  beforeEach(() => {
    page = new FireStoragePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
