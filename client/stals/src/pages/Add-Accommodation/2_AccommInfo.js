import React from "react";

export default function AccommInfo({ formData, setFormData }) {
    return(
        <div className="accomm-info-form-container">
            Accommodation Type:
            <select
                value={formData.accommodationType}
                onChange={(e) =>
                    setFormData({ ...formData, accommodationType: e.target.value })
                }
            >
                <option value="Transient">Transient</option>
                <option value="Dorm">Dorm</option>
                <option value="Apartment">Apartment</option>
                <option value="House for rent">House for rent</option>
            </select>
            <input 
                type="range" 
                min="1" 
                max="100" 
                value={formData.priceRange} 
                onChange={(e) =>
                    setFormData({ ...formData, priceRange: e.target.value })
                }
            />
            {/* FIXME:fix input responsiveness */}
        </div>
    )
}