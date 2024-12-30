import { Page } from '@playwright/test';
import { loginObject } from '../objectRepository/Login.object';
import { settingsObject } from '../objectRepository/Settings.object';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://staging.gohighlevel.com/');
    await this.page.waitForSelector(loginObject.emailInput);
  }

  async login(email: string, password: string) {
    await this.page.fill(loginObject.emailInput, email);
    await this.page.fill(loginObject.passwordInput, password);
    await this.page.click(loginObject.loginButton);
  }

  async selectAccount() {
    await this.page.waitForSelector(loginObject.testAutomationAccount);
    await this.page.hover(loginObject.testAutomationAccount);
    await this.page.click(loginObject.testAutomationAccount);
    await this.page.waitForSelector(settingsObject.settingsMenu);
  }
}  