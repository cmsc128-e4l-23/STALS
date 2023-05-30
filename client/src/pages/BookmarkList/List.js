import AccommCard from "./AccommInfo"

export default function List({ isLoggedIn, userType, bookmarks, email }){
    return(
        <div>
            {
                bookmarks.map((accomm) => {
                    return <AccommCard key={accomm._id} isLoggedIn={isLoggedIn} userType={userType} bookmarks={bookmarks} email={email} accomm={accomm} />
                })
            }
        </div>
    )
}