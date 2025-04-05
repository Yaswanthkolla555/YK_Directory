import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import StartUpCard, { StartUpCardType } from "@/components/StartUpCard"

const UserStartUps = async ({id}:{id:string}) => {
  try {
    // console.log("Fetching startups for user ID:", id);
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
    // console.log("Startups data:", JSON.stringify(startups, null, 2));
    
    // Check if startups is an array
    const startupsArray = Array.isArray(startups) ? startups : [];
    
    return (  
      <>
        {startupsArray.length > 0 ? (
            startupsArray.map((startup: StartUpCardType) => (
              <StartUpCard key={startup._id} post={startup} />
            ))
          ) : (
            <p className="no-result">No posts yet</p>
          )}
      </>
    )
  } catch (error) {
    // console.error("Error fetching startups:", error)
    return <p className="no-result">Error loading startups</p>
  }
}

export default UserStartUps

