import { client } from "@/sanity/lib/client";
import Ping from "./Ping"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { revalidatePath } from "next/cache";

// Server action to increment views
async function incrementViews(id: string, currentViews: number) {
  'use server';
  try {
    // Check if token is available
    if (!writeClient.config().token) {
      console.error("Missing write token for Sanity client");
      return;
    }
    
    await writeClient.patch(id).set({views: currentViews + 1}).commit();
    revalidatePath(`/startup/${id}`);
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

const View = async ({id}:{id:string}) => {
  try {
    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
    
    // Call the server action to increment views
    incrementViews(id, totalViews);

    return (
      <div className="relative w-full h-16">
          <div className="absolute top-4 right-0 z-10 bg-red-500 p-2 rounded-full">
              <Ping/>
          </div>
          <p className="view-text absolute bottom-0 right-0 w-auto min-w-[80px] text-right">
              <span className="text-black font-bold">{totalViews} {totalViews === 1 ? 'View' : 'Views'}</span>
          </p>
      </div>
    )
  } catch (error) {
    console.error('Error fetching views:', error);
    // Return a fallback UI if there's an error
    return (
      <div className="relative w-full h-16">
          <div className="absolute top-4 right-0 z-10 bg-red-500 p-2 rounded-full">
              <Ping/>
          </div>
          <p className="view-text absolute bottom-0 right-0 w-auto min-w-[80px] text-right">
              <span className="text-black font-bold">0 Views</span>
          </p>
      </div>
    )
  }
}

export default View