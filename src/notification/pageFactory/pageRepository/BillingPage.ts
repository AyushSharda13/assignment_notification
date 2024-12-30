import { Page } from '@playwright/test';
import { billingObject } from '../objectRepository/Billing.object';
import { notificationsObject } from '../objectRepository/Notifications.object';


export class BillingPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToNotifications() {
    await this.page.hover(billingObject.notificationsTab);
    await this.page.click(billingObject.notificationsTab);
    await this.page.waitForSelector(notificationsObject.notificationThresholdSwitch);
  }
}