import {browser, Config} from "protractor";
declare const allure: any;
import {initializeReporters} from "./config/reporters";
import * as process from "process";

export let config: Config = {
    directConnect: true,
    selenium_promise_manager: 0,
    allScriptsTimeout: 60000,
    nativeEvents: false,
    capabilities: {
        shardTestFiles: true,
        maxInstances: 2,
        'browserName': 'chrome',
        'platform': 'ANY',
        'version': '11',
        'loggingPrefs': {
            'browser': 'ALL',
            'performance': 'ALL'
        },

        chromeOptions: {
            perfLoggingPrefs: {
                'enableNetwork': true,
                'enablePage': false,
            },
            'args': ['disable-infobars=true',
                'safebrowsing-disable-download-protection',
                '--disable-impl-side-painting',
                '--disable-gpu',
                '--headless',
                '--no-sandbox',
                '--window-size=1920x1080',
            ],
            prefs: {
                'safebrowsing' : {
                    'enabled' : true,
                    'disable_download_protection': true,
                },
                'download': {
                    'extensions_to_open': 'xml',
                    'behavior': 'allow',
                    'directory_upgrade': true,
                    'prompt_for_download': false,
                    'default_directory': __dirname + '\\utils\\output\\downloads\\'
                },
            }
        }
    },
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
        './helper/beforeAfter.js',
        './test/e2e/admi*/**/**/*.e2e.spec.js',
        './test/e2e/aler*/**/**/*.e2e.spec.js',
        './test/e2e/bomV*/**/**/*.e2e.spec.js',
        './test/e2e/cpl*/**/**/*.e2e.spec.js',
        './test/e2e/home*/**/**/*.e2e.spec.js',
        './test/e2e/imp*/**/**/*.e2e.spec.js',
        './test/e2e/knowle*/**/**/*.e2e.spec.js',
        './test/e2e/log*/**/**/*.e2e.spec.js',
        './test/e2e/new*/**/**/*.e2e.spec.js',
        './test/e2e/partAl*/**/**/*.e2e.spec.js',
        './test/e2e/partDe*/**/**/*.e2e.spec.js',
        './test/e2e/re*/**/**/*.e2e.spec.js',
        './test/e2e/se*/**/**/*.e2e.spec.js',
        './test/e2e/works*/**/**/*.e2e.spec.js',

    ],

    exclude: [
        './test/e2e/smoke/**/**/*.e2e.spec.js',
        './test/e2e/bomVault/partStand*/colum*/**/*.e2e.spec.js',
        './test/e2e/search/deepLink/searchUsingDeeplink.e2e.spec.js',
        './siteAdmin/e2e/**/**/*.e2e.spec.js',

    ],

    suites:{
        all: ['./helper/beforeAfter.js',
            './test/e2e/**/**/**/*.e2e.spec.js',
        ],
        alerts: [
            './helper/beforeAfter.js',
            './test/e2e/alerts/**/**/*.e2e.spec.js'
        ],
        bomSummary: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/bomSummary/**/*.e2e.spec.js'
        ],
        bomTree: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/bomTree/**/*.e2e.spec.js'
        ],
        bomTreeParts: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/bomTreeParts/*.e2e.spec.js'
        ],
        singleBom: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/singleBom/**/*.e2e.spec.js'
        ],
        bomVault: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/bomV*/**/*.e2e.spec.js'
        ],
        partStandard: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/partStand*/**/**/*.e2e.spec.js'
        ],
        vaultSummary: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/vaultSummary/**/*.e2e.spec.js'
        ],
        cpl: [
            './helper/beforeAfter.js',
            './test/e2e/cpl/cp*/**/*.e2e.spec.js'
        ],
        deepLink: [
            './helper/beforeAfter.js',
            './test/e2e/search/deepLink/searchUsingDeeplink.e2e.spec.js',
        ],
        manufacturerPrferences: [
            './helper/beforeAfter.js',
            './test/e2e/cpl/manufacturerPrferences/**/*.e2e.spec.js'
        ],
        customAttributes: [
            './helper/beforeAfter.js',
            './test/e2e/administration/**/*Attributes.e2e.spec.js'
        ],
        customTemplates: [
            './helper/beforeAfter.js',
            './test/e2e/reports/cust*/**/*.e2e.spec.js'
        ],
        home: [
            './helper/beforeAfter.js',
            './test/e2e/home/**/**/*.e2e.spec.js'
        ],
        import: [
            './helper/beforeAfter.js',
            './test/e2e/import/**/**/*.e2e.spec.js'
        ],
        bomImport: [
            './helper/beforeAfter.js',
            './test/e2e/import/bomImport/**/*.e2e.spec.js'
        ],
        cplImport: [
            './helper/beforeAfter.js',
            './test/e2e/import/cplImport/**/*.e2e.spec.js'
        ],
        knowledgebase: [
            './helper/beforeAfter.js',
            './test/e2e/knowledgebase/**/**/*.e2e.spec.js'
        ],
        login: [
            './helper/beforeAfter.js',
            './test/e2e/login/**/**/*.e2e.spec.js'
        ],
        news: [
            './helper/beforeAfter.js',
            './test/e2e/news/**/**/*.e2e.spec.js'
        ],
        partDetails: [
            './helper/beforeAfter.js',
            './test/e2e/partDetails/**/**/*.e2e.spec.js'
        ],
        partAlternates: [
            './helper/beforeAfter.js',
            './test/e2e/partAlt*/**/**/*.e2e.spec.js'
        ],
        reports: [
            './helper/beforeAfter.js',
            './test/e2e/reports/rep*/**/*.e2e.spec.js'
        ],
        researchRequest: [
            './helper/beforeAfter.js',
            './test/e2e/researchRequests/**/**/*.e2e.spec.js'
        ],
        search: [
            './helper/beforeAfter.js',
            './test/e2e/search/**/**/*.e2e.spec.js'
        ],
        cplSearch: [
            './helper/beforeAfter.js',
            './test/e2e/search/cpl/**/*.e2e.spec.js'
        ],
        docSearch: [
            './helper/beforeAfter.js',
            './test/e2e/search/documents/**/*.e2e.spec.js'
        ],
        haystackSearch: [
            './helper/beforeAfter.js',
            './test/e2e/search/hay*/**/*.e2e.spec.js'
        ],
        mfrSearch: [
            './helper/beforeAfter.js',
            './test/e2e/search/man*/**/*.e2e.spec.js'
        ],
        parametricSearch: [
            './helper/beforeAfter.js',
            './test/e2e/search/parametric/**/*.e2e.spec.js'
        ],
        partsSearch: [
            './helper/beforeAfter.js',
            './test/e2e/search/parts/**/*.e2e.spec.js'
        ],
        whereUsedSearch: [
            './helper/beforeAfter.js',
            './test/e2e/search/whereUsed/**/*.e2e.spec.js'
        ],
        settings: [
            './helper/beforeAfter.js',
            './test/e2e/settings/**/**/*.e2e.spec.js'
        ],
        manageUsers:[
            './helper/beforeAfter.js',
            './test/e2e/administration/**/**/manageUsers.e2e.spec.js'
        ],
        viewUsers:[
            './helper/beforeAfter.js',
            './test/e2e/administration/**/**/viewUsers.e2e.spec.js'
        ],
        workspace: [
            './helper/beforeAfter.js',
            './test/e2e/workspace/**/**/*.e2e.spec.js'
        ],
        smoke: [
            './helper/beforeAfter.js',
            './test/e2e/smoke/**/**/*.e2e.spec.js'
        ],
        partsIntel: [
            './helper/beforeAfter.js',
            './test/e2e/partsIntel/**/**/*.e2e.spec.js'
        ],
        api: [
            './api/**/**/**/**/*.api.spec.js'
        ],
        siteAdmin: [
            './siteAdmin/e2e/**/**/*.e2e.spec.js',
        ],
        newGrid: [
            './helper/beforeAfter.js',
            './test/e2e/bomVault/bomSummary/**/*.e2e.spec.js',
            './test/e2e/bomVault/bomVault/**/*.e2e.spec.js',
            './test/e2e/bomVault/partStandardization/**/*.e2e.spec.js',
            './test/e2e/bomVault/singleBom/columnsSorting/*.e2e.spec.js',
            './test/e2e/bomVault/singleBom/**/bomDetails.e2e.spec.js',
            './test/e2e/bomVault/singleBom/**/bomDetailsReadOnly.e2e.spec.js',
            './test/e2e/bomVault/singleBom/**/partAlerts.e2e.spec.js',
            './test/e2e/knowledgebase/**/**/*.e2e.spec.js',
            './test/e2e/search/parametric/columnsSorting/*.e2e.spec.js',
            './test/e2e/search/parametric/**/transpose.e2e.spec.js',
            './test/e2e/search/parts/resultGrid/*.e2e.spec.js',
            './test/e2e/search/parts/**/resultsPage.e2e.spec.js',
            './test/e2e/search/parts/**/transpose.e2e.spec.js',
            './test/e2e/settings/**/**/bomImportSettings.e2e.spec.js',
            './test/e2e/settings/**/**/searchSettings.e2e.spec.js',
            './test/e2e/workspace/**/**/*.e2e.spec.js',
        ],
        pushNotification:[
            './test/e2e/administration/teamsPost.js'
        ],
    },

    baseUrl: 'http://4dsqa.ihs.com/',

    params: {
        waitWebElementMaxTimeout: 50000,
        maxElementWaitTime: 120000,
        defaultElementWaitTime: 120000,
        userAdminUrl: 'bom-intelligence/?username=b4testuseradmin&password=b4testuseradmin#/home',
        groupAdminUrl:  'bom-intelligence/?username=b4testadmin&password=b4testadmin#/home',
        groupAdminUrl1:  'bom-intelligence/?username=b4testadmin&password=b4testadmin#/home',
        regularUserUrl: 'bom-intelligence/?username=b4testuser&password=b4testuser#/home',
        restrictedUserUrl: 'bom-intelligence/?username=b4testrestricted&password=b4testrestricted#/home',
        kbAdminUserUrl: 'bom-intelligence/?username=b4testkbadmin&password=b4testkbadmin#/home',
        readOnlyUserUrl: 'bom-intelligence/?username=b4testreadonly&password=b4testreadonly#/home',
        notAuthorised: 'bom-intelligence/?username=not_authorized&password=not_authorized#/home',
        userAdminUrlPI: 'parts-intelligence/?username=b4testuseradmin&password=b4testuseradmin#/search/parts',
        groupAdminUrlPI:  'parts-intelligence/?username=b4testadmin&password=b4testadmin#/search/parts',
        regularUserUrlPI: 'parts-intelligence/?username=b4testuser&password=b4testuser#/search/parts',
        restrictedUserUrlPI: 'parts-intelligence/?username=b4testrestricted&password=b4testrestricted#/search/parts',
        kbAdminUserUrlPI: 'parts-intelligence/?username=b4testkbadmin&password=b4testkbadmin#/search/parts',
        readOnlyUserUrlPI: 'parts-intelligence/?username=b4testreadonly&password=b4testreadonly#/search/parts',
        notAuthorisedPI: 'parts-intelligence/?username=not_authorized&password=not_authorized#/home',
        domain: '',
    },

    onPrepare: async () => {
        browser.params.domain = browser.baseUrl+ '.ihsglobal.local';
        browser.manage().window().maximize();
        await initializeReporters();
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000,
    }

};