import { modalTitles, buttonNames,  meganavItems,
    titles,columnHeaders} from "../../../../testData/global";
import {resReqElements, pageTitles, gridElements, bomElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {bomVaultData} from "../../../../testData/bomVault";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const dropdown:Dropdown = new Dropdown();
const grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal:Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const shade: Shade = new Shade();

describe(' BOM Vault - TC67707', () => {

    it(" should go to first page after refresh", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await grid.goToTheNextPage();
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.refresh), gridElements.checkboxSelector.get(1));
        await expect(await gridElements.currentPage.getAttribute('value')).toEqual('1')
    });

});