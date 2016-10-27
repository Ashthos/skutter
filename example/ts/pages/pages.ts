import * as Lazy from "lazy.js";
import { Page } from "skutter";

class Pages {

    private pageFiles: string[] = [
        "./github-landing",
        "./github-search-results"
    ];

    private _pages: Page[] = [];

    find(pageName: string): Page {
        this.ensureLoaded();

        let page = Lazy(this._pages).find((page: Page) => { return page.name === pageName; });

        if (page === undefined || page === null) {
            let availablePages = this._pages.map((page: Page) => { return page.name; }).join(", ");

            if (availablePages.length > 0) {
                throw new Error(`Unable to find a page with the name "${pageName}". Available pages [${availablePages}]`);
            }

            throw new Error(`Unable to find a page with the name "${pageName}". There don't appear to be any pages registered.`);
        }

        return page;
    }

    private ensureLoaded(): void {
        if (!this._pages || this._pages.length != this.pageFiles.length) {
            Lazy(this.pageFiles).each((filename: string) => {
                try {
                    // Pages must be 'export { xxx as default }' in order to be loaded correctly here.
                    let page = require(filename).default;
                    this._pages.push(page);
                } catch (exception) {
                    throw new Error(`Error during load of ${filename}. Message: ${exception.message}.`);
                }
            });
        }
    }

}

export { Pages };