import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Administrador} from '../models';
import {AdministradorRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository
  ) { }

  /*
   * Add service methods here
   */
  GenerarClave() {
    let clave = generador(10, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarAdministrador(usuario: string, clave: string) {
    try {
      let a = this.administradorRepository.findOne({where: {correoElec: usuario, clave: clave}});
      if (a) {
        return a;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(administrador: Administrador) {
    let token = jwt.sign({
      data: {
        id: administrador.idAdministrador,
        correo: administrador.correoElec,
        nombre: administrador.nombres
      }
    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
