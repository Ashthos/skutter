import { Page, PageElements } from "skutter";

let structure = new PageElements.Container("Page", by.tagName("html"), {
    "skutter-header": new PageElements.Label("skutter-header", by.id("user-content-skutter-scutter")),
    "repo-search-box": new PageElements.Textbox("repo-search-box", by.xpath("//form[@data-scoped-search-url='/Ashthos/skutter/search']/label/input"))
});

let page = new Page(
    "github-landing",  /* Page Name */
    "https://github.com/Ashthos/skutter", /* Page Url */
    "Ashthos/skutter: Javascript BDD Driven Browser Testing for your Angular/Aurelia website.",  /* Expected Page Title */
    structure,
    false);

export { page as default };