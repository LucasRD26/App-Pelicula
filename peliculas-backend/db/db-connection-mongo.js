const mongoose = require('mongoose');

const getConnection = async() => {
    try {
        const url = 'mongodb+srv://lucasrodriguez:Lucas260805@cluster0.uspzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

        await mongoose.connect(url);

        console.log('conexion exitosa');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}