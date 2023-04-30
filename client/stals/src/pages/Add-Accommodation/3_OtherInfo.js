import React from "react";

export default function OtherInfo({ formData, setFormData }){
    return(
        <>
            <input 
                type="textarea" 
                placeholder="Description..." 
                value={formData.description}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }    
            />

            <input
                type="text"
                placeholder="Restrictions..."
                value={formData.restrictions}
                onChange={(e) => 
                    setFormData({ ...formData, restrictions: e.target.value })
                }
            />
        </>
    )
}