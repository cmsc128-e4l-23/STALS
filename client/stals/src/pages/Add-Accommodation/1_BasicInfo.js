import React from "react";

export default function BasicInfo({ formData, setFormData }) {
    return(
        <div style ={{position: "relative",display:"flex", flexDirection:"column", width: "500px", fontSize:"Larger"}} className="basic-info-form-container">
            <input style={{ backgroundColor: "#f7f7f7", border: "1px solid #751518", borderRadius: "5px", padding: "10px", marginBottom: "30px", width: "80%", fontSize: "larger",alignSelf:"center"}}
            type="text" 
                placeholder="Accommodation Name..." 
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }    
            />
            <label style={{borderRadius: "5px", position: 'absolute', top: '-9px', left: '50px', backgroundColor: 'white', padding: '0 5px', fontSize: '14px', color: 'maroon' }}>Accommodation Name</label>

            <input style={{ backgroundColor: "#f7f7f7", border: "1px solid #751518", borderRadius: "5px", padding: "10px", marginBottom: "30px", width: "80%", fontSize: "larger",alignSelf:"center"}} type="landmark" placeholder="Landmark..." /> 
            <label style={{borderRadius: "5px", position: 'absolute', top: '70px', left: '50px', backgroundColor: 'white', padding: '0 5px', fontSize: '14px', color: 'maroon' }}>Landmark</label>
            {/* FIXME:fix input type */}

            <div className="address-field" style ={{display:"flex", flexDirection:"column"}}>
                <input style={{ backgroundColor: "#f7f7f7", border: "1px solid #751518", borderRadius: "5px", padding: "10px", marginBottom: "30px", width: "80%", fontSize: "larger",alignSelf:"center"}}
                    type="text" 
                    placeholder="City..." 
                    value={formData.address.city}
                    onChange={(e) => 
                        setFormData({ ...formData, address: { ...formData.address, city: e.target.value }})
                    }    
                />
                <label style={{borderRadius: "5px", position: 'absolute', top: '150px', left: '50px', backgroundColor: 'white', padding: '0 5px', fontSize: '14px', color: 'maroon' }}>City</label>
                <input style={{ backgroundColor: "#f7f7f7", border: "1px solid #751518", borderRadius: "5px", padding: "10px", marginBottom: "30px", width: "80%", fontSize: "larger",alignSelf:"center"}}
                    type="text" 
                    placeholder="Barangay..."
                    value={formData.address.barangay}
                    onChange={(e) => 
                        setFormData({ ...formData, address: { ...formData.address, barangay: e.target.value }})
                    }
                />
                 <label style={{borderRadius: "5px", position: 'absolute', top: '307px', left: '50px', backgroundColor: 'white', padding: '0 5px', fontSize: '14px', color: 'maroon' }}>Street</label>
                <input style={{ backgroundColor: "#f7f7f7", border: "1px solid #751518", borderRadius: "5px", padding: "10px", marginBottom: "30px", width: "80%", fontSize: "larger",alignSelf:"center"}}
                    type="text" 
                    placeholder="Street Name..." 
                    value={formData.address.street}
                    onChange={(e) => 
                        setFormData({ ...formData, address: { ...formData.address, street: e.target.value }})
                    }
                />
                 <label style={{borderRadius: "5px", position: 'absolute', top: '228px', left: '50px', backgroundColor: 'white', padding: '0 5px', fontSize: '14px', color: 'maroon' }}>Barangay</label>
                <input style={{ backgroundColor: "#f7f7f7", border: "1px solid #751518", borderRadius: "5px", padding: "10px", marginBottom: "30px", width: "80%", fontSize: "larger",alignSelf:"center", max:"4"}}
                    type="number" 
                    placeholder="Postal Code..."
                    value={formData.address.postCode}
                    onChange={(e) =>
                        setFormData({ ...formData, address: { ...formData.address, postCode: e.target.value }})
                    }    
                />
                 <label style={{borderRadius: "5px", position: 'absolute', top: '385px', left: '50px', backgroundColor: 'white', padding: '0 5px', fontSize: '14px', color: 'maroon' }}>Postal Code</label>
            </div>
        </div>
    )
}