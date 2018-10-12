#requisição da gem
require 'selenium-webdriver'
#indicando local do driver do selenium
Selenium::WebDriver::Chrome.driver_path="C:/chromedriver_win32/chromedriver.exe"
#Declarando a variável @driver atribuindo Webdriver do Chrome
@driver = Selenium::WebDriver.for :chrome
#Tela de login acessada
@driver.get "localhost:5000"

#CT_001
#Forneça os dados de usuário (E-mail = teste@teste.com, Senha = 123456) e selecione o botão “Entrar”
@driver.find_element(:id, "email").send_keys("teste@teste.com")
@driver.find_element(:id, "password").send_keys("123456")
@driver.find_element(:id, "buttonLogin").click()
sleep 10

#CT_002
#Forneça os dados de usuário (E-mail = teste123@teste.com, Senha = 0123456) e selecione o botão “Entrar”
#@driver.find_element(:id, "email").send_keys("teste123@teste.com")
#@driver.find_element(:id, "password").send_keys("0123456")
#@driver.find_element(:id, "buttonLogin").click()

