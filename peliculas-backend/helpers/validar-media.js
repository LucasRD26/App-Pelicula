const validarMedia = (req) => {
    const validaciones = [];
    if (!req.body.serial) {
        validaciones.push('Serial es requerido')
    }
    if (!req.body.titulo) {
        validaciones.push('Titulo es requerido')
    }
    if (!req.body.sipnosis) {
        validaciones.push('sipnosis es requerido')
    }
    if (!req.body.peliculaURL) {
        validaciones.push('peliculaURL es requerido')
    }
    if (!req.body.fotoPortada) {
        validaciones.push('FotoPortada es requerido')
    }
    if (!req.body.añoEstreno) {
        validaciones.push('AñoEstreno es requerido')
    }
    if (!req.body.genero) {
        validaciones.push('Genero es requerido')
    }
    if (!req.body.director) {
        validaciones.push('Director es requerido')
    }
    if (!req.body.productora) {
        validaciones.push('Productora es requerido')
    }
    if (!req.body.tipo) {
        validaciones.push('Tipo es requerido')
    }
    return validaciones;
}

module.exports = {
    validarMedia,
}