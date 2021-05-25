import {Actions} from "../../../../utils/actions";
import {browser, element} from "protractor";
import {
    meganavItems, titles, buttonNames, columnHeaders, modalTitles,
    fieldStatuses
} from "../../../../testData/global";
import {
    bomVaultElements,
    commonElements, dropdownElements, gridElements, growler, modalElements, pageTitles,
    reportElements, videoSliderElements
} from "../../../../elements/elements";
import {reportsData} from "../../../../testData/reports";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {Button} from "../../../../components/simple/button";
import {CheckBox} from "../../../../components/simple/checkBox";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Input} from "../../../../components/simple/input";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {MultiSelect} from "../../../../components/multiSelect";
import {RadioButton} from "../../../../components/simple/radioButton";
import {Random} from "../../../../utils/random";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";
import {TypeAhead} from "../../../../components/typeAhead";
import {Toolbar} from "../../../../components/toolbar";
import {TemplatesLogic} from "../../../../bussinesLayer/reports/templatesLogic";
import {Link} from "../../../../components/simple/link";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../testData/video";
import {Growlers} from "../../../../components/growlers";
import {Waiters as w} from "../../../../helper/waiters";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const actions: Actions = new Actions();
const bomTreeFilter: BomTreeFilterLogic = new BomTreeFilterLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const radioButton: RadioButton = new RadioButton();
const grid: Grid = new Grid();
const input: Input = new Input();
const instructionPanel: InstructionPanel = new InstructionPanel();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const multiSelect: MultiSelect = new MultiSelect();
const random: Random = new Random();
const reportsLogic: ReportsLogic = new ReportsLogic();
const templatesLogic: TemplatesLogic = new TemplatesLogic();
const toolbar:Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();
const link: Link = new Link();
const helpLogic: HelpLogic = new HelpLogic();

describe('Generate a Report', () => {

    it('should navigate to Generate Reports page',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Generate reports');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Generate reports');
    });

    it('should be labels for step titles, standard and advanced reports',  async () => {
        await expect(await reportElements.reports.stepTitles.getText()).toEqual(reportsData.reports.stepTitles);
        await expect(await reportElements.reports.standardReports.getText()).toEqual(reportsData.reports.standardReportsList);
        await expect(await reportsLogic.returnAdvancedReportsNames()).toEqual(reportsData.reports.advancedReportsList);
    });

    it('should proceed from Step 1 to Step 2',  async () => {
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
    });

    it('should be report type and New Report name field labels',  async () => {
        const expectedFieldLabels = 'Report Type: ' + reportsData.reports.standardReportsList[3];
        await expect(await reportElements.reports.step2ReportType.getText()).toEqual(expectedFieldLabels);
    });

    it('should proceed from Step 2 to Step 3',  async () => {
        await reportsLogic.goToStep3();
    });

    it('should select expanded folder with the consecutive child BOMs, DE121802', async () => {
        await reportsLogic.expandFolderBomTree();
        await reportsLogic.checkRowsIfFolderIsSelected();
    });

    it('should select an element from BOM tree',  async () => {
        await reportsLogic.selectElementFromBomTree();
    });

    it(" should open BOM Tree Filter ", async () => {
        await bomTreeFilter.openBomTreeFilter();
    });

    it('should close BOM Tree Filter',  async () => {
        await bomTreeFilter.closeBomTreeFilter();
    });

    it('should be definition icon panel ',  async () => {
        await bomTreeFilter.openBomTreeFilter();
        await bomTreeFilter.iconDefenitionPanelChecking();
    });

    it('should be search panel',  async () => {
        await bomTreeFilter.searchPanelChecking();
    });

    it('should show no results for unexisted item',  async () => {
        await bomTreeFilter.searchUnexisctedItem();
    });

    it('should show  results for existed item',  async () => {
        await bomTreeFilter.searchExistedItem();
    });

    it('should highlight selected item in the search results and in the bom tree',  async () => {
        await bomTreeFilter.highlightItemInTheGrid();
    });

    it('should leave search results after closing filter',  async () => {
        await bomTreeFilter.leaveSearchResultsAfterClosingSlider();
    });

    it('should highlight the same item after closing filter and performing search again',  async () => {
        await bomTreeFilter.searchExistedItem();
        await bomTreeFilter.highlightItemInTheGrid();
        await bomTreeFilter.closeBomTreeFilter();
    });

    it('should show canceled modal',  async () => {
        await reportsLogic.cancelModal();
    });

    it('should create a report and go to View Reports',  async () => {
        await reportsLogic.generateReport();
    });
});

