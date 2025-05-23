import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import markdownIt from "markdown-it";
import View from "@/components/View";
import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth/next";

// Define session type with id
interface SessionWithId {
  id?: string;
  [key: string]: any;
}

const md=new markdownIt();
const Page = async({params}:{params:Promise<{id:string}>}) => {
    const id=(await params).id;
    const post=await client.fetch(STARTUP_BY_ID_QUERY,{id});
    if(!post) return notFound();

    const parsedContent=md.render(post?.pitch || "");

    const session = await getServerSession(authOptions) as SessionWithId;
    console.log(session?.id);
  
  return (
    <>
        <section className="pink_container !min-h-[280px]">
            <p className="tag text-black">{formatDate(post?._createdAt)}</p>
            <h1 className="heading">{post.category}</h1>
            <p className="sub-heading !max-w-5xl">{post.description}</p>

        </section>
        <section className="section_container">
            <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
            <div className="space-y-5 mt-10 max-w-4xl mx-auto  text-black">
                <div className="flex-between gap-5">
                    {post.author && (
                      <Link href={`/user/${post.author._id}`} className="flex gap-2 items-center mb-3">
                          <Image src={post.author.image} alt="author" width={64} height={24} className="rounded-full drop-shadow-xl" />
                          <div>
                              <p className="text-20-medium">{post.author.name}</p>
                              <p className="text-16-medium !text-black-300">@{post.author.username}</p>                        
                          </div>
                      </Link>
                    )}
                    <p className="category-tag">{post.category}</p>
                </div>
                <h3 className="text-30-bold">StartUp Details</h3>
                {parsedContent?(
                    <article className="prose max-w-4xl font-work-sans break-all"
                        dangerouslySetInnerHTML={{__html:parsedContent}} 
                    />
                ):(
                    <p className="no-result">No details found</p>
                )}
            </div>
            <hr className="divider"/>

            {/* View component */}
            <View id={id}/>
        </section>
    </>
  )
}

export default Page