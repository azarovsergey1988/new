import {browser} from "protractor";
import {meganavItems} from "../../../testData/global";
import {gridElements} from "../../../elements/elements";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {WorkspaceLogic} from "../../../bussinesLayer/worksapce/workspaceLogic";
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();

describe('View Single BOM - Add BOM To Workspace', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelector.get(1));
    });

     it('should work Add Сurrent BOM to Workspace', async () => {
        const selectedBom: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(1).getText();
        await singleBomLogic.openSingleBomByName(selectedBom);
        await workspaceLogic.addToWorkspaceBomsFromViewSingleBOM();
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
        await expect(await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText()).toEqual(selectedBom);
     });

    afterAll(async () => {
        await workspaceLogic.removeItemFromWorkspace();
    });

});
