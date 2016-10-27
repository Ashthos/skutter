import { Page, PageElements } from "skutter";

let structure = new PageElements.Container("Page", by.tagName("html"), {
    "repo-link": new PageElements.Any("repo-link", by.xpath("//*[@id='js-repo-pjax-container']/div/div/h1//strong/a"))
});

let page = new Page(
    "github-search-results",  /* Page Name */
    "https://github.com/Ashthos/skutter/search", /* Page Url */
    "Search Results · GitHub",  /* Expected Page Title */
    structure,
    false);

export { page as default };