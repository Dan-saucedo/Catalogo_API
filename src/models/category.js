const categorySchema = new mongoose.Schema({
  
  nombre: { 
    type: String, 
    required: true, 
    unique: true 
    },
  slot: { 
    type: String, 
    required: true,
    unique: true 
    } // Para URLs limpias
});

export default mongoose.model('Category', categorySchema);