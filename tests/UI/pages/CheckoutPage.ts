import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class CheckoutPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async inputOrderDetails(orderDetails: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await this.page.locator("#first-name").fill(orderDetails.firstName);
    await this.page.locator("#last-name").fill(orderDetails.lastName);
    await this.page.locator("#postal-code").fill(orderDetails.postalCode);
  }

  async continueCheckout() {
    await this.page.locator("#continue").click();
  }

  async getOrderTotal(): Promise<string | null> {
    const orderSummary = await this.page.locator('[data-test="subtotal-label"]').textContent();
    return orderSummary;
  }

  async completeOrder() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
