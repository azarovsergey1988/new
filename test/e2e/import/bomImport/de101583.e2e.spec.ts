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

describe('DE101583 - configuration item tooltip doesn\'t close on the Preview page',  () => {

    it("should not show tooltip after mover out focus from item ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.goToPreviewAndValidate();
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.optionsContainer.get(1),
            commonElements.popoverContent.get(0));
        await actions.mouseMoveToElement(gridElements.newGridHeaderCells.get(0));
        await expect(await commonElements.popoverContent.get(0).isPresent()).toBeFalsy();
        await importLogic.leaveImportWitLeaveModal();
    });

});