import {AddAPartLogic} from "../../../../bussinesLayer/bomVault/addAPartLogic";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {browser, element} from "protractor";
import {
    bomElements,
    commonElements,
    dropdownElements,
    gridElements,
    modalElements,
    partStandardization,
    shadeElements,
    videoSliderElements
} from "../../../../elements/elements";
import {
    buttonNames, columnHeaders, commonData, exportOptions, linksNames, meganavItems, modalTitles,
} from "../../../../testData/global";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {WorkspaceBoms} from "../../../../api/logicLayer/workspaceBoms";
import {user} from "../../../../api/testData/global";
import {videoLinks} from "../../../../testData/video";
import {Waiters as w} from "../../../../helper/waiters";
import {Actions} from "../../../../utils/actions";

const addAPartLogic: AddAPartLogic = new AddAPartLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

describe('BOM Details tab', () => {

    it('should go to view single bom - bom details', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM Details');
    });

    it('should open Help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM details');
    });

    it('should open Video slider, play video and close', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should open Add a Part tab', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addPart);
        await expect(await shadeElements.shadeTitle.getText()).toEqual('Add a Part');
    });

    it('should be tabs in Add a Part modal', async () => {
        const tabs: string[] = ['Search for a Part', 'Enter Part Details', 'Select from Workspace'];
        await expect(await commonElements.shadeNavTabs.getText()).toEqual(tabs);
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Add parts to BOMs');
    });

    it('should be ghost text depends on search types in Search for a Part modal', async () => {
        await addAPartLogic.the2AccordionGhostTextChecking();
    });

    it('should clear search criteria by clicking on the X in Search for a Part modal', async () => {
        await addAPartLogic.clearSearchCriteriaByX();
    });

    it('should be option to perform search in Add a Part modal', async () => {
        await addAPartLogic.firstTabPerformSearch();
    });

    it('should save state for the first tab in Add a Part modal', async () => {
        await addAPartLogic.saveStateSearchTab();
    });

    it('should be fields for enter part details tab', async () => {
        await addAPartLogic.fieldsForSecondTab();
    });

    it('should fill all fields for enter part details tab', async () => {
        await addAPartLogic.fillSecondTabFields(1);
    });

    it('should save state for the second tab in Add a Part modal', async () => {
        await addAPartLogic.saveStateSecondTab(1);
    });

    it('should save state for the third tab in Add a Part modal', async () => {
        await WorkspaceBoms.addAPartToWorkspaceIfNotAdded(user.groupAdmin);
        await addAPartLogic.saveStateThirdTab();
    });

    it('should be reset clear button and work properly', async () => {
        await addAPartLogic.resetButtonChecking(1);
    });

    it('should close Add a Part modal', async () => {
        await Shade.closeShadeWithButton(buttonNames.cancel);
    });

    it('should add a part in BOM', async () => {
        await addAPartLogic.addAPart();
    });

    it('should open and check Modify modal', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        await expect(await modal.modalTitle.getText()).toEqual('Modify a Part');
        const fields = ['BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):',
            'Imported Manufacturer Name:', 'Description:', 'Quantity (Numbers Only):', 'Reference Designator:', 'Custom 1:', 'Custom 2:'];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
        await modal.closeModalWithXButton();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        await modal.closeModalWithButton(buttonNames.cancelDoNotModifyThisPart);
    });

    it('should open Modify modal and check help panel title', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        await helpLogic.openAndCheckHelpPanelTitle('Modify selected parts');
        await modal.closeModalWithButton(buttonNames.cancelDoNotModifyThisPart);
    });

    it('should be filters', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        const expectedFilterOptions: string[] = ['Clear Filter', 'Matched Parts', 'UnMatched Parts', 'Parts with No Life Cycle Info',
            'Total Discontinued', 'Discontinued with Alternates', 'Discontinued without Alternates',
            'End of Life / NRFND', 'Active', 'Active - Single Source', 'Active - Multiple Sources',
            'Contact Manufacturer', 'RoHS Non-Compliant', 'REACH Compliant'];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filter);
    });

    it('should select option and display tag', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link', async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should have layout filters', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        const expectedFilterOptions: string[] = ['Default', 'Environmental', 'Import', 'Lifecycle', 'COO_Layout' ,'For Manage Users',];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout);
    });

    it('should open Delete Part modal', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.deletePart);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Delete');
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.deletePart);
        await modal.closeModalWithButton(buttonNames.noDoNotDeleteThem)
    });

    it('should delete a part from BOM', async () => {
        await addAPartLogic.deleteAPart();
    });

    it('should open Reprocess modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await expect(await modal.modalTitle.getText()).toEqual('Reprocess BOM');
        await expect(await modal.modalBodyParag.getText()).toEqual(['Are you sure that you want to reprocess this BOM?',
            'If you select Yes, your BOM will be queued for processing to identify updates in Part and/or Manufacturer data.' +
            ' If you select No, you will be returned to BOM Details and the BOM will not be reprocessed.']);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
    });

    it('should open Research Request modal', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple Research Request modal', async () => {
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it('should go to Generate a Report page', async () => {
        await singleBomLogic.goToGenerateReportPageBomDetails();
    });

    it('should open Export modal', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toContain('Export BOM Details Part(s) for ');
        await modal.exportModalAttributes(exportOptions.bom.bomDetails.labels, exportOptions.bom.bomDetails.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancelReturnToBomDetails);
    });

    //skip test because of the defect with help panel
    xit('should open Export modal and check help panel subitem', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Export BOM details');
        await modal.closeModalWithButton(buttonNames.cancelReturnToBomDetails);
    });

    it('should export file for Details', async () => {
        await modal.closeModalIfPresent();
        await modal.checkingExportFile(buttonNames.export, buttonNames.okay , gridElements.grid,
            exportOptions.bom.bomDetails.fileName);
    });

    it("should disable Generate report button for sub-assembly of indentured bom", async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(3));
        await link.clickOnTheLinkByNameAndWaitForElement('AUTOMATION_Indentured', gridElements.firstRowLink);
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeTruthy();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(3));
        await bomTreeLogic.expandFirstIndenturedBom();
        await link.clickOnTheLinkByNameAndWaitForElement('NumIndCodeL1-SA2', gridElements.firstRowLink);
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeFalsy();
    });
});

