import {browser} from "protractor";
import {buttonNames, fieldStatuses, meganavItems} from "../../../../testData/global";
import {importElements} from "../../../../elements/elements";
import {importItems} from "../../../../testData/import";
import {CheckBox} from "../../../../components/simple/checkBox";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
const checkbox: CheckBox = new CheckBox();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const  meganav: Meganav = new  Meganav();
const modal: Modal = new Modal();

describe(' US229899 - Import : Allow user to navigate away from BOM Import page if filename is blank, provide alert if trying to perform import actions',  () => {

    it(" should work for Remove button ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await checkbox.checkUnCheckCheckboxes(importElements.useFileNameCheckboxLabel, importElements.useFileNameCheckboxInput,
            fieldStatuses.emptyField);
        await modal.openModalWithButtonByName(buttonNames.remove);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.removeModalTitle);
        await expect(await modal.modalBodyParag.get(0).getText()).toEqual(importItems.removeModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it(" should work for for meganav ", async () => {
        await modal.openModalWithLinkName(meganavItems.home);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.leaveModalTitle);
        await modal.closeModalWithXButton();
        await modal.openModalWithLinkName(meganavItems.home);
        await modal.closeModalWithButton(buttonNames.doNotLeavePage)
    });

    it(" should work for Cancel", async () => {
        await modal.openModalWithButtonByName(buttonNames.cancelImport);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.cancelModalTitle);
        await expect(await importElements.cancelModalImportText.getText()).toEqual(importItems.cancelModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.cancelImport);
        await modal.closeModalWithButton(buttonNames.noDoNotCancel);
    });

    it(" should not be oprion to work with import till BOM name is not set", async () => {
        await modal.openModalWithElement(importElements.optionsContainer.get(0));
        await expect(await modal.modalTitle.getText()).toEqual(importItems.invalidBomNameModalTitle);
        await expect(await modal.modalBody.getText()).toEqual(importItems.invalidBomNameModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithElement(importElements.optionsContainer.get(1));
        await modal.closeModalWithButton(buttonNames.okayThanks);
        await importLogic.leaveImportWitLeaveModal();
    });

});