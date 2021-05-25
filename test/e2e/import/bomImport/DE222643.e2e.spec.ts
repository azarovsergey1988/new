import {browser} from "protractor";
import {meganavItems} from "../../../../testData/global";
import {gridElements, importElements} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {importItems} from "../../../../testData/import";

const grid: Grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe('DE129167 - Import: BOM name is set to default after Preview and Validate',  () => {

    it("should be set Column Labels are on Row in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importElements.bomNameField.clear();
        await importElements.bomNameField.sendKeys(importItems.bomImportName);
        await importElements.descriptionField.sendKeys("TestDe222643");
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        await importLogic.uploadAValidFileToImport();
        await expect(await importElements.descriptionField.getAttribute('value')).toEqual('TestDe222643');
        await importLogic.leaveImportWitLeaveModal();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await importLogic.deleteImportedBom();
    });
});