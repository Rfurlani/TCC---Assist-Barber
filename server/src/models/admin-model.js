import { Schema, model } from 'mongoose';
import AdminDomain from '../domains/admin-domain.js';

const AdminSchema = new Schema({
    usuarioId:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        require: true,
        unique: true
    }
}, { timestamps: true });

AdminSchema.loadClass(AdminDomain);
const Admin = model('admin', AdminSchema);
export default Admin;