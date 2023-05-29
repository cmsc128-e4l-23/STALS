
import mongoose from "mongoose";


const OwnerSchema = new mongoose.Schema({
    propertiesList: [{type: mongoose.Schema.Types.ObjectID, ref: 'Accomodation'}],
    archivedList: [{type: mongoose.Schema.Types.ObjectID, ref: 'Accomodation'}],
    status:{type: String, enum: ['pending', 'active', 'inactive'], default: "active"}
});

const AdminSchema = new mongoose.Schema({
    pendingApplications: [{type: mongoose.Schema.Types.ObjectID, ref: 'Accomodation'}],
    pendingReports: [{type: mongoose.Schema.Types.ObjectID, ref: "Report"}]
})
const UserSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        birthday: { //need to check this.
            type: String,
            required: true
        },
        profilePhoto: {
            type: String
        },
        sex: { //need to check this.
            type: String,
            enum: ["Male", "Female", "Prefer Not To Disclose"],
            required: true
        },
        verificationFiles: [{type: String, required: true}], //confirm this
        reviews: [{type: mongoose.Schema.Types.ObjectID, ref:"Review"}],
        reports: [{type: mongoose.Schema.Types.ObjectID, ref:"Report"}],
        bookmarks: [{type: mongoose.Schema.Types.ObjectID, ref:"Bookmark"}],
        owner: OwnerSchema,
        admin: AdminSchema
    },
    {
        timestamps: true,
    }
);

// UserSchema.pre("save")
const User = mongoose.model("User", UserSchema);
export default User;