import mongoose from 'mongoose';

const materiaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    horario: [
      {
        type: String,
        required: true,
      },
    ],
    cupo: {
      type: Number,
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    alumnos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Materia = mongoose.model('Materia', materiaSchema);
export default Materia;
