import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class ProductPage extends BasePage {
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.sortDropdown = this.page.locator(".product_sort_container");
  }

  async addToCart(itemName: string) {
    const productLocator = this.page.locator(`.inventory_item:has-text("${itemName}")`);

    const price = await productLocator.locator('.inventory_item_price').textContent();

    await productLocator.locator('button').click();

    return {
      [itemName]: price
    }
  }

  async sortItemsBy(sortOrder: string): Promise<void> {
    await this.sortDropdown.selectOption({value: sortOrder});
  }

  async getAllProductNames(): Promise<string[]> {
    const productNames = await this.page.locator(".inventory_item_name").allTextContents();
    return productNames;
  };

}
