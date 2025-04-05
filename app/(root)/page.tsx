import "../globals.css";
import SearchForm from "../../components/SearchForm";
import StartUpCard, { StartUpCardType } from "../../components/StartUpCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";


export default async function Home({searchParams}:{searchParams:Promise<{query:string}>}) {
  
  const query=(await searchParams).query;
  const params={search:query || null};


  // const posts=await client.fetch(STARTUPS_QUERY);
  // this will fetch the data from the sanity live api,web page will get dynamic data
  const {data:posts}=await sanityFetch({query:STARTUPS_QUERY,params});


  // This code is used to log the posts data in the console 
  // console.log(JSON.stringify(posts,null,2));
  // const posts=[{
  //   _createdAt: new Date().toISOString(),
  //   _id:1,
  //   views:55,
  //   author:{_id:1,name:"John"},
  //   _title:"Startup 1",
  //   _description:"This is the description of the startup 1",
  //   _image:"https://placehold.co/48x48",
  //   _category:"Category 1",   
  // }]


  return (
    <>
    {/* heading class from tailwindcss utility classes present in globals.css file */}
      <section className="pink_container">
        <h1 className="heading">Pitch Your Idea,<br />Connect With The Right People</h1>
        <p className="sub-heading !max-w-3xl" >
        Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartUpCardType) => (
              <StartUpCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No results found</p>
          )}
        </ul>
      </section>
    </>
  );
}
