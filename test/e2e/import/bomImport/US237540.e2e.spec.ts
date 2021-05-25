import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomVaultElements, gridElements, importElements} from "../../../../elements/elements";
import {importItems} from "../../../../testData/import";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Grid} from "../../../../components/grid";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {commonSearch} from "../../../../testData/search";

const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const  meganav: Meganav = new  Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

describe(' US237540 - Support BOM Qty of zero',  () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('Quantity');
        await customLayoutLogic.saveNewCustomLayout();
    });

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
    });

    afterEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await importLogic.deleteImportedBom();
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it("TC68265 - should be 0 in Quality column in BOM Details after importion file with BOM Qty as 0 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQty0XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('0')
        }
    });

    it("TC68265 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as ABC ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyAbcXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68265 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as -1 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyMinus1XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68265 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as #$%^ ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtySpecCharXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });
});

describe(' US237540 - Support BOM Qty of zero - BOM Tree Parts',  () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('Quantity');
        await customLayoutLogic.saveNewCustomLayout();
    });

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
    });

    afterEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await importLogic.deleteImportedBom();
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it("TC68266 - should be 0 in Quality column in BOM Details after importion file with BOM Qty as 0 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQty0XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
        meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('0')
        }
    });

    it("TC68266 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as ABC ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyAbcXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68266 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as -1 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyMinus1XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68266 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as #$%^ ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtySpecCharXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });
});