describe('Reports Step4 Checking', () => {

    it('should navigate to View All Reports page',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await browser.waitForAngularEnabled(false);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.reports.advancedReportsList[1]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.goToStep4();
    });

    it("should be Include All AML Parts checkbox ", async () => {
        await expect(await reportElements.reports.includeAllAMlPartsCheckboxLabel.getText())
            .toEqual('Include All AML Parts');
        await expect(await reportElements.reports.includeAllAMlPartsCheckboxInput.isDisplayed())
            .toBeTruthy();
        await expect(await reportElements.reports.step4Labels.get(0).getText()).toEqual(reportsData.templates.step4Labels[0]);
        const enteredValue: string = random.randomTextGenerator('5');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(0), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(0).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it("should be Internal Part Number field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(0).getAttribute('placeholder'))
            .toEqual('Please enter your Internal Part Number');
        await expect(await reportElements.reports.step4Labels.get(0).getText()).toEqual(reportsData.templates.step4Labels[0]);
        const enteredValue: string = random.randomTextGenerator('5');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(0), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(0).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it("should be Imported P/N field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(1).getAttribute('placeholder'))
            .toEqual('Please enter your Imported P/N');
        await expect(await reportElements.reports.step4Labels.get(1).getText()).toEqual(reportsData.templates.step4Labels[1]);
        const enteredValue: string = random.randomTextGenerator('5');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(1), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(1).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it("should be Imported Mfr field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(2).getAttribute('placeholder'))
            .toEqual('Please enter your Imported Mfr');
        await expect(await reportElements.reports.step4Labels.get(2).getText()).toEqual(reportsData.templates.step4Labels[2]);
        const enteredValue: string = random.randomTextGenerator('5');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(2), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(2).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it("should be Imported Description field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(3).getAttribute('placeholder'))
            .toEqual('Please enter your Imported Description');
        await expect(await reportElements.reports.step4Labels.get(3).getText()).toEqual(reportsData.templates.step4Labels[3]);
        const enteredValue: string = random.randomTextGenerator('5');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(3), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(3).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it("should be Matched P/N field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(4).getAttribute('placeholder'))
            .toEqual('Please enter your Matched P/N');
        await expect(await reportElements.reports.step4Labels.get(4).getText()).toEqual(reportsData.templates.step4Labels[4]);
        const enteredValue: string = random.randomTextGenerator('5');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(4), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(4).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it("should be Search for Manufacturers Fieled field ", async () => {
        await expect(await reportElements.reports.searchForMfrInput.getAttribute('placeholder'))
            .toEqual('Enter manufacturer name (type ahead)');
        await expect(await reportElements.reports.searchForMfrFieldLabel.getText()).toEqual('Search for Manufacturers');
        await typeAhead.typeAheadChecking(reportElements.reports.searchForMfrInput, '2');
        await expect(await reportElements.reports.selectedMfrs.get(0).isDisplayed()).toBeTruthy();
        await expect(await reportElements.reports.selectedMfrsFieldLabel.getText()).toEqual('Selected Manufacturers');
    });

    it("should delete selected mfr ", async () => {
        await reportsLogic.deleteSelectedMfr();
        await expect(await reportElements.reports.selectedMfrsFieldLabel.isPresent()).toBeFalsy();
    });

    it("should be Matched P/N field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(6).getAttribute('placeholder'))
            .toEqual('Please enter your CAGE Code');
        await expect(await reportElements.reports.step4Labels.get(8).getText()).toEqual(reportsData.templates.step4Labels[7]);
        const enteredValue: string = random.randomTextGenerator('5');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(6), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(6).getAttribute('value'))
            .toEqual(enteredValue);
    });


    it(" should be Part Status multiselect options", async () => {
        await multiSelect.openMultiSelect(0);
        const partStatusMultiselectOptions =  [ 'Active', 'Active-Unconfirmed', 'Contact Mfr',
            'Discontinued', 'Discontinued-Unconfirmed', 'EOL', 'NRFND', 'Transferred' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(partStatusMultiselectOptions);
    });


    it(" should be option to select unselect in Part Status multiselect", async () => {
        await multiSelect.selectUnSelectAllChecking();
    });

    it(" should select options in Part Status multiselect and displayed selected options", async () => {
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
    });

    it(" should deselect options in Part Status", async () => {
        await multiSelect.deselectChecking(0);
    });


    it("should be Life Cycle Code field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(7).getAttribute('placeholder'))
            .toEqual('Please enter your Life Cycle Code');
        await expect(await reportElements.reports.step4Labels.get(10).getText()).toEqual(reportsData.templates.step4Labels[9]);
        const enteredValue: string = random.randomTextGenerator('4');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(7), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(7).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it(" should be Life Cycle Stage multiselect options", async () => {
        await multiSelect.openMultiSelect(1);
        const lyfeCycleMultiselectOptions =  [ 'Decline', 'Discontinued', 'Discontinued-Transferred', 'Growth',
            'Introduction', 'Mature', 'Phase-Out', 'Reactivated' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(lyfeCycleMultiselectOptions);
    });

    it(" should be option to select unselect in Life Cycle Stage multiselect", async () => {
        await multiSelect.selectUnSelectAllChecking();
    });

    it(" should select options in Life Cycle Stage multiselect and displayed selected options", async () => {
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
    });

    it(" should deselect options in Life Cycle Stage status", async () => {
        await multiSelect.deselectChecking(1);
    });


    it("should be Estimated YTEOL field ", async () => {
        await expect(await reportElements.reports.step4Inputs.get(8).getAttribute('placeholder'))
            .toEqual('Please enter your Estimated YTEOL');
        await expect(await reportElements.reports.step4Labels.get(13).getText()).toEqual(reportsData.templates.step4LabelsWithSpace[13]);
        const enteredValue: string = random.randomTextGenerator('4');
        await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(8), enteredValue);
        await expect(await reportElements.reports.step4Inputs.get(8).getAttribute('value'))
            .toEqual(enteredValue);
    });

    it(" should be highlighted selected items in Availability(YTEOL) multiselect", async () => {
        await multiSelect.openMultiSelect(2);
        const yteolMultiselectOptions =  [ '0', '1 - 2', '2 - 4', '4 - 8', '< 1', '> 8' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(yteolMultiselectOptions);
    });

    it(" should be Availability(YTEOL) multiselect", async () => {
        await multiSelect.selectUnSelectAllChecking();
        await importLogic.leaveImportWitLeaveModal();
    });

    it(" should be disabled Go To Step 4 button for standard reports", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[1]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await expect(button.returnButtonByText(buttonNames.goToStep4).isEnabled()).toBeFalsy();
        await importLogic.leaveImportWitLeaveModal();

    });

    it(" should be disabled Go To Step 4 button for (IHS) Alternates advanced report", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.reports.advancedReportsList[0]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await expect(button.returnButtonByText(buttonNames.goToStep4).isEnabled()).toBeFalsy();
        await importLogic.leaveImportWitLeaveModal();
    });
});

describe('View All Reports', () => {

    it('should navigate to View All Reports page',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewReports, gridElements.grid);
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewReports)
    });

    it('should be column heraders for view all reports',  async () => {
        await grid.newGridCheckingColumnHeaders( columnHeaders.reports.columns);
        await toolbar.unhideCellNameWithUnhideAll('Report Name');
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('View all reports');
    });

    it('should be modify button with dropdown list  - View All Reports',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(button.returnButtonByText(buttonNames.regenerateReport).isDisplayed()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.renameReport).isDisplayed()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.modifyReportSchedule).isDisplayed()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
    });

    it('should open close regenerate report modal  - View All Reports',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.regenerateReport);
        await expect(await modal.modalTitle.getText()).toEqual('Regenerate Report');
        await modal.closeModalWithXButton();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.regenerateReport);
        await modal.closeModalWithButton(buttonNames.noDoNotRegenerate);
    });

    it('should open regenerate report modal  - View All Reports, open help panel and check opened subitem',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.regenerateReport);
        await helpLogic.openAndCheckHelpPanelTitle('View reports');
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('View a report');
        await modal.closeModalWithXButton();
    });

    it('should be unhide button with dropdown list  - View All Reports',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - View All Reports',  async () => {
        await grid.newGridHideColumnByName('Report Name');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Report Name')
    });

    it('should unhide the column with Unhode All -  View All Reports',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('Report Name');
    });

    it('should be filters - View All Reports ',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        const expectedFilterOptions =  [ 'Clear Filter', 'Show My Reports',
            'Show Completed Reports', 'Show Queued Reports',
            'Show Generating Reports', 'Show Archived Reports' ] ;
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);

    });

    it('should select option and display tag - View All Reports ',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - View All Reports ',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link - View All Reports ',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - View All Reports ',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should not be option to view report with deleted custom template  ',  async () => {
        await reportsLogic.openViewModalWithDeletedTemplate(reportsData.reports.deletedTemplateReportName);
    });

    it('should not be option to regenerate report with deleted custom template  ',  async () => {
        await reportsLogic.regenerateReportWithDeletedTemplate(reportsData.reports.deletedTemplateReportName);
    });

    it('should not be option to view report with deleted bom  ',  async () => {
        await reportsLogic.openViewModalWithDeletedTemplate(reportsData.reports.deletedBomReportName);
    });

    it('should not be option to regenerate report with deleted bom ',  async () => {
        await reportsLogic.regenerateReportWithDeletedTemplate(reportsData.reports.deletedBomReportName);
    });

    it('should open view report modal',  async () => {
        await reportsLogic.openViewReportModal();
        await modal.closeModalWithXButton();
    });

    it("'should open view report modal, open help panel and check opened subitem", async () => {
        await reportsLogic.openViewReportModal();
        await helpLogic.openAndCheckHelpPanelTitle('View reports');
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('View a report');
        await modal.closeModalWithXButton();
    });

});

