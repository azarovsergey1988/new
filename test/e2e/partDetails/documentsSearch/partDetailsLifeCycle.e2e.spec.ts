import {browser} from "protractor";
import {partDetailsElements, searchElements} from "../../../../elements/elements";
import {buttonNames, meganavItems, modalTitles} from "../../../../testData/global";
import {partDetailsData} from "../../../../testData/partDetails";
import {DocumentsSearchLogic} from "../../../../bussinesLayer/search/documentsSearchLogic";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";

const documentsSearchLogic = new DocumentsSearchLogic();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const toolbar: Toolbar = new Toolbar();

describe('Part Details - Life Cycle - Documents Search', () => {

    it('should be documents icon in the Documents Search grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('112');
        await documentsSearchLogic.goToViewRelatedParts(1,2);
        await expect(await partDetailsElements.lifeCycleIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the Life Cycle icon', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.lifeCycleIcon, partDetailsData.tooltips.lifeCycle);
    });

    it('should open part details modal by clicking on the Life Cycle icon', async () => {
        await modal.openModalWithElement(partDetailsElements.lifeCycleIcon.first());
    });

    it('should be column headers for documents',  async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual(expectedColumnHeaders);
    });

    it('should be add button with dropdown list',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should be export dropdown', async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should open Add to BOM(s) modal, open help panel and check opened subitem', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Add parts to Workspace BOMs or general BOMs');
        await modal.closeModalWithXButton(modalTitles.addSelectedPartsToBom);
    });

    it('should open view alternates modal',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it('should open view alternates modal, open help panel and check title', async () => {
        await modal.openModalWithButtonByName(buttonNames.viewAlternates);
        await helpLogic.openAndCheckHelpPanelTitle('Part alternates');
        await modal.closeModalWithXButton(modalTitles.alternatesForPartNumber);
    });

    it('should open res request modal and be prepopulated values', async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open res request modal, open help panel and check title', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
        await modal.closeModalWithXButton(modalTitles.singleResReq);
    });

    it('should open res request modal, open help panel and check opened subitem', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for specific parts');
        await modal.closeModalWithXButton(modalTitles.singleResReq);
    });

    it('should open print preview all modal', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open print preview all modal, open help panel and check opened subitem', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        await modal.openModalWithButtonByName(buttonNames.printPreviewAll);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Print part details');
        await modal.closeModalWithXButton(modalTitles.printPreview);
    });

    it('should open specific print preview modals', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example', async () => {
        await partDetailsLogic.searchByExample();
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Parametric search');
    });
});

