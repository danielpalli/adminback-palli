import mongoose from 'mongoose';

const cursoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    horario: {
      type: String,
      trim: true,
      required: true,
    },
    comision: {
      type: String,
      trim: true,
      required: true,
    },
    fechaInicio: {
      type: Date,
      default: Date.now,
    },
    cupo: {
      type: Number,
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    docente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    alumnos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Curso = mongoose.model('Curso', cursoSchema);