describe('Delete Generated Report', () => {

    it("should not be error status for standard report ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewReports, gridElements.checkboxSelector.get(1));
        await reportsLogic.reportStatusShouldNotBeError();
    });

    it(" should open modal by clicking on the delete button ", async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Delete');
        await modal.closeModalWithXButton();
    });

    it(" should delete selected report ", async () => {
        await reportsLogic.deleteReport();
    });
});

describe('Generate Advanced Report', () => {

    it("should generate and delete advanced report", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.reports.advancedReportsList[2]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await browser.executeScript("document.querySelector('#btnGenerateReport').scrollIntoView()");
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });
});

describe('Step 4 filters in generated report', () => {

    it("should display set filter in step 4 ", async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.reports.advancedReportsList[1]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.goToStep4();
        await reportsLogic.setFiltersInStep4();
        await reportsLogic.generateReport();
        await reportsLogic.openViewReportModal();
        for(let i = 0; i< await reportElements.reports.viewReportModalFilters.count(); i++) {
            await expect(await reportElements.reports.viewReportModalFilters.get(i).getText())
                .toEqual(reportsData.reports.filterValue);
        }
        await modal.closeModalWithXButton();
        await reportsLogic.reportStatusShouldNotBeError();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });
});

xdescribe('Reports - FMD Exists', () => {

    it('should be FMD Exists in export file',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(reportsData.templates.optionsList[6]);
        await templatesLogic.selectAttribute(reportsData.templates.reachInitalList[3]);
        await templatesLogic.createTemplate();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.templates.templateName);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await browser.executeScript("document.querySelector('#btnGenerateReport').scrollIntoView()");
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        //await reports.exportReportFile(reports.reportName, 'XML', 'FMD Exists');
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewTemplates, gridElements.grid);
        await templatesLogic.deleteTemplate();
    });
});