describe(`Verify video tab for view single BOMS`, () => {
    it(`should verify video in view single BOMS page`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await singleBomLogic.goToFirstBomFromMeganav();
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.bomPageBI);
        await VideoSliderLogic.closeVideoSlider();
    })
});

describe('US280245: Export more than 1000 parts',()=>{
    it('should verify once user selects more than 1000 parts the tooltip with message is displayed', async ()=> {
        const expectedTooltip:string = 'The number of selected parts is greater than the maximum allowed for export.\n' +
            'Please reduce the number of selected parts to 1000 or less to use this option.'
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Parts', true);
        await singleBomLogic.openFirstProcessedSingleBom();
        await grid.changeItemsPerPage('500');
        for(let i:number=0;i<3;i++) {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            await gridElements.selectAllCheckboxes.first().click();
            await gridElements.nextPageButton.click();
        }
        await modal.openModalWithButtonByName(buttonNames.export);
        await Actions.mouseMoveToElementStatic(modalElements.hoverOverSelectedParts);
        await expect(await modalElements.selectedPartsTooltip.getAttribute('title')).toEqual(expectedTooltip);
    });

describe(`Add to workspace button should be disabled when the user selects an unmatched part inside BOM details tab, Def-301370`, () => {
    it(`Verify Add to workspace button should be disabled for Unmatched parts`, async () => {
            await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM_With_Icons');
        await toolbar.openToolbarDropdownByButtonNameAndClicklink(buttonNames.filter,0,'UnMatched Parts');
        await singleBomLogic.verifyAddtoWorkspaceButtonEnabled(false);
        await toolbar.openToolbarDropdownByButtonNameAndClicklink(buttonNames.filter,0,'Matched Parts');
        await singleBomLogic.verifyAddtoWorkspaceButtonEnabled(true);
        })
    });
})
