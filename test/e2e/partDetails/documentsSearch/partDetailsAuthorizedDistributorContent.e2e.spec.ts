import {browser} from "protractor";
import {buttonNames, fieldStatuses, meganavItems} from "../../../../testData/global";
import {commonElements, partDetailsElements, searchElements} from "../../../../elements/elements";
import {DocumentsSearchLogic} from "../../../../bussinesLayer/search/documentsSearchLogic";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {partDetailsData} from "../../../../testData/partDetails";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Waiters as w} from "../../../../helper/waiters";

const documentsSearchLogic = new DocumentsSearchLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();

describe('Part Details - Document Search. For users who do not subscribed to Authorized Distributor Content', () => {

    it('Authorized Distributor Locations link from Distributors in Part Details modal should be inactive and be greyed out', async () => {
        // await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await login.loginWithDirectLink(browser.params.notAuthorised);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('111');
        await documentsSearchLogic.goToViewRelatedParts();
        await expect(await partDetailsElements.distribIcon.first().isDisplayed()).toBe(true);
        await modal.openModalWithElement(partDetailsElements.distribIcon.first());
        await w.waitUntilElementIsDisplayed(link.returnElementByLinkName(partDetailsData.distributors.thirdInfoColumnText[0]));
        await expect(await elementAttributes.getElementAttribute(link.returnElementByLinkName(partDetailsData.distributors.thirdInfoColumnText[0]), 'class'))
            .toContain(fieldStatuses.disabled);
    });

    it('through hovering on Authorized Distributor Locations link from Distributors, it should displays tooltip and it should shows message about subscription license', async () => {
        await partDetailsLogic.tooltipMessageCheckingByName(partDetailsData.distributors.thirdInfoColumnText[0]);
        await expect(await commonElements.popoverContent.get(0).getText()).toEqual(partDetailsData.tooltips.bodyMessageText);
    });

    it('Authorized Distributor Locations link from Manufacturer in Part Details modal should be inactive and be greyed out', async () => {
        await link.clickOnTheLinkByName(partDetailsData.leftNav.itemManufacturer);
        await expect(await partDetailsElements.disableLink.getText()).toContain(partDetailsData.distributors.thirdInfoColumnText[0]);
    });

    it('through hovering on Authorized Distributor Locations link from Manufacturer, it should displays tooltip and it should shows message about subscription license', async () => {
        await partDetailsLogic.tooltipMessageCheckingByElement(partDetailsElements.disableLink);
        await expect(await commonElements.popoverContent.get(0).getText()).toEqual(partDetailsData.tooltips.bodyMessageText);
    });

    xit('should export All file for Part Details without including the Authorized Distributors segment', async () => {
        await partDetailsLogic.checkExport(buttonNames.exportAll, partDetailsData.leftNav.attributePartDetails);
    });

    xit('should export Manufacturer item for Part Details without including the Authorized Distributors segment', async () => {
        await partDetailsLogic.checkExport(buttonNames.exportManufacturer, partDetailsData.leftNav.attributePartDetails);
    });

    it('should not include the Authorized Distributors segment in Print Preview All modal', async () => {
        await partDetailsLogic.checkPrintModalNotIncludeSegment(buttonNames.printPreviewAll, partDetailsData.distributors.thirdInfoColumnText[0]);
    });

    it("should not include the 'Print Authorized Distributor Locations' option in Print list toolbar dropdown", async () => {
        await partDetailsLogic.checkPrintDropdownOptions(buttonNames.printAuthorizDistributLoc);
    });
});