import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Double } from "mongodb";

//Diseñamos nuestro Schema
const userSchema = mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true,
        },
        Password: {
            type: String,
            required: true,
            trim: true,
        },
        Email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        AccountNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        AccountBalance: {
            type: Number,
            required: true,
            trim: true,
        },
         token: {
             type: String,
         },
         tokenConfirm: {
             type: Boolean,
             default: false,
         },
    },
    {
        timestamps: true,
    }
);


// //Esto hace que se ejecute antes de guardar el registro en la BBDD
// userSchema.pre('save', async function(next) {

//     //Esta función regisa que el pass de aquí no ha cambiado,
//     //ya que si no se hace y se envia una actualización del user
//     // volverá a hashear y ya no podrán acceder.
//     if(!this.isModified('Password')) {
//         next() // next iría a la siguiente paso
//         //return: detendría la ejecución
//     }

//     //Creamos cadena salt
//     const salt = await bcrypt.genSalt(10);

//     // la función hash nos hace que el salt lo una con el password y lo guarda
//     this.Password = await bcrypt.hash(this.Password, salt)

// })

//Metodo para comprobar el password
userSchema.methods.checkPassword = async function(passwordForm) {

    // //retornará true o false con el metodo compare
    // return await bcrypt.compare(passwordForm, this.Password)
    return (passwordForm === this.Password);
}


//Definir el schema
const User = mongoose.model("user", userSchema)

export default User;