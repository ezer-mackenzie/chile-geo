import { expect, test } from '@playwright/test';
import { join } from 'node:path';

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
    const hitPoint = await canvas.evaluate((element) => {
      const context = element.getContext('2d');
      const pixels = context.getImageData(0, 0, element.width, element.height).data;
      for (let y = 0; y < element.height; y += 4) for (let x = 0; x < element.width; x += 4) {
        if (pixels[(y * element.width + x) * 4 + 3] > 0) return { x: x / 2, y: y / 2 };
      }
      throw new Error('Could not find a rendered map pixel.');
    });
    const box = await canvas.boundingBox();
    await page.mouse.move(box.x + hitPoint.x, box.y + hitPoint.y);
    await page.mouse.click(box.x + hitPoint.x, box.y + hitPoint.y);
    await expect(page.locator('output')).not.toHaveText('');
    await page.locator('#map').evaluate((element) => { element.style.width = '320px'; });
    await expect.poll(() => canvas.evaluate((element) => element.width)).toBe(640);
    await page.evaluate(() => { window.destroyMap(); window.destroyMap(); });
    await expect(canvas).toHaveCount(0);
  });

  test('matches the approved desktop rendering', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'One canonical Chromium snapshot avoids engine-specific raster differences.');
    await page.goto('/');
    await expect(page.locator('canvas')).toHaveScreenshot('chile-2d-desktop.png', { maxDiffPixelRatio: 0.01 });
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
    const remainingGeometry = await page.evaluate(() => {
      const map = window.chileMap;
      window.destroyMap();
      window.destroyMap();
      return map.renderer.info.memory.geometries;
    });
    expect(remainingGeometry).toBe(0);
    await expect(canvas).toHaveCount(0);
  });

  test('reports a clear failure when WebGL is unavailable', async ({ page }) => {
    const error = page.waitForEvent('pageerror');
    await page.goto('/?mode=webgl-off');
    await expect(page.locator('output')).toContainText(/WebGL|context/i);
    await expect(error).resolves.toBeTruthy();
  });
});

test.describe('UMD distribution', () => {
  test('loads as a classic browser script and exposes both renderers', async ({ page }) => {
    await page.goto('/blank.html');
    const threeUrl = `/@fs${join(process.cwd(), 'node_modules/three/build/three.module.js')}`;
    await page.evaluate(async (url) => { window.THREE = await import(url); }, threeUrl);
    await page.addScriptTag({ path: join(process.cwd(), 'packages/map-render/dist/index.umd.cjs') });
    const result = await page.evaluate(() => {
      const container = document.querySelector('#map');
      const twoDimensional = new window.ChileGeo.Chile2DMap({ container });
      twoDimensional.updateData([{ id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 1 }]);
      const canvas = twoDimensional.canvas;
      twoDimensional.destroy();
      return {
        has2D: typeof window.ChileGeo.Chile2DMap === 'function',
        has3D: typeof window.ChileGeo.Chile3DMap === 'function',
        rendered: canvas.width > 0,
      };
    });
    expect(result).toEqual({ has2D: true, has3D: true, rendered: true });
  });
});
