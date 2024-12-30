import { Page, expect } from '@playwright/test';
import { notificationsObject } from '../objectRepository/Notifications.object';

export class NotificationsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyPageElements() {
    await this.page.waitForSelector(notificationsObject.notificationThresholdSwitch);
    await expect(this.page.locator(notificationsObject.notificationThresholdSwitch)).toBeVisible();
    await expect(this.page.locator(notificationsObject.globalLimitSection)).toBeVisible();
    await expect(this.page.locator(notificationsObject.notifiedEmailAddresses)).toBeVisible();
  }

  /*async verifyHeaderText(): Promise<boolean> {
    return await this.page.isVisible(notificationLocators.notificationHeader);
  }

  async verifySectionText(): Promise<boolean> {
    return await this.page.isVisible(notificationLocators.notificationSectionText);
  }

  async verifyGlobalLimitText(): Promise<boolean> {
    return await this.page.isVisible(notificationLocators.globalLimitText);
  }

  async verifyEmailNotificationText(): Promise<boolean> {
    return await this.page.isVisible(notificationLocators.emailNotificationText);
  }

  async verifyDefaultEmail(): Promise<boolean> {
    return await this.page.isVisible(notificationLocators.defaultEmailText);
  }*/

    async verifyText(): Promise<boolean> {
      const elementsToVerify = [
        notificationsObject.notificationHeader,
        notificationsObject.notificationSectionText,
        notificationsObject.globalLimitText,
        notificationsObject.emailNotificationText,
        notificationsObject.defaultEmailText,
      ];
  
      for (const locator of elementsToVerify) {
        const isVisible = await this.page.isVisible(locator);
        if (!isVisible) {
          console.error(`Element not visible: ${locator}`);
          return false;
        }
      }
      return true;
    }

  /*async saveChanges() {
    await this.page.hover(notificationLocators.saveButton);
    await this.page.click(notificationLocators.saveButton);
  }

  async discardChanges() {
    await this.page.hover(notificationLocators.discardButton);
    await this.page.click(notificationLocators.discardButton);
  }*/

    // Verify Toggle State
    async isToggleOn(): Promise<boolean> {
      const toggle = this.page.locator(notificationsObject.toggleNotification);
      return (await toggle.getAttribute("aria-checked")) === "true";
    } 

    // Turn Toggle ON
  async turnToggleOn() {
    const toggle = this.page.locator(notificationsObject.toggleNotification);
    if (!(await this.isToggleOn())) {
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-checked", "true");
    }
  }

    // Turn Toggle OFF
  async turnToggleOff() {
    const toggle = this.page.locator(notificationsObject.toggleNotification);
    if (await this.isToggleOn()) {
      await toggle.click();
      const popupDisable = this.page.locator(notificationsObject.popupDisableButton);
      await popupDisable.click();
    }
  }

  // Verify Disabled State
  async verifyDisabledState() {
    await expect(this.page.locator(notificationsObject.walletUsageInput)).toBeDisabled();
    //await expect(this.page.locator(notificationLocators.walletDropdownOption)).toBeDisabled();
    await expect(this.page.locator(notificationsObject.pencilIcon)).toHaveAttribute("tabindex", "-1");
    await expect(this.page.locator(notificationsObject.saveButton)).toHaveAttribute("tabindex", "-1");
    await expect(this.page.locator(notificationsObject.discardButton)).toHaveAttribute("tabindex", "-1");
  }

  /*// Verify Enabled State
  async verifyEnabledState() {
    await expect(this.page.locator(BillingPageLocators.walletUsageInput)).toBeEnabled();
    await expect(this.page.locator(BillingPageLocators.walletDropdown)).toBeEnabled();
    await expect(this.page.locator(BillingPageLocators.emailSection)).toBeVisible();
  }*/

  // Set Wallet Usage Value and Verify it is Greater than 0
async setWalletUsageValue(value: string) {
  const walletInput = this.page.locator(notificationsObject.walletUsageInput);
  await walletInput.fill(value);
  
  // Verify the value is set correctly
  const enteredValue = await walletInput.inputValue();
  expect(Number(enteredValue)).toBeGreaterThan(0); // Ensure value is > 0
}

// Select Dropdown Value
async selectDropdownValue() {
  await this.page.click(notificationsObject.walletDropdown);
  await this.page.click(notificationsObject.walletDropdownOption);
}


async addEmail(email: string) {
  const emailButton = this.page.locator(notificationsObject.notifiedEmailButton);
  const emailInput = this.page.locator(notificationsObject.emailInputField);
  const emailDropdownOption = this.page.locator(notificationsObject.emailDropdownOption);
  const addEmailButton = this.page.locator(notificationsObject.addEmailButton);
  //const addedEmailsList = this.page.locator(notificationLocators.addedEmailsList);

  // Click the email button to open input
  await emailButton.click();

  // Fill the email input
  await emailInput.click();
  await emailInput.fill(email);
  await this.page.waitForTimeout(1000);
  await emailDropdownOption.click();


  // Wait for the dropdown to appear and select the option
  //await emailDropdownOption.click();

  // Click add email button
  await addEmailButton.click();

  // Verify that only up to 5 emails can be added
  //const addedEmailsCount = await addedEmailsList.count();
  //expect(addedEmailsCount).toBeLessThanOrEqual(5); // Ensure no more than 5 emails are added
}

async saveSettings() {
  await this.page.locator(notificationsObject.saveButton).click();
}

}