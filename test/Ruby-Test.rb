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
sleep 2
@driver.find_element(:id, "password").send_keys("123456")
sleep 2
@driver.find_element(:id, "buttonLogin").click()
sleep 5
@driver.find_element(:id, "logout").click()
sleep 5
#
# Resultado esperado
#O sistema realiza o login e mostra a 
#tela Home para o usuário.

#CT_002
#Forneça os dados de usuário (E-mail = teste123@teste.com, Senha = 0123456) e selecione o botão “Entrar”
@driver.find_element(:id, "email").send_keys("teste123@teste.com");
sleep 1
@driver.find_element(:id, "password").send_keys("0123456");
sleep 1
@driver.find_element(:id, "buttonLogin").click();
sleep 2
@driver.find_element(:id, "alertifyOk").click();
sleep 5
#
#O sistema mostra erro “E-mail ou senha incorretos. ”
#

#CT_003
#Forneça os dados de usuário, E-mail = teste123@teste.com, e não forneça dados referentes a senha e selecione o botão “Entrar”.

#####Clear Fields#####
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "password").clear();
sleep 2
@driver.find_element(:id, "email").send_keys("teste123@teste.com");
sleep 1
@driver.find_element(:id, "buttonLogin").click();
sleep 2
@driver.find_element(:id, "alertifyOk").click();
sleep 5
#
#O sistema mostra erro “Favor preencha o campo "Senha".

#CT_004
#Forneça os dados de usuário referentes a senha 123456 e não forneça dados no campo “E-mail” e então selecione o botão “Entrar”.

#####Clear Fields#####
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "password").clear();

sleep 2
@driver.find_element(:id, "password").send_keys("123456");
sleep 1
@driver.find_element(:id, "buttonLogin").click();
sleep 2
@driver.find_element(:id, "alertifyOk").click();
sleep 5
#
#O sistema mostra erro “Favor preencha o campo "E-mail".

#CT_005
#Forneça os dados de usuário referente ao E-mail= “teste”, e então clique fora do campo

#####Clear Fields#####
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "password").clear();
sleep 2

@driver.find_element(:id, "email").send_keys("teste");
sleep 1;
@driver.find_element(:id, "password").click();
sleep 5;
#
#O sistema mostra erro “Este não é um e-mail válido!”

#CT_006
#Forneça os dados para cadastrar um usuário 
#(Nome = Teste , Sobrenome = Testando , CPF = 70140214437, Telefone = 54999887766, E-mail = ct004@teste.com, Senha = 123456)
#e selecione o botão “Cadastrar”

@driver.find_element(:id, "redirectToRegister").click();
sleep 2;
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Testando");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("70140214437");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999887766");
sleep 1;
@driver.find_element(:id, "password").send_keys("123456");
sleep 1;
@driver.find_element(:id, "passwordConfirm").send_keys("123456");
sleep 1;
@driver.find_element(:id, "email").send_keys("ct004@teste.com");
sleep 2;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "logout").click()
sleep 5
#O sistema realizará o cadastro e mostrará tela home para o usuário
#

#CT_008
#Forneça os dados para cadastrar um usuário 
#(Nome = Teste , Sobrenome = Testando , CPF = 70140214437, Telefone = 54999887766, E-mail = ct004testecom, Senha = 123456)
#e selecione o botão “Cadastrar”

@driver.find_element(:id, "redirectToRegister").click();
sleep 2;
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Testando");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("70140214437");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999887766");
sleep 1;
@driver.find_element(:id, "password").send_keys("123456");
sleep 1;
@driver.find_element(:id, "passwordConfirm").send_keys("123456");
sleep 1;
@driver.find_element(:id, "email").send_keys("ct004testecom");
sleep 2;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
#O sistema mostrará mensagem por favor forneça um e-mail válido.
#

