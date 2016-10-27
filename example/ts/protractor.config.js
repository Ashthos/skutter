'use strict';

/*global angular:true*/
/*global browser:true*/

exports.config = {
    framework: 'jasmine2',
    
    capabilities: {
        browserName: 'chrome',
		shardTestFiles: true,
        maxInstances: 1,
        chromeOptions: {
            get args() {
                return [
                    '--disable-extensions',
                    '--start-maximized',
                    '--allow-file-access-from-files', // Used to load example html file. Should not be required in hosted web situations.
                    // '--window-size=2920,2080',
                    'user-agent=Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36 Ticks' + new Date().getTime() + 'Ticks'
                ];
            },
            prefs: {
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': 'c:\\temp\\downloads'
                }
            }
        }
    },

    rootElement: '[ng-app]',

    maxSessions: 1,

    get seleniumAddress(){
        // If the global variable 'useGrid' has been set then utilise the grid, otherwise return undefined.

        /*global global:true*/
        if (global.useGrid === true || global.useGrid === 'true'){
            return global.seleniumAddress;
        }

        return undefined;
    },

    get directConnect(){                      
        // directConnect bypasses selenium and goes directly to the webbrowser.
        if (this.seleniumAddress){
            return false;
        }

        return true;
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000,
        print: function() {} // remove dots
    },

    onPrepare: function () {
        var disableNgAnimate = function () {
            angular.module('disableNgAnimate', []).run(function ($animate) {
                $animate.enabled(false);
            });
        };

        browser.addMockModule('disableNgAnimate', disableNgAnimate);
    }

};