describe('Generate a Report - Read Only User', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('should navigate to Generate Reports page - Read Only User',  async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
    });

    it('should generate a report - Read Only User',  async () => {
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await browser.executeScript("document.querySelector('#btnGenerateReport').scrollIntoView()");
        await reportsLogic.generateReport();
    });

    it('should delete a report - Read Only User',  async () => {
        await reportsLogic.reportStatusShouldNotBeError();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });
});

describe("Generate AML Report", () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Growlers.openNotificationPanel();
        await Growlers.checkUncheckMuteNotifications();
        await Growlers.closeNotificationPanel();
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Growlers.openNotificationPanel();
        await Growlers.checkUncheckMuteNotifications();
        await Growlers.closeNotificationPanel();
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it("should be AML warning message", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports, meganavItems.reportsSubItems.generateReport,
            reportElements.reports.standardReports.get(1));
        await radioButton.checkRadioButtonByLabelName(reportsData.reports.standardReportsList[5]);
        await expect(await reportElements.reports.amlWarningMessage.getText()).toEqual('The report type you ' +
            'have selected can only be generated on a single BOM. If you would like to select more than one BOM, ' +
            'please select another report type.');
    });

    it("should open AML Report tooltip", async() => {
        await actions.mouseMoveToElementAndWaitForTooltip(reportElements.reports.
        reportsImagesByLabelName(reportsData.reports.standardReportsList[5]), reportElements.reports.reportsTooltip);
        await expect(await reportElements.reports.reportsTooltip.getAttribute('src')).toContain('aml-predicted-status-m.jpg');
    });

    it("should open AML Report modal window", async ()=>{
        await modal.openModalWithElement(reportElements.reports.reportsImagesByLabelName(reportsData.reports.standardReportsList[5]));
        await modal.checkModalTitleName(modalTitles.reportsModalTitle);
        await expect(await modalElements.reportModalText.getText()).toContain('Sample Preview of AML Predicted Status');
        await expect(await modalElements.modalReportsFile.getAttribute('src')).toContain('.pdf');
        await modal.closeModalWithXButton();
    });

    //failing as the reports are getting stuck in generating status

    it("should generate AML report", async () =>{
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[5]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectEnabledSingleBOMStep3(1);
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await expect(await reportElements.reports.reportNameFirstRowLinks.get(0).getText()).toContain('XLSX');
        await expect(await reportElements.reports.reportNameFirstRowLinks.get(1).getText()).toContain('ZIP');
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });

    it("should generate AML report with BOM Vault", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await button.clickByButtonName(buttonNames.generateReportButton);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[5]);
        await reportsLogic.goToStep3();
        await button.clickByButtonName(buttonNames.addOrRemoveBomForThisReport);
        await reportsLogic.selectBomFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await expect(await reportElements.reports.reportNameFirstRowLinks.get(0).getText()).toContain('XLSX');
        await expect(await reportElements.reports.reportNameFirstRowLinks.get(1).getText()).toContain('ZIP');
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await reportsLogic.deleteReport();
    });

    it("should generate report with BOM Tree", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.bomTree,
            bomVaultElements.bomTree.bomTreeBoms.get(1));
        await bomTreeLogic.checkBomNewGridByName('AUTOMATION_Indentured');
        await button.clickByButtonName(buttonNames.generateReportButton);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[5]);
        await reportsLogic.goToStep3();
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await expect(await reportElements.reports.reportNameFirstRowLinks.get(0).getText()).toContain('XLSX');
        await expect(await reportElements.reports.reportNameFirstRowLinks.get(1).getText()).toContain('ZIP');
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });
});