#CT_009
#Forneça os dados para cadastrar um usuário 
#(Nome = Teste , Sobrenome = Testando , CPF = 70140214437, Telefone = 54999887766, E-mail = ct004@teste.com, Senha = 123456)
#e selecione o botão “Cadastrar”

#####Clear Fields#####
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "phone").clear();
@driver.find_element(:id, "password").clear();
@driver.find_element(:id, "passwordConfirm").clear();
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "password").clear();

@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Testando");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("70140214437");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999887766");
sleep 1;
@driver.find_element(:id, "password").send_keys("123456");
sleep 1;
@driver.find_element(:id, "passwordConfirm").send_keys("123456");
sleep 1;
@driver.find_element(:id, "email").send_keys("ct004@teste.com");
sleep 2;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;

#O sistema mostrará mensagem que o e-mail ou cpf já está em uso
#

#CT_010
#Forneça os dados para cadastrar um usuário 
#(Nome = Teste , Sobrenome = Testando , CPF = 70140214437, Telefone = 54999887766, E-mail = ct010@teste.com, Senha = 123456)
#e selecione o botão “Cadastrar”
#####Clear Fields#####
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "phone").clear();
@driver.find_element(:id, "password").clear();
@driver.find_element(:id, "passwordConfirm").clear();
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "password").clear();

@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Testando");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("70140214437");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999887766");
sleep 1;
@driver.find_element(:id, "password").send_keys("123456");
sleep 1;
@driver.find_element(:id, "passwordConfirm").send_keys("123456");
sleep 1;
@driver.find_element(:id, "email").send_keys("ct010@teste.com");
sleep 2;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;

#O sistema mostrará mensagem que o cpf ou senha já está em uso.
#

#CT_011
#Não forneça dados nos campos e selecione o botão “Cadastrar”

#####Clear Fields#####
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "phone").clear();
@driver.find_element(:id, "password").clear();
@driver.find_element(:id, "passwordConfirm").clear();
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "password").clear();

@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
#O sistema mostrará mensagem de erro “Favor preencha o campo "Nome".

#CT_012
#Forneça os dados para o campo Nome = “Teste” e clique no botão “Cadastrar”
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 2;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
#O sistema mostrará mensagem de erro “Favor preencha o campo "Sobrenome".

#CT_013
#Forneça os dados para o campo Nome = “Teste”, Sobrenome = Teste e clique no botão “Cadastrar”
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
#O sistema mostrará mensagem de erro “Favor preencha o campo "Cpf".

#CT_014
#Forneça os dados para o campo 
#Nome = “Teste”, Sobrenome = Teste, CPF = 99999999999 e clique no botão “Cadastrar”

@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("99999999999");
sleep 1;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
#O sistema mostrará mensagem de erro “Favor preencha o campo "Email".

#CT_015
#Forneça os dados para o campo 
#Nome = “Teste”, Sobrenome = Teste, CPF = 99999999999, E-mail = “teste123@teste12” e clique fora do campo
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("99999999999");
sleep 1;
@driver.find_element(:id, "email").send_keys("teste123@teste12");
sleep 1;
@driver.find_element(:id, "password").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "email").clear();
#O sistema mostrará mensagem de erro “Este não é um e-mail válido!”

#CT_016
#Forneça os dados para o campo 
#Nome = “Teste”, Sobrenome = Teste, CPF = 99999999999, E-mail = “teste123@teste12.com” 
#e clique no botão “Cadastrar”
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("99999999999");
sleep 1;
@driver.find_element(:id, "email").send_keys("teste123@teste12.com");
sleep 2;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "email").clear();
#O sistema mostrará mensagem de erro “Favor preencha o campo "Telefone".

#CT_017
#Forneça os dados para o campo 
#Nome = “Teste”, Sobrenome = Teste, CPF = 99999999999, E-mail = “teste123@teste12.com”, Telefone = “ 54999999999” 
#e clique no botão “Cadastrar”
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("99999999999");
sleep 1;
@driver.find_element(:id, "email").send_keys("teste123@teste12.com");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999999999”");
sleep 1;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "phone").clear();
#O sistema mostrará mensagem de erro “Favor preencha o campo "Senha".

