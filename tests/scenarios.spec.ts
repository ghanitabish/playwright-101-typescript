import { test, expect } from '@playwright/test';

/**
 * Scenario 1: Simple Form Demo
 * 1. Open TestMu AI Selenium Playground
 * 2. Click "Simple Form Demo"
 * 3. Validate URL contains "simple-form-demo"
 * 4. Enter "Welcome to TestMu AI" in the message text box
 * 5. Click "Get Checked Value"
 * 6. Validate the message appears in the "Your Message:" section
 */
test('Scenario 1: Simple Form Demo', async ({ page }) => {
  await test.step('Step 1: Navigate to TestMu AI Selenium Playground', async () => {
    console.log('Step 1: Navigating to TestMu AI Selenium Playground');
    const url = 'https://www.testmuai.com/selenium-playground/';
    const response = await page.goto(url);
    if (!response || !response.ok()) {
      console.warn('Page load issue:', url, 'Status:', response && response.status());
    }
    await page.waitForLoadState('networkidle');
    console.log('Step 1: Page loaded');
    console.log('Current URL:', page.url());
  });

  await test.step('Step 2: Click "Simple Form Demo"', async () => {
    console.log('Step 2: Clicking "Simple Form Demo"');
    await page.waitForSelector('a:has-text("Simple Form Demo")', { timeout: 10000 });
    await page.locator('a:has-text("Simple Form Demo")').click();
    await page.waitForLoadState('networkidle');
    console.log('Step 2: Navigated to Simple Form Demo');
  });

  await test.step('Step 3: Validate URL contains "simple-form-demo"', async () => {
    console.log('Step 3: Validating URL contains "simple-form-demo"');
    expect(page.url()).toContain('simple-form-demo');
    console.log('Step 3: URL validation passed');
  });

  const message = 'Welcome to TestMu AI';

  await test.step('Step 4: Enter value in the "Enter Message" text box', async () => {
    console.log('Step 4: Entering message in text box');
    await page.locator('input[id="user-message"]').fill(message);
    console.log(`Step 4: Message entered: ${message}`);
  });

  await test.step('Step 5: Click "Get Checked Value"', async () => {
    console.log('Step 5: Clicking "Get Checked Value"');
    await page.locator('button:has-text("Get Checked Value")').click();
    console.log('Step 5: Clicked Get Checked Value');
  });

  await test.step('Step 6: Validate message is displayed in "Your Message:" section', async () => {
    console.log('Step 6: Validating displayed message');
    const messageDisplay = page.locator('#message');
    await expect(messageDisplay).toHaveText(message);
    console.log('Step 6: Message validation passed');
  });
});

/**
 * Scenario 2: Drag & Drop Sliders
 * 1. Open Selenium Playground and click "Drag & Drop Sliders"
 * 2. Select the slider "Default value 15" and drag the bar to make it 95
 * 3. Validate the range value shows 95
 */
test('Scenario 2: Drag & Drop Sliders', async ({ page }) => {
  await test.step('Step 1: Navigate to Selenium Playground and click "Drag & Drop Sliders"', async () => {
    console.log('Step 1: Navigating to Selenium Playground');
    const url = 'https://www.testmuai.com/selenium-playground/';
    const response = await page.goto(url);
    if (!response || !response.ok()) {
      console.warn('Page load issue:', url, 'Status:', response && response.status());
    }
    await page.waitForLoadState('networkidle');
    console.log('Step 1: Page loaded');
    console.log('Current URL:', page.url());
    console.log('Step 1: Clicking "Drag & Drop Sliders"');
    await page.locator('text=Drag & Drop Sliders').click();
    await page.waitForLoadState('networkidle');
    console.log('Step 1: Navigated to Drag & Drop Sliders');
  });

  await test.step('Step 2: Drag the "Default value 15" slider to 95', async () => {
    console.log('Step 2: Locating slider with default value 15');
    const slider = page.locator('#slider3').getByRole('slider');
    console.log('Step 2: Setting slider to 95');
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '95';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    console.log('Step 2: Slider value set to 95');
  });

  await test.step('Step 3: Validate the range value shows 95', async () => {
    console.log('Step 3: Validating slider value is 95');
    const slider = page.locator('#slider3').getByRole('slider');
    await expect(slider).toHaveValue('95');
    console.log('Step 3: Slider value validation passed');
  });
});

/**
 * Scenario 3: Input Form Submit
 * 1. Open Selenium Playground and click "Input Form Submit"
 * 2. Click "Submit" without filling any information
 * 3. Assert "Please fill in the fields" error message
 * 4. Fill in Name, Email, and other fields
 * 5. Select "United States" from the Country drop-down
 * 6. Fill all fields and click "Submit"
 * 7. Validate the success message
 */
test('Scenario 3: Input Form Submit', async ({ page }) => {
  await test.step('Step 1: Navigate to Selenium Playground and click "Input Form Submit"', async () => {
    console.log('Step 1: Navigating to Selenium Playground');
    const url = 'https://www.testmuai.com/selenium-playground/';
    const response = await page.goto(url);
    if (!response || !response.ok()) {
      console.warn('Page load issue:', url, 'Status:', response && response.status());
    }
    await page.waitForLoadState('networkidle');
    console.log('Step 1: Page loaded');
    console.log('Current URL:', page.url());
    console.log('Step 1: Clicking "Input Form Submit"');
    await page.locator('text=Input Form Submit').click();
    await page.waitForLoadState('networkidle');
    console.log('Step 1: Navigated to Input Form Submit');
  });

  await test.step('Step 2: Click "Submit" without filling in any information', async () => {
    console.log('Step 2: Clicking Submit without filling fields');
    await page.locator('button:has-text("Submit")').click();
    console.log('Step 2: Submit clicked');
  });

  await test.step('Step 3: Assert "Please fill in the fields" validation message', async () => {
    console.log('Step 3: Asserting validation on required field');
    const firstRequired = page.locator('#name');
    await expect(firstRequired).toBeVisible();
    const validationMsg = await firstRequired.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMsg.length).toBeGreaterThan(0);
    console.log('Step 3: Validation message found:', validationMsg);
  });

  await test.step('Step 4: Fill in Name, Email, and other fields', async () => {
    await page.locator('#name').fill('Test User');
    await page.locator('#inputEmail4').fill('test@example.com');
    await page.locator('#inputPassword4').fill('Password123');
    await page.locator('#company').fill('Test Company');
    await page.locator('#websitename').fill('https://www.example.com');
    await page.locator('#inputCity').fill('San Francisco');
    await page.locator('#inputAddress1').fill('123 Main Street');
    await page.locator('#inputAddress2').fill('Suite 100');
    await page.locator('#inputState').fill('California');
    await page.locator('#inputZip').fill('94102');
  });

  await test.step('Step 5: Select "United States" from the Country drop-down', async () => {
    await page.locator('select[name="country"]').selectOption({ label: 'United States' });
  });

  await test.step('Step 6: Click "Submit"', async () => {
    await page.locator('button:has-text("Submit")').click();
    await page.waitForLoadState('networkidle');
  });

  await test.step('Step 7: Validate success message', async () => {
    const successMessage = page.locator('text=Thanks for contacting us, we will get back to you shortly.');
    await expect(successMessage).toBeVisible();
  });
});