describe("Generate a Report, DE114465", () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it("should be popover with names of BOMs on the first step", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await await grid.newMechanismCheckboxRangeChecking(0, 2);
        const bomNames: any = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');
        await button.clickByButtonNameAndWait(buttonNames.generateReportButton,reportElements.reports.standardReports.get(1));
        await Actions.mouseMoveToElementAndWaitForTooltipStatic(pageTitles.multipleReports, commonElements.popoverMultiBomReportTitle);
        await expect(await commonElements.popoverMultiBomReportTitle.getText()).toContain(bomNames[0]);
        await expect(await commonElements.popoverMultiBomReportTitle.getText()).toContain(bomNames[1]);
    });
});

describe("Generate a Report, DE116057", () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it("more than one BOM might be added to the 'Single BOM Dashboard' report", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await await grid.newMechanismCheckboxRangeChecking(0, 2);
        await button.clickByButtonNameAndWait(buttonNames.generateReportButton,reportElements.reports.standardReports.get(1));
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[13]);
        await reportsLogic.goToStep3();
        await expect(await button.returnButtonByText(buttonNames.generateMyReport).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.addOrRemoveBomForThisReport).isEnabled()).toBeTruthy();
        await button.clickByButtonNameAndWait(buttonNames.addOrRemoveBomForThisReport, bomVaultElements.bomTree.bomTreeRows.get(0));
        await reportsLogic.selectEnabledSingleBOMStep3(1);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.generateMyReport));
        await expect(await button.returnButtonByText(buttonNames.generateMyReport).isEnabled()).toBeTruthy();
        await importLogic.leaveImportWitLeaveModal();
    });
});

