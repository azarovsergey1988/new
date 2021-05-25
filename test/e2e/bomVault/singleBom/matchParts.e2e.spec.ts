import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles} from "../../../../testData/global";
import {dropdownElements, gridElements} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {Button} from "../../../../components/simple/button";
import {CommonMatchingLogic} from "../../../../bussinesLayer/matching/commonMatchingLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {MatchPartsLogic} from "../../../../bussinesLayer/bomVault/matchPartsLogic";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Shade} from "../../../../components/shade";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {bomVaultData} from "../../../../testData/bomVault";
import {Waiters as w} from "../../../../helper/waiters";
const button: Button = new Button();
const commonMatchingLogic: CommonMatchingLogic = new CommonMatchingLogic();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const link: Link = new Link();
const matchPartsLogic: MatchPartsLogic = new MatchPartsLogic();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const partDetailsLogic: PartDetailsLogic = new PartDetailsLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const shade: Shade = new Shade();
const helpLogic: HelpLogic = new HelpLogic();

describe('Match Parts tab ', () => {

    it ( 'should go Match Parts' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await matchPartsLogic.goToMatchParts();
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Match Parts');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Match parts');
    });

    it("should be pagination controls", async () => {
        await grid.newGridPaginationChecking();
    });

    xit('should be tag label for columns filtering - sort A to Z ',  async () => {
        await toolbar.filterAllColumnsAZ();
    });

    it('should remove filtering with clear all',  async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    xit('should be tag label for columns filtering - sort Z to A',  async () => {
        await toolbar.filterAllColumnsZA();
        await toolbar.clearFilteringWithClearAll();
    });


    it('should have unhide button with dropdown list  - c Match Parts',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column -  Match Parts',  async () => {
        await grid.newGridHideColumnByName('Imported Part Number');
    });

    it('should unhide the column with Unhode All - Match Parts',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('Imported Part Number');
    });

    it('should be filters - Match Parts',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(cplData.matchParts.filterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select filter categories option and display tag - Match Parts',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag filter categories - Match Parts',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove filter categories tag with clear all - Match Parts',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove filter categories tag with X - Match Parts',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it ( 'should open/close export modal - Match Parts' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export Parts');
        const labels = [ 'Select which Parts to include in the Export:', 'Select Export format:'];
        const options = [ 'Selected Parts Only', 'All Parts', 'Excel Spreadsheet (XLS) - ' +
        'Limited to the first 10,000 rows', 'Comma-Separated Values (CSV)',
            'Tab-Delimited Text (TXT)' ] ;
        await modal.exportModalAttributes(labels, options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it ( 'should export a file - Match Parts' , async () => {

        // await modal.checkingExportFile(buttons.exportButton, buttons.okayButton,
        //     elements.grid, 'IHS_CPLParts.txt' )
        await modal.checkingExportFile(buttonNames.export, buttonNames.okay , gridElements.grid,
            'IHS_CPLParts.txt');
    });

    it('should open View Suggested matches modal - Match Parts',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3]);
        await commonMatchingLogic.openViewAllSuggestMatchesModalParts();
    });

    it(" should open help panel and check opened subitem ", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Search for a match');
    });

    it('should apply View Suggested match and highlight - Match Parts',  async () => {
        await commonMatchingLogic.applyMatchAndHighlightForMatchPart(buttonNames.applySelectedPartMatch, true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should display View Suggestion matches in the save changes modal - Match Parts ',  async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptBomMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should undo view suggested matches - Match Parts',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for View Suggestion Match - Match Parts',  async () => {
        await commonMatchingLogic.openViewAllSuggestMatchesModalParts();
        await commonMatchingLogic.applyMatchAndHighlightForMatchPart(buttonNames.applySelectedPartMatch, true);
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

   it ( 'should open part details modal link - Match Parts' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await grid.newGridHideColumnByName('Parts');
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[8]);
        await matchPartsLogic.goToMatchParts();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2]);
        await partDetailsLogic.openPartDetModalLinkNewGrid(0,1);
        await modal.closeModalWithXButton();
    });

    it('should open search for match modal after clicking on the try search link',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4]);
        await commonMatchingLogic.openSearchForMatchModal();
    });

    it('should be type ahead search for match -  Match Parts',  async () => {
        await commonMatchingLogic.searchForMatchTypeAhead();
    });

    it('should clear all link in search for match modal -  Match Parts',  async () => {
        await commonMatchingLogic.clearAllChecking();
    });

    it('should perform no results search in search for match modal -  Match Parts',  async () => {
        await commonMatchingLogic.performNoResultsSearch();
    });

    it('should perform search in search for match modal -  Match Parts',  async () => {
        await commonMatchingLogic.clearAllChecking();
        await commonMatchingLogic.performSearch();
    });

    it('should search for match and highlight',  async () => {
        await commonMatchingLogic.searchForMatchModalAndHighlight(true);
    });

    it('should display search for match in the save changes modal ',  async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptBomMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should undo search for match changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for search for match',  async () => {
        await commonMatchingLogic.openSearchForMatchModal();
        await commonMatchingLogic.clearAllChecking();
        await commonMatchingLogic.performSearch();
        await commonMatchingLogic.searchForMatchModalAndHighlight(true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for search for match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Accept Match button',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await grid.newGridHideColumnByName('Parts');
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[8]);
        await matchPartsLogic.goToMatchParts();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeTruthy();
    });

    it('should be  Accept Match modal',  async () => {
        await commonMatchingLogic.openAcceptBomMatchParts();
        await modal.closeModalWithButton(buttonNames.stopGoBackToTheList);
        await commonMatchingLogic.openAcceptBomMatchParts();
        await modal.closeModalWithXButton();
    });


    it('should accept match and highlight accepted row ',  async () => {
        await commonMatchingLogic.openAcceptBomMatchParts();
        await commonMatchingLogic.acceptMatchHighlight(buttonNames.yesItOkToAcceptThem, true);
    });

    it('should display accepted matches in the save changes modal ',  async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptBomMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should undo accepted changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Accept Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await commonMatchingLogic.openAcceptBomMatchParts();
        await commonMatchingLogic.acceptMatchHighlight(buttonNames.yesItOkToAcceptThem, true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Accept Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Ignore Match button',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await grid.newGridHideColumnByName('Parts');
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[8]);
        await matchPartsLogic.goToMatchParts();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
    });

    it('should be  Ignore Match modal',  async () => {
        await commonMatchingLogic.openIgnoreMatchParts();
        await modal.closeModalWithXButton();
        await commonMatchingLogic.openIgnoreMatchParts();
        await modal.closeModalWithButton(buttonNames.stopGoBackToTheList);
    });

    it('should ignore match and highlight ignored row ',  async () => {
        await commonMatchingLogic.openIgnoreMatchParts();
        await commonMatchingLogic.ignoreMatchHighlight(true);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
    });

    it('should display ignored matches in the save changes modal ',  async () => {
        await commonMatchingLogic.saveChangesForViewSuggestIgnoreBomMatchParts();
        await modal.closeModalWithXButton()
    });

    it('should undo ignored changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight()
    });

    it('should be leave modal for Ignore Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await commonMatchingLogic.openIgnoreMatchParts();
        await commonMatchingLogic.ignoreMatchHighlight(true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal()
    });

    it('should be discard changes for Ignore Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });


    it('should open search for match modal after clicking on the search for match',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await grid.newGridHideColumnByName('Parts');
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[8]);
        await matchPartsLogic.goToMatchParts();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await commonMatchingLogic.openSearchForMatchModalFromToolbarBomMatchParts();
    });

    it('should search for match and highlight',  async () => {
        await commonMatchingLogic.searchForMatchModalAndHighlight(true);
    });

    it('should display search for match in the save changes modal ',  async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptBomMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should undo search for match changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for search for match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await await commonMatchingLogic.openSearchForMatchModalFromToolbarBomMatchParts();
        await commonMatchingLogic.searchForMatchModalAndHighlight(true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for search for match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it ( 'should open research request modal by clicking on the research request button - Match Parts' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await grid.newGridHideColumnByName('Parts');
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[8]);
        await matchPartsLogic.goToMatchParts();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - Match Parts', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

});