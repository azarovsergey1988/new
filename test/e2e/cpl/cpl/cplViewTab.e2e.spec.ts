import {browser} from "protractor";
import {buttonNames, columnHeaders, linksNames, meganavItems, titles} from "../../../../testData/global";
import {
    commonElements, dropdownElements, gridElements, pageTitles, partDetailsElements,
    viewMfrPref
} from "../../../../elements/elements";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

const instructionPanel: InstructionPanel = new InstructionPanel();
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const partDetailsLogic = new PartDetailsLogic();
const helpLogic: HelpLogic = new HelpLogic();

describe(' CPL View tab ', () => {

    it('should go to view CPL tab - cpl view', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
    });

    it('should check that "Matched P/N" is a hyperlink', async () => {
        let partsLinks: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.cpl[4]);
        await link.clickOnTheLinkByNameAndWaitForElement(partsLinks[1], partDetailsElements.activeLeftNav);
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Technical Characteristics');
    });

    it('should check that "Matched Mfr" is a hyperlink', async () => {
        await modal.closeModalIfPresent();
        let manufacturersLinks: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.cpl[5]);
        await link.clickOnTheLinkByNameAndWaitForElement(manufacturersLinks[1], partDetailsElements.activeLeftNav);
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Manufacturer Information');
    });

});