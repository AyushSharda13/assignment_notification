import { Page } from '@playwright/test';
import {  settingsObject } from '../objectRepository/Settings.object';
import { billingObject } from '../objectRepository/Billing.object';

export class SettingsPage {
   page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToSettings() {
    await this.page.hover(settingsObject.settingsMenu);
    await this.page.click(settingsObject.settingsMenu);
    await this.page.waitForSelector(settingsObject.billingMenu);
  }

  async goToBilling() {
    await this.page.hover(settingsObject.billingMenu);
    await this.page.click(settingsObject.billingMenu);
    await this.page.waitForSelector(billingObject.notificationsTab);
  }
}