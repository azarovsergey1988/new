import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {importElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {ConsoleErrors} from "../../../../helper/consoleErrors";
import {Button} from "../../../../components/simple/button";
import {Input} from "../../../../components/simple/input";
import {Random} from "../../../../utils/random";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const importLogic: ImportLogic = new ImportLogic();
const button: Button = new Button();
const input: Input = new Input();
const random: Random = new Random();

describe(`BOM import defect, DE115180`, () => {
   it(`BOM Import using Saved Configurations shows error in console`, async () => {
       await login.loginWithDirectLink(browser.params.groupAdminUrl);
       await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
       await importLogic.goToStep1();
       await importLogic.uploadAValidFileToImport();
       await importLogic.setBomName();
       await importLogic.selectSaveConfigByName('test2');
       await importLogic.importBom();
       await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
   });
});

describe(`BOM import defect, DE114466`, () => {
    it(`Import configuration: Error on saving configuration with long name`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await button.clickByButtonNameAndWait('Save as New', importElements.savedConfName);
        await input.fillFieldWithValue(importElements.savedConfName, random.randomTextGenerator(51));
        await expect((await importElements.savedConfName.getAttribute('value')).length).toBeLessThanOrEqual(50);
    });
});