#CT_018
#Forneça os dados para o campo 
#Nome = “Teste”, Sobrenome = Teste, CPF = 99999999999, E-mail = “teste123@teste12.com”, Telefone = “ 54999999999”, Senha = “123456” 
#e clique no botão “Cadastrar”
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("99999999999");
sleep 1;
@driver.find_element(:id, "email").send_keys("teste123@teste12.com");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999999999");
sleep 1;
@driver.find_element(:id, "password").send_keys("123456");
sleep 1;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "phone").clear();
@driver.find_element(:id, "password").clear();
#O sistema mostrará mensagem de erro “Favor preencha o campo "Senha".

#CT_019
#Forneça os dados para o campo Nome = “Teste”, Sobrenome = Teste, CPF = 99999999999, E-mail = “teste123@teste12.com”, Telefone = “ 54999999999”, Senha = “123456”, 
#Confirmação de senha = “012345” e clique fora do campo.
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("99999999999");
sleep 1;
@driver.find_element(:id, "email").send_keys("teste123@teste12.com");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999999999");
sleep 1;
@driver.find_element(:id, "password").send_keys("123456");
sleep 1;
@driver.find_element(:id, "passwordConfirm").send_keys("“012345”");
sleep 1;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "alertifyOk").click();
sleep 5;
@driver.find_element(:id, "firstName").clear();
@driver.find_element(:id, "lastName").clear();
@driver.find_element(:id, "cpf").clear();
@driver.find_element(:id, "email").clear();
@driver.find_element(:id, "phone").clear();
@driver.find_element(:id, "password").clear();
@driver.find_element(:id, "passwordConfirm").clear();
#O sistema mostrará mensagem de erro “As senhas não coincidem!

#CT_020
#Forneça os dados para o campo 
#Nome = “Teste”, Sobrenome = Teste, CPF = 99999999999, E-mail = “teste123@teste12.com”, 
#Telefone = “ 54999999999”, Senha = “123456”, Confirmação de senha = “123456” e 
#clique no botão “Cadastrar”.
@driver.find_element(:id, "firstName").send_keys("teste");
sleep 1;
@driver.find_element(:id, "lastName").send_keys("Teste");
sleep 1;
@driver.find_element(:id, "cpf").send_keys("99991239999");
sleep 1;
@driver.find_element(:id, "email").send_keys("teste123@teste12.com");
sleep 1;
@driver.find_element(:id, "phone").send_keys("54999999999");
sleep 1;
@driver.find_element(:id, "password").send_keys("123456");
sleep 1;
@driver.find_element(:id, "passwordConfirm").send_keys("123456");
sleep 1;
@driver.find_element(:id, "buttonRegister").click();
sleep 5;
@driver.find_element(:id, "logout").click()
sleep 5
#O sistema realizará o cadastro com sucesso e será mostrado a tela Home para o usuário.

#CT_021
#Não forneça nenhum dado para os formulários e então clique no botão “Cancelar”
@driver.find_element(:id, "redirectToRegister").click();
sleep 2;
@driver.find_element(:id, "buttonCancelRegister").click();
sleep 2;
#O sistema mostrará novamente a tela de login

#CT_022
#Forneça os dados de usuário (E-mail = teste@teste.com, Senha = 123456) e selecione o botão “Entrar”
@driver.find_element(:id, "email").send_keys("teste@teste.com")
sleep 2
@driver.find_element(:id, "password").send_keys("123456")
sleep 2
@driver.find_element(:id, "buttonLogin").click()
sleep 5
@driver.find_element(:id, "logout").click()
sleep 5
#O sistema realizará o logout com sucesso e redirecionará o usuário para tela de login.