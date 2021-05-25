import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {buttonNames, meganavItems, titles} from "../../testData/global";
import {browser} from "protractor";
import {Grid} from "../../components/grid";
import {bomVaultElements, commonElements, gridElements, pageTitles, partStandardization} from "../../elements/elements";
import {JsScripts} from "../../utils/jsScripts";
import {Link} from "../../components/simple/link";
import {Meganav} from "../../components/meganav";
import {Waiters as w} from "../../helper/waiters";
import {Toolbar} from "../../components/toolbar";


const toolbar: Toolbar = new Toolbar();
const button = new Button();
const grid: Grid = new Grid();
const link: Link = new Link();
const meganav = new Meganav();

export class SingleBomLogic {

    public async openSingleBomByName(bomName: string) {
        await allureStep('Open ' + bomName + ' BOM', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            //await browser.waitForAngularEnabled(false);
            //temporary desigion
            await browser.sleep(2000);
            if (!(await link.returnElementByLinkName(bomName).isPresent())) {
                await JsScripts.scrollDown();
            }
            //await w.waitUntilWorkingModalNotDisplayed();
            await link.clickOnTheLinkByName(bomName);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilTextToBePresent(gridElements.newGridHeaderNamesWait.get(0),'Rel. Info',10000);
            await w.waitUntilElementIsDisplayed(gridElements.gridLinks.last());
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsDisplayed(partStandardization.toolbarButtonBomDetails.get(0));
            await w.waitUntilElementIsClickable(await gridElements.checkboxSelector.last());
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
            await w.waitUntilWorkingModalNotDisplayed();
           // await w.waitUntilElementIsDisplayed(gridElements.gridLinks.last());
           // await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async openSingleBomByNameInBomTreeParts(bomName: string) {
        await allureStep('Open ' + bomName + 'BOM', async () => {
            await browser.waitForAngularEnabled(false);
            await link.clickOnTheLinkByName(bomName);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(0));
        });
    };

    public async openFirstSingleBom() {
        await allureStep('Open first BOM in BOM Vault', async () => {
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
            await w.waitUntilElementIsDisplayed(gridElements.newGridLockedColumnRowCellsWithContent(0).get(1));
            const bomNames: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');
            for (let i: number = 0; i < bomNames.length; i++) {
                if (bomNames[i] !== 'Automation_BOM' && bomNames[i] !== 'AML_IPN_ON' && bomNames[i] !== 'AML_IPN_OFF' && bomNames[i] !== 'Automation_BOM_With_Icons') {
                    await w.waitUntilElementIsClickable(link.returnElementByLinkName(bomNames[i]));
                    await link.clickOnTheLinkByName(bomNames[i]);
                    await w.waitUntilElementIsDisplayed(commonElements.navTabs.last());
                    await w.waitUntilElementIsClickable(commonElements.navTabs.last());
                    await w.waitUntilWorkingModalNotDisplayed();
                    await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelectorByIndex(0));
                    break
                }
            }
            // await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(2));
        });
    };

    public async openFirstProcessedSingleBom() {
        await allureStep('Open first BOM in BOM Vault', async () => {
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
            await w.waitUntilElementIsDisplayed(gridElements.newGridLockedColumnRowCellsWithContent(0).get(1));
            const bomNames: string[] = await gridElements.bomRowAllLinks.getText();
            for (let i: number = 0; i < bomNames.length; i++) {
                if (bomNames[i] !== 'Automation_BOM' && bomNames[i] !== 'AML_IPN_ON' && bomNames[i] !== 'AML_IPN_OFF' && bomNames[i] !== 'Automation_BOM_With_Icons') {
                    await w.waitUntilElementIsClickable(link.returnElementByLinkName(bomNames[i]));
                    await link.clickOnTheLinkByName(bomNames[i]);
                    await w.waitUntilElementIsDisplayed(commonElements.navTabs.last());
                    await w.waitUntilElementIsClickable(commonElements.navTabs.last());
                    await w.waitUntilWorkingModalNotDisplayed();
                    await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelectorByIndex(0));
                    break
                }
            }
        });
    };
    public async goToFirstBomFromMeganav() {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await button.clickOnTheElement(gridElements.firstRowLink);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementIsDisplayed(commonElements.navTabs.last());
        await w.waitUntilElementIsClickable(commonElements.navTabs.last());
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
    };


    async goToGenerateReportPageBomDetails() {
        let result = await pageTitles.singleBomPageTitle.getText();
        result = result.substring(result.search(':') + 2, result.length);
        if (result.search(':') > 0 || result.search(':') == 0) {
            result = await result.substring(result.search(':') + 2, result.length);
        }
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(gridElements.grid);
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await expect(await pageTitles.generereReportTitle.get(1).getText()).toContain(result);
    };

    public async openSingleBomsWithNames(BOMNames:string[]) {
        let BOMNamesOpened:string[] = [];
        for(let i:number=0;i<BOMNames.length;i++) {
            await this.openSingleBomByName(BOMNames[i]);
            await browser.sleep(3000);
            BOMNamesOpened[i] = await bomVaultElements.bomTree.vaultLeftNavRecentBOMs.get(i).getText();
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
                meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        };
        return BOMNamesOpened;
    }

    public async verifyAddtoWorkspaceButtonEnabled(enabled:boolean) {
        await allureStep('Verify Add to workspace button is enabled: '+enabled, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(3));
            await gridElements.checkboxSelector.get(1).click();
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            if(enabled) {
                await expect(await partStandardization.dropdownMenuButtons.get(2).isEnabled()).toBeTruthy();
            }
            else {
                await expect(await partStandardization.dropdownMenuButtons.get(2).isEnabled()).toBeFalsy();
            }
            await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
            await gridElements.checkboxSelector.get(1).click();
        })
    }

}