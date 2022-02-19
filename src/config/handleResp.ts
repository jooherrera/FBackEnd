import ServerMessenger, { ResponseND } from 'servermessenger-nd'

const errors = {
  sintaxError: {
    clientMsg: 'Error de sintaxis. Comprobar que está enviando todos los datos requeridos.',
    code: 400,
  },
  userNotFound: { clientMsg: 'No existe el usuario.', code: 404 },
  alreadyExist: { clientMsg: 'Email ya registrado', code: 403 },
  unauthorized: { clientMsg: 'Las credenciales no son validas', code: 401 },
  urlNotFound: { clientMsg: 'Endpoint no existe.', code: 404 },
  invalidToken: { clientMsg: 'Este token esta bloqueado.', code: 401 },
  alreadyInvalid: { clientMsg: 'Este token ya esta bloqueado.', code: 401 },
  imageError: { clientMsg: 'Error al subir imagen. Utilize jpg,jpeg,png. Tamaño maximo 1mb.', code: 406 },
  productNotFound: { clientMsg: 'No se encontro coincidencia.', code: 404 },
  cartNotFound: { clientMsg: 'No se encontro coincidencia.', code: 404 },
  invalidParam: { clientMsg: 'Parámetro inválido', code: 400 },
  incompleteInfo: { clientMsg: 'El usuario no tiene sus datos completos.', code: 400 },
  invalidPayMethod: { clientMsg: 'Metodo de pago invalido', code: 400 },
  invalidShippingMethod: { clientMsg: 'Metodo de envio invalido', code: 400 },
  orderNotFound: { clientMsg: 'No se encontro ninguna orden', code: 400 },
  emptyCart: { clientMsg: 'El carrito está vacio. No se puede generar una orden', code: 400 },
  invalidEmail: { clientMsg: 'No coincide con el email registrado.', code: 400 },
  passwordMissmatch: { clientMsg: 'Password no coincide.', code: 400 },
  bodyEmpty: { clientMsg: 'Campos vacios', code: 400 },
}

const success = {
  authRegistered: { clientMsg: 'Usuario registrado correctamente.', code: 201 },
  userLogin: { clientMsg: 'Usuario logeado correctamente. Token generado.', code: 200 },
  logout: { clientMsg: 'Se ha invalidado el token', code: 200 },
  updateOk: { clientMsg: 'Se actualizó correctamente la información', code: 202 },
  notFoundMsg: { clientMsg: 'No hay mensajes para mostrar.', code: 200 },
  noFieldsForUpdate: { clientMsg: 'No se recibio nada para actualizar.', code: 200 },
  newProductAdded: { clientMsg: 'Se agrego correctamente el producto', code: 202 },
  deleteOk: { clientMsg: 'Se ha borrado el producto correctamente.', code: 200 },
  success: { clientMsg: 'Todo salio bien.', code: 200 },
  deleteCartOk: { clientMsg: 'Se han eliminado todos los productos del carrito', code: 200 },
  home: { clientMsg: 'Home API', code: 200 },
}

const SM = new ServerMessenger(errors, success)
const Resp = new ResponseND()
export { SM, Resp }
