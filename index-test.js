// import required packages to control web browser and its behavior
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// create new instance and maximized window mode
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--start-maximized');

// new driver for chrome automation test
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

// dummy url and form field value
const registerUrl = 'http://localhost:2000/register';
const name = 'hilmi';
const email = 'hilmi@mail.com';
const mobile_number = '081230480221';

async function automateRegister(){
    try{
        // heading to target web
        await driver.get(registerUrl);

        // Find the form field and register button
        const nameField = await driver.findElement(By.name('nama'));
        const emailField = await driver.findElement(By.name('email'));
        const mobileNumberField = await driver.findElement(By.name('mobile_number'));
        const registerButton = await driver.findElement(By.css('button[type="submit"]'));
        
        // Enter the value
        await nameField.sendKeys(name);
        await emailField.sendKeys(email);
        await mobileNumberField.sendKeys(mobile_number);

        // Submit registered data button
        await registerButton.click();

        // wait for the automate test find success input 
        await driver.wait(until.elementLocated(By.css('.input-control.success')), 10000);

        await delay(5000);

        console.log('Form field test successful');

    } catch (error){
        console.error('An error occured;', error);
        
    } finally{
        await driver.quit();
    }
}

// Delay the process
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// call the main func for automate test
automateRegister();