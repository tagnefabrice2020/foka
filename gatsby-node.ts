function langPrefix(page: any): string {
  return page.context.language === page.context.i18n.defaultLanguage &&
    !page.context.i18n.generateDefaultLanguagePage
    ? ""
    : `/${page.context.language}`;
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }: any) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/\/account/)) {
    page.matchPath = `${langPrefix(page)}/account/*`;
    // console.log({ matchPath: page.matchPath, prefix: `${langPrefix(page)}`});
    // Update the page.
    createPage(page);
  }

  if (page.path.match(/\/exercise/)) {
    page.matchPath = `${langPrefix(page)}/exercise/*`;

    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    node: {
      global: true,
      fs: "empty",
    },
  });
};
