import {Login} from "../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
import {linksNames, meganavItems} from "../../../../testData/global";
import {cplElements, gridElements} from "../../../../elements/elements";
import {Link} from "../../../../components/simple/link";
import {Shade} from "../../../../components/shade";
import {ConsoleErrors} from "../../../../helper/consoleErrors";
import {Button} from "../../../../components/simple/button";
import {cplData} from "../../../../testData/cpl";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const link: Link = new Link();
const button: Button = new Button();

describe(`Manage CPL defect, DE115400`, ()=>{

    it(`CPL: console error on navigating between CPL tabs`, async () =>{
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await button.clickOnTheElementAndWait(cplElements.tabs.get(3), gridElements.newGridRows.get(1));
        await Shade.openShadeWithLink(cplData.noMatchesTry);
        await button.clickOnTheElementAndWait(cplElements.tabs.get(1), gridElements.grid);
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
    });
});