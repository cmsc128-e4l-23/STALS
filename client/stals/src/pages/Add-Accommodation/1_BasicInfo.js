import React, { useState } from "react";

export default function BasicInfo({ formData, setFormData }) {
    return(
        <div className="basic-info-form-container">
            <input 
                type="text" 
                placeholder="Accommodation Name..." 
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }    
            />

            <input type="landmark" placeholder="Landmark..." /> 
            {/* FIXME:fix input type */}

            <div className="address-field">
                <input 
                    type="text" 
                    placeholder="City..." 
                    value={formData.address.city}
                    onChange={(e) => 
                        setFormData({ ...formData, address: { ...formData.address, city: e.target.value }})
                    }    
                />
                <input 
                    type="text" 
                    placeholder="Barangay..."
                    value={formData.address.barangay}
                    onChange={(e) => 
                        setFormData({ ...formData, address: { ...formData.address, barangay: e.target.value }})
                    }
                />
                <input 
                    type="text" 
                    placeholder="Street Name..." 
                    value={formData.address.street}
                    onChange={(e) => 
                        setFormData({ ...formData, address: { ...formData.address, street: e.target.value }})
                    }
                />
                
                <input 
                    type="text" 
                    placeholder="Postal Code..."
                    value={formData.address.postCode}
                    onChange={(e) =>
                        setFormData({ ...formData, address: { ...formData.address, postCode: e.target.value }})
                    }    
                />
            </div>
        </div>
    )
}