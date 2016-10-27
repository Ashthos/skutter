import { SkutterDictionary, ISkutterLibrary, SkutterLibrary, GivenDefinition, ThenDefinition, BrowserActions } from "skutter";
import { Pages } from "../pages/pages";

class ExampleSteps {

    private lib: ISkutterLibrary;

    constructor() {
        let dictionary = new SkutterDictionary()
            .define("quotedWordOrWords", /"([^"]+)"/)
            .define("nonQuotedWord", /([^\s"]+)/);

        this.lib = new SkutterLibrary(dictionary);
    }

    createLibrary(): ISkutterLibrary {

        let pages = new Pages();
        let lib = this.lib;

        lib.given(new GivenDefinition(["I am viewing the github-landing page"]), function (next: Function){
            let page = pages.find("github-landing");

            return BrowserActions.navigateTo(this.context.browser, page)
                .then(() => {
                    this.context.page = page;
                    next();
                });
        });

        lib.then(new ThenDefinition(["I am viewing the $quotedWordOrWords page",
                                     "I am viewing the $nonQuotedWord page"]), function (pageName: string, next: Function){
            let page = pages.find(pageName);

            if (!page) {
                throw new Error(`Unable to find a page with name ${pageName}`);
            }

            return BrowserActions.isPageLoaded(this.context.browser, page)
                .then(() => {
                    // this.context.page is used by skutter to determine where it gets its structure definitions.
                    this.context.page = page;
                    next();
                }, (reason) => {
                    throw new Error("Expected page not loaded. " + reason);
                });
        });

        return lib;
    }
}

export { ExampleSteps as default };