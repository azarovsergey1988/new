import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems, titles} from "../../../../testData/global";
import {commonElements, gridElements, importElements, pageTitles} from "../../../../elements/elements";
import {importItems} from "../../../../testData/import";
import {Actions} from "../../../../utils/actions";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
const actions: Actions = new Actions();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const  meganav: Meganav = new  Meganav();

describe('DE129167 - Import: BOM name is set to default after Preview and Validate',  () => {

    it("should not change the BOM name once user moves to Preview and Validate and comes back to step1", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importElements.bomNameField.clear();
        await importElements.bomNameField.sendKeys("TestDe129167");
        await importElements.descriptionField.sendKeys("TestDe129167");
        await importLogic.goToPreviewAndValidate();
        await importElements.moveTo1StepImport.click();
        await expect(await importElements.bomNameField.getAttribute('value')).toEqual("TestDe129167");
        await expect(await importElements.descriptionField.getAttribute('value')).toEqual("TestDe129167");
        await importLogic.leaveImportWitLeaveModal();
    });

});