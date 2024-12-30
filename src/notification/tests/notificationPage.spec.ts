import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageFactory/pageRepository/LoginPage';
import { SettingsPage } from '../pageFactory/pageRepository/SettingsPage';
import { BillingPage } from '../pageFactory/pageRepository/BillingPage';
import { NotificationsPage } from '../pageFactory/pageRepository/NotificationsPage';
import { testdata } from '../data/testData';
import { notificationsObject } from '../pageFactory/objectRepository/Notifications.object';

test.describe('Notification Page Tests', () => {
  test('Verify Notification Page and Toggle Switch', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);
    const billingPage = new BillingPage(page);
    const notificationsPage = new NotificationsPage(page);

    // Step 1: Login
    await loginPage.navigate();
    await loginPage.login(testdata.Email, testdata.Password);

    // Step 2: Account Selection
    await loginPage.selectAccount();

    // Step 2: Navigate to Notifications Page
    await settingsPage.goToSettings();
    await settingsPage.goToBilling();
    await billingPage.goToNotifications();

    // Step 3: Verify Page Elements
    await notificationsPage.verifyPageElements();
    const areAllTextsVisible = await notificationsPage.verifyText();
    expect(areAllTextsVisible).toBe(true);

    /*expect(await notificationsPage.verifyHeaderText()).toBe(true);
    expect(await notificationsPage.verifySectionText()).toBe(true);
    expect(await notificationsPage.verifyGlobalLimitText()).toBe(true);
    expect(await notificationsPage.verifyEmailNotificationText()).toBe(true);
    expect(await notificationsPage.verifyDefaultEmail()).toBe(true);
    */

    // Step 5: Save Changes
    //await notificationsPage.saveChanges();

    //await notificationsPage.discardChanges();
  //});


  /*test('Verify Toggle ON State', async ({ page }) => {
    const notificationsPage = new NotificationsPage(page);*/
    // Ensure Toggle is ON
    await notificationsPage.turnToggleOn();

    // Verify Elements are Enabled
    //await notificationsPage.verifyEnabledState();

    // Perform Actions
    await notificationsPage.setWalletUsageValue(testdata.walletUsageValue);
    await notificationsPage.selectDropdownValue();
    await notificationsPage.addEmail(testdata.Email);
    await notificationsPage.saveSettings();
  //});

  /*test('Verify Toggle OFF State', async ({ page }) => {
    const notificationsPage = new NotificationsPage(page);*/

    // Turn Toggle OFF and Handle Popup
    await notificationsPage.turnToggleOff();

    // Verify Elements are Disabled
    await notificationsPage.verifyDisabledState();

    // Turn Toggle Back ON
    await notificationsPage.turnToggleOn();
    await expect(page.locator(notificationsObject.toggleNotification)).toHaveAttribute('aria-checked', 'true');
  });

});