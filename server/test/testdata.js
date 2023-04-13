// DATA FOR TESTING
import mongoose from "mongoose";

// FOR USERS
const users = [
{
    userType: "student",
    firstName: "Lorina",
    lastName: "Ipsuna",
    email: "lipsum123@up.edu.ph",
    password: "randomhash",
    phoneNumber: "09256672456",
    birthday: "16/03/2004",
    sex: "Female",
    verificationFiles: ["Student ID"],
},
{
    userType: "landowner",
    firstName: "Henry",
    lastName: "Cojuango",
    email: "hcong777@gmail.com",
    password: "mybelovedwifeanastasia",
    phoneNumber: "09442759000",
    birthday: "21/08/1966",
    sex: "Male",
    verificationFiles: ["Land Title"],
},
{
    userType: "teacher",
    firstName: "Mica",
    lastName: "Atalban",
    email: "micatalban14@gmail.com",
    password: "m1K4AtalbAn===",
    phoneNumber: "09112226443",
    birthday: "01/12/1995",
    sex: "Female",
    verificationFiles: ["Teacher ID"],
},
{
    userType: "student",
    firstName: "Josephus",
    lastName: "Antonino",
    email: "joantonino@gmail.com",
    password: "anotherBoat2s41l",
    phoneNumber: "09112358132",
    birthday: "29/02/2002",
    sex: "Male",
    verificationFiles: ["Student ID"],
},
{
    userType: "other",
    firstName: "Karen",
    lastName: "Naranja",
    email: "karentheorange@gmail.com",
    password: "aSw33tMandarin0range",
    phoneNumber: "09110006789",
    birthday: "21/10/1988",
    sex: "Female",
    verificationFiles: ["Business Permit"],
},
{
    userType: "student",
    firstName: "Jonrey",
    lastName: "Apacible",
    email: "joapacible@up.edu.ph",
    password: "lifeIsPrettyCrapIKnow111",
    phoneNumber: "09887772345",
    birthday: "01/01/2001",
    sex: "Male",
    verificationFiles: ["Student ID"],
},
{
    userType: "landowner",
    firstName: "Teresita",
    lastName: "Dimasalang",
    email: "teresitadimasalang@gmail.com",
    password: "BlueFlowerRoundCat",
    phoneNumber: "09289231122",
    birthday: "09/09/1991",
    sex: "Female",
    verificationFiles: ["Land Title"],
},
{
    userType: "professor",
    firstName: "Frederick",
    lastName: "Puno",
    email: "fcpuno1@up.edu.ph",
    password: "ShallowPlainsRaggedPeaks",
    phoneNumber: "09956789012",
    birthday: "07/06/1983",
    sex: "Male",
    verificationFiles: ["Teacher ID"],
},
{
    userType: "student",
    firstName: "Beatrice",
    lastName: "Doslagos",
    email: "bfdoslagos@gmail.com",
    password: "dalawang_lawa_ibigsabihin555",
    phoneNumber: "09118889734",
    birthday: "17/03/2005",
    sex: "Female",
    verificationFiles: ["Student ID"],
},
{
    userType: "other",
    firstName: "Peter",
    lastName: "Griffin",
    email: "petergriffin@gmail.com",
    password: "fortnite_gaming",
    phoneNumber: "09123456789",
    birthday: "10/05/1967",
    sex: "Male",
    verificationFiles: ["VISA"],
},
]

// FOR ACCOMMODATION
const accommodations = [
{
    accommodationID: new mongoose.Types.ObjectId(),
    name: "Nawawalang Paraiso",
    address: {
        postCode: "4030",
        street: "Dos Lagos",
        barangay: "San Fernando",
        city: "Los Baños",
        province: "Laguna",
        region: "CALABARZON"
    },
    accommodationType: 'Transient',
    priceRange: {
        minPrice: 7000,
        maxPrice: 14000
    },
    description: "Lost Paradise",
    restrictions: {
        curfew: "12 AM - 5 AM",
        pets: 'Allowed',
        cooking: 'Allowed',
        visitors: 'Allowed',
        coedStatus: 'Yes',
        wifi: 'With WiFi',
        phoneSignal: 'Strong'
    },
},
{
    accommodationID: new mongoose.Types.ObjectId(),
    name: "Four Sisters",
    address: {
        postCode: "4030",
        street: "Magsaysay",
        barangay: "Putimbakal",
        city: "Los Baños",
        province: "Laguna",
        region: "CALABARZON"
    },
    accommodationType: 'Dorm',
    priceRange: {
        minPrice: 2400,
        maxPrice: 3700
    },
    description: "Affordable dorms for students",
    restrictions: {
        curfew: "Non-existent",
        pets: 'Not Allowed',
        cooking: 'Not Allowed',
        visitors: 'Allowed',
        coedStatus: 'No',
        wifi: 'Add your own connection',
        phoneSignal: 'Strong'
    },
},
{
    accommodationID: new mongoose.Types.ObjectId(),
    name: "Mayfair Apartments",
    address: {
        postCode: "1234",
        street: "Apolinario",
        barangay: "Mabini",
        city: "Quezon",
        province: "NCR",
        region: "NCR"
    },
    accommodationType: 'Dorm',
    priceRange: {
        minPrice: 5000,
        maxPrice: 7000
    },
    description: "Transient, just like home!",
    restrictions: {
        curfew: "10 PM - 5 AM",
        pets: 'Allowed',
        cooking: 'Not Allowed',
        visitors: 'Allowed',
        coedStatus: 'No',
        wifi: 'With WiFi',
        phoneSignal: 'Fair'
    },
},
{
    accommodationID: new mongoose.Types.ObjectId(),
    name: "100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!",
    address: {
        postCode: "6666",
        street: "Maligaya",
        barangay: "HappyLand",
        city: "Makati",
        province: "NCR",
        region: "NCR"
    },
    accommodationType: 'Rent',
    priceRange: {
        minPrice: 0,
        maxPrice: 100
    },
    description: "Definitely safe :)",
    restrictions: {
        curfew: "Non-existent",
        pets: 'Allowed',
        cooking: 'Allowed',
        visitors: 'Allowed',
        coedStatus: 'No',
        wifi: 'With WiFi',
        phoneSignal: 'Strong'
    },
},
]

export default {users, accommodations}