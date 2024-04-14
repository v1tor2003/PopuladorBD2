DROP DATABASE IF EXISTS concessionaria_db;
CREATE DATABASE concessionaria_db;
USE concessionaria_db;

CREATE TABLE DetalhesPessoa (
    id_detalhepessoa INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_pessoa VARCHAR(255) NOT NULL,
    nascimento_pessoa DATE NOT NULL,
    phone_pessoa VARCHAR(20) NOT NULL
);

CREATE TABLE Funcionario (
    id_func INTEGER PRIMARY KEY AUTO_INCREMENT,
    usuario_func VARCHAR(40),
    senha_func CHAR(16),
    salario_func FLOAT,
    
    id_detalhepessoa_fk INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (id_detalhepessoa_fk) REFERENCES DetalhesPessoa(id_detalhepessoa)
);

CREATE TABLE Cliente (
    id_cliente INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_detalhepessoa_fk INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (id_detalhepessoa_fk) REFERENCES DetalhesPessoa(id_detalhepessoa)
);

CREATE TABLE Versao (
    id_versao INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_versao CHAR(10) NOT NULL,
    preco_versao FLOAT
);

CREATE TABLE Cor (
	id_cor INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_cor VARCHAR(30) NOT NULL,
    preco_cor FLOAT
);

CREATE TABLE Motor (
    id_motor INTEGER PRIMARY KEY AUTO_INCREMENT,
    combustivel CHAR(10),
    cilindrada FLOAT,
    potencia INT NOT NULL
);

CREATE TABLE Carro (
    id_carro INTEGER PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(50) NOT NULL,
    ano_fab INTEGER NOT NULL,
    preco_carro FLOAT NOT NULL,
    quantidade INTEGER DEFAULT(0),
    
    id_cor_fk INTEGER,
    id_versao_fk INTEGER,
    id_motor_fk INTEGER,
	FOREIGN KEY(id_cor_fk) REFERENCES Cor(id_cor),
    FOREIGN KEY(id_versao_fk) REFERENCES Versao(id_versao),
    FOREIGN KEY(id_motor_fk) REFERENCES Motor(id_motor)
);

CREATE TABLE Venda(
	id_venda INTEGER PRIMARY KEY AUTO_INCREMENT,
    data_venda DATE,
    id_funcionario_fk INTEGER,
	id_carro_fk INTEGER,
    id_cliente_fk INTEGER,
    
    FOREIGN KEY (id_funcionario_fk) REFERENCES Funcionario(id_func),
    FOREIGN KEY (id_carro_fk) REFERENCES Carro(id_carro),
    FOREIGN KEY (id_cliente_fk) REFERENCES Cliente(id_cliente)
);

