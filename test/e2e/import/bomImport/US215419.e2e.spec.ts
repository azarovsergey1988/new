import {browser} from "protractor";
import {importItems} from "../../../../testData/import";
import {buttonNames, headerItems, meganavItems} from "../../../../testData/global";
import {commonElements, gridElements, headerElements, importElements, settings} from "../../../../elements/elements";
import {Actions} from "../../../../utils/actions";
import {BomImportSettingsLogic} from "../../../../bussinesLayer/settings/bomImportSettingsLogic";
import {Grid} from "../../../../components/grid";
import {Header} from "../../../../components/header";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Random} from "../../../../utils/random";
import {JsScripts} from "../../../../utils/jsScripts";
const actions: Actions = new Actions();
const bomImportSettingsLogic: BomImportSettingsLogic = new BomImportSettingsLogic();
const grid: Grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const random: Random = new Random();
const savedConfName: string = random.randomTextGenerator(5);
describe('US215419', () => {

    xit("should save Column Labels are on Row and display when select a saved config", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setColumnNumberOnRow('2');
        await importLogic.saveConfig(savedConfName);
        await importLogic.leaveImportWitLeaveModal();
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.selectSaveConfigByName(savedConfName);
        await expect(await importElements.columnNumberOnRow.getAttribute('value')).toEqual('2');
        await importLogic.leaveImportWitLeaveModal();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        await grid.selectRowByCellNameAndColumnNumber(savedConfName, 0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete)
    });

    it("should save worksheet and display when select a saved config", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.secondSheetName);
        await importLogic.saveConfig(savedConfName);
        await browser.sleep(1000);
        await importLogic.leaveImportWitLeaveModal();
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.selectSaveConfigByName(savedConfName);
        await expect(await JsScripts.returnSelectedIndexByCss(importElements.worksheetOptionCss)).toEqual(1);
        await importLogic.leaveImportWitLeaveModal();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        await grid.newGridSelectRowWithMatchValue(0, 'Name', savedConfName);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete);
    });


    it("should be set Column Labels are on Row in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setColumnNumberOnRow('1');
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        await importLogic.uploadAValidFileToImport();
        await browser.sleep(1000);
        await expect(await importElements.columnNumberOnRow.getAttribute('value')).toEqual('1');
        await importLogic.leaveImportWitLeaveModal();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await importLogic.deleteImportedBom();
    });

    it("should be set worksheet in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.secondSheetName);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        await browser.sleep(1000);
        await expect((await importElements.worksheetSelectedOption.getText()).toString()).toContain(importItems.secondSheetName);
        await importLogic.uploadAValidFileToImport();
        await browser.sleep(1000);
        await importLogic.leaveImportWitLeaveModal();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await importLogic.deleteImportedBom();
    });

    it("should be set worksheet for second sheet and try to apply it for file with one sheets", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.thirdSheetName);
        await importLogic.saveConfig(savedConfName);
        await browser.sleep(1000);
        await importLogic.leaveImportWitLeaveModal();
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToBomImportWithOneSheet();
        await browser.sleep(1000);
        await importLogic.selectSaveConfigByName(savedConfName);
        await expect(await importElements.workSheetLabel.getAttribute('class')).toContain('bom-form-error');
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.workSheetLabel, commonElements.popoverContent.get(0));
        expect(await commonElements.popoverContent.get(0).getText()).toEqual(importItems.worksheetErrorMessage);
        await importLogic.leaveImportWitLeaveModal();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        await grid.newGridSelectRowWithMatchValue(0, 'Name', savedConfName);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete);
    });


    xit("should be set worksheet for second sheet and try to apply it for file with one sheets in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.thirdSheetName);
        const worksheet:string = await importLogic.returnWorksheetValue();
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        await importLogic.uploadAValidFileToBomImportWithOneSheet();
        await expect(await importElements.workSheetLabel.getAttribute('class')).toContain('bom-form-error');
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.workSheetLabel, commonElements.popoverContent.get(0));
        expect(await commonElements.popoverContent.get(0).getText()).toEqual(importItems.worksheetErrorMessage);
        await importLogic.leaveImportWitLeaveModal();
    });


});