describe("Generate a Report, DE114325", () => {

    it("Toolbar filter doesn't clearing with 'Clear Filter' option", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewReports, gridElements.gridWrapper);
        await grid.newGridOpenFilterBoxByName('Report Status');
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('(Select All)'));
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('Completed'));
        await button.clickByButtonNameAndWait(buttonNames.applyFilter, gridElements.newGridRows.get(0));
        await expect(await reportElements.reports.returnPanelTitleByName('Show Completed Reports ').isPresent()).toBeTruthy();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await link.clickOnTheLinkByNameAndWaitForElement('Clear Filter', gridElements.newGridRows.get(4));
        await expect(await reportElements.reports.returnPanelTitleByName('Show Completed Reports ').isPresent()).toBeFalsy();
    });
});

describe("Generate a Report, DE114291", () => {

    it("View All reports page: case sensitive column filter Lower Case", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewReports, gridElements.gridWrapper);
        await grid.newGridOpenFilterBoxByName('Report Status');
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('Completed'));
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('Archived'));
        await button.clickByButtonNameAndWait(buttonNames.applyFilter, gridElements.newGridRows.get(0));
        let reportName:string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await grid.newGridOpenFilterBoxByName('Report Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, await reportName[0].toLowerCase());
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        let reportNameAfterFilter: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await expect(await reportNameAfterFilter[0]).toEqual(reportName[0]);
    });

    it("View All reports page: case sensitive column filter Upper Case", async () =>{
        await grid.newGridOpenFilterBoxByName('Report Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        let reportName:string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await grid.newGridOpenFilterBoxByName('Report Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, await reportName[0].toUpperCase());
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        let reportNameAfterFilter: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await expect(await reportNameAfterFilter[0]).toEqual(reportName[0]);
    });
});

