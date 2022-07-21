import mongoose from 'mongoose';

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
      trim: true,
    },
    perfil: {
      type: String,
      required: true,
      default: 'Alumno',
    },
    sexo: {
      type: String,
      required: true,
      default: 'Masculino',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
