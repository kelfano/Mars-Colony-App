import { Mars1Page } from './app.po';

describe('mars1 App', function() {
  let page: Mars1Page;

  beforeEach(() => {
    page = new Mars1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