describe(`Verify video tab for reports`, () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it(`should verify video in reports page`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        const reportsLinks:string[] = ['Generate a Report','View All Reports','View All Templates'];
        for(let i:number=0;i<reportsLinks.length;i++) {
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
                reportsLinks[i], gridElements.gridWrapper);
            await VideoSliderLogic.openVideoSlider();
            await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.reportsBI);
            await VideoSliderLogic.closeVideoSlider();
        }
    })
    it(`should verify video in reports page for create a template link`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.reportsCreateaTemplateBI);
        await VideoSliderLogic.closeVideoSlider();
    })
});

describe('Generate a Report with name having braces, DE296441', () => {
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('Generate a Report with name having braces', async () => {
        const reportName:string = 'testReport[{(braces,./)}]';
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3WithReportName(reportName);
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReportWithReportName(reportName);
        await reportsLogic.reportStatusShouldNotBeError();
        await reportsLogic.verifyReportNameWithBraces(reportName);
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });
});

describe('Verify standard report names have tooltips, US276130', () => {
    it('Verify standard reports tooltips', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await reportsLogic.verifyStdReportTooltip(await reportsData.reports.stdReportTooltipDetails());
    });
});


describe('Generate a Report - Add Recent BOMs to Left Navigation test, 275534', () => {
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });
    let BOMNamesOpened:string[]=[];
    it('Verify if recent BOMs opened from View all BOMS are displayed in the left navigation.', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await browser.refresh();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        const BOMNames: string[] = await grid.newGridReturnCellValuesByColumnName(0,'BOM Name');
        BOMNamesOpened = await singleBomLogic.openSingleBomsWithNames(BOMNames.slice(0,10));
        expect(BOMNamesOpened.length).toEqual(10);
    });

    it('Verify if recent BOMs opened in View all BOMS page are displayed in the left navigation.', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.verifyBOMNamesPresentInLeftNav(BOMNamesOpened);
    });

    it('Verify add to report button functionality for generate report button in the left navigation.', async () => {
        await reportsLogic.verifyAddToReportLeftNav(BOMNamesOpened);
    });

    it('Generate a Report BOMS selected from recent BOMS available in left navigation', async () => {
        const reportName:string = 'testReportLeftNav';
        await reportsLogic.selectBOMsFromLeftNav(BOMNamesOpened);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3WithReportName(reportName);
        await reportsLogic.verifyBOMSAddedinStep3(BOMNamesOpened);
        await reportsLogic.generateReportWithReportName(reportName);
        await reportsLogic.reportStatusShouldNotBeError();
        await reportsLogic.verifyReportNameWithBraces(reportName);
        await reportsLogic.verifyBOMSAddedinStep3(BOMNamesOpened);
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });
});

describe('Allow Users to Select Multiple Report Types at Once, US275535', () => {

    it('Should be multiselect options for Standard Reports', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await radioButton.checkRadioButtonByLabelName(reportsData.reports.standardReportsList[0]);
        await radioButton.checkRadioButtonByLabelName(reportsData.reports.standardReportsList[1]);
        await expect((await commonElements.radioButtonInput.get(0)).isSelected()).toBeTruthy();
        await expect((await commonElements.radioButtonInput.get(1)).isSelected()).toBeTruthy();
    });

    it('Should be disabled Advanced Reports if more than one Standard Report is selected', async () => {
        await expect((gridElements.newGridCheckboxSelector.get(1)).isEnabled()).toBeFalsy();
    });

    it('Should be multiselect options for Advanced Reports', async () => {
        await radioButton.checkRadioButtonByLabelName(reportsData.reports.standardReportsList[1]);
        await grid.newMechanismCheckboxRangeChecking(0, 2);
    });

    it('Should be disabled Standard Reports if more than one Advanced Report is selected', async () => {
        await expect((commonElements.radioButtonInput.get(0)).isEnabled()).toBeFalsy();
    });

    it('Should be warning message if more than one report is selected', async () => {
        await expect(await reportElements.reports.amlWarningMessage.getText()).toEqual(reportsData.reports.multiselectMessage);
    });
});