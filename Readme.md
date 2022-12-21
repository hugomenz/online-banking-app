# Banca Online

## Funcionamiento Páginas

**Mis cuentas:** Lista de todas las cuentas agregadas a la base de datos. Se puede agregar cuenta con nuevo nombre y tipo de cuenta. Tiene la opción de ir los movimientos para cada una de las cuentas. Además se puede ir a la página de transferencias desde cada una de las cuentas.

**Movimientos:** Si se accede desde el menú superior, nos devuelve todos los movimientos asociados a todas las cuentas existentes en la base de datos para el usuario logeado. Si se accede desde cada una de las cuentas, lo que hace es filtrar los datos mostrando unicamente los movimientos asociados a la cuenta desde la que accedimos a movimientos.

**Transferencias** Crea una transferencia desde la cuenta que especifiquemos y la manda al servidor.

## Algunas modificaciones EXTRAS a lo que pedía el Ejercicio.

- `.src/common/helpers/element.helpers.js`

  - _onSetError_ [linea 32] se modificó para que detectase de qué ID proviene el error de validación. En el caso de ser el campo de 'día', 'mes' o 'año', muestra los siguientes mensajes de error:
    - Introduce un día correcto.
    - Introduce un mes correcto.
    - Introduce un año correcto.
  - _translateDateElements_ [linea 53] se creó para poder mostrar el texto "día", "mes" y "año" en español.

- `.src/pages/transfer/transfer.messages.js` Se creó un fichero donde se encuentran todos los mensajes mostrados en la aplicación.

- `.src/pages/transfer/transfer.html` Se modificaron los inputs de la fecha. Días tiene un rango [1, 31] [lineas 87 y 88], mes [1, 12] [lineas 97 y 98], año a partir de 2022 [lineas 107 y 108]. El input de Importe(EUR) se cambió a tipo number.

- Las **transferencias** SOLO se ejecutarán si los **fondos** de la cuenta seleccionada son **suficientes**. En el caso que no lo sean, no se ejecuta la transacción, vuelve a la transferencia y podemos seleccionar otra cuenta. Si hay fondos disponibles para realizar la transferencia, aparecerá una alerta con el resumen de la misma. En esta ventana podremos aceptar o cancelar la transferencia. La fecha de las transacciones serán, por defecto, la actual.
