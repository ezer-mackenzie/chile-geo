import { expect, test } from '@playwright/test';

test.describe('Chile2DMap', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/'); });

  test('renders responsively, updates in place, supports the keyboard, and destroys safely', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toHaveCount(1);
    await expect(canvas).toHaveAttribute('role', 'img');
    await expect.poll(() => canvas.evaluate((element) => ({ width: element.width, height: element.height }))).toEqual({ width: 960, height: 1280 });
    expect(await canvas.evaluate((element) => {
      const context = element.getContext('2d');
      const pixels = context.getImageData(0, 0, element.width, element.height).data;
      let visible = 0;
      for (let index = 3; index < pixels.length; index += 64) if (pixels[index] > 0) visible++;
      return visible;
    })).toBeGreaterThan(1_000);
    expect(await page.evaluate(() => {
      const original = document.querySelector('canvas');
      window.updateMetrics();
      return original === document.querySelector('canvas');
    })).toBe(true);
    expect(await page.evaluate(() => {
      const start = performance.now();
      for (let index = 0; index < 100; index++) window.updateMetrics();
      return performance.now() - start;
    })).toBeLessThan(2_000);
    await canvas.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('output')).not.toHaveText('');
    await page.locator('#map').evaluate((element) => { element.style.width = '320px'; });
    await expect.poll(() => canvas.evaluate((element) => element.width)).toBe(640);
    await page.evaluate(() => { window.destroyMap(); window.destroyMap(); });
    await expect(canvas).toHaveCount(0);
  });
});

test.describe('Chile3DMap', () => {
  test('creates 16 region groups, updates without replacing WebGL, and disposes safely', async ({ page }) => {
    await page.goto('/?mode=3d');
    const canvas = page.locator('canvas');
    await expect(canvas).toHaveCount(1);
    const result = await page.evaluate(() => {
      const map = window.chileMap;
      const element = map.renderer.domElement;
      window.updateMetrics();
      return { sameElement: element === map.renderer.domElement, groups: map.mainGroup.children.length, name: map.mainGroup.name };
    });
    expect(result).toEqual({ sameElement: true, groups: 16, name: 'ChileMainGroup' });
    expect(await page.evaluate(() => {
      const start = performance.now();
      for (let index = 0; index < 100; index++) window.updateMetrics();
      return performance.now() - start;
    })).toBeLessThan(2_000);
    await canvas.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('output')).not.toHaveText('');
    await page.evaluate(() => { window.destroyMap(); window.destroyMap(); });
    await expect(canvas).toHaveCount(0);
  });

  test('reports a clear failure when WebGL is unavailable', async ({ page }) => {
    const error = page.waitForEvent('pageerror');
    await page.goto('/?mode=webgl-off');
    await expect(page.locator('output')).toContainText(/WebGL|context/i);
    await expect(error).resolves.toBeTruthy();
  });
});
